<template>
    <article>
        <header-info v-bind="header_info" />

        <!--字体图标-->
        <section>
            <h5>字体图标</h5>
            <p>通过 <code>icon</code> 属性即可设置框架预置字体图标，图标字体源来自框架的 css 文件，图标效果可参考 <b>"全局样式 - 图标"</b>。</p>
            <p>也可以使用自定义字体图标，需要首先引入相应字体图标样式文件，然后设置 <code>styles</code> 属性 <b>font-*</b> 样式值为对应字体名，再通过 <code>icon</code> 属性绑定图标名（图标类名必须符合 <b>ico-name</b> 格式，图标名即 <b>name</b>）即可。</p>
            <p>系统预置字体图标：</p>
            <div class="flex-between fsize-2 w-40">
                <b-icon icon="download" />
                <b-icon icon="ui" />
                <b-icon icon="list" />
                <b-icon icon="system" />
                <b-icon icon="user" />
            </div>
            <p>自定义扩展字体图标：</p>
            <div class="flex-between fsize-2 w-40">
                <b-icon styles="font-iconfont" icon="info" />
                <b-icon styles="font-iconfont" icon="phone" />
                <b-icon styles="font-iconfont" icon="integral" />
                <b-icon styles="font-iconfont" icon="assets" />
                <b-icon styles="font-iconfont" icon="readed" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--图片图标-->
        <section>
            <h5>图片图标</h5>
            <p>通过 <code>bgImg</code> 属性即可设置图片图标。</p>
            <div>
                <b-icon :bg-img="require('@/assets/img/home_ico.png')"
                        styles="bg-pos-center w-10 h-5 round-sm line line-lgray thick-1" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--css 动画图标-->
        <section>
            <h5>css 动画图标</h5>
            <p>可以使用框架预置的 4 项 css 动画图标（动画机制：html 标签 + css），同样通过 <code>icon</code> 属性进行设置，属性值分别为：<b>ani_success</b>、<b>ani_fail</b>、<b>ani_notic</b>、<b>ani_loading</b>。</p>
            <div class="flex-between w-40">
                <b-icon icon="ani_success" />
                <b-icon icon="ani_fail" />
                <b-icon icon="ani_notic" />
                <b-icon icon="ani_loading" />
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BIcon from "@/components/BTXUI/core/b-icon"
    import "@/css/custom_fonts/iconfont.css"

    export default {
        name: "b_icon_demo",
        components: {
            HeaderInfo,
            BIcon
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BIcon.name,
                    ...BIcon.introduce,
                },

            }
        }
    }
</script>