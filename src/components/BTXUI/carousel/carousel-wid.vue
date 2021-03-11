<template>
    <b-view styles="no-scroll"
            @on_touchstart="pause"
            @on_touchend="play"
            @on_leave="play"
            @on_enter="pause">
        <b-view styles="flex"
                :dynamic="`w-${item_box_width}px translateX-f${offset}px`">
            <b-view v-for="(item,i) of play_items" :key="i"
                    :styles="`pad-h-${rule / 2}px`"
                    :dynamic="`w-${item_width}px`">
                <slot :name="item.id" />
            </b-view>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"

    const desc = ["该组件用于实现自定义元素的走马灯效果。"],
        extend = [],
        dependent = ["b-view"],
        api = {
            methods: [
                {
                    name: "play",
                    ef: "播放走马灯",
                    params: "-",
                    return: "-"
                },
                {
                    name: "pause",
                    ef: "暂停走马灯",
                    params: "-",
                    return: "-"
                }
            ]
        },
        init_data = `{
        items: [
            {
                id: "数据标识",...
            },...
        ],
        /* visiableCount: "项目可见数量，默认为 3" */,
        /* rule: "项目间距" */,
        /* speed: "播放速度" */
    }`;

    export default {
        name: "carousel-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView
        },
        props: {
            items: {
                required: true,
                type: Array
            },
            visiableCount: {
                required: false,
                type: Number,
                default: 3
            },
            rule: {
                required: false,
                type: Number,
                default: 0
            },
            speed: {
                required: false,
                type: Number,
                default: 1
            },
        },
        data(){
            return {

                //播放项目
                play_items: this.items,

                //播放器宽度
                player_width: 0,

                //项目宽度
                item_width: 0,

                //项目容器宽度
                item_box_width: 0,

                //播放状态
                play_state: true,

                //水平位移
                offset: 0,

            }
        },
        methods: {

            //暂停
            pause(){
                this.play_state = false;
            },

            //播放
            play(){
                this.play_state = true;
                this.$_play();
            },

            //执行播放
            $_play(){
                if(!this.play_state) return false;
                let speed = this.offset += this.speed;
                if(speed >= this.item_width){
                    this.play_items.push(this.play_items.shift());
                    this.offset = 0;
                }
                requestAnimationFrame(this.$_play);
            },

            //初始化数据
            $_init_data(){
                this.player_width = this.$el.clientWidth;
                this.item_width = this.player_width / this.visiableCount;
                this.item_box_width = this.item_width * this.play_items.length;
                this.play_items.length > this.visiableCount && this.$_play();
            },

        },
        mounted(){
            this.$_init_data();
        }
    }
</script>