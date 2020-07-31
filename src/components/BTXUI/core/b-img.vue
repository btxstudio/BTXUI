<template>
    <img v-else-if="img" :src="img" :style="computed_style">
</template>

<script>
    import bStyle from "./styles/b-style";

    export default {
        extends: bStyle,
        name: "b-img",
        /*
        * init-data{
        *   img: "图片数据",
        *   [* styles: (参照：b-style 组件入参)],
        * }
        * */
        props: {
            img: {
                type: String,
                required: false
            }
        },
    }
</script>