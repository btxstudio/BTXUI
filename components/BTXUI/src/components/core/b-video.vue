<template>
    <b-style :class="class" :cname="cname">
        <template v-slot:className="scope">
            <div :class="`${scope.className} over-hide rel`">

                <!-- 自定义控件 -->
                <b-hot v-if="customControls" class="max abs flex-5 z-2 bg-color-rgba_0_0_0_d1 trans-fast" 
                    @on_click="togglePlay"
                    @on_enter="videoHover = true"
                    @on_leave="videoHover = false"
                    :state="controlState"
                    :states="{
                        true: 'alpha-1 visible',
                        false: 'alpha-d01'
                    }">
                    <b-view v-if="iconScale"
                        class="h-5 ratio-1 flex-5 round fsize-22-px bg-color-rgba_0_0_0_d8 color-light"
                        :matrix="{scale: iconScale}">
                        <b-icon v-if="!playState" icon="play" />
                        <b-icon v-else icon="pause" />
                    </b-view>
                </b-hot>

                <video 
                    v-if="fullScreen"
                    ref="$video" 
                    preload="none"
                    @playing="playing"
                    @durationchange="playing"
                    :class="scope.className" 
                    :poster="poster"
                    :muted="autoPlay" 
                    :src="video" 
                    :autoplay="autoPlay" 
                    :controls="!customControls"
                    :loop="loop"></video>
                <video 
                    v-else
                    ref="$video" 
                    preload="none"
                    @playing="playing"
                    @durationchange="playing"
                    webkit-playsinline
                    playsinline
                    x5-video-player-type='h5-page'
                    :class="scope.className"
                    :poster="poster" 
                    :muted="autoPlay" 
                    :src="video" 
                    :autoplay="autoPlay" 
                    :controls="!customControls"
                    :loop="loop"></video>
            </div>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import bStyle from "./styles/b-style.vue"
    import { ref, computed, nextTick, onMounted } from "vue";

    defineProps<{
        // 视频资源
        video: string,

        // 样式集
        class?: string,

        // 自动播放
        autoPlay?: boolean,

        // 循环播放
        loop?: boolean,

        // 样式集别名
        cname?: string,

        // 全屏播放
        fullScreen?: boolean,

        // 视频封面
        poster?: string

        // 自定义控制器
        customControls?: boolean
    }>()
    const emit = defineEmits(['on_play'])

    const $video = ref();

    /** 图标大小 */
    const iconScale = ref(0);
    onMounted(() => {
        nextTick(() => {
            const baseValue = $video.value.clientHeight / 200;
            iconScale.value = Math.max(1, baseValue * .8);
        })
    })

    /** 播放切换 */
    const playState = ref(false); 
    const videoHover = ref(false); 
    const controlState = computed(() => {
        if(!playState.value) {
            return true; // 暂停时显示
        } else {
            return videoHover.value; // hover 时显示
        }
    }); 
    const togglePlay = () => {
        playState.value = !playState.value;
        $video.value[playState.value ? 'play' : 'pause']();
    }
    const playing = () => {
        playState.value = true;
        emit('on_play');
    }
</script>