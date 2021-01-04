<template>
    <b-view styles="max-w">
        <!--标题-->
        <title-tag-wid v-bind="tagData" :icon-data="iconData" :arrow-fixed="arrowFixed" v-model="tag_spread"
                       @on_move="$emit('on_title_move', $event)"
                       @on_enter="$emit('on_title_enter', $event)"
                       @on_leave="$emit('on_title_leave', $event)" />

        <!--内容-->
        <b-view styles="rel no-scroll trans-fast t-f2px alpha-0" ref="cont"
                :dynamic="`h-${cont_height}`"
                :states="{
                    spread: {
                        style: 'alpha-1',
                        state: tag_spread
                    }
                }">
            <slot />
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import TitleTagWid from "./title-tag-wid"

    const desc = ["该组件用于实现内容的展开与收起。"],
        extend = [],
        dependent = ["title-tag-wid", "b-view"],
        api = {
            methods: [
                {
                    name: "comp_height",
                    ef: "设置内容高度",
                    params: "-",
                    return: "-"
                }
            ],
            event: [
                {
                    name: "on_toggle",
                    ef: "折叠、展开切换",
                    params: "spread"
                },
                {
                    name: "on_title_move",
                    ef: "标题区域鼠标移动",
                    params: "event"
                },
                {
                    name: "on_title_enter",
                    ef: "标题区域鼠标移入或手指按下（悬停）",
                    params: "event"
                },
                {
                    name: "on_title_leave",
                    ef: "标题区域鼠标移出或手指抬起",
                    params: "event"
                }
            ]
        },
        init_data = `{
        tagData: "(参照：tag-wid 组件入参)",
        /* spread: "展开状态，默认关闭" */,
        /* iconData: "(参照：b-icon 组件入参)" */,
        /* arrowFixed: "下拉图标位置固定右侧，默认 true" */
    }`;

    export default {
        name: "drawer-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            TitleTagWid
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
            },
            arrowFixed: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        data(){
            return {

                //抽屉展开状态
                tag_spread: this.spread,

                //内容区高度
                cont_height: ""

            }
        },
        computed: {

            //内容区域
            cont(){
                return this.$refs.cont;
            }

        },
        watch: {

            //监听抽屉展开状态
            tag_spread(val){
                this.cont_height = val? `${this.cont.$el.scrollHeight}px`: 0;
                this.$emit("on_toggle", val);
            }

        },
        methods: {

            //设置内容高度
            comp_height(){
                if(this.tag_spread){
                    this.cont_height = "auto";
                    setTimeout(()=>{
                        this.cont_height = `${this.cont.$el.scrollHeight}px`;
                    }, 500)
                }else{
                    this.cont_height = 0;
                }
            }

        },
        mounted(){
            this.comp_height();
        }
    }
</script>