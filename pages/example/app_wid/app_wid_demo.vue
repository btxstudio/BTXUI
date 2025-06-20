<template>
    <article>
        <header-info v-bind="introduce" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>spread</code> 属性来设置常规分布导航按钮；通过 <code>center</code> 属性则可设置居中主导航按钮；此外 <code>colors</code> 属性可设置组件色彩风格，导航按钮会基于当前路由进行高亮样式显示。</p>
            <p>通过组件 API <code>on_toggle</code> 事件可以响应点击按钮回调，自变量参数为按钮索引。</p>
            <p>【exp】：</p>
            <b-view class="flex rw-100 pcenter">
                <b-view class="grow-1 pad-h-1">
                    <b-view class="h-20 solid line-main thick-1" :matrix="{scale: 1}">
                        <app-wid :spread="spread" :colors="{bg: 'main'}" :path="route.path" />
                    </b-view>
                    <b-view class="mrg-t-1">默认深色，不含中间按钮</b-view>
                </b-view>
                <b-view class="grow-1 pad-h-1">
                    <b-view class="h-20 solid line-lgray thick-1" :matrix="{scale: 1}">
                        <app-wid :spread="spread" :path="route.path"
                            :center="{
                                navId: 'main',
                                iconData: {
                                    icon: 'home'
                                },
                                hotData: {
                                    link: 'http://www.75sea.com'
                                }
                            }"
                            :colors="colors" />
                    </b-view>
                    <b-view class="mrg-t-1">自定义浅色，含中间按钮及点击回调</b-view>
                </b-view>
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from "vue";
    import headerInfo from "@/components/header-info.vue";
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js";
    import { useRoute } from "vue-router"

    const introduce: HeaderInfoData = {
        name: "app-wid", 
        desc: ["该组件用于快速实现手机 APP 式布局框架。"],
        dependent: ["b-view", "b-text", "b-list", "b-hot", "b-icon"], 
        api: {
            event: [
                {
                    name: "on_toggle",
                    ef: "导航切换点击",
                    params: "nav_id"
                }
            ]
        },
        initData: [
            ["path", "string", "当前路由路径"],
            ["spread", "[*]", "平铺导航项"],
            ["spread[*].navId", "string", "导航标识"],
            ["spread[*].iconData", "any", "参照：b-icon 组件入参"],
            ["spread[*].hotData", "any", "参照：b-hot 组件入参"],
            ["spread[*].text", "string", "图标文字，可缺省"],
            ["spread[*].act", "string", "激活状态样式值"],
            ["spread[*].unread", "number", "设置未读信息数"],
            ["iconTransAni", "boolean", "是否启用图标过渡动画效果，默认关闭"],
            ["center", "{*}", "主导航项"],
            ["center.navId", "string", "导航标识"],
            ["center.iconData", "any", "参照：b-icon 组件入参"],
            ["center.hotData", "any", "参照：b-hot 组件入参"],
            ["colors", "{*}", "配色方案"],
            ["colors.bg", "string", "内容背景色"],
            ["colors.bar", "string", "导航条背景色"],
            ["colors.center.bg", "string", "居中导航按钮背景色"],
            ["colors.center.line", "string", "居中导航按钮描边色"],
            ["colors.text.normal", "string", "文字常规颜色"],
            ["colors.text.act", "string", "文字激活颜色"],
            ["round", "boolean", "是否启用圆角，默认 true"],
            ["keepAlive", "boolean", "缓存页面，默认 true"]
        ] 
    };

    const route = useRoute();
    const spread = reactive([
        {
            navId: "data",
            iconData: {
                icon: "data"
            },
            hotData: {
                link: "/example/app_wid/app_wid_demo/data"
            },
            text: "data"
        },
        {
            navId: "download",
            iconData: {
                icon: "download"
            },
            hotData: {
                link: "/example/app_wid/app_wid_demo/download"
            },
            text: "download"
        },
        {
            navId: "list",
            iconData: {
                icon: "list"
            },
            hotData: {
                link: "/example/app_wid/app_wid_demo/list"
            },
            text: "list"
        },
        {
            navId: "system",
            iconData: {
                icon: "system"
            },
            hotData: {
                link: "/example/app_wid/app_wid_demo/system"
            },
            text: "system"
        },
    ]);
    const colors = reactive({
        bg: 'lgray',
        bar: 'light',
        center: {
            bg: 'blue',
            line: 'light'
        },
        text: {
            normal: 'mgray',
            act: 'blue'
        }
    })
    setTimeout(() => {
        colors.bg = 'red';
    }, 3000);

    const $code = ref();

    const exp1 = `
    <b-view class="flex rw-100 pcenter">
        <b-view class="grow-1 pad-h-1">
            <b-view class="h-20 solid line-main thick-1" :matrix="{scale: 1}">
                <app-wid :spread="spread" :colors="{bg: 'main'}" :path="route.path" />
            </b-view>
            <b-view class="mrg-t-1">默认深色，不含中间按钮</b-view>
        </b-view>
        <b-view class="grow-1 pad-h-1">
            <b-view class="h-20 solid line-lgray thick-1" :matrix="{scale: 1}">
                <app-wid :spread="spread" :path="route.path"
                    :center="{
                        navId: 'main',
                        iconData: {
                            icon: 'home'
                        },
                        hotData: {
                            link: 'http://www.75sea.com'
                        }
                    }"
                    :colors="{
                        bg: 'lgray',
                        bar: 'light',
                        center: {
                            bg: 'blue',
                            line: 'light'
                        },
                        text: {
                            normal: 'mgray',
                            act: 'blue'
                        }
                    }" />
            </b-view>
            <b-view class="mrg-t-1">自定义浅色，含中间按钮及点击回调</b-view>
        </b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
    })
</script>