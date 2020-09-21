<template>
    <b-view>
        <!--标题-->
        <b-hot styles="flex-between pad-v-1 pad-h-1.5 round-sm round-t" @on_click="$_toggle">
            <b-view>
                <b-icon v-if="iconData" v-bind="iconData" styles="mrg-r-1" />
                <b-view v-html="title"></b-view>
            </b-view>
            <b-icon icon="arrow-right"
                    styles="mrg-l-1.5 trans-fast alpha-.6"
                    :states="{
                        spread: {
                            style: 'rotate-90',
                            state: spread
                        }
                    }" />
        </b-hot>

        <!--内容-->
        <b-view styles="no-scroll h-0 trans-fast" ref="cont"
                :states="{
                    spread: {
                        style: `h-${cont_h}`,
                        state: spread
                    }
                }">
            <slot />
        </b-view>
    </b-view>
</template>

<script>
    import BHot from "@/components/BTXUI/core/b-hot"
    import BIcon from "@/components/BTXUI/core/b-icon"
    import BView from "@/components/BTXUI/core/b-view"

    const desc = ["该组件用于实现内容的展开与收起。"],
        extend = [],
        dependent = ["b-view", "b-icon", "b-hot"],
        api = null,
        init_data = `{
        title: "组件标题，支持富文本",
        /* iconData: "(参照：b-icon 组件入参)" */
    }`;

    export default {
        name: "drawer-widget",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BHot,
            BIcon,
            BView
        },
        props: {
            title: {
                type: String,
                required: true,
            },
            iconData: {
                type: Object,
                required: false
            }
        },
        data(){
            return {

                //展开状态
                spread: false,

                //内容区域
                $cont: null,

                //从容区高度
                cont_h: "0",

            }
        },
        watch: {
            "$cont.scrollHeight"(){
                this.$_set_height();
            }
        },
        methods: {

            //切换展开与收起
            $_toggle(){
                this.spread = !this.spread;
            },

            //设置容器高度
            $_set_height(){
                this.cont_h = `${this.$cont.scrollHeight}px`;
                console.log(this.cont_h)
            }

        },
        mounted(){
            this.$cont = this.$refs.cont.$el;
            this.$_set_height();
        }
    }
</script>