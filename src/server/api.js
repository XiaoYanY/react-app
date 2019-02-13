import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/base';
// 添加请求拦截器
// 歌曲信息地址：http://localhost:3000/base/app/i/getSongInfo.php?hash=E7DD9AED417678706A0699B613EA3D75&cmd=playInfo&json=true
axios.interceptors.request.use(config => {
    let re = /\/app\/i/;
    if(re.test(config.url)){
        return config;
    }else {
        config.params.json = true;
    }
    // console.log(config);
    return config;
});

// 添加响应拦截器
axios.interceptors.response.use((
    {
        data
    }
) => {
    let o = {};
    //console.log(data)
    if (data.banner) { // 新歌
        o.list = data.data;
        o.banner = data.banner;
        o.origin = '新歌';
    } else if (data.rank) {
        o.list = data.rank.list;
        o.total = data.rank.total;
        o.origin = '排行';
    } else if (data.plist) {
        o.list = data.plist.list.info;
        o.total = data.plist.list.total;
        o.origin = '歌单';
    } else if (data.list) {
        o.list = data.list;
        o.origin = '歌手';
    } else if (data.singers) {
        o = data.singers.list.info;
    }
    else if(data.info){
        o.url = data.url;
        o.singerInfo = data.info;
        o.songs = data.songs;
        o.origin = '歌手信息';
    } 
    else {
        o = data;
    }
    return o;
});

function request(option) {
    let def = {
        method: 'get',
        path: '',
        params: {}
    };
    Object.assign(def, option);
    return axios[def.method](def.path, {
        params: def.params
    }).catch((err) => {
        alert(`错误信息${err}`);
    });
}
// axios.get('/rank/list/?json=true').then((res)=>{
//     console.log(res)
// })
export function getNewSong() {
    return request({
        path: '/'
    })
}
export function getRank() {
    return request({
        path: '/rank/list'
    })
}
export function getSong() {
    return request({
        path: '/plist/index'
    })
}
export function getSinger() {
    return request({
        path: '/singer/class'
    })
}
export function getSingerList(params = {
    classid: ''
}) {
    return request({
        path: `/singer/list/${params.classid}`
    })
}
export function getSingerInfo(params = { singerid: '' }) {
    return request({
        path: `/singer/info/${params.singerid}`
    })
}
// getSingerInfo({singerid:3060}).then((res)=>{
//     console.log(res);
// });
export function getSongInfo(option) {
    let defaults = {
        hash:'',
        cmd:'playInfo'
    };
    Object.assign(defaults, option);
    return request({ path: `/app/i/getSongInfo.php`, params: defaults })
}

// 拿到歌词
export function getKrc(option) {
    let defaults = {
        hash: '',
        keyword: '',
        timelength:242000,
        cmd: 100
    }
    Object.assign(defaults, option)
    return request({ path: `/app/i/krc.php`, params: defaults })
}



export default {
    getNewSong,
    getRank,
    getSong,
    getSinger,
    getSingerList,
    getSingerInfo
}