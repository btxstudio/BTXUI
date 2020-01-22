<!--19-05-27-->
<template>
    <ul class="tab-widget" :style-type="styleType">
        <li class="t-w-item" :state="tab.state" :dark-text="tab.dark_text" :style="'color:' + tab.ico_act_color" :index="index" v-for="(tab, index) of tabs" @click="$_tab_sel">
            <router-link class="t-w-item-btn" :to="tab.link" v-if="tab.type === 'route'">
                <i v-if="tab.ico" :class="tab.ico" :style="'color:' + tab.ico_color"></i>
                <span class="t-w-item-text">{{tab.name}}</span>
            </router-link>
            <span class="t-w-item-btn" v-else>
                <i v-if="tab.ico" :class="tab.ico" :style="'color:' + tab.ico_color"></i>
                <span class="t-w-item-text">{{tab.name}}</span>
            </span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "tab-widget",
        /*
        * init-data{
        *   tabs: [
        *       {
        *           name: "标签名",
        *           [state: "标签状态，空或'act'",]
        *           [type: "标签类型，空或'route'",]
        *           [link: "route 类型路由地址",]
        *           [ico: "字体图标类名",]
        *           [ico_act_color: "字体图标激活状态颜色",]
        *           [dark_text: "文字激活状态是否深色字体风格",]
        *           [callback: "点击操作回调函数",]
        *       },...
        *   ],
        *   [style-type: "自定义样式风格"]
        * }
        * */
        props: {
            tabs: {
                type: Array,
                required: true
            },
            styleType: {
                type: String,
                required: false
            },
        },
        methods: {

            /*初始化数据*/
            $_init_data(){
                this.tabs.forEach(tab => {
                    if(!tab.state) tab.state = "";
                })
            },

            /*标签触发*/
            $_tab_sel(e) {
                let $tab = e.currentTarget,
                    cur_index = $tab.getAttribute("index");
                if(this.tabs.length === 1) return;//只有1项标签时不触发
                this.tabs.forEach((tab, index) => {
                    tab.state = "";
                    if (index == cur_index) {//普通按钮激活
                        this.$_btn_act(tab);
                    }
                })
            },

            /*链接按钮激活*/
            $_link_btn_act(route){
                let is_link = false,
                    link_tab;
                this.tabs.forEach((tab) => {
                    if(tab.state === "act"){
                        tab.state = "";
                        link_tab = tab;
                    }
                    if (tab.type === "route"){
                        if(tab.link.split("?")[0] === route.path){
                            is_link = true;
                            this.$_btn_act(tab);
                        }
                    }
                })
                if(is_link === false){//无链接按钮分组
                    if(link_tab) link_tab.state = "act";
                }
            },

            /*标签按钮状态激活*/
            $_btn_act(tab){
                tab.callback && tab.callback();//执行回调函数
                tab.state = "act";
            }

        },
        watch: {
            $route(to) {
                this.$_link_btn_act(to);
            }
        },
        beforeMount(){
            this.$_init_data();
        },
        mounted(){
            this.$_link_btn_act(this.$route);
        },
    }
</script>

<style scoped>
    @import "../../assets/css/tab-widget.css";
</style>