import React, { Component } from 'react'

export default class Lyrics extends Component{
    render(){
        return ReactDOM.createPortal(
            <div> 歌词 </div>
        )
    }
}