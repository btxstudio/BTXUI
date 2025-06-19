<template>
    <app-wid :spread="spread" path="/" :colors="colors" />
</template>

<script setup lang="ts">
    import { reactive } from "vue";
    
    const colors = {
        bg: 'mgray',
        bar: 'C1d1d1d',
        text: {
            normal: 'light',
            act: 'green'
        }
    }

    const spread = reactive([
        {
            navId: "home",
            iconData: {
                icon: '/icons.png',
                class: 'bsize-400 bpos-x-0 bpos-y-0'
            },
            hotData: {
                link: "/app/home",
                replace: true
            },
            text: "微信",
            unread: 4,
            act: 'bpos-x-0 bpos-y-95'
        },
        {
            navId: "addressList",
            iconData: {
                icon: '/icons.png',
                class: 'bsize-400 bpos-x-32 bpos-y-0'
            },
            hotData: {
                link: "/app/address-list",
                replace: true,
            },
            text: "通讯录",
            act: 'bpos-x-32 bpos-y-95'
        },
        {
            navId: "discover",
            iconData: {
                icon: '/icons.png',
                class: 'bsize-400 bpos-x-66 bpos-y-0',
            },
            hotData: {
                link: "/app/discover",
                replace: true,
            },
            text: "发现",
            unread: 1,
            act: 'bpos-x-66 bpos-y-95'
        },
        {
            navId: "me",
            iconData: {
                icon: '/icons.png',
                class: 'bsize-400 bpos-x-100 bpos-y-0'
            },
            hotData: {
                link: "/app/me",
                replace: true,
            },
            text: "我",
            act: 'bpos-x-100 bpos-y-95'
        },
    ])
</script>