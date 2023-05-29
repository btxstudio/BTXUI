<template>
    <b-view styles="max-w">
        <!--标题-->
        <title-tag-wid v-bind="tagData"
                       :icon-data="iconData"
                       :arrow-fixed="arrowFixed"
                       :checkbox="checkbox"
                       v-model="tag_spread"
                       @on_move="$emit('on_title_move', $event)"
                       @on_enter="$emit('on_title_enter', $event)"
                       @on_leave="$emit('on_title_leave', $event)" />

        <!--内容-->
        <b-view styles="rel no-scroll trans-fast t-f2px alpha-0" ref="cont"
                @on_transitionend="$_set_state"
                :dynamic="`h-${cont_height} ${cont_show}`"
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
        /* arrowFixed: "下拉图标位置固定右侧，默认 true" */,
        /* checkbox: "启用复选框，默认 false" */,
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
            },
            checkbox: {
                type: Boolean,
                required: false
            }
        },
        data(){
            return {

                //抽屉展开状态
                tag_spread: this.spread,

                //内容区高度
                cont_height: "",

                //内容显示状态
                cont_show: ""

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
                if(val) this.cont_show = "show";
                this.$nextTick(()=>{
                    this.cont_height = val? `${this.cont.$el.scrollHeight + 1}px`: 0;
                    this.$emit("on_toggle", val);
                })
            },

        },
        methods: {

            //设置内容高度
            comp_height(){
                if(this.tag_spread){
                    this.cont_height = "auto";
                    this.cont_show = "show";
                    setTimeout(()=>{
                        this.cont_height = `${this.cont.$el.scrollHeight + 1}px`;
                    }, 500)
                }else{
                    this.cont_height = 0;
                    this.cont_show = "hide";
                }
            },

            //设置显示状态
            $_set_state(e){
                if(e.propertyName === "height" && this.cont_height === 0) this.cont_show = "hide";
            }

        },
        mounted(){
            this.comp_height();
        }
    }
</script>