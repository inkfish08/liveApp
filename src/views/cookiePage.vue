<template>
    <tabs :active="tabIndex">
        <tab :header="leftTitle">
            <ul class="list" v-show="focusList">
                <li class="list-item"></li>
            </ul>
            <nothing :content="contentFocus" :have="haveFocus"></nothing>
        </tab>
        <tab :header="rightTitle">
            <ul class="list" v-show="historyList" v-for="item in historyList">
                <li class="list-item">{{item}}</li>
            </ul>
            <nothing :content="contentHistory" :have="haveHistory"></nothing>
        </tab>
    </tabs>
</template>

<script>
    import VueStrap from 'vue-strap';
    import nothing from '../components/nothing';
    export default {
        data() {
            return {
                tabIndex: 0,
                leftTitle: '左侧',
                rightTitle: '右侧',
                focusList: [],
                historyList: [],
                haveFocus: false,
                haveHistory: false,
                contentFocus: '当前木有关注的记录哦....先去关注吧！',
                contentHistory: '当前木有历史纪录哦....！'
            }
        },
        components: {
            tabs: VueStrap.tabset,
            tab: VueStrap.tab,
            nothing
        },
        created() {
            const info = this.$route.params.info
            if (info == 'video') {
                this.leftTitle = '直播关注';
                this.rightTitle = '观看历史';
            } else {
                this.leftTitle = '音乐关注';
                this.rightTitle = '试听历史';
            }
            this.getData(info)
        },
        methods: {
            getData(key) {
                if (sessionStorage.getItem('focus_' + key)) {
                    this.focusList = JSON.parse(sessionStorage.getItem('focus_' + key));
                    this.haveFocus = true;
                }
                if (sessionStorage.getItem('history_' + key)) {
                    this.historyList = JSON.parse(sessionStorage.getItem('history_' + key));
                    this.haveHistory = true;
                }
            }
        }
    }
</script>

<style lang="stylus">

</style>