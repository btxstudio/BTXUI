<!--19-05-29-->
<template>
    <div class="radio-widget" @click="$_radio_select">
        <div class="r-w-item" :state="radio.value === cur_data.value? 'act': ''" :style="{color: radio.color}" :index="index" :key="index" v-for="(radio, index) of radios">
            <span class="r-w-ico" v-show="radio.icon"><i :class="radio.icon"></i></span>
            <span class="r-w-text" v-show="radio.name">{{radio.name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "radio-widget",
        /*
        * init-data{
        *   radios: [
        *       {
        *           value: "按钮值",
        *           [color: "颜色",]
        *           [name: "按钮名",]
        *           [icon: "图标类型",]
        *       },...
        *   ],
        *   [style-type: "自定义样式风格"]
        * }
        * */
        props: {
            radios: {
                type: Array,
                required: true
            },
        },
        data(){
            return {

                /*当前选项*/
                cur_data: {
                    value: ""
                }

            }
        },
        methods: {

            /*单选按钮选择*/
            $_radio_select(e){
                let target = e.target;
                if(target.className === "r-w-item"){
                    this.cur_data = this.radios[target.getAttribute("index")];
                }
            }

        }
    }
</script>

<style lang="less" scoped>
    @import "../../less/radio-widget.less";
</style>