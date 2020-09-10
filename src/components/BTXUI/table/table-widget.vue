<template>
    <b-view :styles="`line thick-1 pleft round-sm no-scroll line-${colors.outline}`">
        <!--表头-->
        <b-view :styles="`flex bold bg-color-${colors.thead}`">

            <!--复选表头单元格-->
            <b-view :styles="`flex-4 alpha-0 trans-fast w-0 thick-1 line-r line-${colors.line}`"
                    :states="{
                        show: {
                            style: 'alpha-1 w-10 pad-l-1',
                            state: checkbox_td_state
                        }
                    }">
                <checkbox-widget id="selectAll" text="All" v-model="select_all_state" />
            </b-view>

            <b-view v-for="(th, n) of thead" :key="n"
                    :styles="`pad-.7 thick-1 ${n>0? 'line-l': ''} line-${colors.line} ${$_set_td_width(thead[n])}`"
                    v-html="th.title">
            </b-view>
        </b-view>

        <!--表身-->
        <component v-for="(tr, i) of tbody" :key="i" :is="hover_tr_color? 'b-hot': 'b-view'"
                   :styles="`flex line-t thick-1 line-${colors.line} bg-color-${i%2? colors.row.even: colors.row.odd}`"
                   :hover="hover_tr_color? 'bg-color-' + hover_tr_color: ''"
                   @on_click="$_click(i)">

            <!--复选表身单元格-->
            <b-view :styles="`flex-4 alpha-0 trans-fast w-0 thick-1 line-r line-${colors.line}`"
                    :states="{
                        show: {
                            style: 'alpha-1 w-10 pad-l-1.4',
                            state: checkbox_td_state
                        }
                    }">
                <checkbox-widget :id="i" v-model="tbody_data[i]" />
            </b-view>

            <b-view v-for="(data, k) of tr" :key="k"
                    :styles="`flex-4 pad-h-.7 pad-v-.4 thick-1 ${k>0? 'line-l': ''} line-${colors.line} ${k==0? 'bg-color-' + colors.row.head: ''} ${$_set_td_width(thead[k])}`" >

                <!--单元格按钮-->
                <btn-widget v-if="data.btn_data" v-bind="data.btn_data" @on_click="data.callback" />

                <!--单元格图片-->
                <b-img v-else-if="data.src" :img="data.src"
                       :styles="`round-sm w-${data.width || 'auto'} h-${data.height || 'auto'}`" />

                <!--单元格文本-->
                <b-text v-else v-html="data"></b-text>

            </b-view>
        </component>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BImg from "@/components/BTXUI/core/b-img"
    import BText from "@/components/BTXUI/core/b-text"
    import BHot from "@/components/BTXUI/core/b-hot"
    import BtnWidget from "@/components/BTXUI/btn/btn-widget"
    import CheckboxWidget from "@/components/BTXUI/checkbox/checkbox-widget"

    const desc = ["该组件用于显示表格数据。"],
        extend = [],
        dependent = ["checkbox-widget", "btn-widget", "b-img", "b-hot", "b-text", "b-view"],
        api = {
            event: [
                {
                    name: "on_click",
                    ef: "单元行点击触发",
                    params: "row_index"
                },
                {
                    name: "on_select",
                    ef: "单元格复选框勾选触发",
                    params: "selected_rows"
                }
            ],
            methods: [
                {
                    name: "enable_row_select",
                    ef: "开启单元行选择模式",
                    params: "-",
                    return: "-"
                },
                {
                    name: "disable_row_select",
                    ef: "关闭单元行选择模式",
                    params: "-",
                    return: "-"
                },
                {
                    name: "enable_row_click",
                    ef: "开启单元行点击模式",
                    params: "-",
                    return: "-"
                },
                {
                    name: "disable_row_click",
                    ef: "关闭单元行点击模式",
                    params: "-",
                    return: "-"
                }
            ]
        },
        init_data = `{
        thead: "[
            {
                title: "标题文本"
                grow: "自生长比率，默认为 1",
                width: "单元格宽度，可缺省，效果优先级大于 grow"
            },...
        ]",
        tbody: "[
            [ "对应表头标题数据" | {
                btn_data: "(参照：btn-widget 组件入参)",
                callback: "点击回调函数"
            } | {
                src: "图片地址",
                width: "图片宽度，可缺省",
                height: "图片高度，可缺省"
            },... ],...
        ]",
        /* colors: {
            thead: "标题背景色",
            row: {
                head: "行首色",
                odd: "奇数行色",
                even: "偶数行色",
                hover: "行悬停色，默认无效果"
            },
            line: "表格描边色",
            outline: "表格轮廓色"
        } */
    }`;

    export default {
        name: "table-widget",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BImg,
            BHot,
            BText,
            BtnWidget,
            CheckboxWidget
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
                            hover: ""
                        },
                        line: "none",
                        outline: "none"
                    }
                }
            }
        },
        data(){
            return {

                //单元行悬停颜色
                hover_tr_color: this.colors.row.hover,

                //复选框单元格显示状态
                checkbox_td_state: false,

                //表身数据
                tbody_data: this.tbody.map(()=>{
                    return false;
                }),

                //全选状态
                select_all_state: false

            }
        },
        watch: {

            //监测表格数据
            tbody(val){
                this.tbody_data = val.map(()=>{
                    return false;
                })
            },

            //监测单元行选择
            tbody_data(val){
                this.$emit("on_select", val.reduce((total, select, i)=>{
                    select && total.push(i);
                    return total;
                }, []));
            },

            //监测全选
            select_all_state(state){
                let select = state? true: false;
                this.tbody_data = this.tbody_data.map(()=>{
                    return select;
                })
            }

        },
        methods: {

            //开启单元行选择模式
            enable_row_select(){
                this.checkbox_td_state = true;
            },

            //关闭单元行选择模式
            disable_row_select(){
                this.checkbox_td_state = false;
            },

            //开启单元行点击模式
            enable_row_click(){
                this.hover_tr_color = this.colors.row.hover;
            },

            //关闭单元行点击模式
            disable_row_click(){
                this.hover_tr_color = "";
            },

            //处理单元行标题文本
            $_format_tr_title(text){
                return text.split("").join("<br>");
            },

            //单元行点击效果
            $_click(index){
                this.$emit("on_click", index);
            },

            //设置单元格宽度样式
            $_set_td_width(item){
                return item.width? `w-${item.width}`: `grow-${item.grow || 1}`
            }

        }
    }
</script>