import React, { Component } from 'react';

import fetchMethod from '../../getdataCom';
import {getRank} from "../../server/api";
import { List } from 'antd-mobile';
const Item = List.Item;

class Rank extends Component{
    render(){
        let {list} = this.props.resdata;
        return(
            <div>
                <List>
                    {list.map((item)=>{
                        return (
                            <div className='list-rankitem' key = {item.id}>
                                <Item
                                    thumb={item.imgurl.replace('{size}',400)}
                                    arrow="horizontal"
                                    wrap
                                    onClick={() => {}}
                                >{item.rankname}</Item>
                            </div>
                        )
                    })}
                </List>
            </div>
        )
    }
}
export default fetchMethod('getRank',Rank);