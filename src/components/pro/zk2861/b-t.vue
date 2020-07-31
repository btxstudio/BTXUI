<template>
    <div :class="info.text === 'a'? 'color-red': 'color-green'">
        <slot />
    </div>
</template>

<script>
    export default {
        name: "b-t",
        props: {
            info: {
                type: String,
                required: true,
            },
            data: {
                type: String,
                required: false,
            },
        }
    }
</script>