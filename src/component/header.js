import React, { Component } from 'react';
import {Icon,NavBar} from 'antd-mobile/dist/antd-mobile';
import { withRouter } from 'react-router-dom'

class Header extends Component{
    render(){
        return (
            <div>
                <NavBar
                    mode="dark"
                    onLeftClick={() => {  this.props.history.go(-1) }}
                    icon={<Icon type="left" />}
                    rightContent={<Icon key="0" type="search" style={{ marginRight: '16px' }}
                    onClick={() => {
                        this.props.history.push({
                            pathname: '/search',
                            state: {
                                title: '搜索',
                                navClass: true
                            }
                        })
                    }}
                />}
                ><h2>你好音乐</h2></NavBar>
            </div>
        )
    }
}
export default withRouter(Header);