<template>
    <a href="javascript:;" @click="$_click" class="zk2861-slider-btn-widget h-7 w-7 bg-color-light rotate-45 flex-5 round-sm">
        <div class="zsb-w-inner flex-4" :class="`zsb-${dir}-w-item`">
            <i class="ico-arrow-left fsize-3"></i>
            <span class="zsb-w-bar rel l-f1rem w-1 line-b"></span>
            <span class="zsb-w-text w-0 max-h flex-4 mrg-l-0 alpha-0">{{text}}</span>
        </div>
    </a>
</template>

<script>
    export default {
        name: "zk2861-slider-btn-widget",
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
        outline: 1px solid #ccc;
        outline-offset: -5px;
        transition-property: transform, width, outline-offset;
        transition-duration: .3s;
        transition-delay: .4s, 0s, 0s;

        .zsb-w-inner {
            transition-duration: .3s;
            transition-delay: .4s;

            .zsb-w-bar {
                transition-property: width;
                transition-delay: .4s;
                transition-duration: .3s;
            }
            &.zsb-left-w-item {
                transform: rotate(-45deg);
            }
            &.zsb-right-w-item {
                transform: rotate(135deg);

                .zsb-w-text {
                    transform: rotate(180deg);
                    display: flex;
                    justify-content: flex-end;
                }
            }
            .zsb-w-text {
                overflow: hidden;
                transition-property: width, opacity, visibility;
            }
        }

        //鼠标悬停效果
        &:hover {
            outline-color: #009af3;
            outline-offset: 3px;
            transform: rotate(0);
            color: #009af3;
            transition-delay: 0s, .4s, .4s;
            width: 25rem;
            box-shadow: 0 4px 17px rgba(0,154,243,.3);

            .zsb-w-inner {
                transition-delay: 0s;

                .zsb-w-bar {
                    transition-delay: 0s;
                    width: 0;
                }
                &.zsb-left-w-item {
                    transform: rotate(0);
                }
                &.zsb-right-w-item {
                    transform: rotate(180deg);
                }
                .zsb-w-text {
                    width: 15rem;
                    transition-duration: .3s;
                    transition-delay: .4s, .7s, .7s;
                    opacity: 1;
                    margin-left: 1.4rem;
                    visibility: visible;
                }
            }
        }
    }
</style>