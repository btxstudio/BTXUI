<template>
    <div class="zk2861-slider-item-widget bg-color-light pad-h-2 w-25 pad-v-1 round-sm flex-5" :state="state">{{title}}</div>
</template>

<script>
    export default {
        name: "zk2861-slider-item-widget",
        /*
        * init-data{
        *   title: "标题文字",
        *   [* state: "特殊状态标识"],
        * }
        * */
        props: {
            title: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: false
            },
        }
    }
</script>

<style lang="scss" scoped>
    .zk2861-slider-item-widget {
        outline: 1px solid #009af3;
        outline-offset: -3px;
        box-shadow: 0 4px 17px rgba(0,154,243,.4);

        &[state="act"]::after {
            font-family: defaultICO;
            content: "\e6b9";
            margin-left: .4rem;
        }
    }
</style>