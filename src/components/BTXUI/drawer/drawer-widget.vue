<template>
    <b-view styles="max-w">
        <!--标题-->
        <title-tag-widget v-bind="tagData" :icon-data="iconData" v-model="tag_spread" />

        <!--内容-->
        <b-view styles="rel no-scroll h-0 trans-fast t-f2px alpha-0" ref="cont"
                :states="{
                    spread: {
                        style: '',
                        state: tag_spread
                    }
                }">
            <slot />
        </b-view>
    </b-view>
</template>

<script>
    import BHot from "@/components/BTXUI/core/b-hot"
    import BIcon from "@/components/BTXUI/core/b-icon"
    import BView from "@/components/BTXUI/core/b-view"
    import TitleTagWidget from "./title-tag-widget"

    const desc = ["该组件用于实现内容的展开与收起。"],
        extend = [],
        dependent = ["title-tag-widget", "b-view", "b-icon", "b-hot"],
        api = null,
        init_data = `{
        tagData: "(参照：tag-widget 组件入参)",
        /* iconData: "(参照：b-icon 组件入参)" */
    }`;

    export default {
        name: "drawer-widget",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BHot,
            BIcon,
            BView,
            TitleTagWidget
        },
        model: {
            prop: "spread",
            event: "on_toggle"
        },
        props: {
            tagData: {
                type: Object,
                required: true,
            },
            iconData: {
                type: Object,
                required: false
            },
            spread: {
                type: Boolean,
                required: false
            }
        },
        data(){
            return {

                //抽屉展开状态
                tag_spread: this.spread

            }
        },
        computed: {

            //内容区域
            cont(){
                return this.$refs.cont;
            }

        },
        methods: {

            //动态设置内容展开状态高度
            $_set_cont_height(){
                const cont = this.cont;
                cont.append_style(`h-${cont.$el.scrollHeight}px alpha-1`, "spread");
                this.tag_spread && cont.toggle_style("spread");
            }

        },
        watch: {

            //监听抽屉展开状态
            tag_spread(val){
                this.$emit("on_toggle", val);
            }

        },
        mounted(){
            this.$_set_cont_height();
        }
    }
</script>