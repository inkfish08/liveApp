<template lang="html">
  <div class="video-wrapper">
    <video-player :options="videoOptions"></video-player>
  </div>
  <div class="up-wrapper">
    <up-info :room="room" :up="up"></up-info>
  </div>
  <back-btn></back-btn>
  <div class="" @click="hhhhhh">
    站定。。。。。
  </div>
</template>

<script>
  import upInfo from '../components/upInfo';
  import { videoPlayer } from 'vue-video-player';
  import backBtn from '../components/backBtn';
  export default {
    data() {
      return {
        room: {},
        up: {},
        videoOptions: {
          source: {
            type: "application/x-mpegURL",
            src: '',
            withCredentials: false
          },
          poster: '',
          language: 'zh-CN',
          live: true,
          autoplay: false,
          height: 300
        }
      }
    },
    components: {
      videoPlayer, upInfo, backBtn
    },
    created() {
      const roomId = this.$route.params.roomid;
      // this.getRoomData(roomId);
      this.getLiveData(roomId);
      this.getUpData(roomId);
      this.$dispatch('toggleHeader', 'hide');
      this.$dispatch('toggleFooter', 'hide');
    },
    beforeDestroy() {
      this.$dispatch('toggleHeader', 'show');
      this.$dispatch('toggleFooter', 'show');
    },
    methods: {
      // getRoomData(roomId){
      //   this.$http.get(this.HOST + '/room/'+roomId).then((res)=>{
      //     res = res.body;
      //     this.room = res.data;
      //     console.log(this.room);
      //   })
      // },
      getLiveData(roomId) {
        this.$http.get(this.HOST + '/html5', {
          params: {
            roomId: roomId
          }
        }).then((res) => {
          console.log(res);
          res = res.body;
          this.room = res.data;
          this.saveHistory()
          this.videoOptions.source.src = this.room.hls_url;
          this.videoOptions.poster = this.room.room_src
        })
      },
      getUpData(roomId) {
        this.$http.get(this.HOST + '/room/' + roomId).then((res) => {
          res = res.body;
          this.up = res.data;
        })
      },
      hhhhhh() { //c传播给video控件
        this.$broadcast('playerAction', 'pause')
      },
      saveHistory() {
        let historyList = [];
        let time = new Date();
        time = time.toLocaleString();
        if (sessionStorage.getItem('history_video')) {
          this.room.getTime = time
          historyList = JSON.parse(sessionStorage.getItem('history_video'));
          historyList.push(this.room);
          sessionStorage.setItem('history_video', JSON.stringify(historyList));
        } else {
          this.room.getTime = time
          console.log('nothing')
          historyList.push(this.room);
          sessionStorage.setItem('history_video', JSON.stringify(historyList));
        }
      }
    }
  }
</script>

<style lang="stylus">
  .video-wrapper
    width 100%
</style>