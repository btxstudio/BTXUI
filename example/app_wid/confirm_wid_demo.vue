<template>
    <article>
        <header-info v-bind="header_info" />

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
            <hr>
            <p></p>
        </section>

        <!--alert 弹窗-->
        <section>
            <h5>alert 弹窗</h5>
            <p>使用 alert 方法开启警示弹窗，参数 <code>btn_cname</code> 可设置按钮文字，且支持键盘"回车"触发按钮。</p>
            <div class="resize flex">
                <btn-wid @on_click="$_show_pannel2" btnText="显示 alert 弹窗" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--confirm 弹窗-->
        <section>
            <h5>confirm 弹窗</h5>
            <p>使用 confirm 方法开启确认弹窗，参数 <code>success</code> 可设置确认回调（支持键盘"回车"触发）；<code>error</code> 可设置取消回调。</p>
            <div class="resize flex">
                <btn-wid @on_click="$_show_pannel3" btnText="显示 confirm 弹窗" />
            </div>
            <p>下一步操作：<span :class="data_3? 'color-green': 'color-red'">{{data_3? '已获取通讯录权限': '未获取权限'}}</span></p>
            <hr>
            <p></p>
        </section>

        <!--prograss 弹窗-->
        <section>
            <h5>prograss 弹窗</h5>
            <p>使用 prograss 方法开启加载弹窗，参数 <code>result</code> 可设置加载结束弹窗状态图标（success 成功、fail 失败），若为 true 则会执行关闭。</p>
            <div class="resize flex">
                <div class="mrg-r-1">
                    <btn-wid @on_click="$_show_pannel4_success" btnText="prograss 弹窗 3 秒加载成功" />
                </div>
                <btn-wid @on_click="$_show_pannel4_fail" btnText="prograss 弹窗 3 秒加载失败" />
            </div>
            <p>加载状态：<span :class="`color-${data_4.color}`">{{data_4.text}}</span></p>
            <hr>
            <p></p>
        </section>

        <!--prograss 弹窗显示实时加载进度-->
        <section>
            <h5>prograss 弹窗显示实时加载进度</h5>
            <p>可多次执行 prograss 方法修改其中 text 信息以显示实时加载进度。</p>
            <div class="resize flex">
                <btn-wid @on_click="$_show_pannel5" btnText="开始加载" />
            </div>
            <p>加载状态：<span :class="data_5 === '加载完成!'? 'color-green': ''">{{data_5}}</span></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BtnWid from "@/components/BTXUI/btn/btn-wid"
    import ConfirmWid from "@/components/BTXUI/confirm/confirm-wid"

    export default {
        name: "confirm_wid_demo",
        components: {
            HeaderInfo,
            BtnWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: ConfirmWid.name,
                    ...ConfirmWid.introduce,
                },

                //数据3
                data_3: false,

                //数据4
                data_4: {
                    color: "",
                    text: "尚未加载"
                },

                //数据5
                data_5: "尚未加载"

            }
        },
        methods: {

            //显示面板1
            $_show_pannel1(){
                this.$confirm.toast("hello javascript", 3000)
            },

            //显示面板1 - fail 状态
            $_show_pannel1_fail(){
                this.$confirm.toast("this operate is fail", 3000, "fail")
            },

            //显示面板1 - success 状态
            $_show_pannel1_success(){
                this.$confirm.toast("this operate is success", 3000, "success")
            },

            //显示面板1 - notic 状态
            $_show_pannel1_notic(){
                this.$confirm.toast("this operate has done", 3000, "notic")
            },

            //显示面板2
            $_show_pannel2(){
                this.$confirm.alert("当前应用已获取您的本地定位!", "success", "已知晓")
            },

            //显示面板3
            $_show_pannel3(){
                this.$confirm.confirm("当前应用需要获取您的手机通讯录<br>是否同意?", ()=>{
                    this.data_3 = true;
                }, ()=>{
                    this.data_3 = false;
                })
            },

            //显示面板4 - success 状态
            $_show_pannel4_success(){
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
            },

            //显示面板4 - fail 状态
            $_show_pannel4_fail(){
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
            },

            //显示面板5
            $_show_pannel5(){
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
            },

        }
    }
</script>