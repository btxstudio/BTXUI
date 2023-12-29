<template>
    <b-view class="flex-5" :matrix="{rotate: '90deg'}">
        <b-text class="ani-notic-part1 w-3-px h-3-px bg-color-blue round"></b-text>
        <b-text class="ani-notic-part2 w-1d3 h-3-px mrg-l-4-px bg-color-blue round-sm"></b-text>
    </b-view>
</template>

<style>
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