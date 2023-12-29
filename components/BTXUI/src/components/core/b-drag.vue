<template>
    <b-style :class="class" :states="{dragStart, dragOver}">
        <template v-slot:className="scope">
            <div :style="{
                    cursor: dragOver? 'default': 'move', 
                    visibility: dragState? 'hidden': 'visible', 
                    position: freeDrag? 'absolute': 'relative',
                    left: 0,
                    top: 0,
                    transform: `translate(${movePos.x}px, ${movePos.y}px)`
                 }"
                 ref="$el"
                 :class="scope.className"
                 :state="state"
                 :draggable="dragStart? true: false">
                <slot/>
            </div>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import { ref, onMounted, reactive } from "vue"
    import bStyle from "./styles/b-style.vue"

    const props = defineProps<{
        // 样式集
        class?: string,

        // 拖拽传递数据
        dataInfo?: any,

        // "物品" 拖拽开始时样式集
        dragStart?: string,

        // "容器" 拖拽进入时样式集
        dragOver?: string,

        // 启用自由拖放
        freeDrag?: boolean

    }>();

    const emit = defineEmits(["on_drag_start", "on_drag_end", "on_drag_over", "on_drag_leave", "on_drop", "on_move"]);

    const $el = ref();

    // 组件当前状态
    const state = ref("");

    // 拖拽状态
    const dragState = ref(false);

    // 自由拖动状态
    const freeDragState = ref(false);

    // 自由拖动显示位置
    const movePos = reactive({ x: 0, y: 0 });

    // 事件绑定
    const bindEvent = () => {
        const $dom = $el.value;
        if(props.freeDrag){ // 自由拖动
            // pc 端
            $dom.onmousedown = freeDragBegin; 
            
            // 移动端
            $dom.ontouchstart = freeDragBegin;
        }else { // 拖拽事件
            $dom.ondragstart = dragBegin;
            $dom.ondrag = dragMove;
            $dom.ondragend = dragEnd;
            $dom.ondragover = dragEnterArea;
            $dom.ondragleave = dragLeaveArea;
            $dom.ondrop = drop;
        }
    };

    // 拖拽事件: 拖拽开始
    const dragBegin = (e) => {
        emit("on_drag_start", e);
        state.value = "dragStart";
        e.dataTransfer.setData("info", JSON.stringify(props.dataInfo));
    };

    // 拖拽事件: 拖拽移动
    const dragMove = (e) => {
        e.preventDefault();
        dragState.value = true;
    };

    // 拖拽事件: 拖拽结束
    const dragEnd = (e) => {
        emit("on_drag_end", e);
        dragState.value = false;
        state.value = "";
    };

    // 拖拽事件: 拖拽进入容器
    const dragEnterArea = (e) => {
        e.preventDefault();
        emit("on_drag_over", e);
        state.value = "dragOver";
    };

    // 拖拽事件: 拖拽离开容器
    const dragLeaveArea = (e) => {
        emit("on_drag_leave", e);
        state.value = "";
    };

    // 拖拽事件: 完成放入
    const drop = (e) => {
        emit("on_drop", e.dataTransfer.getData("info"), e);
        state.value = "";
    };

    // 自由拖动: 拖拽开始
    let $offsetParent;
    const relPos = reactive({x: 0, y: 0});
    const blockSize = reactive({width: 0, height: 0});
    const initOffsetParent = () => {
        $offsetParent = $el.value.offsetParent;
        $offsetParent.onmousemove = freeDragMove;
        $offsetParent.ontouchmove = freeDragMove;
        $offsetParent.onmouseleave = freeDragEnd;
        $offsetParent.onmouseup = freeDragEnd;
        $offsetParent.ontouchend = freeDragEnd;
        Array.prototype.forEach.call($offsetParent.children, $dom => {
            if($dom !== $el.value) $dom.style.pointerEvents = "none"; // 确保定位不受滑块影响
        });
        blockSize.width = $el.value.offsetWidth;
        blockSize.height = $el.value.offsetHeight;
    }
    const freeDragBegin = (e) => {
        e.preventDefault();
        if(!$offsetParent) initOffsetParent();
        state.value = "dragStart";
        freeDragState.value = true;
        relPos.x = e.offsetX;
        relPos.y = e.offsetY;
        $el.value.style.pointerEvents = "none"; // 确保定位不受滑块影响
    };

    // 自由拖动: 拖拽移动
    const freeDragMove = (e) => {
        if(!freeDragState.value) return;
        const x = e.offsetX - relPos.x;
        const y = e.offsetY - relPos.y;
        movePos.x = Math.max(0, x);
        movePos.y = Math.max(0, y);
        movePos.x = Math.min(movePos.x + blockSize.width, $offsetParent.offsetWidth) - blockSize.width;
        movePos.y = Math.min(movePos.y + blockSize.height, $offsetParent.offsetHeight) - blockSize.height;
        emit("on_move", movePos, e);
    };

    // 自由拖动: 拖拽结束
    const freeDragEnd = () => {
        if(!freeDragState.value) return;
        state.value = "";
        freeDragState.value = false;
        relPos.x = 0;
        relPos.y = 0;
        $el.value.style.pointerEvents = "auto";
    };

    onMounted(() => {
        bindEvent();
    })
</script>