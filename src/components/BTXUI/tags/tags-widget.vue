<template>
    <b-view styles="flex">
        <b-hot v-for="item of tagList" :key="item.id"
               @on_click="$_click(item.id)"
               :styles="`pad-h-1.4 pad-v-.4 round-sm mrg-r-.4 color-${tag_colors.normal.text} bg-color-${tag_colors.normal.bg}`"
               :states="{
                   act: {
                       style: `bg-color-${tag_colors.act.bg} color-${tag_colors.act.text}`,
                       state:  value.indexOf(item.id) > -1
                   }
               }"
               :hover="`bg-color-${tag_colors.hover.bg} color-${tag_colors.hover.text}`">
            <b-text>
                {{item.text}}
            </b-text>
        </b-hot>
    </b-view>
</template>

<script>
    import BHot from "@/components/BTXUI/core/b-hot";
    import BView from "@/components/BTXUI/core/b-view";
    import BText from "@/components/BTXUI/core/b-text";

    let desc = ["该组件用于进行单选及复选操作。"],
        extend = [],
        dependent = ["b-hot", "b-text", "b-view"],
        api = null,
        init_data = `{
        value: "（v-model）当前 tag id 集合",
        tagList: "[
            {
                id: "数据标识",
                text: "数据标题",
            },...
        ]",
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
        /* mode: "勾选模式（默认"radio"：单选、"checkbox"：复选）" */,
    }`;

    export default {
        name: "tags-widget",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText,
            BHot
        },
        model:{
            prop: "value",
            event: "on_select"
        },
        props: {
            value: {
                type: Array,
                required: true
            },
            tagList: {
                type: Array,
                required: true
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
                }

            }
        },
        methods: {

            //点击事件
            $_click(id){
                if(this.mode === "checkbox"){ //多选
                    let index = this.value.indexOf(id);
                    index === -1? this.value.push(id): this.value.splice(index, 1);
                }else if(this.mode === "radio"){ //单选
                    this.$emit("on_select", [id]);
                }
            }

        }
    }
</script>