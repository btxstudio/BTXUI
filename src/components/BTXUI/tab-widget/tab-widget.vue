<template>
    <b-view>
        <tag-widget :data-list="tabList" v-model="cur_tab"/>
        <b-view v-for="item of tabList" v-show="item.id === cur_tab[0]" :key="item.id">
            <slot :name="item.id" />
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BText from "@/components/BTXUI/core/b-text";
    import TagWidget from "@/components/BTXUI/tab-widget/tag-widget";

    export default {
        name: "tab-widget",
        components: {
            BView,
            BText,
            TagWidget
        },
        /*
        * init-data{
        *   tab-list: [
        *       {
        *           id: "数据标识",
        *           text: "数据标题",
        *       },...
        *   ],
        *   v-model: "当前 tab id",
        * }
        * */
        model:{
            prop: "curTab",
            event: "on_select"
        },
        props: {
            tabList: {
                type: Array,
                required: true
            },
            curTab: {
                type: String,
                required: true
            },
        },
        data(){
            return {

                //当前所选标签
                cur_tab: [this.curTab]

            }
        },
        watch: {

            //监听当前所选标签
            cur_tab(){
                this.$emit("on_select", this.cur_tab[0]);
            }

        }
    }
</script>