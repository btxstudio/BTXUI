<template>
    <div class="pad-2 pleft color-sub">
        <div v-for="i of 40" :key="i">list demo {{i}}</div>
    </div>
</template>

<script>
    export default {
        name: "list_demo"
    }
</script>