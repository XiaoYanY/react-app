import React, {
	Component
} from 'react';
import {getSingerInfo,getSongInfo} from "../../server/api";
import { Accordion, List, Icon } from 'antd-mobile';
import SongList from '../comm/rootSong'
const Item = List.Item;

class SingerInfo extends Component {
	constructor(p){
		super(p);
		this.state={
            imageLoading:false,
			resdata:{
                singerInfo:{
                    imgurl:'',
                    intro:''
                },
                songs:{
                    list:[]
                }
            }
		}
	}
	getsong=(item)=>{
        getSongInfo({hash:item.hash}).then((res)=>{
            // console.log(this);
            this.setState({res})
        });
    }
    async componentDidMount(){
		let singerid = this.props.match.params.singerid;
		// console.log(singerid);
		let resdata = await getSingerInfo({singerid});
        this.setState( {resdata:resdata} );

        let image = new Image();
        image.src = resdata.singerInfo.imgurl.replace('{size}', 400);
        image.onload = () => {
            this.setState({
                imageLoading: true
            });
        }
	}
	render() {
	    let {imageLoading} = this.state;
        let { singerInfo = { imgurl: '', intro: ''}, songs } = this.state.resdata;
		return (
			<div>
				<div className="titlepic">
                    {
                        imageLoading ?<img src={singerInfo.imgurl.replace('{size}', 400)} />:<Icon type="loading" />
                    }
                </div>
                <Accordion className="my-accordion">
                    <Accordion.Panel  header={singerInfo.intro.slice(0,25)} >
                        {singerInfo.intro.slice(17)}
                    </Accordion.Panel>
                </Accordion>
                <SongList songList={songs.list} />
			</div>
		);
	}
}

export default SingerInfo;