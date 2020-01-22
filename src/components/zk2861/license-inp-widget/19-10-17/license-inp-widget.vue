<!--19-10-17-->
<template>
    <div class="license-inp-widget">
        <div class="li-w-title">{{licenseTitle}}</div>
        <div class="li-w-inps">
            <input class="m-w-inp" ref="$licenseInp" type="text" maxlength="1"
                v-for="(item, index) of license_value"
                v-model="item.val"
                :key="index"
                @input="$_auto_focus(index, $event)"
                @keyup="$_clear(index, $event)"
                @webkitAnimationEnd="$_input_structure"
                :style="'animationDelay:' + (index * .2 + .7) + 's'"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "license-inp-widget",
        /*
        * init-data{
        *   license-len: "输入项长度",
        *   [license-title: "输入组件标题",]
        *   [license-default: "默认初始值",]
        * }
        * */
        props: {
            licenseLen: {
                type: String,
                required: true
            },
            licenseTitle: {
                type: String,
                required: false
            },
            licenseDefault: {
                type: String,
                required: false
            }
        },
        data(){
            return {

                //输入法启用状态
                zh_inp_state: false,

                //输入 license 值
                license_value: [],

                //当前操作 license 索引项
                cur_focus: 0,

                //组件框构造完成数目
                input_structured: 0

            }
        },
        methods: {

            //获取输入 license
            get_license(){
                let license = "";
                this.license_value.map((item)=>{
                    license += item.val;
                });
                return license;
            },

            //初始化数据及状态
            $_init(){
                for(let i=0; i<this.licenseLen; i++){
                    this.license_value.push({
                        val: this.licenseDefault[i] || ""
                    });
                }
            },

            //组件框构造完成
            $_input_structure(){
                if(++this.input_structured == this.licenseLen) document.querySelector(".m-w-inp").focus();
            },

            //输入后自动聚焦后项
            $_auto_focus(i, e){
                let inp_val = e.data || e.target.value,
                    inps = document.querySelectorAll(".m-w-inp");
                if(inp_val){
                    inps[i].blur();
                    inps[i + 1] && inps[i + 1].focus();
                }
            },

            //清除当前输入
            $_clear(index, e){
                if(e.key === "Backspace") this.license_value[index].val = "";
            }

        },
        mounted(){
            this.$_init();
        }
    }
</script>

<style scoped>
    @import "../assets/css/license-inp-widget.css";
</style>