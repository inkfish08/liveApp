<template>
  <div class="header-wrapper" v-show="showHeader">
    <v-header :title-name="titleName" :show-weather="showWeather" :show-back-btn="showBackBtn" :show-select-btn="showSelectBtn"></v-header>
  </div>
    <router-view></router-view>
    
  <div class="bottom"></div>
  <div class="footer-wrapper" v-show="showFooter">
    <v-footer></v-footer>
  </div>
</template>

<script>
import BMap from './components/BMap';
import vFooter from './components/footer';
import vHeader from './components/header';
export default {
  data(){
    return{
      showHeader:true,
      showFooter:true,
      showWeather:true,
      showBackBtn:false,
      showSelectBtn:false,
      titleName:'首页'
    }
  },
  components:{
    bmap:BMap,
    vFooter,
    vHeader
  },
  ready(){
    // this.getArea();
    
    let connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{type:'unknown'};
    const type_text = ['unknown','ethernet','wifi','2g','3g','4g','none'];
    console.log(navigator);
  },
  methods:{
    // getArea(){
    //   this.$http.jsonp('http://apis.map.qq.com/ws/location/v1/ip',{params:{
    //     key:'WN2BZ-5KJKW-HTUR4-OZVLE-IJCHJ-X4BEG',
    //     jsonp:'callback',
    //     output:'jsonp'
    //   }}).then((res)=>{
    //     res = res.body;
    //     this.city = res.result.ad_info.city;
    //     // if(sessionStorage.getItem(this.city)){
    //     //   this.loadWeather();
    //     // }else{
    //     //   this.getWeather();
    //     // }
    //   })
    // },
  },
  events:{
    changeCity(cityName){
      this.$broadcast('changeCity',cityName)
    },
    changeTitle(name){
      const titleObject = {
        index:'首页',
        weather:'天气',
        takeaway:'音乐',
        about:'我的'
      }
      this.titleName = titleObject[name]?titleObject[name]:name;
    },
    toggleWeather(isShow){
      if(isShow == 'show'){
        this.showWeather = true;
      }else if(isShow == 'hide'){
        this.showWeather = false;
      }
    },
    toggleFooter(isShow){
      if(isShow == 'show'){
        this.showFooter = true;
      }else if(isShow == 'hide'){
        this.showFooter = false;
      }
    },
    toggleHeader(isShow){
      if(isShow == 'show'){
        this.showHeader = true;
      }else if(isShow == 'hide'){
        this.showHeader = false;
      }
    },
    toggleBackBtn(isShow){
      if(isShow == 'show'){
        this.showBackBtn = true;
      }else if(isShow == 'hide'){
        this.showBackBtn = false;
      }
    },
    toggleSelectBtn(isShow){
      if(isShow == 'show'){
        this.showSelectBtn = true;
      }else if(isShow == 'hide'){
        this.showSelectBtn = false;
      }
    }
  }
}
</script>

<style lang="stylus">
  .bottom
    height 57px
    width 100%
  .footer-wrapper
    position fixed
    bottom 0
    left 0
    width 100%
</style>
