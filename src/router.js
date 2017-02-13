import live from './views/live';
import index from './views/index';
import takeaway from './views/takeaway';
import about from './views/about';
import weather from './views/weather';
import tipsinfo from './views/tipsinfo';
import selectcity from './views/selectcity';
import moreroom from './views/moreroom';
import livepage from './views/livepage';
import music from './views/music';
import cookiePage from './views/cookiePage';
let maps = {
  '/live': {
    name: 'live',
    component: live
  },
  '/index': {   //app首页
    name: 'index',
    component: index
  },
  '/takeaway': {
    name: 'takeaway',
    component: takeaway
  },
  '/about': {
    name: 'about',
    component: about
  },
  '/weather/:city': {
    name: 'weather',
    component: weather
  },
  '/tipsinfo/:city/:info/:tips': {
    name: 'tipsinfo',
    component: tipsinfo
  },
  '/selectcity/:city': {
    name: 'selectcity',
    component: selectcity
  },
  '/moreroom/:cateid/:gamename': {
    name: 'moreroom',
    component: moreroom
  },
  '/livepage/:roomid': {
    name: 'livepage',
    component: livepage
  },
  '/music/:hash': {
    name: 'music',
    component: music
  },
  '/cookie/:info': {
    name: 'cookie',
    component: cookiePage
  }
}

export default maps
