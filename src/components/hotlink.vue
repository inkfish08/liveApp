<template>
    <ul class="list">
        <li class="item" v-for="hot in hotList | limitBy 10" @click="chooseHot(hot.keyword)">{{hot.keyword}}</li>
    </ul>
</template>

<script>
export default{
    data(){
        return{
            hotList:[]
        }
    },
    created(){
        this.getHotList()
    },
    methods:{
        getHotList(){
            this.$http.get(this.HOST + '/hot').then((res)=>{
                res = res.body.data.info;
                this.hotList = res;
            })
        },
        chooseHot(val){
            this.$dispatch('getChooseHot',val)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .list
        overflow hidden
        .item
            float left
            padding 4px 8px
            background #5cadff
            margin 5px
            color #fff
            font-size 12px
            border-radius 6px
</style>