import React, { Component } from 'react';
import {getNewSong, getSongInfo} from '../../server/api';
import {Carousel} from 'antd-mobile'
import { List } from 'antd-mobile';
import '../../download/font/iconfont.css';
import SongList from '../comm/rootSong'

const Item = List.Item;

class Newsong extends Component{
    constructor(p){
        super(p);
        this.state={
            list:[],
            banner:[],
        }
    }
    componentDidMount(){
        getNewSong().then((resdata)=>{
            setTimeout(()=>{
                this.setState({...resdata });
            },100)
        });
    }
    render(){
        let {list=[],banner=[]} = this.state;
        return (
            <div className='wrap'>
                <Carousel className="space-carousel"
                          frameOverflow="visible"
                          cellSpacing={10}
                          slideWidth={0.8}
                          autoplay
                          infinite
                          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                          afterChange={index => this.setState({ slideIndex: index })}
                >
                    {banner.map((item,index)=>{
                        return (
                            <a key={item.id}
                               style={{
                                   display: 'block',
                                   position: 'relative',
                                   top: this.state.slideIndex === index ? -10 : 0,
                                   boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                               }}
                            >
                                <img src={item.imgurl} alt=""
                                     style={{ width: '100%', verticalAlign: 'top',height:'auto' }}
                                     onLoad={() => {
                                         window.dispatchEvent(new Event('resize'));
                                     }}
                                />
                            </a>
                        )
                    })}
                </Carousel>
                <section className='section'>{/*渲染新歌列表*/}
                    <SongList songList={list}></SongList>
                </section>
            </div>
        )
    }
}
export default Newsong;
