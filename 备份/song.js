import React, { Component } from 'react'
import { List } from 'antd-mobile';
import { getSongInfo, getKrc } from '../src/server/api'
import { sToM, parseLyric } from '../src/utils/utils'
import '../src/views/comm/song.css'
const Item = List.Item;


export default class Song extends Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.box = React.createRef();
    this.line = React.createRef();
    this.yuan = React.createRef();
    this.state = {
      songInfo: {},  // 请求歌曲的信息
      rc: '',  // 请求歌曲的信息
      rcArr:[],  // 记录歌词
      duration: 0,
      currentTime:0,
      isPlay: true,
      left: 0
      //currentPlayIndex: -1  // 记录播放歌曲的下标
    };
    this.currentPlayIndex = -1;
    this.currentRcIndex = 0;
    this.maxX = 0; // 记录走的最大距离
    this.isMove = false;
  }

  getSongInfoMethod = (item) => {
    // 从播放列表中拿到播放歌曲的下标
    let currentPlayIndex = this.props.songList.findIndex(option => option.hash === item.hash)
    console.log(currentPlayIndex)
    this.currentPlayIndex = currentPlayIndex;
    //拿到歌曲
    getSongInfo({ hash: item.hash }).then((data) => {
      this.setState({
        songInfo: data
      })
      // 拿歌词
      getKrc({
        keyword: item.filename,
        hash: item.hash
      }).then((data) => {
        // 转成二维数组
        let arr = [];
        if (data){
          arr = parseLyric(data);
        }
        
        this.setState({
          rc: data,
          rcArr: arr
        });
        console.log(arr)
      })
    })
  }
  
  componentDidMount() {
    let audio = this.audio.current;
    // 加载完成
    audio.addEventListener('loadedmetadata', () => {
      console.log('音频加载完成');
      this.setState({
        duration: audio.duration
      })
    })
    // 播放时间点改变触发的事件
    audio.addEventListener('timeupdate',() => {
      /* console.log('总时间', audio.duration)
      console.log('总时间', parseInt(audio.duration / 60) + ":" + parseInt(audio.duration % 60))
      console.log('当前播放', parseInt(audio.currentTime / 60) + ":" + parseInt(audio.currentTime % 60))
      console.log('当前播放',audio.currentTime) */
      this.setState({
        currentTime: audio.currentTime,
        // 算出left值
        //left: audio.currentTime/this.state.duration * this.maxX
      })

      if (!this.isMove){
        this.setState({
          left: audio.currentTime / this.state.duration * this.maxX
        })
      }
    })
    // 播放完成
    audio.addEventListener('ended', () => {
      console.log('播放完成');
      this.next()
    })
    // 算出走的最大距离
    // this.maxX = this.box.current.clientWidth - this.yuan.current.offsetWidth;
  }
  // 播放暂停
  playOrPause = () => {
    let audio = this.audio.current;
    if(audio.paused){
      audio.play()
      this.setState({
        isPlay: true
      })
    }else{
      audio.pause()
      this.setState({
        isPlay: false
      })
    }
  }
  // 下一首
  next = () => {
    // 从哪一个地方拿下一首
    this.currentPlayIndex++;
    if (this.currentPlayIndex >= this.props.songList.length){
      this.currentPlayIndex = 0;
    }
    let item = this.props.songList[this.currentPlayIndex]
    this.getSongInfoMethod(item)
  }

  move = (e) => {
    let pageX = e.changedTouches[0].pageX;
    let l = pageX - this.box.current.getBoundingClientRect().left - this.yuan.current.offsetWidth/2
    // 拖上走 算出播放的时间
    this.currentTime = l / this.maxX * this.state.duration
    this.setState({
      left: l
    })
    this.isMove = true;
    //this.audio.current.currentTime = currentTime;
  }

  end = () => {
    this.isMove = false;
    this.audio.current.currentTime = this.currentTime;
    // 判断暂停还是播放
    //this.audio.current.play();
  }
  // start box的时候，播放到这个位置的时间点
  start = (e) => {
    let pageX = e.changedTouches[0].pageX;
    let l = pageX - this.box.current.getBoundingClientRect().left - this.yuan.current.offsetWidth / 2
    // 拖上走 算出播放的时间
    let currentTime = l / this.maxX * this.state.duration
    this.audio.current.currentTime = currentTime;
  }

  // 在播放过程中，实时计算播放时间对用的歌词
  // 播放时间  歌词的列表[[],[],[]]
  
  render() {
    // 播放列表
    let { songList} = this.props;

    //
    let { currentTime, rcArr,duration,left} = this.state;

    console.log('当前时间',currentTime)
    // 那currentTime 和数组中每一项对比，数组的这一样大于当前播放时间，就停止继续对比
    console.log('从这里开始', this.currentRcIndex)
      for (let i = this.currentRcIndex; i < rcArr.length; i++){
        if (rcArr[i][0] > currentTime){
          this.currentRcIndex = i-1 < 0 ? 0 : i-1;
          break;
        }
      }

      // 算出来小按钮走的left值
      // 不能在这里算了，因为这样写的话，只能通过currentTime计算出left值
      // 需要的是1. 不拖拽时候通过currentTime计算
      // 2 .拖拽的时候，按照拖拽的走
    //let left = currentTime / duration * this.maxX

    return (
      <div>
        <List className="my-list">
          {
            songList.map((item) => {
              return <Item
                key={item.hash}
                extra={<i style={{ fontSize: '30px' }} className="iconfont icon-xiazai"></i>}
                onClick={this.getSongInfoMethod.bind(this,item)}
              >
                {item.filename}
              </Item>
            })
          }
        </List>
        <audio controls autoPlay
          src={this.state.songInfo.url}
          ref={this.audio}
        >
        </audio>
        {/*<h3>记录时间</h3>*/}
        {/*<p>*/}
          {/*总时间：<span>{sToM(this.state.duration)}</span>*/}
          {/*当前播放时间：<span>{sToM(this.state.currentTime)}</span>*/}
          {/*<br/>*/}
          {/*<button>上一首</button>*/}
          {/*<button onClick={this.playOrPause}>*/}
            {/*{this.state.isPlay ? '暂停' : '播放'}*/}
          {/*</button>*/}
          {/*<button onClick={this.next}>下一首</button>*/}
        {/*</p>*/}
        {/*<h3>自定义的滚动条</h3>*/}
        {/*<div className="box" ref={this.box}*/}
          {/*onTouchStart={this.start}*/}
        {/*>*/}
          {/*<div className="line" ref={this.line}*/}
            {/*style={{ width: left + 'px' }}*/}
          {/*></div>*/}
          {/*<div className="yuan"*/}
            {/*style={{ left: left + 'px'}}*/}
            {/*onTouchMove={this.move}*/}
            {/*onTouchEnd={this.end}*/}
          {/*ref={this.yuan}></div>*/}
        {/*</div>*/}
        {/*<hr />*/}
        {/*<h3>歌词</h3>*/}
        {/*<div className="rc_box">*/}
          {/*{*/}
            {/*this.state.rcArr.map((item,index) => {*/}
              {/*// item = [shijian,geci]*/}
              {/*return <p*/}
                {/*className={this.currentRcIndex === index ? 'red' : ''}*/}
                {/*key={item[0]}*/}
                {/*time={item[0]}>{item[1]}*/}
              {/*</p>*/}
            {/*})*/}
          {/*}*/}
        {/*</div>*/}
          {/*<hr/>*/}
          {/*<p style={{fontSize: '30px'}}>*/}
          {/*{this.state.rc}*/}
          {/*</p>*/}
      </div>
    )
  }
}
