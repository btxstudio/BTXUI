<template>
    <article>
        <header-info v-bind="header_info" />

        <section>
            <h5>基础自定义弹窗使用</h5>
            <p>默认为居中弹出效果，且没有遮罩背景。</p>
            <span class="color-sub flex">
                <a href="javascript:;" class="pad-v-d5 pad-h-2 round-sm bg-color-dgray color-light" @click="$_toggle_pannel1">切换弹窗</a>
            </span>
            <pannel-widget v-model="dataList_1.visible">
                <div class="color-mgray pcenter pad-2 w-20 round-md bg-color-light line thick-1 line-mgray shadow-sm">
                    <span class="color-blue">html + css</span>
                </div>
            </pannel-widget>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>弹窗遮罩</h5>
            <p>可以启用 <code>matte</code> 属性来设置面板遮罩背景，默认为透明色，z 轴层级为 9。可以通过 <code>matte-color</code> 属性设置遮罩颜色，以及 <code>matte-z-index</code> 属性设置遮罩 z 轴层级。此外可以通过 <code>close-btn</code> 属性启用关闭按钮，或通过 <code>matte-close</code> 属性设置 "click" 或 "dblclick" 启用遮罩自身单击或双击关闭效果。</p>
            <p>【exp】设置半透明灰色遮罩，可单击关闭，同时显示面板关闭按钮：</p>
            <span class="color-sub flex">
                <a href="javascript:;" class="pad-v-d5 pad-h-2 round-sm bg-color-dgray color-light" @click="$_toggle_pannel2">显示弹窗</a>
            </span>
            <pannel-widget v-model="dataList_2.visible" v-bind="dataList_2.props">
                <div class="color-mgray pcenter pad-2 w-25 round-md bg-color-light line thick-1 line-mgray shadow-sm">
                    <span class="color-blue">javascript + typescript</span>
                </div>
            </pannel-widget>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>定位弹窗</h5>
            <p>可以通过 <code>pos</code> 属性来对面板进行九宫格定位，属性值：1-9。之后可以通过 <code>offset-styles</code> 属性来进行位移调整。</p>
            <p>【exp】右下方显示弹窗，向上位移 100px，向左位移 100px：</p>
            <span class="color-sub flex">
                <a href="javascript:;" class="pad-v-d5 pad-h-2 round-sm bg-color-dgray color-light" @click="$_toggle_pannel3">显示弹窗</a>
            </span>
            <pannel-widget v-model="dataList_3.visible" v-bind="dataList_3.props">
                <div class="color-mgray pcenter pad-2 w-25 round-md bg-color-light line thick-1 line-mgray shadow-sm">
                    <span class="color-blue">vue VS react</span>
                </div>
            </pannel-widget>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>全屏弹窗</h5>
            <p>可以通过 <code>max-enable</code> 属性来启用满屏弹窗，<b>width</b> 字段设置面板宽度样式数值；<b>height</b> 字段设置面板高度样式数值；<b>bg</b> 字段设置面板背景色样式色值。通常启用满屏弹窗后无需再对插槽内容进行尺寸设置。</p>
            <span class="color-sub flex">
                <a href="javascript:;" class="pad-v-d5 pad-h-2 round-sm bg-color-dgray color-light" @click="$_toggle_pannel4">显示全屏弹窗</a>
            </span>
            <pannel-widget v-model="dataList_4.visible" v-bind="dataList_4.props">
                <div class="flex-5 fsize-3 max">
                    <span class="color-blue">Full Screen !</span>
                </div>
            </pannel-widget>
            <hr>
            <p></p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import PannelWidget from "@/components/BTXUI/pannel/pannel-widget"

    export default {
        name: "pannel_widget_demo",
        components: {
            HeaderInfo,
            PannelWidget
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: PannelWidget.name,
                    ...PannelWidget.introduce,
                },

                //基础渲染数据1
                dataList_1: {
                    visible: false
                },

                //基础渲染数据2
                dataList_2: {
                    props: {
                        matte: true,
                        matteColor: "rgba(220,220,220,.7)",
                        closeBtn: true,
                        matteClose: "click"
                    },
                    visible: false
                },

                //基础渲染数据3
                dataList_3: {
                    props: {
                        matte: true,
                        matteColor: "rgba(220,220,220,.7)",
                        closeBtn: true,
                        pos: 9,
                        offsetStyles: {
                            x: "f100px",
                            y: "f100px"
                        }
                    },
                    visible: false
                },

                //基础渲染数据4
                dataList_4: {
                    props: {
                        closeBtn: true,
                        maxEnable: {
                            width: "100%",
                            height: "100%",
                            bg: "rgba(255,255,255,.94)",
                        }
                    },
                    visible: false
                },

            }
        },
        methods: {

            //切换弹窗1
            $_toggle_pannel1(){
                this.dataList_1.visible = !this.dataList_1.visible;
            },

            //切换弹窗2
            $_toggle_pannel2(){
                this.dataList_2.visible = !this.dataList_2.visible;
            },

            //切换弹窗3
            $_toggle_pannel3(){
                this.dataList_3.visible = !this.dataList_3.visible;
            },

            //切换弹窗4
            $_toggle_pannel4(){
                this.dataList_4.visible = !this.dataList_4.visible;
            },

        }
    }
</script>