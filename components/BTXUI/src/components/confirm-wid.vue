<template>
    <dialog open="true">
        <div>hello dialog</div>
        <div><button onclick="document.querySelector('dialog').close()">关闭</button></div>
    </dialog>
</template>

<script setup lang="ts">
    import { computed, reactive, onMounted, onBeforeUnmount } from "vue"
    import BHot from "./core/b-hot.vue";
    import BView from "./core/b-view.vue";
    import BIcon from "./core/b-icon.vue";

    defineExpose({
        show: () => {
            console.log(1111);
        }
    })

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