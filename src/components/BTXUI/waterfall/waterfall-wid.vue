<template>
    <b-view styles="rel">
        <b-grid v-bind="grid_data">
            <b-view v-for="img of show_imgs" :id="img.item_id" :key="img.item_id"
                    ref="item"
                    :styles="`abs mrg-b-0 pad-7px trans-fast t-${img.item_top} l-${img.item_left}`">
                <b-img styles="flex round-sm round-t" :img="img.src" :title="img.title" />
                <b-view styles="pad-1">
                    hello world
                </b-view>
            </b-view>
        </b-grid>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BImg from "@/components/BTXUI/core/b-img"
    import BGrid from "@/components/BTXUI/core/b-grid"

    const desc = ["该组件用于瀑布流方式展示内容。"],
        extend = [],
        dependent = ["b-img", "b-view", "b-grid"],
        api = null,
        init_data = `{
        /* uploadApi: "直接上传接口" */,
        /* remoteFiles: "(model) 上传文件地址集" */,
    }`;

    export default {
        name: "waterfall-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BImg,
            BGrid
        },
        props: ["init-data"],
        data(){
            return {

                //网格参数
                grid_data: {
                    colData: {
                        common_plan: "col-3 col-4-m col-6-s"
                    }
                },

                /*图片公共根路径*/
                common_path_root: "",

                /*全部图片*/
                imgs: [],

                /*显示图片*/
                show_imgs: [],

                //细分列数（最多 4 列）
                cols: 4,

                /*瀑布流定位计算数据结构*/
                pos_data: null,

                /*重置大小定时器*/
                resize_t: null

            }
        },
        computed: {

            //响应式宽度
            cols(val){
                return `col-${12 / this.cols}`;
            }

        },
        methods: {

            /*加载图片*/
            load_img(index){
                let img = this.imgs[index];
                if(!img) return;
                let $img = new Image(),
                    pos;
                $img.onload = ()=>{
                    pos = this._computed_pos_data();
                    this.show_imgs.push({
                        title: img.title,
                        src: $img.src,
                        item_left: pos.min_top_index * 1/this.cols * 100 + "%",
                        item_top: pos.min_top + "px",
                        item_id: img.id
                    });
                    this.$nextTick(()=>{
                        this.pos_data[pos.min_top_index] += this.$el.querySelector("#" + img.id).clientHeight;
                        this.load_img(++index);
                    })
                }
                $img.src = this.common_path_root + img.src;
            },

            /*追加显示图片*/
            append_imgs(imgs){
                let start_index = this.imgs.length;
                this.imgs = this.imgs.concat(imgs);
                this.load_img(start_index);
            },

            /*列设置*/
            set_cols(num){
                this.cols = Math.max(Math.min(num, 5), 2);
                this._resize();
            },

            //【内部方法】---------------------------------------------------------------------

            /*基于列数设置瀑布流定位计算数据结构*/
            _reset_pos_data(){
                this.pos_data = [];
                for(let i=0; i<this.cols; i++){
                    this.pos_data.push(0);
                }
            },

            /*resize*/
            _resize(){
                clearTimeout(this.resize_t);
                let pos;
                this.resize_t = setTimeout(()=>{
                    this._reset_pos_data();
                    this.$refs.item.forEach(($item, i) => {
                        pos = this._computed_pos_data();
                        this.show_imgs[i].item_top = pos.min_top + "px";
                        this.show_imgs[i].item_left = pos.min_top_index * 1/this.cols * 100 + "%";
                        this.pos_data[pos.min_top_index] += $item.$el.clientHeight;
                    })
                }, 1000)
            },

            /*瀑布流定位计算*/
            _computed_pos_data(){
                let min_top = this.pos_data[0],
                    min_top_index = 0;
                this.pos_data.forEach((pos, i) => {
                    if(pos < min_top){
                        min_top = pos;
                        min_top_index = i;
                    }
                })
                return {
                    min_top,
                    min_top_index
                }
            },

        },
        mounted(){
            window.onresize = this._resize;
            this.common_path_root = this.initData.common_path_root;
            this.imgs = this.initData.imgs;
            this.cols = this.initData.cols || 2;
            this._reset_pos_data();
            this.load_img(0);
        }
    }
</script>