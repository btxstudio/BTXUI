<template>
    <b-style :class="class" :cname="cname" :states="states" :matrix="matrix">
        <template v-slot:className="scope">
            <img :src="`${publicConfig}${src.replace(/^\//, '')}`" :class="scope.className" :state="state" :style="{display: 'block', ...scope.matrixStyle}" :alt="alt">
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
    const img = computed(() => props.img);
    const emit = defineEmits(["on_load"]);

    // 展示图源
    const { public: publicConfig } = useRuntimeConfig()
    const src = ref("");

    // 设置展示图源
    const setSrc = () => {
        if(props.defaultSrc) src.value = props.defaultSrc; // 设置默认图
        const imgLoader = new Image();
        imgLoader.onload = ()=>{
            src.value = props.img;
            emit("on_load");
        }
        imgLoader.src = props.img;
    }

    watch(img, setSrc);

    onMounted(() => {
        setSrc();
    })
</script>