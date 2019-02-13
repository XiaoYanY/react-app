import React, { Component } from 'react'
import { List } from 'antd-mobile';
import { getSongInfo, getKrc } from '../../server/api'
import { sToM, parseLyric } from '../../utils/utils'
import './song.css'
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
        console.log(currentPlayIndex);
        this.currentPlayIndex = currentPlayIndex;
        //拿到歌曲
        getSongInfo({ hash: item.hash }).then((data) => {
            this.setState({
                songInfo: data
            });
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
    };
    componentDidMount() {
        let audio = this.audio.current;
        // 加载完成
        audio.addEventListener('loadedmetadata', () => {
            console.log('音频加载完成');
            this.setState({
                duration: audio.duration
            })
        });
        // 播放时间点改变触发的事件
        audio.addEventListener('timeupdate',() => {
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
    }
    render() {
        let { songList} = this.props;// 播放列表
        let { currentTime, rcArr,duration,left} = this.state;
        console.log('当前时间',currentTime)
        // 那currentTime 和数组中每一项对比，数组的这一样大于当前播放时间，就停止继续对比
        console.log('从这里开始', this.currentRcIndex);
        for (let i = this.currentRcIndex; i < rcArr.length; i++){
            if (rcArr[i][0] > currentTime){
                this.currentRcIndex = i-1 < 0 ? 0 : i-1;
                break;
            }
        }
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
                <h3>歌词</h3>
                <div className="rc_box">
                    {
                        this.state.rcArr.map((item,index) => {
                            // item = [shijian,geci]
                            return <p
                                className={this.currentRcIndex === index ? 'red' : ''}
                                key={item[0]}
                                time={item[0]}>{item[1]}
                            </p>
                        })
                    }
                </div>
            </div>
        )
    }
}
