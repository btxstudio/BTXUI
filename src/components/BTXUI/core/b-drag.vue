<template>
    <div :style="{...computed_style, cursor: 'move', visibility: `${drag_state? 'hidden': 'visible'}`}"
         draggable="true"
         @mousedown = "toggle_style('drag_start')"
         @mouseup = "reset_style()"
         @dragstart = "$_drag_start"
         @drag = "$_drag_move"
         @dragend = "$_drag_end"
         @dragover = "$_drag_over"
         @dragleave = "$_drag_leave"
         @drop = "$_drop" >
        <div :style="{pointerEvents: `${drag_state? 'auto': 'none'}`}">
            <slot/>
        </div>
    </div>
</template>

<script>
    import bStyle from "./styles/b-style";

    let desc = ["该组件用于包裹元素以实现拖拽效果。"],
        extend = ["b-style"],
        dependent = [],
        api = {
            event: [
                {
                    name: "on_drag_start",
                    ef: "开始拖拽",
                    params: "event"
                },
                {
                    name: "on_drag_move",
                    ef: "拖拽移动",
                    params: "event"
                },
                {
                    name: "on_drag_end",
                    ef: "结束拖拽",
                    params: "event"
                },
                {
                    name: "on_drag_over",
                    ef: "拖拽预备放入",
                    params: "event"
                },
                {
                    name: "on_drag_leave",
                    ef: "拖拽离开容器",
                    params: "event"
                },
                {
                    name: "on_drop",
                    ef: "完成放入",
                    params: "event"
                }
            ]
        },
        init_data = `{
        /* styles: "(参照：b-style 组件入参)" */,
        /* dataInfo: "绑定数据" */,
        /* dragStart: "拖拽起始状态样式值" */,
        /* dragOver: "拖拽预备放入状态样式值" */,
    }`;

    export default {
        extends: bStyle,
        name: "b-drag",
        introduce: { desc, extend, dependent, api, init_data },
        props: {
            dataInfo: {
                type: Object,
                required: false,
            },
            dragStart: {
                type: String,
                required: false,
                default: "bg-color-neutral color-rgba(20,20,20,.5) round-sm shadow z9"
            },
            dragOver: {
                type: String,
                required: false,
                default: "bg-color-neutral color-rgba(20,20,20,.7) round-sm"
            },
        },
        data(){
            return {

                //拖拽状态
                drag_state: false,

            }
        },
        methods: {

            //拖拽开始
            $_drag_start(e){
                this.$emit("on_drag_start", e);
                e.dataTransfer.setData("info", e.target.dataset.info)
            },

            //拖拽移动
            $_drag_move(e){
                e.preventDefault();
                this.drag_state = true;
            },

            //拖拽结束
            $_drag_end(e){
                this.drag_state = false;
                this.$emit("on_drag_end", e);
                this.reset_style();
            },

            //拖拽预备放入
            $_drag_over(e){
                e.preventDefault();
                this.$emit("on_drag_over", e);
                this.toggle_style("drag_over");
            },

            //拖拽离开容器
            $_drag_leave(e){
                this.$emit("on_drag_leave", e);
                this.reset_style();
            },

            //完成放入
            $_drop(e){
                this.$emit("on_drop", {
                    you: JSON.parse(e.dataTransfer.getData("info")),
                    me: JSON.parse(this.$el.dataset.info)
                });
                this.reset_style();
            }

        },
        watch: {

            //数据更新
            dataInfo(){
                this.$el.dataset.info = JSON.stringify(this.dataInfo);
            }

        },
        mounted(){
            this.append_state(this.dragStart, "drag_start");
            this.append_state(this.dragOver, "drag_over");
            this.$el.dataset.info = JSON.stringify(this.dataInfo);
        }
    }
</script>