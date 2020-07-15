<template>
    <b-view>
        <b-view styles="flex-4 pad-v-.5"
            :data-id="dataNode.id"
            :data-tooltip="dataNode.tooltip"
            :data-flag="dataNode.flag" >

            <!--选框-->
            <b-hot v-if="dataNode.checkbox"
                   styles="w-2 h-2 bg-color-neutral round-sm mrg-r-2 flex-5"
                   :states="{
                        selected: {
                            style: 'bg-color-blue shadow-sm color-blue',
                            state: dataNode.selected
                        }
                    }"
                   @on_click="$_select">
                <b-icon v-show="dataNode.selected" styles="color-light" icon="success" />
            </b-hot>

            <!--文字-->
            <b-hot v-html="dataNode.text"
                   hover="color-blue"
                   :states="{
                        selected: {
                            style: 'color-blue',
                            state: dataNode.selected
                        }
                    }"
                   @on_click="$_text_click" />

            <!--下级冒号-->
            <b-text v-if="has_children && dataNode.spread_fixed" styles="mrg-l-1">:</b-text>

            <!--下拉箭头-->
            <b-icon v-else-if="has_children"
                    icon="arrow-right"
                    styles="mrg-l-1.5 trans-fast alpha-.6"
                    :states="{
                        spread: {
                            style: 'rotate-90',
                            state: spread
                        }
                    }" />
        </b-view>
        <b-view v-if="has_children" styles="pad-.5 pad-l-3" v-show="spread">

            <!--组件递归-->
            <content-node-widget v-for="child_data of dataNode.children"
                                 :key="child_data.id"
                                 :data-node="child_data"
                                 :select-filter="selectFilter"
                                 :radio-mode="radioMode"
                                 @on_select="$_send_select" />

        </b-view>
    </b-view>
</template>

<script>
    import contentNodeWidget from "@/components/BTXUI/content-node-widget";
    import BView from "@/components/BTXUI/core/b-view";
    import BText from "@/components/BTXUI/core/b-text";
    import BIcon from "@/components/BTXUI/core/b-icon";
    import BHot from "@/components/BTXUI/core/b-hot";

    export default {
        name: "content-node-widget",
        components: {
            BHot,
            BView,
            BIcon,
            BText,
            contentNodeWidget
        },
        /*
        * init-data{
        *   data-node: {
        *       id: "数据标识",
        *       text: "数据标题",
        *       [* children: ["同外层结构",...]],
        *       [* checkbox: "是否显示复选框"],
        *       [* spread: "是否展开子级（默认关闭），fixed: 展开固定"],
        *       [* spread_fixed: "展开固定，禁止层级塌陷"],
        *       [* tooltip: "悬停提示文本（支持超文本）"],
        *       [* flag: "扩展标识符：key:value"],
        *       [* selected: "是否选中（默认未选中）"]
        *   },
        *   [* select-filter: "选择过滤回调函数，返回 true 执行勾选"],
        *   [* radio-mode: "是否启用单选模式（默认复选）"],
        * }
        * */
        props: {
            dataNode: {
                type: Object,
                required: true
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

                //节点折叠状态
                spread: this.dataNode.spread_fixed || this.dataNode.spread,

            }
        },
        computed: {

            //返回该节点是否含有下级
            has_children(){
                return this.dataNode.children;
            }

        },
        methods: {

            //文字点击
            $_text_click(){
                if(this.has_children){ //折叠子级
                    if(!this.dataNode.spread_fixed) this.spread = !this.spread;
                }else { //执行选中
                    this.$_select();
                }
            },

            //执行选中
            $_select(){
                let select_data = {
                    key: this.dataNode.id,
                    extra: this.dataNode.flag
                };
                if(this.selectFilter(select_data)){
                    this[this.radioMode? "$_onece_select": "$_toggle_select"](select_data);
                }
            },

            //执行切换选择
            $_toggle_select(select_data){
                let new_selected = !this.dataNode.selected;
                this.$set(this.dataNode, "selected", new_selected);
                select_data.val = new_selected? this.dataNode.text: null;
                this.$emit("on_select", select_data);
            },

            //执行一次性选择
            $_onece_select(select_data){
                if(!this.dataNode.selected){
                    this.$set(this.dataNode, "selected", true);
                    select_data.val = this.dataNode.text;
                    this.$emit("on_select", select_data);
                }
            },

            //递归透传选中数据
            $_send_select(select_data){
                this.$emit("on_select", select_data);
            }

        }
    }
</script>