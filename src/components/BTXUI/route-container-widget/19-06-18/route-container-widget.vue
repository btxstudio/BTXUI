<!--19-06-18-->
<template>
    <div class="route-container-widget">
        <div class="rc-w-inner auto-scroll">
            <div class="rc-w-welcome">
                <p><i class="rc-w-ico icon-level_round"></i></p>
                <p class="rc-w-main">{{title}}</p>
                <p class="rc-w-sub">{{subTitle}}</p>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "route-container-widget",
        /*
        * init-data{
        *   title: "主标题",
        *   sub-title: "副标题",
        * }
        * */
        props: {
            title: {
                type: String,
                required: true
            },
            subTitle: {
                type: String,
                required: true
            }
        },
    }
</script>

<style scoped>
    @import "../assets/css/route-container-widget.css";
</style>