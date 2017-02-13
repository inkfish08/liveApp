<template lang="html">
  <div class="search-wrapper">
    <h1 class="title">歌曲搜索</h1>
    <song-search></song-search>
  </div>
  <div class="hot-wrapper">
    <h1 class="title">最近热搜</h1>
    <hot-link></hot-link>
  </div>
  <div class="list-wrapper">
    <h1 class="title">搜索结果</h1>
    <song-list></song-list>
    <loading></loading>
  </div>
</template>

<script>
import songSearch from '../components/songsearch';
import hotLink from '../components/hotlink';
import songList from '../components/songlist';
import loading from '../components/loading';
export default {
  created(){
    let titleName = this.$route.name;
    this.$dispatch('changeTitle',titleName)
  },
  beforeDestroy(){
  },
  components: {
    songSearch,hotLink,songList,loading
  },
  events:{
    loadSongList(val){
      if(val == 'have'){
        this.$broadcast('haveSongList');
      }
    },
    getChooseHot(val){
      this.$broadcast('searchSong',val)
    },
    loading(val){
      if(val == 'show'){
        this.$broadcast('show::spinner')
      }else{
        this.$broadcast('hide::spinner')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .title
    height 30px
    line-height 30px
    width 100px
    padding-left 10px
    border-bottom 1px solid #ccc
    margin-bottom 5px
</style>
