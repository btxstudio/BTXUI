<template>
    <div class="content-widget flex flex-column max-h">

        <!-- 提示框组件 -->
        <tooltip-widget ref="tooltip" class="data-center-pro" line-enable :offset="{x:40, y:-110}" />

        <div class="c-w-title" v-if="title">{{title}}</div>
        <div class="c-w-body flex-grow relative ani-left-slider-to-right">
            <div class="c-w-body-inner absolute max-h max-w auto-scroll" @mousemove="$_show_tooltip">

                <!--树形目录组件-->
                <content-node-widget v-for="data of dataTree"
                                     :key="data.id"
                                     :data-node="data"
                                     @on_select="$_select" />

            </div>
        </div>
    </div>
</template>

<script>
    import ContentNodeWidget from "@/components/content-node-widget";
    import TooltipWidget from "@/components/tooltip-widget";

    export default {
        name: "content-widget",
        /*
        * init-data{
        *   data-tree: [
        *       {
        *           id: "数据标识" 【注：必须满足树形嵌套结构，即：dataID + 结构层级索引。exp：dataID_1_2_1_1】,
        *           text: "数据标题",
        *           [* children: ["同外层结构",...]],
        *           [* checkbox: "是否显示复选框"],
        *           [* spread: "是否展开子级（默认关闭）"],
        *           [* tooltip: "悬停提示文本（支持超文本）"],
        *           [* flag: "扩展标识符：key:value"],
        *           [* selected: "是否选中（默认未选中）"]
        *       },...
        *   ]
        *   [title: "标题"],
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
        },
        data(){
            return {

                //选取数据集合
                selected_collection: {},

            }
        },
        computed: {

            //悬浮提示框
            tooltip(){
                return this.$refs.tooltip;
            }

        },
        methods: {

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
                    cur_data = { children: this.dataTree };
                cur_data_ids.shift();
                cur_data_ids.forEach((index)=>{
                    cur_data = cur_data.children[index - 1]; //id 索引从 1 起则减 1，从 0 起则保持 index
                })

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

                this.$emit("on_select", this.selected_collection);
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
        components: { ContentNodeWidget, TooltipWidget }
    }
</script>

<style lang="scss" scoped>
    .content-widget{
        overflow: hidden;

        .c-w-title{
            font-size: 1.3em;
            margin-bottom: 1rem;
        }
        .c-w-body{
            animation-delay: 2s;
            animation-fill-mode: backwards;

            .c-w-body-inner{
                border-radius: 7px;
                padding-right: .4rem;
            }
        }
    }
</style>