<template>
    <b-view>
        <b-view styles="flex-column pad-b-1">
            <b-view styles="bg-color-light round-lg flex">
                <b-input styles="h-3 pad-l-1.5 flex-grow" type="text"
                       @blur.prevent="$_debug_webview"
                       v-model="tel"
                       maxlength="11"
                       placeholder="请输入手机号"/>
                <b-hot styles="flex-5 round-lg round-r w-9 bg-color-blue color-yellow"
                       :states="{
                            forbid: {
                                style: 'color-blue bg-color-none',
                                state: !send_btn.enable
                            }
                       }"
                        @on_click="$_send_code">
                    {{send_btn.text}}
                </b-hot>
            </b-view>
        </b-view>
        <b-view styles="flex-column">
            <b-view styles="bg-color-light round-lg flex">
                <b-input styles="h-3 pad-l-1.5 flex-grow" type="text"
                       @blur.prevent="$_debug_webview"
                       v-model="check_code"
                       maxlength="4"
                       placeholder="请输入验证码"/>
            </b-view>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BHot from "@/components/BTXUI/core/b-hot";
    import BInput from "@/components/BTXUI/core/b-input";

    export default {
        name: "zk2861-msg-check-widget",
        components: {
            BView,
            BHot,
            BInput
        },
        data() {
            return {

                //用户输入手机号
                tel: "",

                //用户输入验证码
                check_code: "",

                //发送按钮状态
                send_btn: {
                    text: "发送验证码",
                    enable: true,
                    remaining_time: 60
                },

            }
        },
        methods: {

            //短信验证码验证
            check_msg(callback) {
                let formdata = new FormData(),
                    tel = this.tel;
                formdata.append("cmd", "check_auth_code");
                formdata.append("param", JSON.stringify({
                    product_name: "智库2861大数据平台",
                    phone_number: tel,
                    auth_code: this.check_code
                }));
                this.$axios({
                    method: "post",
                    url: "https://msg.2861.wiki/message_server/api",
                    data: formdata
                }).then((res) => {
                    let data = res.data;
                    if (data.code) {
                        callback && callback(this.tel);
                    } else {
                        this.$confirm.alert("验证码有误!", "error");
                    }
                })
            },

            //发送验证码
            $_send_code() {
                let btn = this.send_btn;
                if (btn.enable) {
                    btn.enable = false;
                    btn.text = `${btn.remaining_time} 秒后重发`;
                    let formdata = new FormData();
                    formdata.append("cmd", "send_auth_code");
                    formdata.append("param", JSON.stringify({
                        product_name: "智库2861大数据平台",
                        phone_number: this.tel
                    }));
                    this.$axios({
                        method: "post",
                        url: "https://msg.2861.wiki/message_server/api",
                        data: formdata
                    }).then((res) => {
                        let data = res.data,
                            interval_id;
                        if (data.code) {
                            interval_id = setInterval(() => {
                                btn.remaining_time--;
                                btn.text = `${btn.remaining_time} 秒后重发`;
                                if (btn.remaining_time === 0) {
                                    btn.enable = true;
                                    btn.text = "发送验证码";
                                    btn.remaining_time = 60;
                                    clearInterval(interval_id);
                                }
                            }, 1000)
                        } else {
                            btn.enable = true;
                            btn.text = "发送验证码";
                            this.$confirm.alert("手机号输入有误!", "error")
                        }
                    })
                }
            },

            //修正 webview 软键盘偏移页面 bug
            $_debug_webview() {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 0);
            }

        }
    }
</script>