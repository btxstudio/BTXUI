<template>
    <b-view styles="rel">
        <b-text ref="cont" styles="color-red">hello world</b-text>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import BText from "@/components/BTXUI/core/b-text"

    export default {
        name: "test",
        components: {
            BView,
            BText
        },
        computed: {

            $cont(){
                return this.$refs.cont;
            }

        },
        mounted(){
            //？？？？styles 样式解析流程问题
            console.log(this.$cont.$el.offsetParent); //滚动区
            setTimeout(()=>{
                console.log(this.$cont.$el.offsetParent); //包含块
            }, 1000)
        }
    }
</script>