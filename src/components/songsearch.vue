<template>
    <bs-input placeholder="请输入  歌手名字  或者  歌曲名称" :value.sync="value">
        <span slot="before" class="input-group-addon">
            <span class="glyphicon glyphicon-search"></span>
        </span>
        <span slot="after" class="input-group-addon" @click="getSong">搜索</span>
    </bs-input>
</template>

<script>
import { input } from 'vue-strap'
export default{
    data(){
        return{
            value:''
        }
    },
    components: {
        bsInput:input
    },
    methods: {
        getSong(){
            if(this.value == ''){ return }
            this.$dispatch('loading','show');
            this.$http.get(this.HOST + '/getsong/',{params:{
                keyword:this.value
            }}).then((res)=>{
                res= res.body.data.info;
                this.saveSongList(res);
                this.$dispatch('loadSongList','have');
                this.$dispatch('loading','hide');            
            })
        },
        saveSongList(val){
            sessionStorage.setItem('songList',JSON.stringify(val))
        }
    },
    events:{
        searchSong(val){
            this.value = val;
            this.getSong()
        }
    }
}
</script>

<style lang="stylus">

</style>