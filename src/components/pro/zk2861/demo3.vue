<template>
    <div class="max rel bg-color-lgray flex-column">
        <!--<div v-if="data === 'a'" class="color-green">aaa</div>-->
        <!--<div v-if="data === 'b'" class="color-red">bbb</div>-->

        <!--<b-view v-if="data === 'a'" styles="color-green">aaa1</b-view>-->
        <!--<b-view v-if="data === 'b'" styles="color-red">bbb2</b-view>-->

        <!--<template v-if="data === 'aaa'" >-->
            <!--<b-t :info="info">aaaaa1</b-t>-->
        <!--</template>-->
        <!--<template v-if="data === 'bbb'"  >-->
            <!--<b-t :info="info">bbbbb2</b-t>-->
        <!--</template>-->

        <b-t v-if="data === 'a'" styles="color-green">aaa111</b-t>
        <b-t v-if="data === 'b'" styles="color-red">bbb222</b-t>

        <div>
            <a @click="$_set('a')">设置a</a>
            <a @click="$_set('b')">设置b</a>
        </div>
    </div>
</template>

<script>
    import Zk2861MsgCheckWidget from "@/components/pro/zk2861/zk2861-msg-check-widget"
    import BView from "@/components/BTXUI/core/b-view";
    import BT from "./b-t";

    export default {
        name: "demo2",
        components: {
            Zk2861MsgCheckWidget,
            BView,
            BT
        },
        data(){
            return {
                data: "",
                info: {
                    text: ""
                }
            }
        },
        computed: {

        },
        methods: {

            $_set(flag){
                this.data = flag;
                this.info.text = flag;
            }

        },
        mounted(){
            this.msg_checker = this.$refs.msgChecker;
        }
    }
</script>