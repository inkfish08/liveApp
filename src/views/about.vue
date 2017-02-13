<template lang="html">
    <div class="userinfo-wrapper">
      <userinfo :now="now" :lv="lv"></userinfo>
    </div>
    <div class="user-item">
      <useritem></useritem>
    </div>
    <b-map></b-map>
</template>

<script>
  import userinfo from '../components/userinfo';
  import useritem from '../components/useritem';
  import BMap from '../components/BMap'
  export default {
    data() {
      return {
        now: 80,
        lv: 3
      }
    },
    components: {
      userinfo, useritem, BMap
    },
    created () {
      console.log(this.TRANSITION)
      console.log(this.$route)
    },
    ready() {
      let titleName = this.$route.name
      this.$dispatch('changeTitle', titleName)
    },
    route:{
      canReuse(){
      }
    }
  }
</script>

<style lang="css">

</style>