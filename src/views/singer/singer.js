import React, {
	Component
} from 'react';

import fetchMethod from "../../getdataCom";
import {
	getSinger
} from "../../server/api";
import {
	Button,
	Icon
} from 'antd-mobile';
import {
	List
} from 'antd-mobile';
const Item = List.Item;


class Singer extends Component {
	render() {
		let {
			list = []
		} = this.props.resdata;
		// console.log(this.props.resdata)
		let list2 = [];
		let i = 1;
		list2.push([list[0]]);
		while (i < list.length) {
			list2.push(list.slice(i, i + 3));
			i = i + 3;
		}
		// console.log(list2);
		// console.log(this.props)
		return (
			<div  className='SingerClassify' >
                {
                    list2.map((option,index) => {
                        return(
                            <div className='classify'  key={index}>
                                {
                                    option.map((item,index)=>{
                                        return (
                                            <Button 
                                                key={item.classid}
                                                onClick={()=>{
                                                    this.props.history&&this.props.history.push({
                                                        pathname: '/singer/list/' + item.classid,
                                                        state: {
                                                          title: item.classname,
                                                          navClass: true
                                                        }
                                                      })
                                                }}                                                
                                             >
                                                {item.classname}
                                                <Icon type='right' />
                                            </Button>
                                        )
                                    })
                                }   
                            </div>
                        )
                    })
                }
            </div>
		)
	}
}
export default fetchMethod('getSinger', Singer);