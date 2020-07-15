<template>
    <div class="zk2861-slider-btn-widget rel">
        <a href="javascript:;" @click="$_click" class="zsb-w-btn color-dgray flex-5 w-3 h-3 round-lg bg-color-light line thick-1 line-lgray">
            <i :class="`ico-arrow-${dir} fsize-1d5`"></i>
        </a>
        <div :class="`zsb-w-text ellipsis abs alpha-0 fsize-d8 t-4rem pad-d5 bg-color-light round-sm line thick-1 line-lgray ${dir === 'right'? 'r-0': 'l-0'}`">{{text}}</div>
    </div>
</template>

<script>
    export default {
        name: "zk2861-btn-widget",
        /*
        * init-data{
        *   dir: "箭头方向",
        *   [* text: "按钮文字"],
        * }
        * */
        props: {
            dir: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: false
            }
        },
        methods: {
            $_click(){
                this.$emit("on_click")
            }
        }
    }
</script>

<style lang="scss" scoped>
    .zk2861-slider-btn-widget {

        //鼠标悬停效果
        .zsb-w-btn:hover+.zsb-w-text {
            opacity: 1;
            visibility: visible;
        }

    }
</style>