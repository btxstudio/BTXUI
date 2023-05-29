<template>
    <b-hot @on_click="$_click"
           @on_move="$emit('on_move', $event)"
           @on_enter="$emit('on_enter', $event)"
           @on_leave="$emit('on_leave', $event)"
           :styles="`pad-h-1.4 pad-v-.4 round-sm mrg-r-.4 mrg-b-.4 line thick-1 line-${tag_colors.normal.line} color-${tag_colors.normal.text} bg-color-${tag_colors.normal.bg}`"
           :states="{
               act: {
                   style: `line thick-1 line-${tag_colors.act.line} bg-color-${tag_colors.act.bg} color-${tag_colors.act.text}`,
                   state: selected
               }
           }"
           :hover="`line thick-1 line-${tag_colors.hover.line} bg-color-${tag_colors.hover.bg} color-${tag_colors.hover.text}`">
        <b-text styles="scale-.9"
                :states="{
                    act: {
                        style: 'scale-1',
                        state: selected
                    }
                }"
                v-html="tag_text" />
    </b-hot>
</template>

<script>
    import BHot from "@/components/BTXUI/core/b-hot"
    import BText from "@/components/BTXUI/core/b-text"

    let desc = ["该组件用于进行标签选择，分为 “单选” 和 “复选” 两种方式。“单选（once）” 仅限一次性点击，不可通过点击撤回；“复选（toggle）” 则可以反复进行点击切换。"],
        extend = [],
        dependent = ["b-hot"],
        api = {
            event: [
                {
                    name: "on_click",
                    ef: "点击触发",
                    params: "id, selected, event"
                },
                {
                    name: "on_enter",
                    ef: "鼠标移入或手指按下（悬停）",
                    params: "event"
                },
                {
                    name: "on_leave",
                    ef: "鼠标移出或手指抬起",
                    params: "event"
                },
                {
                    name: "on_move",
                    ef: "鼠标移动",
                    params: "event"
                }
            ]
        },
        init_data = `{
        id: "标签 id",
        text: "标签未选中状态文字（支持富文本）",
        selected: "（v-model）选中状态",
        /* actText: "标签选中状态文字（支持富文本）" */,
        /* colors: {
            normal: {
                text: "默认文字色样式色值",
                bg: "默认背景色样式色值",
                line: "默认边框色样式色值",
            },
            act: {
                text: "激活文字色样式色值",
                bg: "激活背景色样式色值",
                line: "激活边框色样式色值",
            },
            hover: {
                text: "悬停文字色样式色值",
                bg: "悬停背景色样式色值",
                line: "悬停边框色样式色值",
            },
        } */,
        /* mode: "选择模式（默认"radio"：单选、"checkbox"：复选）" */,
    }`;

    export default {
        name: "tag-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BHot,
            BText
        },
        model:{
            prop: "selected",
            event: "on_select"
        },
        props: {
            id: {
                type: [String, Number],
                required: true
            },
            text: {
                type: String,
                required: true
            },
            selected: {
                type: [Boolean, Number],
                required: false
            },
            actText: {
                type: String,
                required: false
            },
            colors: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        normal:{},
                        hover:{},
                        act:{},
                    }
                }
            },
            mode: {
                type: String,
                required: false,
                default: "radio"
            }
        },
        data(){
            return {

                //色彩方案
                tag_colors: {
                    normal: {
                        text: "dgray",
                        bg: "light",
                        line: "none",
                        ...this.colors.normal
                    },
                    hover: {
                        text: "blue",
                        bg: "light",
                        line: "none",
                        ...this.colors.hover
                    },
                    act: {
                        text: "light",
                        bg: "blue",
                        line: "none",
                        ...this.colors.act
                    },
                },

                //参数类型
                data_type: typeof(this.selected)

            }
        },
        computed: {

            //标签文字
            tag_text(){
                return this.selected? (this.actText? this.actText: this.text): this.text;
            }

        },
        methods: {

            //点击事件
            $_click(e){
                let state;
                e.stopPropagation();
                if(this.mode === "checkbox"){ //复选
                    state = !this.selected;
                }else if(this.mode === "radio"){ //单选
                    if(this.selected === true) return;
                    state = true;
                }
                if(this.data_type === "number") state = state? 1: 0;
                this.$emit("on_select", state);
                this.$emit("on_click", this.id, state, e);
            }

        }
    }
</script>