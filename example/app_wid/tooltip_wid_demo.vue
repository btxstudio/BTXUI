<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>该组件主要通过 API 实现交互效果。通常会结合内容区域的 mouseenter 事件执行 <code>show()</code>，mousemove 事件执行 <code>set_pos()</code>，mouseleave 事件执行 <code>hide()</code>。执行 set_pos 方法时，可以使用事件对象的 page.X、page.Y 属性进行传参，实现跟随效果。</p>
            <div class="resize">
                <tooltip-wid ref="tooltip1" />
                <div class="pcenter">
                    <div class="pad-v-3 bg-color-lgray round-sm"
                         @mouseenter="$_show1"
                         @mousemove="$_move1"
                         @mouseleave="$_hide1">
                        鼠标悬停并移动，跟随显示 tooltip
                    </div>
                </div>
            </div>
            <hr>
            <p></p>
        </section>

        <!--自定义颜色-->
        <section>
            <h5>自定义颜色</h5>
            <p>通过 <code>colors</code> 属性可以自定义提示框颜色；<code>offset</code> 属性则可以偏移提示框定位。</p>
            <div class="resize">
                <tooltip-wid v-bind="data_2" ref="tooltip2" />
                <div class="pcenter">
                    <div class="pad-v-3 bg-color-lgray round-sm"
                         @mouseenter="$_show2"
                         @mousemove="$_move2"
                         @mouseleave="$_hide2">
                        鼠标悬停并移动，跟随显示 tooltip
                    </div>
                </div>
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import TooltipWid from "@/components/BTXUI/tooltip/tooltip-wid"

    export default {
        name: "tooltip_wid_demo",
        components: {
            HeaderInfo,
            TooltipWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: TooltipWid.name,
                    ...TooltipWid.introduce,
                },

                data_2: {
                    colors: {
                        text: "#ddd",
                        bg: "dgray",
                        line: "dark",
                        point: "blue"
                    },
                    offset: {
                        x: -40,
                        y: -170
                    }
                }

            }
        },
        computed: {

            tooltip1(){
                return this.$refs.tooltip1;
            },

            tooltip2(){
                return this.$refs.tooltip2;
            },

        },
        methods: {

            $_show1(){
                this.tooltip1.show("<b>HTML</b> 称为<span class='color-blue'>超文本标记语言</span>");
            },

            $_move1(e){
                this.tooltip1.set_pos(e.pageX, e.pageY);
            },

            $_hide1(){
                this.tooltip1.hide();
            },

            $_show2(){
                this.tooltip2.show("<b class='fsize-1d4'>Flutter</b><br> 是 Google 开源的 <span class='color-green'>UI 工具包</span>");
            },

            $_move2(e){
                this.tooltip2.set_pos(e.pageX, e.pageY);
            },

            $_hide2(){
                this.tooltip2.hide();
            }

        }
    }
</script>