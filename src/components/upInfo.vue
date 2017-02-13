<template lang="html">
  <div class="info-wrapper">
    <div class="up-img">
      <img :src="room.avatar" alt="">
    </div>
    <div class="up-main">
      <h2 class="up-title">{{room.room_name}}</h2>
      <p class="up-name">{{room.nickname}}</p>
      <p class="up-more">体重：{{up.owner_weight}} 分类：<span class="font-red">{{room.tag_name}}</span></p>
    </div>
    <div class="up-addme">
      <div class="add-btn"><i class="icon" :class="heart"></i>关注</div>
      <p class="add-num">{{up.fans_num | formatNum}}</p>
    </div>
  </div>
  <div class="notice-wrapper">
    <h2 class="title">开播时间</h2>
    <p class="livetime">{{up.start_time }}</p>
    <h2 class="title">直播公告</h2>
    <p class="notice">{{room.notice}}</p>
  </div>
</template>

<script>
export default {
  props:{
    room:{
      type:Object,
      default:{}
    },
    up:{
      type:Object,
      default:{}
    }
  },
  data(){
    return{
      heart:'icon-heart2'
    }
  },
  filters:{
    formatNum(val,formatNum){
      if (val < 10000) {return val}
      return (val / 10000).toFixed(1) + "万"
    }
  }
}
</script>

<style lang="stylus" scoped>
  .info-wrapper
    display flex
    padding 10px
    width 100%
    border-bottom 1px solid #999
    .up-img
      flex 1
      padding 0 10px
      max-width 70px
      img
        border-radius 50%
        height 50px
        width 50px
    .up-main
      flex 4
      font-size 0
      .up-title
        font-size 18px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .up-name
        font-size 12px
        padding 4px 0 3px 0
        color rgba(83, 74, 81, 0.72)
      .up-more
        font-size 12px
        color rgba(83, 74, 81, 0.72)
        .font-red
          color rgb(232, 154, 51)
    .up-addme
      flex 1
      width 80px
      max-width 80px
      min-width 80px
      text-align center
      .add-btn
        background rgb(205, 22, 27)
        border-radius 15px
        color #fff
        font-size 12px
        padding 5px 0
        margin 5px 0
        .icon
          margin-right 3px
      .add-num
        font-size 12px
        color rgba(83, 74, 81, 0.72)
  .notice-wrapper
    width 95%
    margin 10px auto 0
    .title
      font-size 14px
      width 100px
      height 25px
      line-height 25px
      border-top 1px solid rgb(217, 134, 66)
      border-bottom 1px solid rgb(217, 134, 66)
      margin-bottom 10px
    .livetime,.notice
      font-size 12px
      padding 20px
</style>
