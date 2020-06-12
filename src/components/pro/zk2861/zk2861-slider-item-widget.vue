<template>
    <div class="bg-color-light pad-h-2 w-20 pad-v-1 round-sm flex-5 zk2861-slider-item-widget">{{title}}</div>
</template>

<script>
    export default {
        name: "zk2861-slider-item-widget",
        /*
        * init-data{
        *   title: "标题文字",
        * }
        * */
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .zk2861-slider-item-widget {
        outline: 1px solid #b8daf3;
        outline-offset: -3px;
        box-shadow: 0 4px 17px rgba(0,154,243,.4);
        white-space: nowrap;
    }
</style>