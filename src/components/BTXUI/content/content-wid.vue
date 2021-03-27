<template>
    <b-view>
        <!--提示框组件-->
        <tooltip-wid ref="tooltip" v-bind="tooltipData" />

        <!--目录结构组件-->
        <content-node-wid :tree-data="tree_data"
                          @on_select="$_select"
                          @on_tooltip_show="$_show_tooltip"
                          @on_tooltip_move="$_move_tooltip"
                          @on_tooltip_hide="$_hide_tooltip" />
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import TooltipWid from "@/components/BTXUI/tooltip/tooltip-wid"
    import ContentNodeWid from "./content-node-wid"

    const desc = ["该组件用于处理树形结构数据的可视化及交互操作。"],
        extend = [],
        dependent = ["tooltip-wid", "content-node-wid", "b-view"],
        api = {
            methods: [
                {
                    name: "clear_selected",
                    ef: "清空所选数据",
                    params: "-",
                    return: "-"
                }
            ],
            event: [
                {
                    name: "on_select",
                    ef: "执行数据项点选",
                    params: "selected_data_id"
                }
            ]
        },
        init_data = `{
        dataTree: [
            {
                id: "数据标识",
                text: "数据标题",
                tooltip: "悬停提示文本（支持超文本），缺省无提示",
                checkbox: "是否显示复选框，缺省仅显示文字",
                selected: "是否选中，缺省不选中",
                children: "嵌套结构，可缺省",
                spread: "是否展开子级，缺省关闭",
                spread_fixed: "展开固定，禁止层级塌陷，缺省关闭",
            },...
        ],
        /* mode: "选择模式（默认"radio"：单选、"checkbox"：复选）" */,
        /* colors: "(参照：tag-wid 组件 colors 入参)" */,
        /* tooltipData: "(参照：tooltip-wid 组件入参)" */,
    }`;

    export default {
        name: "content-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            ContentNodeWid,
            TooltipWid
        },
        props: {
            dataTree: {
                required: true,
                type: Array
            },
            mode: {
                required: false,
                type: String,
                default: "radio"
            },
            colors: {
                required: false,
                type: Object,
                default: ()=>{
                    return {
                        normal: {
                            text: "dgray",
                            bg: "none",
                            line: "none",
                        },
                        act: {
                            text: "blue",
                            bg: "none",
                            line: "none",
                        },
                        hover: {
                            text: "blue",
                            bg: "none",
                            line: "none",
                        }
                    }
                }
            },
            tooltipData: {
                required: false,
                type: Object
            }
        },
        data(){
            return {

                //单选数据
                selected_data: "",

                //多选数据
                selected_datas: [],

                //树形数据（视图渲染）
                tree_data: [],

                //展开数据（多级关联选择）
                spread_data: [],

                //索引数据（操作数据）
                index_data: {}

            }
        },
        computed: {

            //悬浮提示框
            tooltip(){
                return this.$refs.tooltip;
            }

        },
        watch: {

        },
        methods: {

            //初始化数据
            $_init_data(){
                this.tree_data = this.$_gen_data(this.dataTree);
            },

            //构造数据
            $_gen_data(tree_data, id_prefix=""){
                return tree_data.map((data, i)=>{
                    let {id, text, tooltip, checkbox, children, selected, spread, spread_fixed} = data,
                        mode = this.mode,
                        colors = {...this.colors},
                        _id = id_prefix? `${id_prefix}_${i}`: i,
                        sub_data;

                    //初始化数据
                    if(selected){
                        if(mode === "checkbox" && checkbox){ //复选模式
                            this.selected_datas.push(id)
                        }else if(mode === "radio"){
                            this.selected_data = id;
                        }
                    }

                    //下级折叠处理
                    if(children){
                        colors.act = {
                            text: colors.normal.text,
                            bg: colors.normal.bg,
                            line: colors.normal.line
                        }
                        if(spread_fixed){ //强制展开
                            spread = true;
                            mode = "radio"
                        }else{
                            mode = "checkbox"
                        }
                    }

                    const tag_data = {
                        ...data,
                        mode,
                        colors
                    }, index_data = {
                        _id,
                        tag_data,
                        selected,
                    };
                    this.index_data[id] = index_data;
                    this.spread_data.push(index_data);

                    //下级递归数据处理
                    if(children) sub_data = this.$_gen_data(children, _id);

                    return {
                        index_data,
                        spread,
                        tooltip,
                        checkbox,
                        sub_data
                    }
                })
            },

            //执行选择
            $_select(id, state){
                if(this.mode === "radio"){ //单选数据
                    if(this.selected_data){
                        this.index_data[this.selected_data].selected = false;
                    }
                    this.selected_data = id;
                    this.$emit("on_select", this.selected_data);
                }else if(this.mode === "checkbox"){ //多选数据
                    if(state){ //添加
                        this.selected_datas.push(id);
                    }else{ //移除
                        this.selected_datas.splice(this.selected_datas.findIndex((val)=>{
                            return val === id;
                        }), 1);
                    }
                    this.$emit("on_select", this.selected_datas);
                }
            },

            //显示浮框
            $_show_tooltip(text){
                this.tooltip.show(text);
            },

            //移动浮框
            $_move_tooltip(e){
                this.tooltip.set_pos(e.pageX, e.pageY);
            },

            //隐藏浮框
            $_hide_tooltip(){
                this.tooltip.hide();
            },

        },
        mounted(){
            this.$_init_data();
        }
    }
</script>