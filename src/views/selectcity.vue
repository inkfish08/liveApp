<template lang="html">
  <div class="select-wrapper">
    <div class="now-city">
      <h1 class="title">您当前所选择的城市</h1>
      <p class="city-name">{{city}}</p>
    </div>
    <tabs :active="tabIndex">
      <tab :header="proTitle" :disabled="!notSelect">
        <ul class="list">
          <li class="list-item" v-for="pro in proDate" @click="choosePro(pro.ProID,pro.name)">{{pro.name}}</li>
        </ul>
      </tab>
      <tab :header="cityTitle" :disabled="notSelect">
        <ul class="list">
          <li class="list-item" @click="initPro()">返回上一级</li>
          <li class="list-item" v-for="city in cityDate" @click="goWeather(city.name)">{{city.name}}</li>
        </ul>
      </tab>
    </tabs>
  </div>
</template>

<script>
import VueStrap from 'vue-strap';
let cityDate = require('../common/data/data.json');
export default {
  data(){
    return{
      city:'',
      selectP:'',
      selectC:'',
      notSelect:true,
      tabIndex:0,
      proDate:{},
      cityDate:[],
      proTitle:'省份',
      cityTitle:'城市'
    }
  },
  created(){
    this.city = this.$route.params.city;
    let titleName = this.$route.name;
    this.$dispatch('toggleWeather','hide');
    this.$dispatch('toggleFooter','hide');
    this.$dispatch('toggleBackBtn','show');
    this.$dispatch('changeTitle','选择城市');
    this.proDate = cityDate.pro;
  },
  beforeDestroy(){
    this.$dispatch('toggleWeather','show');
    this.$dispatch('toggleFooter','show');
    this.$dispatch('toggleBackBtn','hide')
  },
  components: {
    tabs: VueStrap.tabset,
    tab: VueStrap.tab
  },
  methods:{
    choosePro(proid,proname){
      console.log(proid);
      this.proTitle = proname;
      this.tabIndex = 1;
      this.notSelect = !this.notSelect;
      let cityList = cityDate.city;
      for(let i = 0; i < cityList.length; i++){
        if(cityList[i].ProID == proid){
          this.cityDate.push(cityList[i])
        }
      }
    },
    initPro(){
      this.tabIndex = 0;
      this.notSelect = !this.notSelect;
      this.cityDate = [];
    },
    goWeather(cityName){
      this.$dispatch('changeCity',cityName)
      this.$route.router.go({name:'weather',params:{city:cityName}})
    }
  }
}
</script>

<style lang="stylus">
  .select-wrapper
    margin 10px
    .now-city
      padding-bottom 10px
      margin-bottom 10px
      border-bottom 1px solid #ccc
      .title
        font-size 18px
        width 200px
        height 30px
        line-height 30px
        border-top 1px solid rgb(217, 134, 66)
        border-bottom 1px solid rgb(217, 134, 66)
        margin-bottom 10px
      .city-name
        font-size 14px
        color rgba(61, 42, 26, 0.77)
    .list
      width 90%
      margin 0 auto
      text-align center
      background #e3e8ee
      overflow hidden
      padding 10px
      .list-item
        float left
        padding 5px
        margin 5px
        background #657180
        color #fff
        font-size 14px
        border-radius 4px
</style>
