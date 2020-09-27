<template>
    <b-hot @on_click="$_click"
           :styles="`pad-h-1.4 pad-v-.4 round-sm mrg-r-.4 color-${tag_colors.normal.text} bg-color-${tag_colors.normal.bg}`"
           :states="{
               act: {
                   style: `bg-color-${tag_colors.act.bg} color-${tag_colors.act.text}`,
                   state: selected
               }
           }"
           :hover="`bg-color-${tag_colors.hover.bg} color-${tag_colors.hover.text}`">
        <b-text styles="scale-.9"
                :states="{
                    act: {
                        style: 'scale-1',
                        state: selected
                    }
                }">
            {{tag_text}}
        </b-text>
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
                    params: "id, selected"
                }
            ]
        },
        init_data = `{
        id: "标签 id",
        text: "标签未选中状态文字",
        /* selected: "（v-model）选中状态" */,
        /* actText: "标签选中状态文字" */,
        /* colors: {
            normal: {
                text: "默认文字色样式色值",
                bg: "默认背景色样式色值",
            },
            act: {
                text: "激活文字色样式色值",
                bg: "激活背景色样式色值",
            },
            hover: {
                text: "悬停文字色样式色值",
                bg: "悬停背景色样式色值",
            },
        } */,
        /* mode: "选择模式（默认"radio"：单选、"checkbox"：复选）" */,
    }`;

    export default {
        name: "tag-widget",
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
            },
        },
        data(){
            return {

                //色彩方案
                tag_colors: {
                    normal: {
                        text: "dgray",
                        bg: "light",
                        ...this.colors.normal
                    },
                    hover: {
                        text: "blue",
                        bg: "light",
                        ...this.colors.hover
                    },
                    act: {
                        text: "light",
                        bg: "blue",
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
            $_click(){
                let state;
                if(this.mode === "checkbox"){ //复选
                    state = !this.selected;
                }else if(this.mode === "radio"){ //单选
                    if(this.selected === true) return;
                    state = true;
                }
                if(this.data_type === "number") state = state? 1: 0;
                this.$emit("on_select", state);
                this.$emit("on_click", this.id, state);
            }

        }
    }
</script>