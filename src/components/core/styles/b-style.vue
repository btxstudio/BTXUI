<script>
    import preset_style from "@/components/core/styles/main";
    import theme from "@/components/core/styles/theme";

    export default {
        name: "b-style",
        /*
        * init-data{
        *   [* styles: [
        *       样式规范，基于并扩展 btx·UI 全局样式语法,...
        *   ]],
        * }
        * */
        props: {
            styles: {
                type: [Array, String],
                required: false
            },
        },
        data(){
            return {

                //解析样式
                computed_style: {}

            }
        },
        watch: {

            //解析样式
            styles(){
                this.$_parse_style();
            },

        },
        methods: {

            //样式解析
            $_parse_style(){
                let style_list = this.styles,
                    style = {};
                if(style_list){
                    if(typeof(style_list) === "string") style_list = style_list.split(" ");
                    style_list.forEach(rule=>{
                        if(typeof(rule) === "string"){
                            let _rule = rule.split("-"),
                                r1 = _rule[0],
                                r2 = _rule[1],
                                r3 = _rule[2];
                            if(preset_style[rule]){

                                //预置样式
                                style = {...style, ...preset_style[rule]};

                            }else if(r3) {

                                //样式三段赋值
                                let rule_3 = preset_style.rule_3[r2];
                                rule_3.pro.forEach(dir=>{
                                    style[`${preset_style.rule_2[r1].pro}${dir}`] = this.$_set_style_val(r3, rule_3.unit, rule_3.tmp);
                                })

                            } else if(r2){

                                //样式二段赋值
                                let rule_2 = preset_style.rule_2[r1];
                                if(rule_2){
                                    style[rule_2.pro] = this.$_set_style_val(r2, rule_2.unit, rule_2.tmp);
                                }

                            }
                        } else {

                            //原生 style
                            style = {...style, ...rule};

                        }
                    })
                }
                this.computed_style = style;
            },

            //设置样式值
            $_set_style_val(val, unit, tmp){
                val = theme[val] || val; //使用预置主题色
                val = val.split("|").map((v)=>{ //逗号解析空格
                    return v[0] === "f"? v.replace("f", "-"): v; //使用负数值
                }).join(" ");
                if(tmp) val = tmp.replace("%{}%", val); //使用 tmp 模板
                return isNaN(val)? val: `${val}${unit || ""}`;
            }

        },
        mounted(){
            this.$_parse_style();
        }
    }
</script>