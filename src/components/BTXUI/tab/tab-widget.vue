<template>
    <b-view>
        <b-view styles="rel t-4px">
            <tags-widget v-bind="tags_data" v-model="cur_tab"/>
        </b-view>
        <keep-alive>
            <b-view v-for="item of tags_data.tagList" v-if="item.id === cur_tab[0]" :key="item.id">
                <slot :name="item.id" />
            </b-view>
        </keep-alive>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BText from "@/components/BTXUI/core/b-text";
    import TagsWidget from "@/components/BTXUI/tags/tags-widget";

    let desc = ["该组件用于进行标签切换交互操作。"],
        extend = [],
        dependent = ["tags-widget", "b-text", "b-view"],
        api = null,
        init_data = `{
        curTab: "（v-model）当前 tag id",
        tagsData: "(参照：tags-widget 组件入参，不含 mode 项)"
    }`;

    export default {
        name: "tab-widget",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText,
            TagsWidget
        },
        model:{
            prop: "curTab",
            event: "on_select"
        },
        props: {
            curTab: {
                type: String,
                required: true
            },
            tagsData: {
                type: Object,
                required: true
            },
        },
        data(){
            return {

                //当前所选标签
                cur_tab: [this.curTab],

                //tags_data
                tags_data: { ...this.tagsData, mode: "radio" }

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