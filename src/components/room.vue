<template lang="html">
  <a class="room-item" v-link="{name:'livepage',params:{roomid:room.room_id}}">
    <div class="room-bg">
      <div v-lazy:background-image="room.room_src" alt="" class="room-image"></div>
      <span class="room-online">{{room.online | formatNum}}</span>
      <span class="room-nickname">{{room.nickname}}</span>
    </div>
    <p class="room-name">{{room.room_name}}</p>
  </a>
</template>

<script>
export default {
  props:{
    room:{
      type:Object,
      default:{room_src:'',online:'',nickname:'',room_name:''}
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

<style lang="stylus">
  .room-item
    width 50%
    text-align center
    padding 5px
    box-sizing border-box
    .room-bg
      position relative
      width 100%
      .room-image
        width 100%
        height 120px
        border-radius 10% 0 10% 0
      .room-online,.room-nickname
        position absolute
        line-height 16px
        font-size 10px
        padding 0 5px
        color #fff
        background rgba(4, 5, 5, 0.38)
      .room-online
        right 0px
        top 0px
      .room-nickname
        left 0px
        bottom 0px
    .room-name
      font-size 12px
      color #000
      text-align left
      width 90%
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      height 20px
      line-height 20px
</style>
