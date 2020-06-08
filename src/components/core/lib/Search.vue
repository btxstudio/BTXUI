<script>
    export default {
        name: "Search",
        /*
        * init-data{
        *   [* data-mode: "搜索模式: input、change"],
        *   [* data-notic: "搜索提示"],
        * }
        * */
        props: {
            dataMode: {
                type: String,
                required: false
            },
            dataNotic: {
                type: String,
                required: false
            }
        },
        data() {
            return {

                //搜索内容
                search_text: "",

                //input 模式搜索计时器
                t: null,

            }
        },
        methods: {

            //清空输入内容
            clear_text(){
                this.search_text = "";
            },

            //搜索
            $_search(e) {
                if (this.dataMode === "input") { //input 模式（搜索缓冲时间间隔：1s）
                    clearTimeout(this.t)
                    this.t = setTimeout(() => {
                        this.search_text = e.target.value;
                        this.$emit("on_search", this.search_text);
                    }, 1000)
                } else { //change 模式
                    this.$emit("on_search", this.search_text);
                }
            },

            //修正 webview 软键盘偏移页面 bug
            $_debug_webview(){
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 0);
            }

        }
    }
</script>