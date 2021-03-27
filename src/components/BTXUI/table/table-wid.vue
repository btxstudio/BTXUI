<template>
    <b-view :styles="`line thick-1 pleft round-sm no-scroll line-${colors.outline}`">
        <!--表头-->
        <b-view :styles="`flex-4 bold bg-color-${colors.thead}`">

            <!--复选表头单元格-->
            <b-view :styles="`flex-4 alpha-0 trans-fast w-0 thick-1 line-r line-${colors.line}`"
                    :states="{
                        show: {
                            style: 'alpha-1 w-10 pad-l-1',
                            state: checkbox_td_state
                        }
                    }">
                <checkbox-wid id="selectAll" text="All" v-model="select_all_state" />
            </b-view>

            <b-view v-for="(th, n) of thead" :key="n"
                    :styles="`pad-.7 thick-1 ${n>0? 'line-l': ''} line-${colors.line} ${$_set_td_width(thead[n])}`"
                    v-html="th.title">
            </b-view>
        </b-view>

        <!--表身-->
        <component v-for="(tr, i) of tbody.slice(0, show_rows)"
                   :key="i"
                   :is="hover_tr_color? 'b-hot': 'b-view'"
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
                <checkbox-wid :id="i" v-model="tbody_data[i]" />
            </b-view>

            <b-view v-for="(data, k) of tr"
                    :key="k"
                    :styles="`flex-4 pad-h-.7 pad-v-.4 thick-1 ${k>0? 'line-l': ''} line-${colors.line} ${k==0? 'bg-color-' + colors.row.head: ''} ${$_set_td_width(thead[k])}`" >

                <!--单元格标签按钮-->
                <tag-wid v-if="data.tag_data" :id="i" v-bind="data.tag_data" v-model="data.selected" @on_click="data.callback" />

                <!--单元格图片-->
                <b-img v-else-if="data.src"
                       :key="`${i}-${k}-${Math.random() * 1000}`"
                       :img="data.src"
                       :defaultSrc="data.default_src"
                       :styles="`round-sm w-${data.width || 'auto'} h-${data.height || 'auto'}`" />

                <!--单元格文本-->
                <b-text v-else v-html="data"></b-text>

            </b-view>
        </component>

        <!--折叠按钮-->
        <b-view v-if="collapse" styles="flex-2 pad-v-2">
            <tag-wid v-bind="toggle_tag.data" v-model="toggle_tag.selected" />
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BImg from "@/components/BTXUI/core/b-img"
    import BText from "@/components/BTXUI/core/b-text"
    import BHot from "@/components/BTXUI/core/b-hot"
    import TagWid from "@/components/BTXUI/tag/tag-wid"
    import CheckboxWid from "@/components/BTXUI/checkbox/checkbox-wid"

    const desc = ["该组件用于显示表格数据。"],
        extend = [],
        dependent = ["checkbox-wid", "tag-wid", "b-img", "b-hot", "b-text", "b-view"],
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
                src: "图片地址",
                default_src: "缺省图片地址",
                width: "图片宽度，可缺省",
                height: "图片高度，可缺省"
            } | {
                tag_data: "(参照：tag-wid 组件入参，id 字段无效，自动设置为行索引)",
                selected: "默认选中状态"
                callback: "点击回调函数"
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
        } */,
        /* collapse: {
            rows: "折叠显示单元行数目",
            tag_data: "(参照：tag-wid 组件入参，id 字段无效，自动设置为随机数)"
        } */,
    }`;

    export default {
        name: "table-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BImg,
            BHot,
            BText,
            TagWid,
            CheckboxWid
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
            },
            collapse: {
                type: Object,
                required: false
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
                select_all_state: false,

                //折叠按钮
                toggle_tag: {
                    data: {
                        text: "展开表格",
                        actText: "收起表格",
                        colors: {
                            normal: {
                                bg: "rgba(170,170,170,.4)"
                            },
                            act: {
                                bg: "blue"
                            },
                            hover: {
                                bg: "neutral"
                            },
                        },
                        ...(this.collapse? this.collapse.tag_data: {}),
                        id: Math.floor(Math.random() * 1000),
                        mode: "checkbox",
                    },
                    selected: false
                }

            }
        },
        computed: {

            //表格显示单元行数
            show_rows(){
                if(!this.collapse) return this.tbody.length;
                return this.toggle_tag.selected? this.tbody.length: this.collapse.rows;
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
            },

            //数据验证
            $_check_data(){
                if(this.tbody[0]) this.thead.length !== this.tbody[0].length && console.warn("thead & tbody have different length!");
            }

        },
        watch: {

            //监测表格数据
            tbody(val){
                this.$_check_data();
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
        mounted(){
            this.$_check_data();
        }
    }
</script>