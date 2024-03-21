<template>
    <b-style :class="class" :states="states" :cname="cname">
        <template v-slot:className="scope">
            <div :class="scope.className"
                :state="state">
        
                <!-- 滚动区域 -->
                <div ref="$list"
                    :class="scrollTypeClass"
                    :style="`overflow-x: ${ scroll.x }; overflow-y: ${ scroll.y }; width: 100%; height: 100%;`"
                    @touchmove.stop>
                    <slot />
                </div>
            </div>
        </template>
    </b-style>
</template>
<script setup lang="ts">
    import { ref, onMounted, computed } from "vue"
    import bStyle from "./styles/b-style.vue"
    import { State } from "./styles/@types"

    const props = defineProps<{
        // 滚动设置
        scroll: {
            x: "auto" | "hidden" | "scroll",
            y: "auto" | "hidden" | "scroll",
        },

        // 样式集
        class?: string,

        // 当前状态
        state?: State,

        // 状态样式集
        states?: { [key: string]: any },

        // 滚动条样式
        scrollType?: "thick" | "thin",

        // 样式集别名
        cname?: string,

    }>();
    const emit = defineEmits(["on_scroll", "on_to_top", "on_to_bottom"]);

    // 滚动容器
    const $list = ref();

    // 滚动条样式
    const scrollTypeClass = computed(() => {
        if(props.scrollType) return `${ props.scrollType }-scroll`;
        return "thin-scroll";
    })

    // 重置定位
    const reset = () => {
        $list.value.scrollTop = 0;
    };

    // 滚动定位监听
    const tolerance = 2;
    let origScrollPos = { x:0, y:0 };
    const watchPos = () => {
        $list.value.onscroll = (e)=>{
            const st = e.target.scrollTop;
            const sl = e.target.scrollLeft;
            const h_offset = sl - origScrollPos.x;
            const v_offset = st - origScrollPos.y;
            let dir;
            if(Math.abs(h_offset) >= Math.abs(v_offset)){ // 水平方向
                e.stopPropagation();
                dir = h_offset >= 0? "l2r": "r2l";
            }else { // 垂直方向
                dir = v_offset >= 0? "t2b": "b2t";
            }
            origScrollPos.x = sl;
            origScrollPos.y = st;
            emit("on_scroll", {dir, left:sl, top:st});

            if(st === 0) emit("on_to_top", e); //滚动置顶
            if(st >= e.target.scrollHeight - e.target.clientHeight - tolerance) emit("on_to_bottom", e); //滚动置底
        }
    };

    defineExpose({ reset })

    onMounted(() => {
        watchPos();
    })
</script>