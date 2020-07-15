<template>
    <ul class="content-node-widget"
        :selected="dataNode.selected"
        :spread="spread"
        :spread-fixed="dataNode.spread_fixed"
        :id="dataNode.id"
        @click="$_click"
    >
        <li class="cn-w-node-title flex-4 pad-v-d5 pad-h-1 mrg-r-d5 mrg-b-d5 round-sm"
            :data-id="dataNode.id"
            :data-tooltip="dataNode.tooltip"
            :data-flag="dataNode.flag"
            :class="has_children? 'cn-w-node-arrow': ''"
        >
            <span class="cn-w-radio flex-5" radio v-if="dataNode.checkbox"></span>
            <span v-html="dataNode.text"></span>
        </li>
        <li class="grid pad-l-4" v-if="has_children" v-show="spread">
            <!--组件递归-->
            <zk2861-content-node-widget v-for="child_data of dataNode.children"
                                 :key="child_data.id"
                                 :data-node="child_data"
                                 :select-filter="selectFilter"
                                 @on_select="$_send_select" />
        </li>
    </ul>
</template>

<script>
    import ContentNodeWidget from "@/components/BTXUI/content-node-widget"
    import Zk2861ContentNodeWidget from "@/components/pro/zk2861/zk2861-content-node-widget"

    export default {
        extends: ContentNodeWidget,
        components: {
            Zk2861ContentNodeWidget
        },
        name: "zk2861-content-node-widget"
    }
</script>

<style lang="scss" scoped>
    .content-node-widget{
        &>.cn-w-node-title{
            cursor: pointer;

            &:hover{
                color: #009af3;
            }
            .cn-w-radio{
                width: 1.5rem;
                height: 1.5rem;
                background-color: #ccc;
                border-radius: 4px;
                margin-right: .5rem;
            }

            &.cn-w-node-arrow::after{
                content: "\e607";
                font-family: "defaultICO";
                margin-left: 1.4rem;
                transition: transform .4s;
            }
        }

        //展开固定状态
        &[spread-fixed]>.cn-w-node-title{
            &.cn-w-node-arrow::after {
                content: "..";
                margin-left: 1rem;
            }
        }

        //展开状态
        &[spread]{
            &>.cn-w-node-title{
                &.cn-w-node-arrow::after{
                    transform: rotate(90deg);
                }
            }
        }

        //选中状态
        &[selected]{
            &>.cn-w-node-title{
                color: #009af3;
                background-color: #d1e6f7;

                .cn-w-radio{
                    text-align: center;
                    box-shadow: 0 0 7px rgba(0,154,243,.4);
                    background-color: #009af3;
                    color: #fff;

                    &::before{
                        content: "\e620";
                        font-family: "defaultICO";
                    }
                }
            }
        }
    }
</style>