<template>
    <b-hot @on_click="$_click"
           styles="pad-v-.4 pad-h-2 bg-color-lgray round-sm"
           hover="bg-color-blue color-light" >
        {{btnText}}
    </b-hot>
</template>

<script>
    import BHot from "@/components/BTXUI/core/b-hot";

    export default {
        name: "btn-widget",
        components: { BHot },
        /*
        * init-data{
        *   btn-text: "按钮文字",
        *   [* styles: "按钮样式"],
        *   [* hover-styles: "按钮悬停样式"],
        * }
        * */
        props: {
            btnText: {
                type: String,
                required: true,
            },
            styles: {
                type: [String, Array],
                required: false,
            },
            hoverStyles: {
                type: [String, Array],
                required: false,
            },
        },
        methods: {

            //执行点击
            $_click(){
                this.$emit("on_click");
            }

        }
    }
</script>