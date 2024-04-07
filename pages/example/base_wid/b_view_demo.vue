<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 设置背景图 -->
        <section>
            <h5>设置背景图</h5>
            <p>通过 <code>bgImg</code> 属性可设置背景图，之后可通过背景图相关 class 属性进行其它样式化处理。</p>
            <p>【exp】：</p>
            <b-view class="flex">
                <b-view class="w-10 h-10 round-md mrg-r-9 bsize-cover" bg-img="/img/head.jpg"></b-view>
                <b-view class="w-10 h-10 round-md mrg-r-9 bsize-cover" bg-img="/img/head2.jpg"></b-view>
                <b-view class="w-10 h-10 round-md bsize-50 bpos-50 bg-color-lgray" bg-img="/img/head.jpg"></b-view>
            </b-view>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 多维变形 -->
        <section class="mrg-t-5">
            <h5>多维变形</h5>
            <p>通过 <code>matrix</code> 属性可设置容器变形。</p>
            <p>【exp】：</p>
            <b-view class="flex rel fsize-3">
                <b-view class="w-8 h-8 round-md bg-color-Cec433433 flex-5">A</b-view>
                <b-view class="w-8 h-8 round-md bg-color-Cfdba0033 flex-5 abs" :matrix="{translate: '120%,0', rotate: '45deg', scale: '.5'}">B</b-view>
                <b-view class="w-8 h-8 round-md bg-color-C02b9a133 flex-5 abs" :matrix="{translate: '240%,0', scale: '.8'}">C</b-view>
                <b-view class="w-8 h-8 round-md bg-color-C4085f333 flex-5 abs" :matrix="{translate: '360%,0', skew: '-20deg', scale: '.6'}">D</b-view>
            </b-view>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 状态样式及动效 -->
        <section class="mrg-t-5">
            <h5>状态样式及动效</h5>
            <p>通过 <code>state</code> 属性可监听元素的状态，对应 <code>states</code> 属性以映射表形式设置各状态样式，或是动效。状态映射值可以是样式类字符串，也可以是对象形式，其中 <code>class</code> 字段对应 b-style 样式类，<code>ani</code> 字段对应动效样式类。</p>
            <p>此外，通过 <code>on_aniEnd</code> 事件 API 可以响应动效播放完毕回调。</p>
            <p>【exp】：</p>
            <b-view class="flex-4">
                <b-hot class="w-3 h-3 flex-5 bg-color-lgray round" @on_click="data_1.flip('prev')">
                    <b-icon icon="arrow-left" />
                </b-hot>
                <b-view class="w-8 h-8 flex-5 round over-hide mrg-h-2">
                    <b-view class="w-5 h-5 round solid line-light thick-5 shadow color-Caaa bsize-cover"
                        :bg-img="`/img/${data_1.state}.jpg`"
                        :state="data_1.state"
                        :states="{
                            flag: {
                                class: 'line-light',
                                ani: 'ani-left-to-right'
                            },
                            flag2: {
                                class: 'line-green',
                                ani: 'ani-top-to-bottom'
                            },
                            flag3: {
                                class: 'line-red',
                                ani: 'ani-scale-fade-in'
                            }
                        }"></b-view>
                </b-view>
                <b-hot class="w-3 h-3 flex-5 bg-color-lgray round" @on_click="data_1.flip('next')">
                    <b-icon icon="arrow-right" />
                </b-hot>
            </b-view>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { reactive } from "vue"
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"

    const introduce: HeaderInfoData = {
        name: "b-view", 
        desc: ["该组件是用于布局的基础组件，相当于 html 中 div 的作用，可以接收 <code>class</code> 属性来应用框架样式体系。"],
        dependent: ["b-style"], 
        api: {
            event: [
                {
                    name: "on_aniEnd",
                    ef: "aniState 动效播放完毕",
                    params: "event",
                }
            ]
        },
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["bgImg", "string", "背景图地址"],
            ["state", "State", "当前状态"],
            ["states", "{[key: State]: string}", "各状态预设"],
            ["matrix", "{translate: '位移', scale: '放缩', rotate: '旋转', skew: '斜切'}", "设置变形矩阵"],
            ["cname", "string", "元素别名，用于类名合成唯一化"],
        ] 
    }

    const data_1 = reactive({
        state: 'flag',
        cur: 0,
        flip: (dir: 'next' | 'prev') => {
            let cur = data_1.cur;
            dir === 'next' ? cur++ : cur--;
            if (cur < 0) cur = 2; 
            if (cur === 3) cur = 0; 
            data_1.cur = cur;
            data_1.state = ['flag', 'flag2', 'flag3'][cur];
        }
    })

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();

    const exp1 = `
    <b-view class="flex">
        <b-view class="w-10 h-10 round-md mrg-r-9 bsize-cover" bg-img="/img/head.jpg"></b-view>
        <b-view class="w-10 h-10 round-md mrg-r-9 bsize-cover" bg-img="/img/head2.jpg"></b-view>
        <b-view class="w-10 h-10 round-md bsize-50 bpos-50 bg-color-lgray" bg-img="/img/head.jpg"></b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view class="flex rel fsize-3">
        <b-view class="w-8 h-8 round-md bg-color-Cec433433 flex-5">A</b-view>
        <b-view class="w-8 h-8 round-md bg-color-Cfdba0033 flex-5 abs" :matrix="{translate: '120%,0', rotate: '45deg', scale: '.5'}">B</b-view>
        <b-view class="w-8 h-8 round-md bg-color-C02b9a133 flex-5 abs" :matrix="{translate: '240%,0', scale: '.8'}">C</b-view>
        <b-view class="w-8 h-8 round-md bg-color-C4085f333 flex-5 abs" :matrix="{translate: '360%,0', skew: '-20deg', scale: '.6'}">D</b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <b-view class="flex-4">
        <b-hot class="w-3 h-3 flex-5 bg-color-lgray round" @on_click="data_1.flip('prev')">
            <b-icon icon="arrow-left" />
        </b-hot>
        <b-view class="w-8 h-8 flex-5 round over-hide mrg-h-2">
            <b-view class="w-5 h-5 round solid line-light thick-5 shadow color-Caaa bsize-cover"
                :bg-img="'/img/' + data_1.state + '.jpg'"
                :state="data_1.state"
                :states="{
                    flag: {
                        class: 'line-light',
                        ani: 'ani-left-to-right'
                    },
                    flag2: {
                        class: 'line-green',
                        ani: 'ani-top-to-bottom'
                    },
                    flag3: {
                        class: 'line-red',
                        ani: 'ani-scale-fade-in'
                    }
                }"></b-view>
        </b-view>
        <b-hot class="w-3 h-3 flex-5 bg-color-lgray round" @on_click="data_1.flip('next')">
            <b-icon icon="arrow-right" />
        </b-hot>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
    })
</script>