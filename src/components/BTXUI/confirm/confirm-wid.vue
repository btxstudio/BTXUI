<template>
    <pannel-wid v-model="visible" v-bind="pannel_data">
        <b-view :styles="`round-sm pcenter fsize-1.1 shadow color-rgba(24,24,24,.34) bg-color-${wid_colors.pannel}`">
            <b-view :styles="`flex-column flex-5 pad-v-2.5 pad-h-4 color-${wid_colors.text}`">
                <!--图标-->
                <b-view styles="mrg-b-1 flex-2" v-if="pannel.state">
                    <b-view styles="w-3.2 h-3.2 round fsize-1.7 flex-5"
                            :states="{
                                success: {
                                    style: `bg-color-${wid_colors.success}`,
                                    state: pannel.state === 'success'
                                },
                                fail: {
                                    style: `bg-color-${wid_colors.fail}`,
                                    state: pannel.state === 'fail'
                                },
                                notic: {
                                    style: `bg-color-${wid_colors.notic}`,
                                    state: pannel.state === 'notic'
                                },
                                loading: {
                                    style: `bg-color-${wid_colors.loading}`,
                                    state: pannel.state === 'loading'
                                },
                            }">
                        <b-icon :icon="pannel_icon" />
                    </b-view>
                </b-view>

                <!--文字-->
                <b-view styles="alpha-.9" v-html="pannel.text"></b-view>
            </b-view>

            <!--按钮-->
            <b-view v-if="pannel.mode !== 'toast'" :styles="`flex pad-3px color-${wid_colors.text}`">
                <!--alert-->
                <template v-if="pannel.mode === 'alert'">
                    <b-hot key="a" @on_click="$_close()"
                           styles="bg-color-neutral round-sm pad-h-1.2 pad-v-.7 grow-1"
                           hover="bg-color-rgba(134,134,134,0.24)">
                        {{btn_cname[0]}}
                    </b-hot>
                </template>

                <!--confirm-->
                <template v-else-if="pannel.mode === 'confirm'">
                    <b-hot key="b" @on_click="$_click('ok')"
                           styles="bg-color-neutral round-sm round-l pad-h-1.2 pad-v-.7 grow-1 mrg-r-1px"
                           hover="bg-color-rgba(134,134,134,0.24)">
                        {{btn_cname[0]}}
                    </b-hot>
                    <b-hot @on_click="$_click('cancel')"
                           styles="bg-color-neutral round-sm round-r pad-h-1.2 pad-v-.7 grow-1"
                           hover="bg-color-rgba(134,134,134,0.24)">
                        {{btn_cname[1]}}
                    </b-hot>
                </template>
            </b-view>
        </b-view>
    </pannel-wid>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BHot from "@/components/BTXUI/core/b-hot";
    import BIcon from "@/components/BTXUI/core/b-icon";
    import PannelWid from "@/components/BTXUI/pannel/pannel-wid";

    const desc = ["该组件用于显示弹窗提示。", "通常在入口页进行全局实例化绑定，之后可通过相关 API 进行使用：<code>this.$confirm['method']()</code>。"],
        extend = [],
        dependent = ["pannel-wid", "b-icon", "b-hot", "b-view"],
        api = {
            methods: [
                {
                    name: "toast",
                    ef: "显示提示弹窗",
                    params: "text, <span class=\"alpha-d7\">[duration=2000, state=\"\"]</span>",
                    return: "-"
                },
                {
                    name: "alert",
                    ef: "显示警示弹窗",
                    params: "text, <span class=\"alpha-d7\">[state=\"\", btn_cname=\"确认\"]</span>",
                    return: "-"
                },
                {
                    name: "confirm",
                    ef: "显示确认弹窗",
                    params: "text, <span class=\"alpha-d7\">[success=null, error=null, state=\"\", btn_cname=[\"确认,取消\"]]</span>",
                    return: "-"
                },
                {
                    name: "prograss",
                    ef: "显示加载弹窗",
                    params: "text, <span class=\"alpha-d7\">[result=false]</span>",
                    return: "-"
                }
            ]
        },
        init_data = `{
        /* colors: {
            matte: "遮罩颜色",
            text: "文字颜色（同时支持富文本）",
            pannel: "面板颜色",
            suucees: "成功提示图标背景色",
            fail: "失败提示图标背景色",
            notic: "信息提示图标背景色",
            loading: "加载提示图标背景色"
        } */
    }`;

    export default {
        name: "confirm-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            PannelWid,
            BView,
            BHot,
            BIcon
        },
        props: {
            colors: {
                type: Object,
                required: false
            },
        },
        data() {
            return {

                //组件配色
                wid_colors: {
                    text: "dgray",
                    pannel: "light",
                    success: "#e6fff2",
                    fail: "#f9f2f4",
                    notic: "#e6f5ff",
                    loading: "lgray",
                    ...this.colors
                },

                //pannel-wid 入参
                pannel_data: {
                    matte: true,
                    matteColor: this.colors.matte,
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