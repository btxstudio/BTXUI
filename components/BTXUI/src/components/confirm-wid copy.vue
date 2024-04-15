<template>
    <b-view :class="`round-sm pcenter fsize-1d1 shadow color-rgba_24_24_24_d34 bg-color-${wid_colors.pannel}`">
        <b-view :class="`flex-column flex-5 pad-v-2d5 pad-h-4 color-${wid_colors.text}`">
            <!--图标-->
            <b-view class="mrg-b-1 flex-2" v-if="pannel.state">
                <b-view class="w-3d2 h-3d2 round fsize-1d7 flex-5"
                    :state="pannel.state"
                    :states="{
                        success: `bg-color-${wid_colors.success}`,
                        fail: `bg-color-${wid_colors.fail}`,
                        notic: `bg-color-${wid_colors.notic}`,
                        loading: `bg-color-${wid_colors.loading}`,
                    }">
                    <b-icon :icon="pannel_icon" />
                </b-view>
            </b-view>

            <!--文字-->
            <b-view class="alpha-d9">
                <div v-html="pannel.text"></div>
            </b-view>
        </b-view>

        <!--按钮-->
        <b-view v-if="pannel.mode !== 'toast'" :class="`flex pad-3-px color-${wid_colors.text}`">
            <!--alert-->
            <template v-if="pannel.mode === 'alert'">
                <b-hot key="a" @on_click="$_close()"
                        class="bg-color-neutral round-sm pad-h-1d2 pad-v-d7 grow-1"
                        hover="bg-color-rgba_134_134_134_d24">
                    {{ btn_cname[0] }}
                </b-hot>
            </template>

            <!--confirm-->
            <template v-else-if="pannel.mode === 'confirm'">
                <b-hot key="b" @on_click="$_click('ok')"
                        class="bg-color-neutral round-sm round-l pad-h-1d2 pad-v-d7 grow-1 mrg-r-1-px"
                        hover="bg-color-rgba_134_134_134_d24">
                    {{ btn_cname[0] }}
                </b-hot>
                <b-hot @on_click="$_click('cancel')"
                        class="bg-color-neutral round-sm round-r pad-h-1d2 pad-v-d7 grow-1"
                        hover="bg-color-rgba_134_134_134_d24">
                    {{ btn_cname[1] }}
                </b-hot>
            </template>
        </b-view>
    </b-view>
</template>

<script setup lang="ts">
    import { computed, reactive, onMounted, onBeforeUnmount } from "vue"
    import BHot from "./core/b-hot.vue";
    import BView from "./core/b-view.vue";
    import BIcon from "./core/b-icon.vue";

    const props = defineProps<{
        colors: {},
    }>();

    //面板图标
    const pannel_icon = computed(() => {
        let state = this.pannel.state;
        return (state === "success" || state === "fail" || state === "notic" || state === "loading")? `ani_${state}`: state;
    })

    //组件配色
    const wid_colors = reactive({
        text: "dgray",
        pannel: "light",
        success: "#e6fff2",
        fail: "#f9f2f4",
        notic: "#e6f5ff",
        loading: "lgray",
        ...this.colors
    });

    //弹窗状态
    const pannel = {
        mode: "",
        text: "",
        state: "",
        close_t: null,
    };

    //按钮别名
    const btn_cname = null;

    // 点击回调
    const callbacks = {
        ok: null,
        cancel: null
    };

    //提示弹窗
    const toast = (text, duration=2000, state="") => {
        this.$_show();
        this.pannel = {
            mode: "toast",
            state,
            text
        }
        setTimeout(() => {
            this.$_close();
        }, duration)
    };

    //警示弹窗
    const alert = (text, state="", btn_cname="确认") => {
        this.$_show();
        this.pannel = {
            mode: "alert",
            state,
            text
        }
        this.btn_cname = [btn_cname];
        this.$_bind_keyboard_event();
    };

    //确认弹窗
    const confirm = (text, success=null, error=null, state="", btn_cname=["确认","取消"]) => {
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
    };

    //加载弹窗
    const prograss = (text, result=false) => {
        if(result === true){ //直接关闭
            this.toast("", 0);
        } else if(typeof(result) === "string") { //状态关闭
            this.toast(text, 2000, result);
        } else { //开启弹窗
            this.$_show();
            this.pannel = {
                mode: "toast",
                state: "loading",
                text
            }
        }
    };

    //关闭窗口
    const $_close = (callback?) => {
        callback && callback();
        $_cancel_bind_keyboard_event();
    };

    //显示窗口
    const $_show = () => {
    };

    //执行点击操作
    const $_click = (operate) => {
        this.$_close(this.callbacks[operate]);
    };

    //绑定键盘事件
    const $_bind_keyboard_event = () => {
        window.focus();
        window.addEventListener("keyup", this.$_keyboard_enter);
    };

    //回车输入
    const $_keyboard_enter = (e) => {
        if (e.key === "Enter") {
            this.$_close(this.callbacks.ok);
        }
    };

    //销毁键盘事件
    const $_cancel_bind_keyboard_event = () => {
        window.removeEventListener("keyup", this.$_keyboard_enter);
    };

    onMounted(() => {
        // this.$root.__proto__.$confirm = this; // 扩展为全局工具组件
    });
    onBeforeUnmount(() => {
        $_close();
    }) 
</script>