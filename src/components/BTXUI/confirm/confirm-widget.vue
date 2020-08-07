<template>
    <pannel-widget v-model="visible" v-bind="pannel_data">
        <b-view styles="bg-color-light round-sm pcenter fsize-1.3 color-rgba(24,24,24,.34) shadow">
            <b-view styles="flex-column flex-5 pad-v-2.5 pad-h-4 color-dgray">
                <!--图标-->
                <b-view styles="mrg-b-1 flex-2" v-if="pannel.state">
                    <b-view styles="w-3.2 h-3.2 round fsize-1.7 flex-5"
                            :states="{
                                success: {
                                    style: 'bg-color-#e6fff2',
                                    state: pannel.state === 'success'
                                },
                                fail: {
                                    style: 'bg-color-#f9f2f4',
                                    state: pannel.state === 'fail'
                                },
                                notic: {
                                    style: 'bg-color-#e6f5ff',
                                    state: pannel.state === 'notic'
                                },
                                loading: {
                                    style: 'bg-color-lgray',
                                    state: pannel.state === 'loading'
                                },
                            }">
                        <b-icon :icon="pannel_icon" />
                    </b-view>
                </b-view>

                <!--文字-->
                <b-view v-html="pannel.text"></b-view>
            </b-view>

            <!--按钮-->
            <b-view v-if="pannel.mode !== 'toast'" styles="flex pad-3px">
                <!--alert-->
                <template v-if="pannel.mode === 'alert'">
                    <b-hot key="a" @on_click="$_close()"
                        styles="bg-color-lgray color-dgray round-sm pad-1 grow-1"
                        hover="bg-color-#ddd">
                        {{btn_cname[0]}}
                    </b-hot>
                </template>

                <!--confirm-->
                <template v-else-if="pannel.mode === 'confirm'">
                    <b-hot key="b" @on_click="$_click('ok')"
                           styles="bg-color-lgray color-dgray round-sm round-l pad-1 grow-1 mrg-r-1px"
                           hover="bg-color-#ddd">
                        {{btn_cname[0]}}
                    </b-hot>
                    <b-hot @on_click="$_click('cancel')"
                           styles="bg-color-lgray color-dgray round-sm round-r pad-1 grow-1"
                           hover="bg-color-#ddd">
                        {{btn_cname[1]}}
                    </b-hot>
                </template>
            </b-view>
        </b-view>
    </pannel-widget>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BHot from "@/components/BTXUI/core/b-hot";
    import BIcon from "@/components/BTXUI/core/b-icon";
    import PannelWidget from "@/components/BTXUI/pannel/pannel-widget";

    export default {
        name: "confirm-widget",
        components: {
            PannelWidget,
            BView,
            BHot,
            BIcon
        },
        /*
        * init-data{
        *   [* matte-color: "遮罩颜色"],
        * }
        * */
        props: {
            matteColor: {
                type: String,
                required: false
            },
        },
        data() {
            return {

                //pannel-widget 入参
                pannel_data: {
                    matte: true,
                    matteColor: this.matteColor,
                    matteZIndex: 10
                },

                //弹窗显示状态
                visible: false,

                //弹窗状态
                pannel: {
                    mode: "",
                    text: "",
                    state: "",
                    close_t: null,
                },

                //按钮别名
                btn_cname: null,

                //点击回调
                callbacks: {
                    ok: null,
                    cancel: null
                },

            }
        },
        computed: {

            //面板图标
            pannel_icon(){
                let state = this.pannel.state;
                return (state === "success" || state === "fail" || state === "notic" || state === "loading")? `ani_${state}`: state;
            }

        },
        methods: {

            //提示弹窗
            toast(text, duration=2000, state="") {
                this.$_show();
                this.pannel = {
                    mode: "toast",
                    state,
                    text
                }
                setTimeout(() => {
                    this.$_close();
                }, duration)
            },

            //警示弹窗
            alert(text, state="", btn_cname="确认") {
                this.$_show();
                this.pannel = {
                    mode: "alert",
                    state,
                    text
                }
                this.btn_cname = [btn_cname];
                this.$_bind_keyboard_event();
            },

            //确认弹窗
            confirm(text, success=null, error=null, state="", btn_cname=["确认","取消"]) {
                this.$_show();
                this.pannel = {
                    mode: "confirm",
                    text,
                    state
                }
                this.btn_cname = btn_cname;
                this.callbacks.ok = success;
                this.callbacks.cancel = error;
                this.$_bind_keyboard_event();
            },

            //加载弹窗
            prograss(text, result=false) {
                if (result) { //关闭弹窗
                    this.toast(text, 2000, result);
                } else { //开启弹窗
                    this.$_show();
                    this.pannel = {
                        mode: "toast",
                        state: "loading",
                        text
                    }
                }
            },

            //关闭窗口
            $_close(callback) {
                callback && callback();
                this.visible = false;
                this.$_cancel_bind_keyboard_event();
            },

            //显示窗口
            $_show() {
                this.visible = true;
            },

            //执行点击操作
            $_click(operate) {
                this.$_close(this.callbacks[operate]);
            },

            //绑定键盘事件
            $_bind_keyboard_event() {
                window.focus();
                window.addEventListener("keyup", this.$_keyboard_enter);
            },

            //回车输入
            $_keyboard_enter(e) {
                if (e.key === "Enter") {
                    this.$_close(this.callbacks.ok);
                }
            },

            //销毁键盘事件
            $_cancel_bind_keyboard_event() {
                window.removeEventListener("keyup", this.$_keyboard_enter);
            }

        },
        mounted() {
            this.$root.__proto__.$confirm = this;//扩展为全局工具组件
        },
        beforeDestroy() {
            this.$_close();
        }
    }
</script>