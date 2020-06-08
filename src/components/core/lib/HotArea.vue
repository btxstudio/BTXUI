<script>
    export default {
        name: "HotArea",
        /*
        * init-data{
        *   [* hot-type: "按钮类型：路由、链接、其它参数],
        * }
        * */
        props: {
            hotType: {
                type: String,
                required: false,
                default: ""
            }
        },
        data(){
            return {

                //超链接按钮
                a: document.createElement("a")

            }
        },
        mounted(){
            if(this.hotType.search("http") === 0) {
                this.a.href = this.hotType;
                this.a.target = "_blank";
            }else if(this.hotType[0] === "/") {
                this.a.href = "#" + this.hotType;
            }else {
                this.a = null;
            }
        },
        methods: {

            //执行点击
            $_click(){
                this.$emit("on_click", this.hotType);
                let a = this.a;
                a && a.click();
            }

        }
    }
</script>