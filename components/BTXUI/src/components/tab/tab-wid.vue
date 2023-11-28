<template>
    <b-view>
        <b-view styles="rel t-2px">
            <tags-wid v-bind="tags_data" v-model="cur_tab"/>
        </b-view>
        <b-view styles="rel">
            <slider-wid :pages="tags_data.tagList" ref="slider"
                        @on_flip="$_page_flip"
                        @on_load="$_init_page">
                <slot v-for="page of tags_data.tagList"
                      :slot="page.id"
                      :name="page.id" />
            </slider-wid>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BText from "@/components/BTXUI/core/b-text"
    import TagsWid from "@/components/BTXUI/tags/tags-wid"
    import SliderWid from "@/components/BTXUI/slider/slider-wid"

    let desc = ["该组件用于进行标签切换交互操作。"],
        extend = [],
        dependent = ["slider-wid", "tags-wid", "b-text", "b-view"],
        api = null,
        init_data = `{
        curTab: "（v-model）当前 tag id",
        tagsData: "(参照：tags-wid 组件入参，不含 mode 项)",
        /* smooth: "平滑切换，默认 false" */,
    }`;

    export default {
        name: "tab-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText,
            TagsWid,
            SliderWid
        },
        model:{
            prop: "curTab",
            event: "on_select"
        },
        props: {
            curTab: {
                type: String,
                required: true
            },
            tagsData: {
                type: Object,
                required: true
            },
            smooth: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data(){
            return {

                //当前所选标签
                cur_tab: [this.curTab],

                //tags_data
                tags_data: { ...this.tagsData, mode: "radio" }

            }
        },
        computed: {

            //轮播器
            slider(){
                return this.$refs.slider;
            }

        },
        watch: {

            //监听当前所选标签
            cur_tab(val){
                this.slider.flip(this.tags_data.tagList.findIndex((item)=>{
                    return item.id === val[0]
                }) + 1, this.smooth);
                this.$emit("on_select", val[0]);
            }

        },
        methods: {

            //初始化内容定位
            $_init_page(){
                this.slider.flip(this.tags_data.tagList.findIndex((item)=>{
                    return item.id === this.cur_tab[0]
                }) + 1, false);
            },

            //触控分页
            $_page_flip(page){
                const val = this.tagsData.tagList[page - 1].id;
                if(this.cur_tab[0] !== val) this.cur_tab = [val];
            }

        }
    }
</script>