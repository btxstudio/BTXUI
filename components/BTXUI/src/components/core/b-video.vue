<template>
    <video :style="computed_style" muted
           :src="video"></video>
</template>

<script>

    let desc = ["该组件用于实现视频播放器。"],
        extend = ["b-style"],
        dependent = [],
        api = null,
        init_data = `{
        video: "视频资源",
        /* styles: "(参照：b-style 组件入参)" */,
    }`;

    export default {
        name: "b-video",
        introduce: { desc, extend, dependent, api, init_data },
        props: {
            video: {
                type: String,
                required: true
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