<template>
    <b-view styles="flex-5 transform-translateY(.9rem)rotate(45deg)">
        <b-text class="ani-success-part1" styles="w-1 h-3px bg-color-green round-sm"></b-text>
        <b-text class="ani-success-part2" styles="w-1.7 h-3px bg-color-green round-sm rel t-1px l-f1px"></b-text>
    </b-view>
</template>

<script>
    import BView from "../b-view";
    import BText from "../b-text";

    export default {
        name: "ani-success",
        components: {
            BView,
            BText,
        }
    }
</script>

<style scoped>
    .ani-success-part1{
        animation: ani_success_part1 .3s .7s;
        animation-fill-mode: both;
        transform-origin: left;
    }
    .ani-success-part2{
        animation: ani_success_part2 .5s 1s;
        animation-fill-mode: both;
        transform-origin: left;
    }
    @keyframes ani_success_part1 {
        from {
            transform: scaleX(0);
        }
        to {
            transform: scaleX(1);
        }
    }
    @keyframes ani_success_part2 {
        from {
            transform: scaleY(0) rotate(-90deg);
        }
        to {
            transform: scaleY(1) rotate(-90deg);
        }
    }
</style>