<template lang="html">
  <div class="room-wrapper">
    <a class="room-title" v-link="{name:'moreroom',params:{cateid:cateId,gamename:gameName}}">{{gameName}}<span class="more">更多</span></a>
    <div class="room-list">
      <room :room="room" v-for="room in roomList | limitBy 4"></room>
    </div>
  </div>
</template>

<script>
import room from '../components/room';
export default {
  props:{
    cateId:{
      type:String
    },
    gameName:{
      type:String
    }
  },
  components:{
    room
  },
  data(){
    return{
      roomList:[]
    }
  },
  methods:{
    getRoomList(){
      this.$http.get('http://inkfish08.xyz/live/'+this.cateId).then((res)=>{
        res = res.body;
        this.roomList = res.data;
        this.saveRoomData();
      })
    },
    saveRoomData(){
      sessionStorage.setItem(this.gameName,JSON.stringify(this.roomList))
    },
    loadRoomData(){
      this.roomList = JSON.parse(sessionStorage.getItem(this.gameName));
    }
  },
  ready(){
    if(sessionStorage.getItem(this.gameName)){
      this.loadRoomData();
    }else{
      this.getRoomList();
    }
  }
}
</script>

<style lang="stylus">
.room-wrapper
  width 100%
  font-size 0
  background #fff
  .room-title
    display block
    position relative
    height 30px
    line-height 30px
    font-size 18px
    padding-left 10px
    color #000
    border-bottom 1px solid rgba(12, 13, 11, 0.65)
    .more
      position absolute
      right 10px
      font-size 12px
  .room-list
    display flex
    flex-wrap wrap
    width 100%
</style>
