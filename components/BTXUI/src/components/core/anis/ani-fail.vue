<template>
    <b-view class="flex-5">
        <b-text class="ani-fail-part1 w-3-px h-1d7 rel l-2-px bg-color-red round-sm"></b-text>
        <b-text class="ani-fail-part2 w-3-px h-1d7 rel r-1-px bg-color-red round-sm"></b-text>
    </b-view>
</template>

<style>
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