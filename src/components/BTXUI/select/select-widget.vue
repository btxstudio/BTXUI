<template>
    <b-view styles="rel color-rgba(70,70,70,.2) z2">
        <!--热点区-->
        <b-hot styles="flex-4 round-lg line thick-1 pad-v-.5 pad-h-1.4" @on_click="$_toggle_options">
            <b-text v-if="selected.text" styles="color-dgray grow-1" key="val">{{selected.text}}</b-text>
            <b-text v-else styles="color-#aaa grow-1" key="notic">{{placeholder}}</b-text>
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
        <b-view styles="abs transform-translateY(f1.5rem) alpha-0 bg-color-light round-sm mrg-t-1 shadow-lg max-w no-scroll"
            :states="{
                spread: {
                    state: spread,
                    style: 'trans-fast alpha-1 transform-translateY(0)'
                }
            }">
            <b-list :styles="`color-mgray h-${rows? Math.min(rows, listData.length) * 2.7: 'auto'}`">
                <b-hot v-for="(item,index) of listData" :key="index"
                       @on_click="$_select(item.val + ':' + item.text)"
                       styles="flex pad-h-1"
                       :states="{
                            selected: {
                                state: selected.val === item.val,
                                style: 'color-blue'
                            }
                        }"
                       hover="bg-color-#f4f4f4 color-dgray">
                    <b-view :styles="`flex-4 grow-1 h-2.7 ${index>0? 'line-t thick-1 line-#f4f4f4': ''}`">
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
        /* selected: "（model）{
            val: "所选数据值",
            text: "所选数据文字"
        }" */,
        /* placeholder: "选择提示" */,
        /* rows: "显示" */,
    }`;

    export default {
        name: "select-widget",
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
                type: Object,
                required: false,
                default: ()=>{
                    return {}
                }
            },
            placeholder: {
                type: String,
                required: false
            },
            rows: {
                type: Number,
                required: false
            }
        },
        data() {
            return {

                //展开状态
                spread: false,

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
                let data_arr = data.split(":");
                this.hide_options();
                this.$emit("on_select", {
                    val: data_arr[0],
                    text: data_arr[1]
                });
            },

        }
    };
</script>