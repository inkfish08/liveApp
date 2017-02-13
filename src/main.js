import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import maps from './router.js'
import VueCordova from 'vue-cordova'
import './common/css/icon.css'
import './common/css/index.styl'
import './common/css/animate.css'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueCordova);

Vue.cordova.on('deviceready', () => {
  console.log('Cordova : device is ready !');
});
Vue.prototype.HOST = 'http://inkfish08.xyz';
// Vue.prototype.CITY = '123';
let app = Vue.extend(App);
let router = new VueRouter({
  linkActiveClass:'active',
  // scrollBehavior: function (to, from, savedPosition) {
  //       return savedPosition || { x: 0, y: 0 }
  //   },
})
// router.beforeEach((obj) => {
//   // to 和 from 都是 路由信息对象,后面使用路由的钩子函数就容易理解了
//   console.log(obj)
//   const fromName = obj.from.name;
//   const toName = obj.to.name;
  
//   if(fromName == 'index'){
//     Vue.prototype.TRANSITION = 'left'
//   }else{
//     Vue.prototype.TRANSITION = 'right'    
//   }
//   obj.next()
// })
// router.afterEach((obj)=>{
//   if(Vue.prototype.TRANSITION == 'left'){
//     Vue.prototype.TRANSITION = 'RIGHT'
//   }else{
//     Vue.prototype.TRANSITION = 'left'
//   }
// })
router.map(maps);
router.start(app,'#app');
router.go('/index');
