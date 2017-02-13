<template>
    <ul class="items">
        <li class="item" v-link="{name:'cookie',params:{info:'video'}}">
            <span class="glyphicon glyphicon-film film"></span>我的直播
        </li>
        <li class="item" v-link="{name:'cookie',params:{info:'music'}}">
            <span class="glyphicon glyphicon-music music"></span>我的音乐
        </li>
        <li class="item">
            <span class="glyphicon glyphicon-download-alt download"></span>我的下载
        </li>
        <li class="item">
            <span class="glyphicon glyphicon-signal rank"></span>排行榜
        </li>
        <li class="item">
            <span class="glyphicon glyphicon-folder-close myid"></span>我的账户
        </li>
        <li class="item" @click="aboutApp">
            <span class="glyphicon glyphicon-info-sign"></span>关于App
        </li>
    </ul>
    <alert :show.sync="showAbout" placement="top" duration="0" type="success" width="100%" dismissable>
        <span class="icon-ok-circled alert-icon-float-left"></span>
        <strong>您好!</strong>
        <p>本项目利用网上提供的第三方开发平台API进行开发，所有文字图片等资源都由 各自api 提供，本项目开源只用于分享、学习用</p>
    </alert>
</template>

<script>
    import VueStrap from 'vue-strap';
    export default {
        data() {
            return {
                showAbout: false
            }
        },
        components: {
            alert: VueStrap.alert
        },
        methods: {
            aboutApp() {
                this.showAbout = true
            }
        }
    }
</script>

<style lang="stylus">
    .items
        padding 10px
        .item
            line-height 40px
            height 40px
            border-bottom 1px solid #ccc
            .glyphicon
                margin 0 20px
                &.film
                    color #0099FF
                &.music
                    color #99CC33
                &.download
                    color #666699
                &.rank
                    color #3399CC
                &.myid
                    color #003366
</style>