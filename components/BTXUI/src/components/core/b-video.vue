<template>
    <b-style :class="class">
        <template v-slot:className="scope">
            <video ref="$video" :class="scope.className" :muted="autoPlay" :src="video" :autoplay="autoPlay" :loop="loop"></video>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import bStyle from "./styles/b-style.vue"
    import { ref } from "vue";

    defineProps<{
        // 视频资源
        video: string,

        // 样式集
        class?: string,

        // 自动播放
        autoPlay?: boolean,

        // 循环播放
        loop?: boolean,
    }>()

    const $video = ref();

    // 播放
    // const play = () => {
    //     $video.value.play();
    // }
</script>