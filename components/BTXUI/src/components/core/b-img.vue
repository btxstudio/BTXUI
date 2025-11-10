<template>
    <b-style :class="class" :cname="cname" :states="states" :matrix="matrix">
        <template v-slot:className="scope">
            <img v-if="src" :src="src" :class="`${scope.className} ani-fade-in`" :state="state" :style="{display: 'block', ...scope.matrixStyle}" :alt="alt">
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch, computed } from "vue";
    import bStyle from "./styles/b-style.vue"
    import { State } from "./styles/@types"
    import { useRuntimeConfig } from 'nuxt/app'

    const props = defineProps<{
        // 图片地址
        img: string,

        // 样式集
        class?: any,

        state?: State,

        states?: { [key: string]: any },

        // 默认图片地址
        defaultSrc?: string,

        // 图片提示
        alt?: string,

        // 变形矩阵
        matrix?: {
            translate?: string,
            scale?: string,
            rotate?: string,
            skew?: string
        },

        // 样式集别名
        cname?: string,
    }>()
    const { public: publicConfig } = useRuntimeConfig()
    const setBaseURL = (src) => src[0] === '/' ? `${publicConfig.baseURL}${src.replace(/^\//, '')}` : src;
    const img = computed(() => props.img);
    const emit = defineEmits(["on_load"]);

    // 展示图源
    const src = ref("");

    // 设置展示图源
    const setSrc = () => {
        if(props.defaultSrc) src.value = setBaseURL(props.defaultSrc); // 设置默认图
        const imgLoader = new Image();
        imgLoader.onload = ()=>{
            src.value = setBaseURL(props.img);
            emit("on_load");
        }
        imgLoader.src = setBaseURL(props.img);
    }

    watch(img, setSrc);

    onMounted(() => {
        setSrc();
    })
</script>