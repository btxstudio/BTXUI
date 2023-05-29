<template>
    <div :style="{...computed_style, cursor: 'move', visibility: drag_state? 'hidden': 'visible', position: freeDrag? 'absolute': '', left: `${move_pos.x}px`, top: `${move_pos.y}px`}"
         :draggable="!freeDrag"
         @mousedown = "$_act_target" @touchstart = "$_act_target">
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
                    params: "{you, me}, event"
                },
                {
                    name: "on_move",
                    ef: "拖动位移",
                    params: "move_pos, move_area"
                }
            ]
        },
        init_data = `{
        /* styles: "(参照：b-style 组件入参)" */,
        /* dataInfo: "绑定数据，缺省则传递元素自身" */,
        /* dragStart: "拖拽起始状态样式值" */,
        /* dragOver: "拖拽预备放入状态样式值" */,
        /* freeDrag: "自由拖动，默认为 false" */,
    }`;

    export default {
        extends: bStyle,
        name: "b-drag",
        introduce: { desc, extend, dependent, api, init_data },
        props: {
            dataInfo: {
                type: Object,
                required: false,
                default: ()=>{
                    return {}
                }
            },
            dragStart: {
                type: String,
                required: false,
                default: ""
            },
            dragOver: {
                type: String,
                required: false,
                default: "bg-color-neutral color-rgba(20,20,20,.7) round-sm"
            },
            freeDrag: {
                type: Boolean,
                required: false
            },
        },
        data(){
            return {

                //拖拽状态
                drag_state: false,

                //拖动状态
                move_state: false,

                //自由拖动当前位置
                move_cur_pos: null,

                //自由拖动显示位置
                move_pos: {
                    x: "auto",
                    y: "auto"
                },

                //自由拖动起始点位置
                move_start_point_pos: {
                    x: 0,
                    y: 0
                },

                //自由拖动区域限制
                move_area: null

            }
        },
        methods: {

            //事件绑定
            $_bind_event(){
                const $el = this.$el;
                if(this.freeDrag){ //自由拖动
                    $el.ontouchmove = this.$_free_move;
                    $el.onmouseup = this.$_free_move_end;
                    $el.ontouchend = this.$_free_move_end;
                }else { //拖拽事件
                    $el.ondragstart = this.$_drag_start;
                    $el.ondrag = this.$_drag_move;
                    $el.ondragend = this.$_drag_end;
                    $el.ondragover = this.$_drag_over;
                    $el.ondragleave = this.$_drag_leave;
                    $el.ondrop = this.$_drop;
                }
            },

            //按下（激活）拖拽目标
            $_act_target(e){
                this.toggle_style('drag_start');
                if(this.freeDrag){
                    e.preventDefault();
                    const $el = this.$el,
                        $offset_parent = $el.offsetParent;
                    if(!this.move_cur_pos) {
                        this.move_pos = this.move_cur_pos = {
                            x: $el.offsetLeft,
                            y: $el.offsetTop
                        };
                    }
                    if(!this.move_area) this.move_area = {
                        x: $offset_parent.clientWidth - $el.offsetWidth,
                        y: $offset_parent.clientHeight - $el.offsetHeight
                    }
                    this.move_start_point_pos = {
                        x: e.screenX,
                        y: e.screenY
                    }

                    //动态事件绑定
                    if(!$offset_parent.onmousemove) $offset_parent.onmousemove = this.$_free_move;
                    if(!$offset_parent.onmouseleave) $offset_parent.onmouseleave = this.$_free_move_end;

                    this.move_state = true;
                }
            },

            //拖拽开始
            $_drag_start(e){
                this.$emit("on_drag_start", e);
                e.dataTransfer.setData("info", e.target.dataset.info);
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
                }, e);
                this.reset_style();
            },

            //自由拖动
            $_free_move(e){
                if(this.move_state){
                    const orig_pos = this.move_start_point_pos,
                        cur_pos = this.move_cur_pos,
                        rel_x = e.screenX - orig_pos.x,
                        rel_y = e.screenY - orig_pos.y,
                        move_area = this.move_area;
                    let move_pos_x = cur_pos.x + rel_x,
                        move_pos_y = cur_pos.y + rel_y;

                    //区域限制
                    if(move_pos_x < 0) move_pos_x = 0;
                    if(move_pos_y < 0) move_pos_y = 0;
                    if(move_pos_x > move_area.x) move_pos_x = move_area.x;
                    if(move_pos_y > move_area.y) move_pos_y = move_area.y;

                    this.move_pos = {
                        x: move_pos_x,
                        y: move_pos_y,
                    }
                    this.$emit("on_move", this.move_pos, move_area);
                }
            },

            //自由拖动结束
            $_free_move_end(){
                if(this.move_state){
                    this.reset_style();
                    this.move_state = false;
                    this.move_cur_pos = this.move_pos;
                }
            },

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
            this.$_bind_event();
        }
    }
</script>