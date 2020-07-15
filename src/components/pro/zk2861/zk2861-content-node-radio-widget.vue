<template>
    <ul class="content-node-widget"
        :selected="dataNode.selected"
        :spread="spread"
        :spread-fixed="dataNode.spread_fixed"
        :forbid="dataNode.flag.vcode === '' && dataNode.flag.type === 'v'"
        :id="dataNode.id"
        @click="$_click"
    >
        <li class="cn-w-node-title flex-4 pad-v-d5 pad-h-1 mrg-r-d5 mrg-b-d5 round-sm"
            :data-id="dataNode.id"
            :data-tooltip="dataNode.tooltip"
            :data-flag="dataNode.flag"
            :class="{
                'bg-color-lgray': dataNode.checkbox,
                'cn-w-node-arrow': has_children
            }"
        >
            <span class="mrg-r-1" radio v-if="dataNode.checkbox">·</span>
            <span v-html="dataNode.text"></span>
        </li>
        <li class="grid pad-l-4" v-if="has_children" v-show="spread">
            <!--组件递归-->
            <zk2861-content-node-radio-widget v-for="child_data of dataNode.children"
                                        :key="child_data.id"
                                        :data-node="child_data"
                                        :radio-mode="radioMode"
                                        :select-filter="selectFilter"
                                        @on_select="$_send_select" />
        </li>
    </ul>
</template>

<script>
    import ContentNodeWidget from "@/components/BTXUI/content-node-widget"
    import Zk2861ContentNodeRadioWidget from "@/components/pro/zk2861/zk2861-content-node-radio-widget"

    export default {
        extends: ContentNodeWidget,
        components: {
            Zk2861ContentNodeRadioWidget
        },
        name: "zk2861-content-node-radio-widget"
    }
</script>

<style lang="scss" scoped>
    .content-node-widget{
        &>.cn-w-node-title{
            cursor: pointer;

            &:hover{
                color: #009af3;
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
                color: #fff;
                background-color: #009af3;
            }
        }

        //禁用状态
        &[forbid]{
            &>.cn-w-node-title{
                color: #999;
                background-color: #f8f8f8;
                border: 1px solid #eee;
            }
        }
    }
</style>