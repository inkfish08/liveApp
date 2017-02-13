<template lang="html">
  <div class="today" :class="bgClass">
    <h2 class="today-title">
      {{weather.realtime.date}} {{weather.realtime.moon}}
      <span class="time">最后更新：{{weather.realtime.dataUptime | time}}</span>
    </h2>
    <div class="weather-main">
      <p class="weather-info">{{weather.realtime.weather.info}}</p>
      <p class="weather-temp">{{weather.realtime.weather.temperature | temp}}</p>
    </div>
  </div>
  <accordion type="info" class="more-info">
    <panel is-open class="more-tips">
      <strong slot="header">多一点信息</strong>
      <div class="tips">
        <div class="tips-item">
          <p class="icon"><i class="icon-compass"></i><span>{{weather.realtime.wind.direct}}</span></p>
          <p class="text">{{weather.realtime.wind.power}}</p>
        </div>
        <div class="tips-item">
          <p class="icon"><i class="icon-thermometer"></i>空气湿度</p>
          <p class="text">{{weather.realtime.weather.humidity}}%</p>
        </div>
        <div class="tips-item">
          <p class="icon"><i class="icon-leaf"></i>空气质量</p>
          <p class="text">{{weather.pm25.pm25.pm25}}</p>
        </div>
        <div class="tips-item">
          <p class="icon"><i class="icon-sun"></i>紫外线</p>
          <p class="text">{{weather.pm25.show_desc}}</p>
        </div>
      </div>
      <div class="tips2">
        <div class="tips-item" v-link="{name:'tipsinfo',params:{city:this.city,info:'kongtiao',tips:'室温指数'}}">
          <i class="icon icon-hipster"></i>
          <p>室温指数</p>
          <p>{{weather.life.info.kongtiao[0]}}</p>
        </div>
        <div class="tips-item" v-link="{name:'tipsinfo',params:{city:this.city,info:'ganmao',tips:'感冒指数'}}">
          <i class="icon icon-lab"></i>
          <p>感冒指数</p>
          <p>{{weather.life.info.ganmao[0]}}</p>
        </div>
        <div class="tips-item" v-link="{name:'tipsinfo',params:{city:this.city,info:'xiche',tips:'洗车指数'}}">
          <i class="icon icon-car"></i>
          <p>洗车指数</p>
          <p>{{weather.life.info.xiche[0]}}</p>
        </div>
      </div>
      <div class="tips2">
        <div class="tips-item" v-link="{name:'tipsinfo',params:{city:this.city,info:'chuanyi',tips:'穿衣指数'}}">
          <i class="icon icon-team"></i>
          <p>穿衣指数</p>
          <p>{{weather.life.info.chuanyi[0]}}</p>
        </div>
        <div class="tips-item" v-link="{name:'tipsinfo',params:{city:this.city,info:'ziwaixian',tips:'紫外线指数'}}">
          <i class="icon icon-line-chart"></i>
          <p>紫外线指数</p>
          <p>{{weather.life.info.ziwaixian[0]}}</p>
        </div>
        <div class="tips-item" v-link="{name:'tipsinfo',params:{city:this.city,info:'yundong',tips:'运动指数'}}">
          <i class="icon icon-futbol-o"></i>
          <p>运动指数</p>
          <p>{{weather.life.info.yundong[0]}}</p>
        </div>
      </div>
    </panel>
    <panel is-open class="more-weather">
      <strong slot="header">
        未来5天天气
      </strong>
      <ul class="weather-list">
        <li v-for="item in weather.weather" class="item">
          <p class="date">{{item.date}} 周{{item.week}}</p>
          <p class="temp-day">
            <span>日出时间  {{item.info.day[5]}}</span>
            <span>早  {{item.info.day[2] | temp}}</span>
            <span class="temp"><i class="icon" :class="dayClass[$index]"></i>{{item.info.day[1]}}</span>
            <span class="wind"><i class="icon icon-compass"></i>{{item.info.day[4]}}</span>
          </p>
          <p class="temp-night">
            <span>日落时间  {{item.info.night[5]}}</span>
            <span>晚  {{item.info.night[2] | temp}}</span>
            <span class="temp"><i class="icon" :class="nightClass[$index]"></i>{{item.info.night[1]}}</span>
            <span class="wind"><i class="icon icon-compass"></i>{{item.info.night[4]}}</span>
          </p>
        </li>
      </ul>
    </panel>
  </accordion>
</template>

<script>
import VueStrap from 'vue-strap'
export default {
  data(){
    return{
      city:'',
      dayClass:[],
      nightClass:[],
      bgClass:'',
      weather:{},
    }
  },
  components: {
    accordion:VueStrap.accordion,
    panel:VueStrap.panel
  },
  created(){
    this.city = this.$route.params.city;
    this.loadWeather();
    this.$dispatch('toggleWeather','hide');
    this.$dispatch('toggleSelectBtn','show');
    let titleName = this.$route.name;
    this.$dispatch('changeTitle',titleName)
  },
  beforeDestroy(){
    this.$dispatch('toggleWeather','show');
    this.$dispatch('toggleSelectBtn','hide');
    // this.$dispatch('toggleBackBtn','hide');
  },
  methods:{
    loadWeather(){
      if(sessionStorage.getItem(this.city)){
        this.weather = JSON.parse(sessionStorage.getItem(this.city));
        this.changeWeatherIcon();
      }else{
        this.getWeather()
      }
    },
    saveWeather(){
      sessionStorage.setItem(this.city,JSON.stringify(this.weather))
    },
    //获取天气信息
    getWeather(){
      this.$http.get('http://inkfish08.xyz/weather',{params:{
        key:'a5b371b1e2cb4ba3950eb6affac6c272',
        cityname:this.city
      }}).then((res)=>{
        res = res.body;
        this.weather = res.result;
        //保存到
        this.saveWeather();
        this.changeWeatherIcon();
      })
    },
    changeWeatherIcon(){
      const iconList = {
        '小雨':'icon-rainy2',
        '阵雨':'icon-rainy2',
        '多云':'icon-cloudy5',
        '阴':'icon-cloudy2',
        '晴':'icon-sun2',
        '少云':'icon-cloud',
        '中雨':'icon-rainy',
        '大雨':'icon-rainy',
        '雷阵雨':'icon-lightning',
        '暴雨':'icon-weather',
        '雾':'icon-cloudy',
        '霾':'icon-weather2',
        '暴风':'icon-windy5',
        '暴风雪':'icon-snowy',
        '大雪':'icon-snowy',
        '中雪':'icon-snowy2',
        '小雪':'icon-snowy2',
      };
      const bgList = {
        '晴':'water',
        '阵雨':'smallrain',
        '小雨':'smallrain',
        '中雨':'rain',
        '大雨':'rain',
        '暴雨':'rain',
        '雷阵雨':'rain',
        '阴':'luori',
        '少云':'cloud',
        '多云':'cloud',
        '小雪':'snow',
        '中雪':'snow',
        '大雪':'snow',
        '暴风雪':'snow',
        '雾':'dawu',
        '霾':'dawu',
        '暴风':'dawu',
      }
      this.bgClass = bgList[this.weather.realtime.weather.info];
      this.dayClass = [];
      this.nightClass = [];
      for(let i = 0; i < this.weather.weather.length; i++){
        let day = this.weather.weather[i].info.day[1];
        let night = this.weather.weather[i].info.night[1];
        this.dayClass.push(iconList[day]);
        this.nightClass.push(iconList[night]);
      }
      console.log(this.dayClass);
    }
  },
  filters:{
    //自定义过滤器,毫秒转化为当前时间
    time(value,time){
      let nowtime = new Date(value*1000);
      return nowtime.toLocaleString()
    },
    //温度过滤
    temp(value,temp){
      return value + '°'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .today
    position relative
    height 400px
    background-size 100% 100%
    background-repeat no-repeat
    &.cloud
      background-image url(../common/img/cloud.gif)
    &.water
      background-image url(../common/img/water.gif)
    &.smallrain
      background-image url(../common/img/smallrain.gif)
    &.rain
      background-image url(../common/img/rain.jpg)
    &.luori
      background-image url(../common/img/luori.gif)
    &.snow
      background-image url(../common/img/snow.gif)
    &.dawu
      background-image url(../common/img/dawu.jpg)
    .today-title
      color #fff
      padding 10px
      background rgba(0,0,0,0.2)
      .time
        font-size 12px
        float right
    .weather-main
      position absolute
      left 0
      top 0
      right 0
      bottom 0
      height 80px
      z-index 99
      color #fff
      margin auto
      text-align center
      .weather-info
        font-size 16px
        height 20px
        line-height 20px
      .weather-temp
        font-size 80px
  .more-info
    text-align center
    .more-tips
      .tips
        display flex
        background #464c5b
        .tips-item
          flex 1
          padding 10px 0
          color #fff
          font-size 0
          .icon
            font-size 12px
            color #9ea7b4
            height 16px
            line-height 16px
            display flex
            align-items center
            justify-content center
            i
              margin-right 2px
          .text
            font-size 18px
            height 22px
            line-height 22px
      .tips2
        display flex
        background #464c5b
        font-size 0
        .tips-item
          flex 1
          font-size 12px
          color #657180
          background #fff
          padding 10px
          margin 10px
          border-radius 10%
          .icon
            font-size 26px
            height 30px
            line-height 30px
          p:last-child
            font-size 20px
            color #464c5b
            height 24px
            line-height 24px
            overflow hidden
    .more-weather
      .weather-list
        .item
          color #fff
          .date
            background #464c5b
            height 30px
            line-height 30px
          .temp-day,.temp-night
            display flex
            font-size 12px
            height 20px
            line-height 20px
            span
              flex 1
              &.temp,&.wind
                text-align left
                .icon
                  margin-right 10px
          .temp-day
            background #657180
          .temp-night
            background #9ea7b4
</style>
