<!--19-12-25-->
<template>
    <div class="search-widget flex relative" :style="'height:' + dataHeight">
        <div class="flex-grow pad-h-1d5 fsize-1d3 flex-layout-4">
            <input class="s-w-inp-text" type="text" spellcheck="false" v-model="search_text"
                   @[search_mode]="$_search"
                   :placeholder="dataNotic"/>
        </div>
        <span v-if="dataMode === 'click'" class="s-w-btn pcenter fsize-2" @click="$_search"><i class="ico-sousuo"></i></span>
    </div>
</template>

<script>
    export default {
        name: "search-widget",
        /*
        * init-data{
        *   data-mode: "搜索模式: click、input、change",
        *   [* data-notic: "搜索提示"],
        *   [* data-height: "搜索栏高度，默认：3rem"],
        * }
        * */
        props: {
            dataMode: {
                type: String,
                required: true
            },
            dataNotic: {
                type: String,
                required: false
            },
            dataHeight: {
                type: String,
                required: false
            },
        },
        computed: {

            //搜索模式
            search_mode(){
                return this.dataMode === "click"? null: this.dataMode;
            }

        },
        data(){
            return {

                //搜索内容
                search_text: "",

                //input 模式搜索计时器
                t: null,

            }
        },
        methods: {

            //搜索
            $_search(e) {
                if(e.type === "input"){ //input 模式（搜索缓冲时间间隔：1s）
                    clearTimeout(this.t)
                    this.t = setTimeout(()=>{
                        this.$emit("on_search", e.target.value);
                    }, 1000)
                }else{ //change、click 模式
                    this.$emit("on_search", this.search_text);
                }
            }

        }
    }
</script>

<style scoped>
    @import "../assets/css/search-widget.css";
    @import "../assets/css/search-widget-extend.css";
</style>