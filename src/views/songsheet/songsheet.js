import React, {
    Component
} from 'react';

import fetchMethod from '../../getdataCom';
import {
    ListView,
    List,
    SearchBar
} from 'antd-mobile';
const {
    Item
} = List;

class Song extends Component {
    render() {
        let {
            list
        } = this.props.resdata;
        // console.log(list);
        return (
            <List>
                {list.map((item)=>{
                    return (
                        <div className='list-rankitem' key = {item.imgurl}>
                            <Item
                                thumb={item.imgurl.replace('{size}',400)}
                                arrow="horizontal"
                                wrap
                                onClick={() => {}}
                            >
                                <div className='song-info'>
                                    <span>{item.specialname}</span>
                                    <span><i className='iconfont icon-erji'></i>{item.playcount}</span>
                                </div>
                            </Item>
                        </div>
                    )
                })}
            </List>
        )
    }
}
export default fetchMethod('getSong', Song);