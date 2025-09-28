<template>
    <b-style :class="class" :states="states" :hover="hover" :active="active" :cname="cname">
        <template v-slot:className="scope">
            <a :style="`user-select: none; cursor: ${ cursor };`"
                ref="$anchor"
                @mouseenter="enter"
                @touchstart="enter"
                @mousemove="move"
                @touchmove="move"
                @mouseleave="leave"
                @touchend="leave"
                @click.stop="click"
                @dblclick.stop="dblclick"
                :target="target"
                :class="scope.className"
                :hover="hover? true: ''"
                :state="state"
                :active="active? true: ''"
                :href="url">
                <slot />
            </a>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, getCurrentInstance } from "vue"
    import bStyle from "./styles/b-style.vue"
    import { State } from "./styles/@types"
    const { proxy } = getCurrentInstance() as any

    const props = defineProps<{
        // 链接
        link?: string,

        // 样式集
        class?: string,

        // 当前状态
        state?: State,

        // 状态样式集
        states?: { [key: string]: any },

        // 鼠标悬停状态样式集
        hover?: string,

        // 激活状态样式集
        active?: string,

        // 禁用
        forbid?: boolean,

        // 下载文件名
        download?: string,

        // 跳转锚点
        anchor?: string,

        // 样式集别名
        cname?: string,

        // replace 模式
        replace?: boolean,

    }>();
    const emit = defineEmits(["on_click", "on_enter", "on_move", "on_leave", "on_dblclick"]);
    const $anchor = ref();

    // 外链开启方式
    const target = ref("");

    // 链接方式
    let routeLink;
    const url = computed(() => {
        const link = props.link;
        if(props.forbid || !link) return "javascript: void 0;"; // 禁用效果
        if(link.search("http") === 0){ // 外部链接
            target.value = "_blank";
            return link;
        }
        if(link.search(/^(tel|mailto):/) === 0) return link; // 手机拨号 | 邮件
        if(link[0] === '/') routeLink = link;
        return link; // 组件路由 & 其它
    })

    // 光标
    const cursor = computed(() => props.forbid? '': 'pointer');

    // 点击事件
    const click = (e) => {
        if(props.anchor) {
            const $section = document.querySelector(props.anchor);
            if($section) $section.scrollIntoView({
                behavior: "smooth"
            });
        }
        if(routeLink) {
            e.preventDefault();
            proxy.$router[props.replace ? 'replace' : 'push'](routeLink);
        }
        if(target.value === "_blank" && props.replace) {
            location.replace(url.value);
        }
        !props.forbid && emit("on_click", e);
    }

    // 双击事件
    const dblclick = (e) => {
        !props.forbid && emit("on_dblclick", e);
    }

    // 鼠标移入|触控开始
    const enter = (e) => {
        emit("on_enter", e);
    };

    // 鼠标移动|触控移动
    const move = (e) => {
        emit("on_move", e);
    };

    // 鼠标移出|触控结束
    const leave = (e) => {
        emit("on_leave", e);
    };

    onMounted(() => {
        if(props.download) $anchor.value.download = props.download;
    })
</script>
