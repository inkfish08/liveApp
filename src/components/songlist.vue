<template>
    <ul class="song-list" v-if="songList !== null">
        <li class="song-item" v-for="song in songList" v-link="{name:'music',params:{hash:song.hash}}">
            <div class="song-pic">
               
                <img class="pic" src="../common/img/cd.jpg" alt="">
            </div>
            <div class="song-info">
                <h2 class="info-title">{{song.songname}}</h2>
                <p class="info-singer">{{song.filename}}</p>
            </div>
        </li>
    </ul>    
</template>

<script>
export default{
    data () {
        return {
            songList:[]
        }
    },
    methods: {
        getSongList(){
            this.songList = JSON.parse(sessionStorage.getItem('songList'))
        }
    },
    events:{
        haveSongList(){
            this.getSongList()
        }
    }
}
</script>

<style lang="stylus" scoped>
    .song-list
        width 100%
        .song-item
            display flex
            padding 10px
            border-bottom 1px solid #ccc
            .song-pic
                margin-right 10px
                min-width 50px
                width 50px
                height 50px
                .pic
                    width 100%
                    height 100%
            .song-info
                flex 1
                .info-title
                    width 200px
                    font-size 16px
                    height 30px
                    line-height 30px
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                .info-singer
                    width 250px
                    font-size 12px
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
</style>