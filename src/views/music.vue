<template>
    <back-btn></back-btn>
    <div class="banner-music">
        <music-banner :music="music"></music-banner>
    </div>
    
    <div class="music-info">
        <h1 class="music-name">{{music.songName}}</h1>
        <h2 class="music-singer">{{music.fileName}}</h2>
        <audio :src="music.url" controls class="audio"></audio>
    </div>
</template>

<script>
import musicBanner from '../components/musicBanner';
import backBtn from '../components/backBtn';
export default{
    data () {
        return {
            music:{}      
        }
    },
    components: {
      musicBanner, backBtn
    },
    created () {
        this.getHash();
        this.$dispatch('toggleHeader','hide');
        this.$dispatch('toggleFooter','hide');
    },
    beforeDestroy(){
        this.$dispatch('toggleHeader','show');
        this.$dispatch('toggleFooter','show');
    },
    methods: {
        getHash(){
            let musicHash = this.$route.params.hash;
            this.getSrc(musicHash);
        },
        getSrc(musicHash){
            this.$http.get(this.HOST + '/mp3/',{params:{
                hash:musicHash,
                cmd:'playInfo'
            }}).then((res)=>{
                res = res.body;
                this.music = res;
                this.music.imgUrl = this.music.imgUrl.replace('{size}','400')
                this.saveHistory()
            })
        },
        saveHistory(){
            let historyList = [];
            let time = new Date();
            time = time.toLocaleString();   
             if (sessionStorage.getItem('history_music')) { 
                historyList = JSON.parse(sessionStorage.getItem('history_music'));
                this.music.getTime = time;
                historyList.push(this.music);
                sessionStorage.setItem('history_music',JSON.stringify(historyList));
            }else{
                this.music.getTime = time;
                historyList.push(this.music);
                sessionStorage.setItem('history_music',JSON.stringify(historyList));      
            }
        }
    }
}
</script>

<style lang="stylus">
    .music-info
        text-align center
        height 200px
        background #464c5b
        color #e3e8ee
        .music-name
            font-size 20px
            height 30px
            line-height 30px
        .music-singer
            font-size 14px
            height 20px
            line-height 20px
        .audio
            width 100%
</style>