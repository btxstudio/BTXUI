<template>
    <div class="max rel bg-color-lgray flex-column">
        <zk2861-msg-check-widget ref="msgChecker" />
        <div class="flex">
            <div class="pad-v-1 pad-h-2 round-sm bg-color-mgray" @click="$_check">验证</div>
        </div>
    </div>
</template>

<script>
    import Zk2861MsgCheckWidget from "@/components/pro/zk2861/zk2861-msg-check-widget"
    export default {
        name: "demo2",
        components: {
            Zk2861MsgCheckWidget
        },
        data(){
            return {
                msg_checker: null
            }
        },
        computed: {

        },
        methods: {

            //执行验证
            $_check(){
                this.msg_checker.check_msg((tel)=>{
                    console.log(tel)
                })
            }

        },
        mounted(){
            this.msg_checker = this.$refs.msgChecker;
        }
    }
</script>