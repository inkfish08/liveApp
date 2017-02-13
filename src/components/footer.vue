<template lang="html">
  <div class="tab">
    <div class="tab-item" v-link="{name:'index'}">
      <i class="item-icon icon-home"></i>
      <p class="item-name">首页</p>
    </div>
    <div class="tab-item" v-link="{name:'weather',params:{city:cityName}}">
      <i class="item-icon icon-play"></i>
      <p class="item-name">天气</p>
    </div>
    <div class="tab-item" v-link="{name:'takeaway'}">
      <i class="item-icon glyphicon glyphicon-music"></i>
      <p class="item-name">音乐</p>
    </div><div class="tab-item" v-link="{name:'about'}">
      <i class="item-icon icon-wondering"></i>
      <p class="item-name">我的</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      cityName:'深圳'
    }
  },
  events:{
    changeCity(cityName){
      this.cityName = cityName
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tab
    display flex
    .tab-item
      padding 5px 0
      flex 1
      text-align center
      background #f5f7f9
      font-weight 700
      &.active
        background #464c5b
        color #fff
      .item-icon
        font-size 28px
      .item-name
        font-size 14px
        height 18px
        line-height 18px
</style>
