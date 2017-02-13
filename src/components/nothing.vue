<template>
    <div v-show="!have">{{content}}</div>
</template>

<script>
export default{
    props: {
        content:{
            type:String,
            default:''
        },
        have:{
            type:Boolean,
            default:true
        }
    }
}
</script>

<style lang="stylus">

</style>