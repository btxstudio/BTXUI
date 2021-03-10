<template>
    <b-view :styles="`flex-${align_style}`">
        <b-hot :styles="`round w-4 h-4 flex-5 fsize-1.4 mrg-r-1.4 color-neutral shadow-sm bg-color-${colors.bg}`"
               :hover="`bg-color-${colors.hover}`"
               @on_click="prev">
            <b-icon :styles="`color-${colors.text}`" icon="arrow-left" />
        </b-hot>

        <!--页码-->
        <b-text styles="alpha-.5" v-show="pages[0] > 1">...</b-text>
        <b-hot v-for="page of pages"
               :styles="`pad-h-.6 fsize-1.3 color-${colors.text}`"
               :states="{
                    act: {
                        state: page === cur_page,
                        style: `color-${colors.act}`
                    }
               }"
               :hover="`color-${colors.hover}`"
               @on_click="flip(page)"
               :key="page">
            {{page}}
        </b-hot>
        <b-text styles="alpha-.5" v-show="pages[pages.length - 1] < total">...</b-text>

        <b-hot :styles="`round w-4 h-4 flex-5 fsize-1.4 mrg-l-1.4 color-neutral shadow-sm bg-color-${colors.bg}`"
               :hover="`bg-color-${colors.hover}`"
               @on_click="next">
            <b-icon :styles="`color-${colors.text}`" icon="arrow-right" />
        </b-hot>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BHot from "@/components/BTXUI/core/b-hot";
    import BText from "@/components/BTXUI/core/b-text";
    import BIcon from "@/components/BTXUI/core/b-icon";

    const desc = ["该组件用于实现分页导航按钮。"],
        extend = [],
        dependent = ["b-icon", "b-hot", "b-view", "b-text"],
        api = {
            methods: [
                {
                    name: "next",
                    ef: "向后翻页",
                    params: "-",
                    return: "-"
                },
                {
                    name: "prev",
                    ef: "向前翻页",
                    params: "-",
                    return: "-"
                },
                {
                    name: "flip",
                    ef: "指定页码翻页",
                    params: "page",
                    return: "-"
                }
            ],
            event: [
                {
                    name: "on_flip",
                    ef: "点击分页",
                    params: "cur_page"
                }
            ]
        },
        init_data = `{
        total: "总页数",
        /* curPage: "当前页，默认为 1" */,
        /* limit: "页码显示限制，默认为 4" */,
        /* colors: {
            bg: "按钮颜色",
            text: "文字及图标颜色",
            hover: "悬停状态按钮颜色及文字、图标颜色",
            act: "页码激活颜色"
        } */,
        /* align: "水平对齐方式，默认 center" */,
    }`;

    export default {
        name: "page-flip-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText,
            BIcon,
            BHot
        },
        props: {
            total: {
                type: Number,
                required: true
            },
            curPage: {
                type: Number,
                required: false,
                default: 1
            },
            limit: {
                type: Number,
                required: false,
                default: 4
            },
            colors: {
                type: Object,
                required: false,
                default: ()=>{
                    return {
                        bg: "neutral",
                        text: "dgray",
                        hover: "mgray",
                        act: "blue",
                    }
                }
            },
            align: {
                type: String,
                required: false,
                default: "center"
            },
        },
        data(){
            return {

                //当前页
                cur_page: this.$_set_page(this.curPage),

            }
        },
        computed: {

            //显示页码
            pages(){
                //场景：1.不足 limit；2.等于 limit；3.超过 limit，后续；4.超过 limit，前续；5.超过 limit，前后续
                const pages = [];
                if(this.total !== Infinity){
                    const cur_page = this.cur_page,
                        limit = this.limit,
                        rem = cur_page % limit,
                        pos = rem > 0? rem: limit,
                        before = Math.max(1, cur_page - pos + 1),
                        after = Math.min(cur_page + limit - pos, this.total);
                    for(let i=before; i<=after; i++) pages.push(i)
                }
                return pages;
            },

            //对齐样式
            align_style(){
                let val;
                switch(this.align){
                    case "left": val = 4;
                        break;
                    case "right": val = 6;
                        break;
                    default: val = 5;
                }
                return val
            }

        },
        methods: {

            //向后翻页
            next(){
                this.flip(this.cur_page + 1);
            },

            //向前翻页
            prev(){
                this.flip(this.cur_page - 1);
            },

            //翻页
            flip(page){
                const cur_page = this.$_set_page(page);
                if(cur_page !== this.cur_page){
                    this.cur_page = cur_page;
                    this.$emit("on_flip", this.cur_page)
                }
            },

            //设置当前页
            $_set_page(page){
                return Math.min(Math.max(1, isNaN(page)? 1: page), this.total);
            }

        },
        watch: {

            total(){
                this.cur_page = this.$_set_page(this.curPage)
            },

            curPage(){
                this.cur_page = this.$_set_page(this.curPage)
            }

        }
    }
</script>