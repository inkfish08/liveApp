<template>
    <div class="music-banner">
    </div>
    <div class="pic-wrapper">
        <img class="music-pic" :src="music.imgUrl" alt="">    
    </div>

</template>

<script>
export default{
    props: {
        music:{
            type:Object,
            default:{imgUrl:'',fileName:'',songName:''}
        }
    }
}
</script>

<style lang="stylus" scoped>
    .music-banner
        height 200px
        background #464c5b
    .pic-wrapper
        position relative
        height 250px
        .music-pic
            position absolute
            top -130px
            width 80%
            left 0 
            right 0
            margin auto
            box-shadow 5px 5px 3px #000
</style>