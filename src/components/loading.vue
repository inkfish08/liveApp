<template>
    <spinner v-ref:spinner fixed :text="text" size="xl"></spinner>
</template>

<script>
import VueStrap from 'vue-strap';
export default{
    props:{
        text:{
            type:String,
            default:'请稍后,正在搜索ing....'
        }
    },
    components: {
        spinner:VueStrap.spinner
    }
}
</script>

<style lang="stylus"></style>