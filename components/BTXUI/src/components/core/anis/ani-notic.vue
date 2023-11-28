<template>
    <b-view styles="flex-5 t-f3 rotate-90">
        <b-text class="ani-notic-part1" styles="w-3px h-3px bg-color-blue round"></b-text>
        <b-text class="ani-notic-part2" styles="w-1.3 h-3px mrg-l-4px bg-color-blue round-sm"></b-text>
    </b-view>
</template>

<script>
    import BView from "../b-view";
    import BText from "../b-text";

    export default {
        name: "ani-notic",
        components: {
            BView,
            BText,
        }
    }
</script>

<style scoped>
    .ani-notic-part1{
        animation: ani_notic_part1 .3s .7s;
        animation-fill-mode: both;
    }
    .ani-notic-part2{
        animation: ani_notic_part2 .5s 1s;
        animation-fill-mode: both;
        transform-origin: left;
    }
    @keyframes ani_notic_part1 {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
    @keyframes ani_notic_part2 {
        from {
            transform: scaleX(0);
        }
        to {
            transform: scaleX(1);
        }
    }
</style>