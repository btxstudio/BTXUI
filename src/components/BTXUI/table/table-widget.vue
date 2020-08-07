<template>
    <b-view :styles="`line thick-1 pleft round-sm no-scroll line-${colors.outline}`">
        <!--表头-->
        <b-view :styles="`flex bold bg-color-${colors.thead}`">
            <b-view v-for="(th, n) of thead" :key="n"
                    :styles="`pad-.7 thick-1 ${n>0? 'line-l': ''} line-${colors.line} grow-${thead[n].grow || 1}`"
                    v-html="th.title">
            </b-view>
        </b-view>

        <!--表身-->
        <b-view v-for="(tr, i) of tbody" :key="i"
                :styles="`flex line-t thick-1 line-${colors.line} bg-color-${i%2? colors.row.even: colors.row.odd}`">
            <b-view v-for="(data, k) of tr" :key="k"
                    :styles="`flex-4 pad-h-.7 pad-v-.4 thick-1 ${k>0? 'line-l': ''} line-${colors.line} grow-${thead[k].grow || 1} ${k==0? 'bg-color-' + colors.row.head: ''}`" >
                <!--单元格按钮-->
                <btn-widget v-if="data.btn_data" v-bind="data.btn_data" @on_click="data.callback" />

                <!--单元格文本-->
                <b-text v-else v-html="data"></b-text>

            </b-view>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BText from "@/components/BTXUI/core/b-text";
    import BtnWidget from "@/components/BTXUI/btn/btn-widget";

    const desc = ["该组件用于显示表格数据。"],
        extend = [],
        dependent = ["btn-widget", "b-text", "b-view"],
        api = null,
        init_data = `{
        thead: "[
            {
                title: "标题文本"
                grow: "自生长比率，默认为 1",
            },...
        ]",
        tbody: "[
            [ "对应表头标题数据" | {
                btn_data: "(参照：btn-widget 组件入参)",
                callback: "点击回调函数"
            },... ],...
        ]",
        /* colors: {
            thead: "标题背景色",
            row: {
                head: "行首色",
                odd: "奇数行色",
                even: "偶数行色",
            },
            line: "表格描边色",
            outline: "表格轮廓色"
        } */,
    }`;

    export default {
        name: "table-widget",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText,
            BtnWidget
        },
        props: {
            thead: {
                type: Array,
                required: true
            },
            tbody: {
                type: Array,
                required: true
            },
            colors: {
                type: Object,
                required: false,
                default: ()=>{
                    return {
                        thead: "none",
                        row: {
                            head: "none",
                            odd: "#f7f7f7",
                            even: "none",
                        },
                        line: "none",
                        outline: "none"
                    }
                }
            },
        },
        methods: {

            //处理单元行标题文本
            $_format_tr_title(text){
                return text.split("").join("<br>");
            }

        }
    }
</script>