<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 拖拽传递数据 -->
        <section>
            <h5>拖拽传递数据</h5>
            <p>组件可通过 <code>dragStart</code> 和 <code>dragOver</code> 属性，分别设置 "拖拽开始"（物品）及 "拖拽放入"（容器）时的状态样式。</p>
            <p>通过 <code>dataInfo</code> 属性可以绑定拖拽传递的数据。在 "拖拽放入"（容器）元素上通过 <code>on_drop</code> 事件可以接收传递的数据。</p>
            <b-view class="flex-4">
                <b-drag class="flex-5 pad-h-2 pad-v-d5 bg-color-lgray round-sm mrg-r-4 solid line-neutral thick-1"
                    drag-start="bg-color-green color-light"
                    :data-info="data_1">{{ data_1.bookName }}</b-drag>
                <b-drag class="flex-5 pad-h-2 pad-v-d5 w-12 dashed line-mgray thick-1 round-sm"
                    drag-over="bg-color-neutral"
                    @on_drop="buyBook">购物车</b-drag>
            </b-view>
            <p>
                购买书籍：<span v-if="data_1.bought" v-html="data_1.bought"></span>
                <span v-else class="color-mgray">暂无购买书籍</span>
            </p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 自由拖动 -->
        <section class="mrg-t-5">
            <h5>自由拖动</h5>
            <p>通过 <code>freeDrag</code> 属性可以实现元素的自由拖放。元素的拖动区域，通常为拖动元素的 "包含块（offsetParent）"。</p>
            <b-view class="flex-5 h-20 rw-80 bg-color-lgray round-sm rel">
                <b-text class="alpha-d4">拖动区域（offsetParent）</b-text>
                <b-drag class="w-4 h-4 bg-color-lgray color-C11111133 round solid line-mgray thick-1 shadow" 
                    @on_move="getPos" 
                    :free-drag="true"
                    drag-start="bg-color-blue line-light"></b-drag>
            </b-view>
            <p>
                相对包含块当前坐标：<b>({{data_2.x}}, {{data_2.y}})</b>
            </p>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 自由拖动方向限制 -->
        <section class="mrg-t-5">
            <h5>自由拖动方向限制</h5>
            <p>利用拖动元素的包含块区域限制特性，可以对拖动元素进行拖动方向限制。</p>
            <b-view class="flex-4 rw-80 rel">
                <b-view class="flex-5 grow-1 h-20 bg-color-neutral round-sm pad-1">
                    <b-view class="h-2 max-w rel round-lg bg-color-neutral">
                        <b-view class="abs pad-h-2 t-1 max-w">
                            <b-view class="solid-b line-neutral thick-2"></b-view>
                        </b-view>
                        <b-drag class="w-6 h-2 bg-color-lgray round-lg solid line-mgray thick-1" 
                            :free-drag="true"
                            drag-start="bg-color-light line-light shadow color-neutral"></b-drag>
                    </b-view>
                </b-view>
                <b-view class="flex-5 grow-1 h-20 bg-color-neutral round-sm pad-1 mrg-l-1">
                    <b-view class="w-2 max-h rel round-lg bg-color-neutral">
                        <b-view class="abs pad-v-2 l-1 max-h">
                            <b-view class="solid-r max-h line-neutral thick-2"></b-view>
                        </b-view>
                        <b-drag class="w-2 h-6 bg-color-lgray round-lg solid line-mgray thick-1" 
                            :free-drag="true"
                            drag-start="bg-color-light line-light shadow color-neutral"></b-drag>
                    </b-view>
                </b-view>
            </b-view>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref, reactive } from "vue"
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"

    const introduce: HeaderInfoData = {
        name: "b-drag", 
        desc: ["该组件用于包裹元素以实现拖拽效果。"],
        dependent: ["b-style"], 
        api: {
            event: [
                {
                    name: "on_drag_start",
                    ef: "开始拖拽",
                    params: "event"
                },
                {
                    name: "on_drag_move",
                    ef: "拖拽移动",
                    params: "event"
                },
                {
                    name: "on_drag_end",
                    ef: "结束拖拽",
                    params: "event"
                },
                {
                    name: "on_drag_over",
                    ef: "拖拽预备放入",
                    params: "event"
                },
                {
                    name: "on_drag_leave",
                    ef: "拖拽离开容器",
                    params: "event"
                },
                {
                    name: "on_drop",
                    ef: "完成放入",
                    params: "dataInfo, event"
                },
                {
                    name: "on_move",
                    ef: "拖动位移",
                    params: "movePos, event"
                }
            ]
        },
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["dataInfo", "string", "绑定数据，缺省则传递元素自身"],
            ["dragStart", "string", "拖拽起始状态样式值"],
            ["dragOver", "string", "拖拽预备放入状态样式值"],
            ["freeDrag", "boolean", "自由拖动，默认为 false"]
        ] 
    }

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();

    const data_1 = reactive({
        bookId: 'sdjk459345z',
        bookName: 'javascript 权威指南',
        bookAuthor: 'btxstudio',
        bought: ''          
    });
    const data_2 = reactive({x: 0, y: 0});

    const buyBook = (data: any) => {
        const info = JSON.parse(data);
        if(data_1.bought){
            data_1.bought = "<code>该书籍已购买!</code>";
        }else {
            data_1.bought = `已购买: <b>${ info.bookName }</b>，作者为: <b>${ info.bookAuthor }</b>`;
        }
    };
    const getPos = (movePos: any) => {
        const {x, y} = movePos;
        data_2.x = x;
        data_2.y = y;
    };

    const exp1 = `
    <b-view class="flex-4">
        <b-drag class="flex-5 pad-h-2 pad-v-d5 bg-color-lgray round-sm mrg-r-4 solid line-neutral thick-1"
            drag-start="bg-color-green color-light"
            :data-info="data_1">{{ data_1.bookName }}</b-drag>
        <b-drag class="flex-5 pad-h-2 pad-v-d5 w-12 dashed line-mgray thick-1 round-sm"
            drag-over="bg-color-neutral"
            @on_drop="buyBook">购物车</b-drag>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view class="flex-5 h-20 rw-80 bg-color-lgray round-sm rel">
        <b-text class="alpha-d4">拖动区域（offsetParent）</b-text>
        <b-drag class="w-4 h-4 bg-color-lgray color-C11111133 round solid line-mgray thick-1 shadow" 
            @on_move="getPos" 
            :free-drag="true"
            drag-start="bg-color-blue line-light"></b-drag>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <b-view class="flex-4 rw-80 rel">
        <b-view class="flex-5 grow-1 h-20 bg-color-neutral round-sm pad-1">
            <b-view class="h-2 max-w rel round-lg bg-color-neutral">
                <b-view class="abs pad-h-2 t-1 max-w">
                    <b-view class="solid-b line-neutral thick-2"></b-view>
                </b-view>
                <b-drag class="w-6 h-2 bg-color-lgray round-lg solid line-mgray thick-1" 
                    :free-drag="true"
                    drag-start="bg-color-light line-light shadow color-neutral"></b-drag>
            </b-view>
        </b-view>
        <b-view class="flex-5 grow-1 h-20 bg-color-neutral round-sm pad-1 mrg-l-1">
            <b-view class="w-2 max-h rel round-lg bg-color-neutral">
                <b-view class="abs pad-v-2 l-1 max-h">
                    <b-view class="solid-r max-h line-neutral thick-2"></b-view>
                </b-view>
                <b-drag class="w-2 h-6 bg-color-lgray round-lg solid line-mgray thick-1" 
                    :free-drag="true"
                    drag-start="bg-color-light line-light shadow color-neutral"></b-drag>
            </b-view>
        </b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
    })
</script>