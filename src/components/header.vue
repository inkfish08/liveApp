<template lang="html">
  <div class="header">
    <div class="selectcity" v-show="showSelectBtn">
      <span class="btn" @click="showCity">
        <i class="icon icon-sun2">选择城市</i>
      </span>
    </div>
    <div class="weather-info" v-show="showWeather" @click="showCity">
      <div class="icon-wrapper" v-if="weather.realtime">
        <i class="icon" :class="weatherClass"></i>
      </div>
      <div class="weather-main" v-if="weather.realtime">
        <p class="name">{{weather.realtime.city_name}}</p>
        <p class="temp">{{weather.realtime.weather.info}}/{{weather.realtime.weather.temperature}}°</p>
      </div>
    </div>
    <div class="backBtn" v-show="showBackBtn" @click="goback">
      <i class="icon icon-arrow_back"></i>
    </div>
    <div class="header-title">
      {{titleName}}
    </div>
    <div class="about-me">
      <i class="icon icon-profile-male" @click="showAboutMe"></i>
    </div>
    <div class="about-me-wrapper" v-show="showAbout">

    </div>
  </div>
</template>

<script>
export default {
  props:{
    titleName:{ //头部标题
      type:String
    },
    showWeather:{  //是否显示天气缩略图
      type:Boolean,
      default:true
    },
    showBackBtn:{  //是否显示返回按钮
      type:Boolean,
      default:false
    },
    showSelectBtn:{  //是否显示城市选项
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      city:'',
      weather:{},
      weatherClass:'icon-cloudy',
      showAbout:false
    }
  },
  ready(){
    //判断本地存储是否已有该地区天气信息，减少hppt请求
    this.getArea()
  },
  methods:{
    getArea(){
      this.$http.jsonp('http://apis.map.qq.com/ws/location/v1/ip',{params:{
        key:'WN2BZ-5KJKW-HTUR4-OZVLE-IJCHJ-X4BEG',
        jsonp:'callback',
        output:'jsonp'
      }}).then((res)=>{
        res = res.body;
        this.city = res.result.ad_info.city;
        if(sessionStorage.getItem(this.city)){
          this.loadWeather(this.city);
        }else{
          this.getWeather(this.city);
        }
      })
    },
    //获取天气信息
    getWeather(cityName){
      this.$http.get(this.HOST + '/weather',{params:{
        key:'a5b371b1e2cb4ba3950eb6affac6c272',
        cityname:cityName
      }}).then((res)=>{
        res = res.body;
        this.weather = res.result;
        //保存到本地存储
        this.saveWeather(cityName)
      })
    },
    //本地存储天气信息（根据地区）
    saveWeather(cityName){
      sessionStorage.setItem(cityName,JSON.stringify(this.weather))
    },
    //根据地区读取相关天气信息
    loadWeather(cityName){
      this.weather = JSON.parse(sessionStorage.getItem(cityName))
    },
    //返回按钮
    goback(){
      if(this.$route.name == 'weather'){
        this.$route.router.go({name:'index'})
      }else{
        history.go(-1)
      }
    },
    //跳转到选择城市
    showCity(){
      // const pageName = this.$route.name;
      // if(pageName == 'weather'){
        this.$route.router.go({name:'selectcity',params:{city:this.city}})
      // }
    },
    //用户弹出菜单
    showAboutMe(){
      this.showAbout = !this.showAbout;
    }
  },
  events:{
    changeCity(cityName){
      this.city = cityName;
      this.getWeather(this.city);
    }
  }
}
</script>

<style lang="stylus">
  .header
    position relative
    display flex
    background #464c5b
    color #fff
    padding 8px 0
    .weather-info
      flex 3
      display flex
      .icon-wrapper
        font-size 26px
        margin 0 8px
      .weather-main
        font-size 12px
    .selectcity
      flex 3
      padding 5px 0
      .btn
        padding 0
        display inline-block
        margin-left 10px
        height 20px
        line-height 20px
        width 80px
        border 1px solid #fff
    .backBtn
      flex 3
      height 30px
      line-height 30px
      font-size 20px
      .icon
        padding 0 10px
        margin-right 20px
    .header-title
      flex 4
      font-size 20px
      text-align center
      height 30px
      line-height 30px
    .about-me
      flex 3
      text-align right
      height 30px
      line-height 30px
      .icon
        margin-right 10px
        border-radius 50%
        border 1px solid #fff
        padding 2px
        font-size 14px
    .about-me-wrapper
      position absolute
      width 100%
      height 100%
      top 46px
      left 0
      z-index 999
</style>
