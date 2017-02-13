<template lang="html">
  <div class="info">
    <h1 class="title">{{info[0]}}</h1>
    <p class="text">{{info[1]}}</p>
    <div class="small-tips">
      <h2 class="tips-title">{{city}}</h2>
      <p class="tips-text">
        温度 {{weather.realtime.weather.temperature}}° </br>
        湿度 {{weather.realtime.weather.humidity}} </br>
        风力风向 {{weather.realtime.wind.direct}} {{weather.realtime.wind.power}}
      </p>
    </div>
    <div class="info-bg" :class="bgClass"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title:'',
      info:[],
      city:'',
      weather:{},
      bgClass:''
    }
  },
  created(){
    const info = this.$route.params.info;
    this.bgClass = info;
    this.title = this.$route.params.tips;
    this.city = this.$route.params.city;
    this.loadWeather();
    this.loadInfo(info);
    this.$dispatch('toggleWeather','hide');
    this.$dispatch('toggleFooter','hide');
    this.$dispatch('toggleBackBtn','show');
    this.$dispatch('changeTitle',this.title)
  },
  beforeDestroy(){
    this.$dispatch('toggleWeather','show');
    this.$dispatch('toggleFooter','show');
    this.$dispatch('toggleBackBtn','hide')
  },
  methods:{
    loadWeather(){
      this.weather = JSON.parse(sessionStorage.getItem(this.city));
    },
    saveWeather(){
      sessionStorage.setItem(this.city,JSON.stringify(this.weather));
    },
    loadInfo(info){
      this.info = this.weather.life.info[info];
    }
  }
}
</script>

<style lang="stylus">
  .info
    position relative
    margin 10px
    padding 10px
    background #fff
    line-height 1.5
    height 300px
    .title
      font-size 28px
      color rgb(186, 37, 46)
      font-weight 700
    .small-tips
      position absolute
      bottom 30px
      .tips-text
        font-size 12px
        color #9ea7b4
    .info-bg
      width 200px
      height 200px
      position absolute
      right 0
      bottom 0
      background-repeat no-repeat
      background-size cover
      &.kongtiao
        background-image url(../common/img/room.jpg)
      &.yundong
        background-image url(../common/img/ball.jpg)
      &.ziwaixian
        background-image url(../common/img/ziwaixian.jpg)
      &.ganmao
        background-image url(../common/img/ganmao.jpg)
      &.xiche
        background-image url(../common/img/car.jpg)
      &.chuanyi
        background-image url(../common/img/shirt.jpg)

</style>
