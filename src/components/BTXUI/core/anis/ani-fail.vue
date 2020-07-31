<template>
    <b-view styles="flex-5 t-f3">
        <b-text class="ani-fail-part1" styles="w-3px h-1.7 rel l-2px bg-color-red round-sm"></b-text>
        <b-text class="ani-fail-part2" styles="w-3px h-1.7 rel r-1px bg-color-red round-sm"></b-text>
    </b-view>
</template>

<script>
    import BView from "../b-view";
    import BText from "../b-text";

    export default {
        name: "ani-fail",
        components: {
            BView,
            BText,
        }
    }
</script>

<style scoped>
    .ani-fail-part1{
        animation: ani_fail_part1 .3s .7s;
        animation-fill-mode: both;
    }
    .ani-fail-part2{
        animation: ani_fail_part2 .5s 1s;
        animation-fill-mode: both;
    }
    @keyframes ani_fail_part1 {
        from {
            transform: scale(0) rotate(45deg);
        }
        to {
            transform: scale(1) rotate(45deg);
        }
    }
    @keyframes ani_fail_part2 {
        from {
            transform: scale(0) rotate(-45deg);
        }
        to {
            transform: scale(1) rotate(-45deg);
        }
    }
</style>