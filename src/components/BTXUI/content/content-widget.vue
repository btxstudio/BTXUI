<template>
    <b-view>

        <!-- 提示框组件 -->
        <tooltip-widget ref="tooltip" class="data-center-pro" line-enable :offset="{x:40, y:-110}" />
        
        <b-view styles="mrg-b-1" v-if="title">{{title}}</b-view>
        <b-view styles="grow-1">
            <b-view styles="round-sm pad-r-d5" @mousemove="$_show_tooltip">

                <!--树形目录组件-->
                <content-node-widget v-for="data of dataTree"
                                     :key="data.id"
                                     :data-node="data"
                                     :select-filter="selectFilter"
                                     :radio-mode="radioMode"
                                     @on_select="$_select" />

            </b-view>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import TooltipWidget from "@/components/BTXUI/tooltip/tooltip-widget";
    import ContentNodeWidget from "./content-node-widget";

    export default {
        name: "content-widget",
        components: {
            BView,
            ContentNodeWidget,
            TooltipWidget
        },
        /*
        * init-data{
        *   data-tree: [
        *       {
        *           id: "数据标识" 【注：必须满足树形嵌套结构，即：dataID + 结构层级索引。exp：dataID_1_2_1_1】,
        *           text: "数据标题",
        *           [* children: ["同外层结构",...]],
        *           [* checkbox: "是否显示复选框"],
        *           [* spread: "是否展开子级（默认关闭）"],
        *           [* spread_fixed: "展开固定，禁止层级塌陷"],
        *           [* tooltip: "悬停提示文本（支持超文本）"],
        *           [* flag: "扩展标识符：key:value"],
        *           [* selected: "是否选中（默认未选中）"]
        *       },...
        *   ],
        *   [* title: "标题"],
        *   [* select-filter: "选择过滤回调函数，返回 true 执行勾选"],
        *   [* radio-mode: "是否启用单选模式（默认复选）"],
        * }
        * */
        props: {
            dataTree: {
                type: Array,
                required: true
            },
            title: {
                type: String,
                required: false
            },
            selectFilter: {
                type: Function,
                required: false,
                default: () => true
            },
            radioMode: {
                type: Boolean,
                required: false
            }
        },
        data(){
            return {

                //索引化展开数据
                indexed_data: {},

                //选取数据集合
                selected_collection: {},

                //单选当前数据项
                cur_selected: null

            }
        },
        computed: {

            //悬浮提示框
            tooltip(){
                return this.$refs.tooltip;
            }

        },
        watch: {
            dataTree(){
                this.$_init_data();
            }
        },
        methods: {

            //清空数据
            clear_selected(){
                for(let id in this.selected_collection){
                    this.$set(this.indexed_data[id], "selected", false);
                }
                this.selected_collection = {};
            },

            //初始化数据
            $_init_data(){
                this.$_indexed_data(this.dataTree);
            },

            //索引化数据
            $_indexed_data(data_tree){
                var reduce = data_tree.reduce((total, item)=>{
                    if(item.children){
                        this.$_indexed_data(item.children);
                    }
                    total[item.id.split("_")[0]] = item;
                    return total;
                }, {});
                this.indexed_data = {
                    ...this.indexed_data,
                    ...reduce
                }
            },

            //基于 node 显示提示信息
            $_show_tooltip(e){
                let tip = e.target.dataset.tooltip;
                if(tip){
                    this.tooltip.set_pos(e.pageX, e.pageY);
                    this.tooltip.show(tip);
                }else{
                    this.tooltip.hide();
                }
            },

            //选择操作
            $_select(data){
                //获取当前操作数据
                let cur_data_ids = data.key.split("_"),
                    data_k = cur_data_ids.shift(),
                    cur_data = { children: this.dataTree };
                cur_data_ids.forEach((index)=>{
                    cur_data = cur_data.children[index - 1]; //id 索引从 1 起则减 1，从 0 起则保持 index
                })

                this.radioMode? this.$_solo_select(data_k, data, cur_data): this.$_multi_select(data, cur_data);
                this.$emit("on_select", this.selected_collection);
            },

            //执行单选
            $_solo_select(data_k, data, cur_data){
                this.cur_selected && this.$set(this.cur_selected, "selected", false); //取消选择

                //添加选择
                this.cur_selected = cur_data;
                this.$set(cur_data, "selected", true);
                this.selected_collection = data;
            },

            //执行复选
            $_multi_select(data, cur_data){
                //生成勾选操作方式
                let oper_method = (()=>{
                    if(data.val){ //选中
                        return (cur_data, id, text)=>{
                            this.$set(cur_data, "selected", true);
                            this.selected_collection[id] = text;
                        }
                    }else{ //取消
                        return (cur_data, id)=>{
                            this.$set(cur_data, "selected", false);
                            delete this.selected_collection[id];
                        }
                    }
                })();

                //基于当前操作数据进行子级递归勾选
                this.$_oper_selet(cur_data, oper_method);
            },

            //执行递归勾选
            $_oper_selet(cur_data, oper_method){
                let children = cur_data.children;
                oper_method(cur_data, cur_data.id.split("_")[0], cur_data.text);
                if(children){
                    children.forEach((data)=>{
                        this.$_oper_selet(data, oper_method);
                    })
                }
            }

        },
        mounted(){
            this.$_init_data();
        }
    }
</script>