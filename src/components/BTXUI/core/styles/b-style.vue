<script>
    import preset_style from "./main";
    import theme from "./theme";

    let desc = [
        "BTX·UI 推荐使用组件取代全局样式作为前端视图层开发的基础，秉持组件复用而非样式复用可以让开发更为高效且易于管理。框架在组件分层设计上分为了 “基础组件”、“功能组件”、“项目组件”。",
        "<code>b-style</code> 是样式处理的底层模块，所有基础组件均继承自该模块，可通过 <b>styles</b> 属性进行样式绑定，其样式规范，基于并扩展 BTX·UI 全局样式语法，因此可以像添加标签类属性那样进行样式设置，目的是为了让 web 和 webApp 在样式语法上尽可能的统一。",
        {
            cover: "b-style.png",
            title: "样式解析机制原理"
        },
        "【exp】：",
        "class 全局样式：<code>&lt;div class=\"pright fsize-1d5\"&gt;hello world&lt;/div&gt;</code>",
        "styles 组件样式：<code>&lt;b-view styles=\"pright fsize-1.5\"&gt;hello world&lt;/b-view&gt;</code>",
        "组件样式使用时需要注意两点：",
        "<b>1.</b> 部分样式值添加顺序会影响样式优先级，比如添加上侧圆角样式，应该先设置尺寸，再设置方向，否则方向设置会被覆盖而无效。<br>【exp】：<code>&lt;b-view styles=\"round-sm round-t\"&gt;&lt;/b-view&gt;</code>",
        "<b>2.</b> 部分样式值需要通过组件结构嵌套进行复合使用，比如同时添加模糊和低明度滤镜样式。<br>【exp】：<code>&lt;b-view styles=\"blur-sm\"&gt;&lt;b-view styles=\"dark-sm\"&gt;&lt;/b-view&gt;&lt;/b-view&gt;</code>"
        ],
        extend = [],
        dependent = [],
        api = {
            methods: [
                {
                    name: "toggle_style",
                    ef: "切换状态样式",
                    params: "states",
                    return: "-"
                },
                {
                    name: "reset_style",
                    ef: "恢复原始样式",
                    params: "-",
                    return: "-"
                },
                {
                    name: "has_state",
                    ef: "判断是否具备某项样式状态",
                    params: "state",
                    return: "bool"
                },
                {
                    name: "append_state",
                    ef: "追加样式状态",
                    params: "styles, state",
                    return: "-"
                }
            ]
        },
        init_data = `{
        /* styles: "样式值规范" */,
        /* states: {
            state: "样式状态",
            style: "样式值规范"
        }... */,
        /* dynamic: "动态样式值规范" */
    }`;

    export default {
        name: "b-style",
        introduce: { desc, extend, dependent, api, init_data },
        props: {
            styles: {
                type: String,
                required: false,
                default: ""
            },
            states: {
                type: Object,
                required: false
            },
            dynamic: {
                type: String,
                required: false
            }
        },
        data(){
            return {

                //样式状态堆栈
                style_stack: {},

                //解析样式
                computed_style: {},

                //当前样式状态
                cur_states: []

            }
        },
        watch: {

            //监听静态状态
            states(){
                this.$_filter_styles();
            },

            //监听动态状态
            dynamic(val){
                this.$_stack_state({
                    ...this.style_stack["origin"],
                    ...this.$_parse_style(val)
                });
                this.$_filter_styles();
            }

        },
        methods: {

            //切换状态样式
            toggle_style(states){
                let style_stack = this.style_stack;
                if(typeof(states) === "string") states = [states];
                this.cur_states = states; //状态:String | 状态列表:Array
                this.computed_style = {
                    ...style_stack["origin"],
                    ...states.reduce((total, state)=>{
                        total = {...total, ...style_stack[state]}
                        return total;
                    }, {})
                };
            },

            //恢复原始样式
            reset_style(){
                this.cur_states = [];
                this.computed_style = this.style_stack["origin"];
            },

            //判断是否具备某项样式状态
            has_state(state){
                return this.style_stack[state]? true: false;
            },

            //追加样式状态
            append_state(styles, state){
                this.$_stack_state(this.$_parse_style(styles), state);
            },

            //初始化样式
            $_init_style(){
                this.append_state(`${this.styles} ${this.dynamic}`);
            },

            //初始化样式状态
            $_init_states(){
                this.$_filter_styles(true);
            },

            //筛选样式
            $_filter_styles(append){
                let states = [];
                for(let state in this.states){
                    append && this.append_state(this.states[state].style, state);
                    if(this.states[state].state) states.push(state);
                }
                this.toggle_style(states);
            },

            //样式解析
            $_parse_style(styles){
                let style = {};
                if(styles){
                    styles.split(" ").forEach(rule=>{
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
                                const rule_3 = preset_style.rule_3[r2];
                                if(rule_3){
                                    const {unit, tmp, extra, escape} = rule_3;
                                    rule_3.pro.forEach(dir=>{ //方向及复合属性相关样式
                                        style[`${preset_style.rule_2[r1].pro}${dir}`] = this.$_set_style_val(r3, unit, tmp);
                                        style = {...style, ...this.$_set_extra_style(r3, extra, escape)};
                                    })
                                }

                            } else if(r2){

                                //样式二段赋值
                                const rule_2 = preset_style.rule_2[r1];
                                if(rule_2){
                                    const {unit, tmp, extra, escape} = rule_2;
                                    style[rule_2.pro] = this.$_set_style_val(r2, unit, tmp);
                                    style = {...style, ...this.$_set_extra_style(r2, extra, escape)};
                                }

                            }
                        } else {

                            //原生 style
                            style = {...style, ...rule};

                        }
                    })
                }
                return style;
            },

            //堆栈样式
            $_stack_state(style, state="origin"){
                this.style_stack[state] = style;
            },

            //设置样式值
            $_set_style_val(val, unit, tmp){
                val = theme.preset[val] || val; //使用预置主题色
                val = val.split("|").map((v)=>{ //竖号解析空格

                    //解析负数值，exp：l-f1、transform-translate(f10,f20)
                    v = v[0] === "f"? v.replace("f", "-"): v;
                    return v.replace(/([\(,])f/g, "$1-");

                }).join(" ");
                val = isNaN(val)? val: `${val}${unit || ""}`; //添加单位
                if(tmp){ //使用 tmp 模板
                    val = tmp.replace("%{}%", val.split(",").map((color)=>{ //渐变色使用预置主题色
                        return theme.preset[color] || color
                    }));
                }
                return val;
            },

            //设置额外样式值
            $_set_extra_style(val, extra={}, escape={}){
                return {...extra, ...escape[val]};
            }

        },
        mounted(){
            this.$_init_style();
            this.$_init_states();
        }
    }
</script>