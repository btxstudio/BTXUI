<template>
    <b-view styles="flex-5 t-f3">
        <b-view class="ani-loading" styles="rel w-2.2 h-2.2 round"></b-view>
    </b-view>
</template>

<script>
    import BView from "../b-view";

    export default {
        name: "ani-loading",
        components: {
            BView,
        }
    }
</script>

<style scoped>
    .ani-loading {
        animation: ani_rotate 1s linear infinite;
        border: 3px solid #ddd;
        border-left-color: #4085f3;
    }
    @keyframes ani_rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>