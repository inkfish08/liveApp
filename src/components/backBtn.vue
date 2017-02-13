<template>
    <div class="backBtn" @click="goBack">
        <span>返回</span>
    </div>
</template>

<script>
export default{
    methods: {
        goBack(){
            history.go(-1)
        }
    }
}
</script>

<style lang="stylus">
    .backBtn
        padding 10px
        position fixed
        color #fff
        z-index 999999
        top 0
        left 0
</style>