<!--19-12-10-->
<template>
    <ul class="content-node-widget"
        :class="{'cn-w-node-spread': spread, 'cn-w-node-selected': selected_state}"
        :id="dataNode.id"
        @click="$_click"
    >
        <li class="cn-w-node-title"
            :data-id="dataNode.id"
            :data-tooltip="dataNode.tooltip"
            :data-flag="dataNode.flag"
            :class="has_children? 'cn-w-node-arrow': ''"
        >
            <span class="cn-w-radio" v-if="dataNode.checkbox"></span>
            <span :class="{'fsize-1d1': has_children}" v-html="dataNode.text"></span>
        </li>
        <li class="cn-w-node" v-if="has_children" v-show="spread">

            <!--组件递归-->
            <content-node-widget v-for="child_data of dataNode.children"
                                 :key="child_data.id"
                                 :data-node="child_data"
                                 @on_select="$_send_select" />

        </li>
    </ul>
</template>

<script>
    import contentNodeWidget from "@/components/content-node-widget";

    export default {
        name: "content-node-widget",
        /*
        * init-data{
        *   data-node: {
        *       id: "数据标识",
        *       text: "数据标题",
        *       [* children: ["同外层结构",...]],
        *       [* checkbox: "是否显示复选框"],
        *       [* spread: "是否展开子级（默认关闭）"],
        *       [* tooltip: "悬停提示文本（支持超文本）"],
        *       [* flag: "扩展标识符：key:value"],
        *       [* selected: "是否选中（默认未选中）"]
        *   },...
        * }
        * */
        props: {
            dataNode: {
                type: Object,
                required: true
            }
        },
        data(){
            return {

                //节点折叠状态
                spread: this.dataNode.spread,

                //选中状态
                selected_state: this.dataNode.selected

            }
        },
        computed: {

            //返回该节点是否含有下级
            has_children(){
                let children = this.dataNode.children;
                return (children && children.length > 0)? true: false;
            }

        },
        watch: {

            //监听节点勾选状态
            "dataNode.selected"(select){
                this.selected_state = select;
            }

        },
        methods: {

            //点击效果
            $_click(e){
                e.stopPropagation();
                if(e.target.className === "cn-w-radio"){ //直接点击 radio 执行选中
                    this.$_select();
                }else if(this.has_children){ //折叠子级
                    this.spread = !this.spread;
                }else { //执行选中
                    this.$_select();
                }

            },

            //执行选中
            $_select(){
                this.selected_state = !this.selected_state;
                let select_data = {
                    key: this.dataNode.id
                };
                select_data.val = this.selected_state? this.dataNode.text: null
                this.$emit("on_select", select_data);
            },

            //递归透传选中数据
            $_send_select(select_data){
                this.$emit("on_select", select_data);
            }

        },
        components: { contentNodeWidget }
    }
</script>

<style lang="scss" scoped>
    .content-node-widget{
        margin-bottom: .4rem;
        text-align: left;

        &>.cn-w-node-title{
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: .5rem 0;
            opacity: .64;

            &:hover{
                opacity: 1;
            }
            .cn-w-radio{
                width: 2rem;
                height: 2rem;
                background-color: rgba(110,110,110,.3);
                border-radius: 4px;
                margin-right: 2rem;
            }

            &.cn-w-node-arrow::after{
                content: "\e607";
                font-family: "defaultICO";
                margin-left: 1.4rem;
                transition: transform .4s;
            }
        }
        .cn-w-node{
            padding: .5rem .5rem .5rem 3rem;
        }

        //折叠状态
        &.cn-w-node-spread{
            &>.cn-w-node-title{
                &.cn-w-node-arrow::after{
                    transform: rotate(90deg);
                }
            }
        }

        //选中状态
        &.cn-w-node-selected{
            &>.cn-w-node-title{
                opacity: 1;

                .cn-w-radio{
                    text-align: center;
                    font-size: 1.1em;
                    background-color: rgba(110,110,110,.7);

                    &::before{
                        content: "\e620";
                        font-family: "defaultICO";
                    }
                }
            }
        }
    }
</style>