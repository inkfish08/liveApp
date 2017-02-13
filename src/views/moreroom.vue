<template lang="html">
    <div class="banner">
      <img :src="bannerSrc" alt="" width="100%" height="100%">
    </div>
    <div class="room-list">
      <room :room="room" v-for="room in roomList"></room>
    </div>
</template>

<script>
import room from '../components/room';
export default {
  data(){
    return{
      roomList:[],
      bannerSrc:''
    }
  },
  components:{
    room
  },
  created(){
    this.gameName = this.$route.params.gamename;
    this.cateId = this.$route.params.cateid;
    this.loadRoomData();
    this.getBannerSrc();
    this.$dispatch('toggleWeather','hide');
    this.$dispatch('toggleFooter','hide');
    this.$dispatch('toggleBackBtn','show');
    this.$dispatch('changeTitle',this.gameName);
  },
  beforeDestroy(){
    this.$dispatch('toggleWeather','show');
    this.$dispatch('toggleFooter','show');
    this.$dispatch('toggleBackBtn','hide');
  },
  methods:{
    loadRoomData(){
      this.roomList = JSON.parse(sessionStorage.getItem(this.gameName));
    },
    getBannerSrc(){
      let gameList = JSON.parse(sessionStorage.getItem('gameList'));
      console.log(gameList);
      for(let i = 0; i < gameList.length; i++){
        if( gameList[i]['cate_id'] == this.cateId ){
          console.log(123);
          this.bannerSrc = gameList[i]['game_src'];
          console.log(this.bannerSrc);
        }
      }
    }
  }
}
</script>

<style lang="stylus">
  .banner
    width 100%
    height 250px
    margin-bottom 10px
  .room-list
    display flex
    width 100%
    flex-wrap wrap
</style>
