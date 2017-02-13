<template lang="html">
  <carousel>
    <slider v-for="banner in bannerSrc">
      <div class="index-banner">
        <img :src="banner" style="height:200px" class="banner-bg">
      </div>
    </slider>
  </carousel>
</template>

<script>
import VueStrap from 'vue-strap';
export default {
  data(){
    return{
      bannerList:[],
      bannerSrc:[],
      bannerIndex:[]
    }
  },
  ready(){
    for (let i = 0; i <= 100; i ++){
      this.bannerIndex[i] = i + 1;
    }
    this.bannerIndex.sort(()=>{ return 0.5 - Math.random() });
  },
  components:{
    carousel:VueStrap.carousel,
    slider:VueStrap.slider
  },
  events:{
    haveBanner(arr){
      this.bannerList = arr;
      this.getBanner(this.bannerIndex)
    }
  },
  methods:{
    getBanner(index){
      for(let i = 0; i<= 2; i++){
        this.bannerSrc.push(this.bannerList[index[i]].game_src)
      }
      console.log(this.bannerSrc);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .index-banner
    display flex
    .banner-bg
      flex 1
</style>
