<template>
    <div class="user-header">
        <img class="img" :src="src" alt="">
        <h2 class="name">inkfish08</h2>
        <h3 class="lv">
            <div class="bar-title">级别{{lv}}</div>
            <div class="bar-wrapper">
                <progressbar :now="now" type="warning" striped animated label></progressbar>            
            </div>
        </h3>
    </div>    
</template>

<script>
import VueStrap from 'vue-strap';
export default {
    props: {
        now:{
            type:Number
        },
        lv:{
            type:Number
        }
    },
    components: {
        progressbar:VueStrap.progressbar
    }
}
</script>

<style lang="stylus" scoped>
    .user-header
        padding 20px
        text-align center
        width 100%
        box-sizing border-box
        border-bottom 1px solid #ccc
        .img
            width 60px
            height 60px
            margin-bottom 20px
        .name
            font-size 18px
            height 30px
            line-height 30px
        .lv
            width 300px
            margin 0 auto
            display flex
            height 20px
            line-height 20px
            .bar-title
                flex 1
            .bar-wrapper
                flex 6
                background #ccc
</style>