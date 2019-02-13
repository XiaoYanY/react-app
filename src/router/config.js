import Newsong from '../views/newsong/newsong';
import Rank from '../views/rank/rank';
import Song from '../views/songsheet/songsheet';
import Singer from '../views/singer/singer';
import Search from '../views/seach';
import SingerList from '../views/singer/singerList';
import SingerInfo from '../views/singer/singerInfo';

let navData = [{
    title: '新歌',
    path: '/',
    component: Newsong
}, {
    title: '排行',
    path: '/rank',
    component: Rank
}, {
    title: '歌单',
    path: '/song',
    component: Song
}, {
    title: '歌手',
    path: '/singer',
    component: Singer
}];
// 其他的配置
let other = [{
    path: '/search',
    title: '搜索',
    component: Search
}, {
    path: '/singer/list/:classid',
    title: '歌手列表',
    component: SingerList
}, {
    path: '/singer/info/:singerid',
    title: '歌手信息',
    component: SingerInfo
}]

export {
    navData,
    other
};
// 里面是包含所有的数据
export default [...navData, ...other];