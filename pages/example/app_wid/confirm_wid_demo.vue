<template>
    <article>
        <header-info v-bind="introduce" />

        <!--toast 弹窗-->
        <section>
            <h5>toast 弹窗</h5>
            <p>使用 toast 方法开启提示弹窗，参数 <code>duration</code> 可设置弹窗持续显示时间；<code>state</code> 可设置弹窗状态图标，其中：success 成功、fail 失败、notic 提示，为动态图标。</p>
            <div class="resize flex">
                <div class="mrg-r-1">
                    <btn-wid @on_click="$_show_pannel1" btnText="显示 toast 弹窗" />
                </div>
                <div class="mrg-r-1">
                    <btn-wid @on_click="$_show_pannel1_fail" btnText="fail 弹窗" />
                </div>
                <div class="mrg-r-1">
                    <btn-wid @on_click="$_show_pannel1_success" btnText="success 弹窗" />
                </div>
                <btn-wid @on_click="$_show_pannel1_notic" btnText="notic 弹窗" />
            </div>
        </section>

        <!--alert 弹窗-->
        <section class="mrg-t-5">
            <h5>alert 弹窗</h5>
            <p>使用 alert 方法开启警示弹窗，参数 <code>btn_cname</code> 可设置按钮文字，且支持键盘"回车"触发按钮。</p>
            <div class="resize flex">
                <btn-wid @on_click="$_show_pannel2" btnText="显示 alert 弹窗" />
            </div>
        </section>

        <!--confirm 弹窗-->
        <section class="mrg-t-5">
            <h5>confirm 弹窗</h5>
            <p>使用 confirm 方法开启确认弹窗，参数 <code>success</code> 可设置确认回调（支持键盘"回车"触发）；<code>error</code> 可设置取消回调。</p>
            <div class="resize flex">
                <btn-wid @on_click="$_show_pannel3" btnText="显示 confirm 弹窗" />
            </div>
            <p>下一步操作：<span :class="data_3? 'color-green': 'color-red'">{{data_3? '已获取通讯录权限': '未获取权限'}}</span></p>
        </section>

        <!--prograss 弹窗-->
        <section class="mrg-t-5">
            <h5>prograss 弹窗</h5>
            <p>使用 prograss 方法开启加载弹窗，参数 <code>result</code> 可设置加载结束弹窗状态图标（success 成功、fail 失败），若为 true 则会执行关闭。</p>
            <div class="resize flex">
                <div class="mrg-r-1">
                    <btn-wid @on_click="$_show_pannel4_success" btnText="prograss 弹窗 3 秒加载成功" />
                </div>
                <btn-wid @on_click="$_show_pannel4_fail" btnText="prograss 弹窗 3 秒加载失败" />
            </div>
            <p>加载状态：<span :class="`color-${data_4.color}`">{{data_4.text}}</span></p>
        </section>

        <!--prograss 弹窗显示实时加载进度-->
        <section class="mrg-t-5">
            <h5>prograss 弹窗显示实时加载进度</h5>
            <p>可多次执行 prograss 方法修改其中 text 信息以显示实时加载进度。</p>
            <div class="resize flex">
                <btn-wid @on_click="$_show_pannel5" btnText="开始加载" />
            </div>
            <p>加载状态：<span :class="data_5 === '加载完成!'? 'color-green': ''">{{data_5}}</span></p>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import headerInfo from "@/components/header-info.vue";
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js";

    const introduce: HeaderInfoData = {
        name: "confirm-wid", 
        desc: ["该组件用于显示弹窗提示。", "通常在入口页进行全局实例化绑定，之后可通过相关 API 进行使用：<code>this.$confirm['method']()</code>。"],
        dependent: ["b-icon", "b-hot", "b-view"], 
        api: {
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
        initData: [
            ["colors", "{*}", "配色方案"],
            ["colors.matte", "string", "遮罩颜色"],
            ["colors.text", "string", "文字颜色（同时支持富文本）"],
            ["colors.pannel", "string", "面板颜色"],
            ["colors.suucees", "string", "成功提示图标背景色"],
            ["colors.fail", "string", "失败提示图标背景色"],
            ["colors.notic", "string", "信息提示图标背景色"],
            ["colors.loading", "string", "加载提示图标背景色"],
        ] 
    };

    //数据3
    const data_3 = false;

    //数据4
    const data_4 = {
        color: "",
        text: "尚未加载"
    };

    //数据5
    const data_5 = "尚未加载";

    //显示面板1
    const $_show_pannel1 = () => {
        // toast("hello javascript", 3000)
    };

    //显示面板1 - fail 状态
    const $_show_pannel1_fail = () => {
        this.$confirm.toast("this operate is fail", 3000, "fail")
    };

    //显示面板1 - success 状态
    const $_show_pannel1_success = () => {
        this.$confirm.toast("this operate is success", 3000, "success")
    };

    //显示面板1 - notic 状态
    const $_show_pannel1_notic = () => {
        this.$confirm.toast("this operate has done", 3000, "notic")
    };

    //显示面板2
    const $_show_pannel2 = () => {
        this.$confirm.alert("当前应用已获取您的本地定位!", "success", "已知晓")
    };

    //显示面板3
    const $_show_pannel3 = () => {
        this.$confirm.confirm("当前应用需要获取您的手机通讯录<br>是否同意?", ()=>{
            this.data_3 = true;
        }, ()=>{
            this.data_3 = false;
        })
    };

    //显示面板4 - success 状态
    const $_show_pannel4_success = () => {
        this.$confirm.prograss("页面获取中!");
        this.data_4 = {
            text: "加载中...",
            color: "dgray"
        };
        setTimeout(()=>{
            this.$confirm.prograss("页面获取成功!", "success");
            this.data_4 = {
                text: "加载成功!",
                color: "green"
            };
        }, 3000)
    };

    //显示面板4 - fail 状态
    const $_show_pannel4_fail = () => {
        this.$confirm.prograss("页面获取中!");
        this.data_4 = {
            text: "加载中...",
            color: "dgray"
        };
        setTimeout(()=>{
            this.$confirm.prograss("页面获取失败!", "fail");
            this.data_4 = {
                text: "加载失败!",
                color: "red"
            };
        }, 3000)
    };

    //显示面板5
    const $_show_pannel5 = () => {
        this.$confirm.prograss("加载进度 0%");
        this.data_5 = "加载中...";
        let prograss = 0,
            t = setInterval(()=>{
                prograss += 10;
                if(prograss === 100){
                    this.$confirm.prograss("数据获取完成!", "success");
                    this.data_5 = "加载完成!";
                    clearInterval(t);
                }else{
                    this.$confirm.prograss(`加载进度 ${prograss}%`);
                }
            }, 1000)
    };
</script>