<template>
    <video :style="computed_style"
           :autoplay="autoPlay"
           :controls="controls"
           :loop="loop"
           :src="video"/>
</template>

<script>
    import bStyle from "./styles/b-style";

    let desc = ["该组件用于实现视频播放器。"],
        extend = ["b-style"],
        dependent = [],
        api = null,
        init_data = `{
        video: "视频资源",
        /* styles: "(参照：b-style 组件入参)" */,
        /* loop: "循环播放，默认 false" */,
        /* autoPlay: "自动播放，默认 false" */,
        /* controls: "UI 控件，默认 true" */
    }`;

    export default {
        extends: bStyle,
        name: "b-video",
        introduce: { desc, extend, dependent, api, init_data },
        props: {
            video: {
                type: String,
                required: true
            },
            loop: {
                type: Boolean,
                required: false
            },
            autoPlay: {
                type: Boolean,
                required: false
            },
            controls: {
                type: Boolean,
                required: false,
                default: true
            },
        },
        methods: {

            //播放
            play(){
                this.$el.play();
            }

        }
    }
</script>