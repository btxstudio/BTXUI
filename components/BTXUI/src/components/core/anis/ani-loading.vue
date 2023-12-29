<template>
    <b-view class="flex-5">
        <b-view class="ani-loading rel w-2d2 h-2d2 round"></b-view>
    </b-view>
</template>

<style>
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