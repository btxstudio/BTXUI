<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础自定义弹窗使用-->
        <section>
            <h5>基础自定义弹窗使用</h5>
            <p>默认为居中弹出效果，且没有遮罩背景。</p>
            <p class="flex resize">
                <btn-wid btnText="切换弹窗" @on_click="data_1.visible = !data_1.visible" />
                <pannel-wid v-model="data_1.visible">
                    <div class="color-mgray pcenter pad-2 w-20 round-md bg-color-light line thick-1 line-mgray shadow-sm">
                        <span class="color-blue">html + css</span>
                    </div>
                </pannel-wid>
            </p>
            <hr>
            <p></p>
        </section>

        <!--弹窗遮罩-->
        <section>
            <h5>弹窗遮罩</h5>
            <p>可以启用 <code>matte</code> 属性来设置面板遮罩背景，默认为透明色，z 轴层级为 9。可以通过 <code>matte-color</code> 属性设置遮罩颜色，<code>matte-pattern</code> 属性设置遮罩图案，以及 <code>matte-z-index</code> 属性设置遮罩 z 轴层级。此外可以通过 <code>close-btn</code> 属性启用关闭按钮，或通过 <code>matte-close</code> 属性设置 "click" 或 "dblclick" 启用遮罩自身单击或双击关闭效果。</p>
            <p class="flex resize">
                <btn-wid btnText="显示弹窗" @on_click="data_2.visible = !data_2.visible" />
                <pannel-wid v-model="data_2.visible" v-bind="data_2.props">
                    <div class="color-mgray pcenter pad-2 w-25 round-md bg-color-light line thick-1 line-mgray shadow-sm">
                        <span class="color-blue">javascript + typescript</span>
                    </div>
                </pannel-wid>
            </p>
            <hr>
            <p></p>
        </section>

        <!--定位弹窗-->
        <section>
            <h5>定位弹窗</h5>
            <p>可以通过 <code>pos</code> 属性来对面板进行九宫格定位，属性值：1-9。之后可以通过 <code>offset-styles</code> 属性来进行位移调整。</p>
            <p>【exp】右下方显示弹窗，向上位移 100px，向左位移 100px：</p>
            <p class="flex resize">
                <btn-wid btnText="显示弹窗" @on_click="data_3.visible = !data_3.visible" />
                <pannel-wid v-model="data_3.visible" v-bind="data_3.props">
                    <div class="color-mgray pcenter pad-2 w-25 round-md bg-color-light line thick-1 line-mgray shadow-sm">
                        <span class="color-blue">vue VS react</span>
                    </div>
                </pannel-wid>
            </p>
            <hr>
            <p></p>
        </section>

        <!--全屏弹窗-->
        <section>
            <h5>全屏弹窗</h5>
            <p>可以通过 <code>max-enable</code> 属性来启用满屏弹窗，<b>width</b> 字段设置面板宽度样式数值；<b>height</b> 字段设置面板高度样式数值；<b>bg</b> 字段设置面板背景色样式色值。通常启用满屏弹窗后无需再对插槽内容进行尺寸设置。</p>
            <p class="flex resize">
                <btn-wid btnText="显示全屏弹窗" @on_click="data_4.visible = !data_4.visible" />
                <pannel-wid v-model="data_4.visible" v-bind="data_4.props">
                    <div class="flex-5 fsize-3 max">
                        <span class="color-blue">Full Screen !</span>
                    </div>
                </pannel-wid>
            </p>
            <hr>
            <p></p>
        </section>

        <!--侧边栏-->
        <section>
            <h5>侧边栏</h5>
            <p>通过全屏设置可以变相实现侧边栏，同时可以更进一步通过 <code>transition</code> 属性设置面板的转场方式。</p>
            <p class="flex resize">
                <btn-wid btnText="显示侧边栏" @on_click="data_5.visible = !data_5.visible" />
                <pannel-wid v-model="data_5.visible" v-bind="data_5.props">
                    <div class="fsize-1d1">
                        <ul class="pad-l-2 pad-v-3 color-sub">
                            <li class="pad-v-1 line-b thick-1 line-neutral">About Us</li>
                            <li class="pad-v-1 line-b thick-1 line-neutral">Production</li>
                            <li class="pad-v-1 line-b thick-1 line-neutral">Custom</li>
                            <li class="pad-v-1 line-b thick-1 line-neutral">Service</li>
                            <li class="pad-v-1">Contact Us</li>
                        </ul>
                    </div>
                </pannel-wid>
            </p>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BtnWid from "@/components/BTXUI/btn/btn-wid"
    import PannelWid from "@/components/BTXUI/pannel/pannel-wid"

    export default {
        name: "pannel_wid_demo",
        components: {
            HeaderInfo,
            BtnWid,
            PannelWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: PannelWid.name,
                    ...PannelWid.introduce,
                },

                data_1: {
                    visible: false
                },

                data_2: {
                    props: {
                        matte: true,
                        matteColor: "rgba(245,245,255,.7)",
                        mattePattern: require("@/assets/img/bg_pattern.png"),
                        closeBtn: true,
                        matteClose: "click"
                    },
                    visible: false
                },

                data_3: {
                    props: {
                        matte: true,
                        matteColor: "rgba(220,220,220,.7)",
                        closeBtn: true,
                        pos: 9,
                        offset: {
                            x: "f100px",
                            y: "f100px"
                        }
                    },
                    visible: false
                },

                data_4: {
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

                data_5: {
                    props: {
                        matte: true,
                        pos: 3,
                        transition: {
                            in_styles: "translateX-0",
                            out_styles: "translateX-100"
                        },
                        matteColor: "rgba(40,40,40,.7)",
                        matteClose: "click",
                        maxEnable: {
                            width: 20,
                            height: "100%",
                            bg: "dark",
                        }
                    },
                    visible: false
                },

            }
        }
    }
</script>