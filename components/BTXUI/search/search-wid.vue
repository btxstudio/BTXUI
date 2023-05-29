<template>
    <b-view :styles="`flex-4 round-lg pad-v-.7 pad-h-1.4 bg-color-${colors.bg} color-${colors.text} ${colors.line? 'thick-1 line line-' + colors.line: ''}`">
        <b-icon v-if="icon === 'left'" icon="sousuo" styles="mrg-r-1 scale-1.7" />
        <b-input type="text" name="keyword" :placeholder="notic" focus="bg-color-none" v-model="search_text" />
        <b-icon v-if="icon === 'right'" icon="sousuo" styles="mrg-l-1 scale-1.7" />
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BIcon from "@/components/BTXUI/core/b-icon"
    import BInput from "@/components/BTXUI/core/b-input"

    const desc = ["该组件用于搜索栏构建及操作。"],
        extend = [],
        dependent = ["b-input", "b-icon", "b-view"],
        api = {
            event: [
                {
                    name: "on_search",
                    ef: "搜索字符串",
                    params: "search_text"
                }
            ]
        },
        init_data = `{
        /* notic: "提示文字" */,
        /* icon: "搜索图标显示：left（默认）、right、none" */,
        /* colors: {
            text: "常规状态文字颜色",
            bg: "常规状态背景颜色",
            line: "常规状态描边颜色"
        } */
    }`;

    export default {
        name: "search-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BInput,
            BIcon,
        },
        props: {
            notic: {
                type: String,
                required: false,
            },
            icon: {
                type: String,
                required: false,
                default: "left"
            },
            colors: {
                type: Object,
                required: false,
                default: ()=>{
                    return {
                        text: "dgray",
                        bg: "neutral",
                        line: "neutral"
                    }
                }
            }
        },
        data(){
            return {

                //搜索内容
                search_text: ""

            }
        },
        watch: {
            search_text(val){
                this.$emit("on_search", val);
            }
        }
    }
</script>