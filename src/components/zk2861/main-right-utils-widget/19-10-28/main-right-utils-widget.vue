<!--19-10-28-->
<template>
    <div class="main-right-utils-widget ani-right-slider-to-left"
         :show-state="utils_state"
         :style="'background-image: -webkit-linear-gradient(top, ' + color_style.bg_color + ', transparent);'">
        <ul class="mru-w-list">
            <li class="mru-w-item"
                v-for="(util, index) of show_utils"
                :key="index"
                :style="'color:' + (util.color || color_style.color) + '; text-shadow:' + color_style.textShadow"
                @click="util.callback">
                <span :class="'mru-w-ico ' + util.ico" :style="'color:' + color_style.color"></span>
                <span class="mru-w-text" :style="'color:' + color_style.color">{{util.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "main-right-utils-widget",
        /*
        * init-data{
        *   utils={ //预置系统工具
        *       工具id: {
        *           name: "工具名",
        *           ico: "工具图标名",
        *           color: "工具图标颜色",
        *           callback: "工具图标点击回调函数"
        *       },...
        *   },
        *   [utils-color=[ "图标预置颜色",... ],]
        * }
        * */
        props: {
            utils: {
                type: Object,
                required: true
            },
            utilsColor: {
                type: Array,
                required: false
            },
        },
        data(){
            return {

                //预制系统工具
                default_utils: this.utils,

                //显示工具清单
                utils_ready_list: [],

                //显示预制工具长度
                utils_ready_list_len: 0,

                //工具图标深浅色系样式
                color_style: {
                    color: "",
                    textShadow: "",
                    bg_color: ""
                },

                //工具栏显示状态（默认显示）
                utils_state: ""

            }
        },
        methods: {

            //重加载预置系统工具
            reload(util_list){
                this.utils_ready_list = util_list;
                this.utils_ready_list_len = util_list.length;
            },

            //追加自定义工具
            /*
            * utils: {
            *   id: "菜单按钮 id",
            *   name: "菜单按钮名",
            *   utils_color: "菜单按钮颜色索引",
            *   callback: "菜单按钮点击回调函数"
            * }
            * */
            append(utils){
                if(!utils instanceof Array) utils = [utils];
                utils.forEach((util)=>{
                    this.default_utils[util.id] = {
                        name: util.name,
                        ico: "icon-" + util.id,
                        color: this.utilsColor[util.utils_color],
                        callback: util.callback
                    }
                    if(this.utils_ready_list.indexOf(util.id) === -1) this.utils_ready_list.push(util.id);
                })
            },

            //清空自定义工具
            empty_append(){
                this.utils_ready_list.splice(this.utils_ready_list_len);
            },

            //设置工具图标深浅色系
            set_color_style(style, bg_color){
                if(style === "light"){ //浅色系（默认）
                    this.color_style = {
                        color: "#fff",
                        textShadow: "0 0 4px #111",
                        bg_color: "#171b21"
                    }
                }else if(style === "dark"){ //深色系
                    this.color_style = {
                        color: "#111",
                        textShadow: "0 0 4px #ddd",
                        bg_color: "#fff"
                    }
                }
                if(bg_color) this.color_style.bg_color = bg_color; //设置指定背景色
            },

            //切换工具栏的显示与隐藏
            toggle(operate){
                if(operate === "show"){ //显示
                    this.utils_state = "";
                }else{ //隐藏
                    this.utils_state = "hide";
                }
            }

        },
        computed: {

            //显示工具
            show_utils(){
                let utils = [],
                    util;
                this.utils_ready_list.forEach((util_name)=>{
                    util = this.default_utils[util_name];
                    util.id = util_name;
                    utils.push(util);
                })
                return utils;
            }

        },
        mounted(){
            this.$root.__proto__.$mainRightUtils = this;//扩展为全局工具组件
        }
    }
</script>

<style scoped>
    @import "../assets/css/main-right-utils-widget.css";
</style>