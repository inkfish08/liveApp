<template lang="html">
    <div class="banner-wrapper">
      <banner></banner>
    </div>
    <div class="swiper-wrapper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="game in gameList|limitBy 16">
          <a class="game-item" v-link="{name:'moreroom',params:{cateid:game.cate_id,gamename:game.game_name}}">
            <img :src="game.game_icon" alt="" class="game-icon" />
            <p class="game-name">{{game.game_name}}</p>
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="room-list" v-for="game in gameList|limitBy 16">
      <livelist :cate-id="game.cate_id" :game-name="game.game_name"></livelist>
    </div>
</template>

<script>
  import banner from '../components/banner';
  import livelist from '../components/livelist';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  export default {
    data() {
      return {
        gameList: [],
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 4,
          slidesPerColumn: 2,
          paginationClickable: true,
          spaceBetween: 1,
          onClick(swiper, event) {
            // console.log('Swiper-onClick.activePageIndex:', swiper.activeIndex)
            // console.log('Swiper-onClick.current Page activeItemIndex:', swiper.clickedIndex)
          }
        }
      }
    },
    ready() {
      let titleName = this.$route.name;
      this.$dispatch('changeTitle', titleName);
      if (sessionStorage.getItem('gameList')) {
        this.loadGameData();
      } else {
        this.getGameIcon();
      }
    },
    components: {
      swiper, swiperSlide, banner, livelist
    },
    methods: {
      getGameIcon() {
        this.$http.get(this.HOST + '/game').then((res) => {
          res = res.body;
          this.gameList = res.data;
          this.saveGameData();
          this.$broadcast('haveBanner', this.gameList);
        })
      },
      saveGameData() {
        sessionStorage.setItem('gameList', JSON.stringify(this.gameList));
      },
      loadGameData() {
        this.gameList = JSON.parse(sessionStorage.getItem('gameList'));
        this.$broadcast('haveBanner', this.gameList);
      }
    }
  }
</script>

<style lang="stylus">
  .swiper-wrapper
    background #fff
    .swiper-container
      height auto
      margin-left auto
      margin-right auto
      .swiper-slide
        height 100px
        text-align center
        .game-item
          display block
          width 100%
          padding-top 10px
          .game-icon
            width 50px
            height 50px
            border-radius 50%
          .game-name
            font-size 12px
            line-height 20px
            font-weight 700
  .room-list
    margin 10px 0
</style>