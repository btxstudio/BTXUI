<template>
    <div class="max rel bg-color-lgray flex-column">
        <b-t v-model="data.obj" />
        <!--<b-t />-->
        <button @click="$_reset">按钮</button>
    </div>
</template>

<script>
    import BT from "./b-t";

    export default {
        name: "demo3",
        components: {
            BT
        },
        data(){
            return {
                data: {
                    // n: 500,
                    obj: {
                        name: "nick"
                    },
                }
            }
        },
        methods: {
            $_reset(){
                this.data.obj = {
                    name: "btx"
                }
            }
        }
    }
</script>