<template>
    <b-view class="flex-5" :matrix="{translate: '0,9px', rotate: '45deg'}">
        <b-text class="ani-success-part1 w-1 h-3-px bg-color-green round-sm"></b-text>
        <b-text class="ani-success-part2 w-1d7 h-3-px bg-color-green round-sm rel t-1-px l-f1-px"></b-text>
    </b-view>
</template>

<script setup lang="ts">
    import bView from "../b-view.vue";
    import bText from "../b-text.vue";
</script>

<style>
    .ani-success-part1 {
        animation: ani_success_part1 .3s .7s;
        animation-fill-mode: both;
        transform-origin: left;
    }
    .ani-success-part2 {
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