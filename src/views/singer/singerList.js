import React, {
	Component
} from 'react';
import fetchMethod from '../../getdataCom';
import {
	getSingerList
} from "../../server/api";
import SingerInfo from './singerInfo';
import {
	List
} from 'antd-mobile';
const Item = List.Item;

export class SingerList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}
	componentDidMount() {
		let {classid} = this.props.match.params;
		// console.log(classid);
		getSingerList({
			classid
		}).then((resdata) => {
			this.setState({
				list: resdata
			})
		})
	}
	render() {
		let {list} = this.state;
		return (
			<List>
                {list.map((item)=>{
                    return (
                        <div className='list-rankitem' key = {item.singerid}>
                            <Item
                                thumb={item.imgurl.replace('{size}',400)}
                                wrap
                                onClick={() => {
                                	this.props.history.push({
										pathname: `/singer/info/${item.singerid}`,
										state:{
											title:item.singername,
											navClass:false
										}
									});
								}}
                            >{item.singername}</Item>
                        </div>
                    )
                })}
            </List>
		);
	}
}

export default SingerList;