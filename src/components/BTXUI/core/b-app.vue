<template>
    <b-view styles="max flex-column">
        <!--中部内容区域-->
        <b-list>
            <router-view />
        </b-list>

        <!--底部导航栏-->
        <b-view>
            <slot name="footer_nav" />
        </b-view>
    </b-view>
</template>

<script>
    import BView from "./b-view";
    import BList from "./b-list";

    export default {
        name: "b-app",
        components: {
            BView,
            BList
        }
    }
</script>