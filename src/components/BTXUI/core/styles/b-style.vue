<script>
    import preset_style from "./main";
    import theme from "./theme";

    export default {
        name: "b-style",
        /*
        * init-data{
        *   [* styles: [
        *       样式规范，基于并扩展 btx·UI 全局样式语法,...
        *   ]],
        *   [* states: {
        *       样式状态名: 样式规范,
        *       ...
        *   }]
        * }
        * */
        props: {
            styles: {
                type: [Array, String],
                required: false
            },
            states: {
                type: Object,
                required: false
            },
        },
        data(){
            return {

                //样式状态堆栈
                style_stack: {},

                //解析样式
                computed_style: {},

                //当前样式状态
                cur_state: []

            }
        },
        watch: {

            //监听样式状态
            states(){
                this.$_init_style();
            }

        },
        methods: {

            //切换样式状态
            /*
            * states: 状态:String | 状态列表:Array
            */
            toggle_style(states){
                let style_stack = this.style_stack;
                if(typeof(states) === "string") states = [states];
                this.cur_state = states;
                this.computed_style = {
                    ...style_stack["origin"],
                    ...states.reduce((total, state)=>{
                        total = {...total, ...style_stack[state]}
                        return total;
                    }, {})
                };
            },

            //追加样式
            append_style(styles, state){
                this.$_parse_style(styles, state);
            },

            //恢复样式
            reset_style(){
                this.cur_state = [];
                this.computed_style = this.style_stack["origin"];
            },

            //初始化样式状态
            $_init_states(){
                for(let state in this.states){
                    this.append_style(this.states[state].style, state);
                }
                this.$_parse_style(this.styles);
            },

            //初始化样式
            $_init_style(){
                let states = [];
                for(let state in this.states){
                    if(this.states[state].state) states.push(state);
                }
                this.toggle_style(states);
            },

            //样式解析
            $_parse_style(styles, state="origin"){
                let style = {};
                if(styles){
                    if(typeof(styles) === "string") styles = styles.split(" ");
                    styles.forEach(rule=>{
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
                this.style_stack[state] = style;
            },

            //设置样式值
            $_set_style_val(val, unit, tmp){
                val = theme[val] || val; //使用预置主题色
                val = val.split("|").map((v)=>{ //逗号解析空格
                    return v[0] === "f"? v.replace("f", "-"): v; //使用负数值
                }).join(" ");
                if(tmp){ //使用 tmp 模板
                    val = tmp.replace("%{}%", val.split(",").map((color)=>{ //渐变色使用预置主题色
                        return theme[color] || color
                    }));
                }
                return isNaN(val)? val: `${val}${unit || ""}`;
            }

        },
        mounted(){
            this.$_init_states();
            this.$_init_style();
        }
    }
</script>