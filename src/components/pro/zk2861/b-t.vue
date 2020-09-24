<template>
    <div class="w-10 h-5 bg-color-red" @click="$_set">
        <!--{{n_str}}-->
        {{obj_str}}
    </div>
</template>

<script>
    export default {
        name: "b-t",
        model: {
            // prop: "n",
            prop: "obj",
            event: "on_set"
        },
        props: {
            n: {
                type: Number,
                required: false,
                default: 200
            },
            obj: {
                type: Object,
                required: false,
                default(){
                    return {name: "lucy"}
                }
            }
        },
        computed: {
            n_str(){
                console.log(22)
                return this.n + 100;
            },
            obj_str(){
                console.log(33)
                return this.obj.name;
            }
        },
        methods: {

            $_set(){
                // this.$emit("on_set", 34);

                // this.$emit("on_set", {
                //     name: "neo"
                // });

                this.obj.name = "12345"

                // this.obj = {
                //     name: "sdsd"
                // }
            }

        }
    }
</script>