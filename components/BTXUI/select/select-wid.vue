<template>
    <b-view styles="rel color-rgba(70,70,70,.2) z2">
        <!--热点区-->
        <b-hot styles="flex-4 round-lg line thick-1 pad-v-.5 pad-h-1.4" @on_click="$_toggle_options">
            <b-text v-if="selected_text" :styles="`grow-1 color-${option_color.text}`" key="val">
                {{selected_text}}
            </b-text>
            <b-text v-else :styles="`alpha-.7 grow-1 color-${option_color.text}`" key="notic">
                {{placeholder}}
            </b-text>
            <b-icon icon="arrow-right"
                    styles="trans-fast color-#aaa"
                    :states="{
                        spread: {
                            state: spread,
                            style: 'rotate-90'
                        }
                    }" />
        </b-hot>

        <!--下拉区-->
        <b-view :styles="`abs transform-translateY(f1.5rem) alpha-0 round-sm mrg-t-1 shadow-lg max-w no-scroll bg-color-${option_color.normal.bg}`"
            :states="{
                spread: {
                    state: spread,
                    style: 'trans-fast alpha-1 transform-translateY(0)'
                }
            }">
            <b-list :styles="`color-${option_color.normal.text} h-${rows? Math.min(rows, listData.length) * 2.7: 'auto'}`">
                <b-hot v-for="(item,index) of listData" :key="index"
                       @on_click="$_select(item.val)"
                       styles="flex pad-h-1"
                       :states="{
                            selected: {
                                state: selected === item.val,
                                style: `color-${option_color.act.text} bg-color-${option_color.act.bg}`
                            }
                        }"
                       :hover="`color-${option_color.hover.text} bg-color-${option_color.hover.bg}`">
                    <b-view :styles="`flex-4 grow-1 h-2.7 ${index>0? 'line-t thick-1 line-neutral': ''}`">
                        <b-text styles="bold mrg-r-1">·</b-text>
                        <b-text>{{item.text}}</b-text>
                    </b-view>
                </b-hot>
            </b-list>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BText from "@/components/BTXUI/core/b-text";
    import BHot from "@/components/BTXUI/core/b-hot";
    import BIcon from "@/components/BTXUI/core/b-icon";
    import BList from "@/components/BTXUI/core/b-list";

    const desc = ["该组件用于实现表单项的下拉选择。"],
        extend = [],
        dependent = ["b-list", "b-icon", "b-text", "b-hot", "b-view"],
        api = null,
        init_data = `{
        listData: [
            {
                text: "文本显示",
                val: "实际传值",
            }...
        ],
        /* selected: "（model）所选数据值" */,
        /* placeholder: "选择提示" */,
        /* rows: "显示" */,
        /* colors: {
            text: "显示所选文字颜色",
            normal: {
                text: "默认文字色",
                bg: "默认背景色"
            },
            hover: {
                text: "悬停文字色",
                bg: "悬停背景色"
            },
            act: {
                text: "激活文字色",
                bg: "激活背景色"
            }
        } */,
    }`;

    export default {
        name: "select-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText,
            BHot,
            BIcon,
            BList
        },
        model: {
            prop: "selected",
            event: "on_select"
        },
        props: {
            listData: {
                type: Array,
                required: true
            },
            selected: {
                type: String,
                required: false
            },
            placeholder: {
                type: String,
                required: false
            },
            rows: {
                type: Number,
                required: false
            },
            colors: {
                type: Object,
                required: false
            }
        },
        computed: {

            //所选项文字
            selected_text(){
                let selected = this.listData.find(item=>{
                    return item.val === this.selected
                });
                if(selected) return selected.text;
            }

        },
        data() {
            return {

                //展开状态
                spread: false,

                //下拉项颜色
                option_color: {
                    text: "dgray",
                    normal: {
                        text: "mgray",
                        bg: "light"
                    },
                    hover: {
                        text: "dgray",
                        bg: "#f4f4f4"
                    },
                    act: {
                        text: "blue",
                        bg: "light"
                    },
                    ...this.colors
                }

            };
        },
        methods: {

            //切换面板显示
            $_toggle_options() {
                this[(this.spread ? "hide" : "show") + "_options"]();
            },

            //显示切换面板
            show_options() {
                this.spread = true;
            },

            //隐藏切换面板
            hide_options() {
                this.spread = false;
            },

            //下拉选择
            $_select(data) {
                this.hide_options();
                this.$emit("on_select", data);
            },

        }
    };
</script>