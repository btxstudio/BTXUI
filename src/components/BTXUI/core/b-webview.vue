<template>
    <iframe width="100%" height="100%" frameborder="0" :src="src"></iframe>
</template>

<script>
    export default {
        name: "b-webview",
        /*
        * init-data{
        *   src: "web 地址",
        * }
        * */
        props: {
            src: {
                type: String,
                required: true
            },
        }
    }
</script>