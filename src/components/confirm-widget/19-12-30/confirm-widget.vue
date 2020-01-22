<!--19-12-30-->
<template>
    <div class="confirm-widget">

        <!--浮层遮罩组件-->
        <matte-widget class="flex-x-center flex-y-middle" :show-state="pannel.state" :bg-color="pannel.bg_color" z-index="100">
            <div class="c-w-pannel" @transitionend="$_ani_end" :visiable="pannel.state">
                <div class="c-w-cont">
                    <i class="c-w-ico" :state="pannel.icon_state" v-show="pannel.icon_state"></i><br/>
                    <span class="c-w-text" v-html="pannel.text"></span>
                </div>

                <!--alert-->
                <div class="c-w-btns" v-if="pannel.mode === 'alert'">
                    <a class="c-w-btn" type="ok" @click="$_click('ok')">{{pannel.btn_cname[0]}}</a>
                </div>

                <!--confirm-->
                <div class="c-w-btns" v-if="pannel.mode === 'confirm'">
                    <a class="c-w-btn" type="ok" @click="$_click('ok')">确认</a>
                    <a class="c-w-btn" type="cancel" @click="$_click('cancel')">取消</a>
                </div>

            </div>
        </matte-widget>

    </div>
</template>

<script>
    import matte from "@/components/matte-widget";

    export default {
        name: "confirm-widget",
        /*
        * init-data{
        *   [matte-color: "遮罩背景色"],
        * }
        * */
        props: {
            matteColor: {
                type: String,
                required: false
            },
        },
        data(){
            return {

                //弹窗状态
                pannel: {
                    state: false,
                    mode: "",
                    text: "",
                    icon_state: "",
                    bg_color: this.matteColor,
                    ready_callback: true,
                    close_t: null,
                    btn_cname: null
                },

                //点击回调
                callbacks: {
                    cur: null,
                    ok: null,
                    cancel: null
                },

            }
        },
        methods: {

            //设置遮罩背景色
            set_color(bg_color){
                if(bg_color) this.pannel.bg_color = bg_color;
            },

            //提示弹窗
            toast(text, duration, icon_state){
                duration = duration || 2000;
                if(this.pannel.state !== true){
                    this.pannel = {
                        state: true,
                        mode: "toast",
                        text
                    }
                    setTimeout(()=>{
                        this.close();
                    }, duration)
                    this.pannel.icon_state = icon_state || "";
                }
            },

            //警示弹窗
            alert(text, icon_state, callback, btn_cname = "确认"){
                this.pannel = {
                    state: true,
                    mode: "alert",
                    icon_state,
                    text,
                    btn_cname: [btn_cname]
                }
                this.callbacks.ok = callback;
                this.$_bind_keyboard_event();
            },

            //加载弹窗
            prograss(text, close, icon_state){
                if(close == true){//关闭弹窗
                    this.pannel.text = text;
                    this.pannel.icon_state = icon_state || "success";
                    this.close();
                }else{//开启弹窗
                    this.pannel = {
                        state: true,
                        mode: "toast",
                        icon_state: "loading",
                        text
                    }
                }
            },

            //确认弹窗
            confirm(text, success, error){
                this.pannel = {
                    state: true,
                    mode: "confirm",
                    text
                }
                this.callbacks.ok = ()=>{
                    let form_data = {};
                    this.$el.querySelectorAll("[name]").forEach((inp) => { //获取表单内容
                        form_data[inp.name] = inp.value
                    })
                    success(form_data);
                };
                this.callbacks.cancel = error;
                this.$_bind_keyboard_event();
            },

            //关闭窗口
            close(){
                this.pannel.state = false;
            },

            //执行点击操作
            $_click(operate){
                this.callbacks.cur = this.callbacks[operate];
                this.close();
                this.$_cancel_bind_keyboard_event();
            },

            //绑定键盘事件
            $_bind_keyboard_event(){
                window.focus();
                window.addEventListener("keyup", this.$_keyboard_enter);
            },

            //回车输入
            $_keyboard_enter(e){
                if(e.key === "Enter"){
                    this.callbacks.cur = this.callbacks.ok;
                    this.close();
                    this.$_cancel_bind_keyboard_event();
                }
            },

            //弹窗动画结束（执行回调函数）
            $_ani_end(){
                if(this.pannel.ready_callback === false){
                    this.pannel.ready_callback = true;
                    this.callbacks.cur && this.callbacks.cur();
                    this.callbacks.cur = this.callbacks.ok = this.callbacks.cancel = null; //清空回调注册
                }
            },

            //销毁键盘事件
            $_cancel_bind_keyboard_event(){
                this.pannel.ready_callback = false;
                window.removeEventListener("keyup", this.$_keyboard_enter);
            }

        },
        mounted(){
            this.$root.__proto__.$confirm = this;//扩展为全局工具组件
        },
        components: {
            "matte-widget": matte,
        }
    }
</script>

<style scoped>
    @import "../assets/css/confirm-widget.css";
    @import "../assets/css/confirm-widget-extend.css";
</style>