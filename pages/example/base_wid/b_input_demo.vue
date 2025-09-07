<template>
    <article>
        <header-info v-bind="introduce" />

        <!-- 基础使用 -->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>v-model:text</code> 可以初始化及双向绑定输入内容。其它属性如：<code>type</code>、<code>name</code>、<code>maxlength</code> 等，在使用上同 input 元素保持一致。</p>
            <b-view>
                <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm"
                    type="text"
                    placeholder="请输入用户名" 
                    name="uname" 
                    :maxlength="6"
                    v-model:text="data_1" />
            </b-view>
            <p>当前输入内容：
                <code v-if="data_1">{{ data_1 }}</code>
                <span v-else class="alpha-d5">暂无内容</span>
            </p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!-- 输入验证 -->
        <section class="mrg-t-5">
            <h5>输入验证</h5>
            <p>通过 <code>rule</code> 属性可设置表单项验证，其中 <b>type</b> 字段可以自定义正则验证，也可以使用框架预置的一些常用正则方案，包括：email：验证邮箱、url：验证网址、tel：验证手机号、uid：验证身份证号、zh：验证中文字符、uname：验证一般账户名，英文、数字、下划线、required：非空验证（英文、数字、下划线、中文、.）。</p>
            <p>在 <code>on_blur</code> 和 <code>on_change</code> 两个事件中，通过首个参数可以获取表单项验证结果。此外，也可以通过组件实例的 <code>check</code> API 方法进行动态校验。</p>
            <b-view>
                <b-view class="flex flex-4 mrg-b-1">
                    <b-text class="bold w-7">手机号</b-text>
                    <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm"
                             type="text"
                             name="userTel"
                             :rule="{type: 'tel'}"
                             v-model:text="data_2.text"
                             @on_change="checkData2"/>
                </b-view>
                <b-view class="flex flex-4">
                    <b-text class="bold w-7">用户名</b-text>
                    <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm"
                             type="text"
                             name="userName"
                             :rule="{type: 'required', notic: '用户名为必填项！'}"
                             v-model:text="data_3.text"
                             @on_blur="checkData3"/>
                </b-view>
            </b-view>
            <p v-if="data_2.text">
                手机号输入内容：<span class="color-mgray">{{ data_2.text }}</span>，
                验证结果：<span v-if="data_2.result?.pass" class="color-green">通过</span>
                <span v-else class="color-red">{{ data_2.result.notic }}</span>
            </p>
            <p v-if="data_3.text">
                用户名输入内容：<span class="color-mgray">{{ data_3.text }}</span>，
                验证结果：<span v-if="data_3.result?.pass" class="color-green">通过</span>
                <span v-else class="color-red">{{ data_3.result.notic }}</span>
            </p>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!-- 聚焦样式 -->
        <section class="mrg-t-5">
            <h5>聚焦样式</h5>
            <p>通过 <code>focus</code> 属性可设置表单项聚焦样式。</p>
            <b-view>
                <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm" 
                    type="text"
                    name="uname" 
                    focus="bg-color-light line-blue" v-model:text="data_4" />
            </b-view>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section>

        <!-- 只读样式 -->
        <section class="mrg-t-5">
            <h5>只读样式</h5>
            <p>通过 <code>readonly</code> 属性可设置表单项只读，同时可以使用 <code>states</code> 配合 <code>state</code> 属性设置禁用样式集。</p>
            <b-view>
                <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm" 
                type="text"
                name="uname"
                :states="{readonly: 'color-mgray'}" 
                state="readonly" :readonly="true" v-model:text="data_5" />
            </b-view>
            <pre ref="$code4" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp4"></pre>
        </section>

        <!-- 被动失焦\聚焦 -->
        <section class="mrg-t-5">
            <h5>被动失焦\聚焦</h5>
            <p>通过实例对象的 <code>focus</code>、<code>blur</code> 方法可以被动触发表单元素的聚焦、失焦效果。</p>
            <b-view>
                <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm" 
                    type="text"
                    name="uname"
                    ref="$input"
                    focus="bg-color-light line-blue"
                    v-model:text="data_5" />
            </b-view>
            <b-view class="flex mrg-t-1">
                <btn-wid btn-text="聚焦" @on_click="focus" class="mrg-r-1" />
                <btn-wid btn-text="失焦" @on_click="blur" />
            </b-view>
            <pre ref="$code5" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp5"></pre>
        </section>

        <!-- 自适应内容高度 -->
        <section class="mrg-t-5">
            <h5>自适应内容高度</h5>
            <p>通过 <code>aspect-height</code> 属性可设置表单自适应内容高度，该属性需配合 <code>bh</code> 最小高度样式使用。需要注意的是，该类型输入无法实现数据的双向绑定，外部可通过 <code>on_input</code> 事件进行内容获取。</p>
            <b-view>
                <b-input class="pad-h-1 bh-2 lh-2 bg-color-lgray solid line-Cddd thick-1 round-sm w-20" 
                    type="text"
                    focus="bg-color-light line-blue"
                    :aspect-height="true"
                    @multiline="setMultiline"
                    @on_input="setData6"
                    v-model:text="data_6" />
            </b-view>
            <p>当前输入内容：
                <code v-if="data_6">{{ data_6 }}</code>
                <span v-else class="alpha-d5">暂无内容</span>
            </p>
            <div>
                <span v-if="multiline.show">* 多行输入中，当前输入框高度为：<code>{{ multiline.height }}px，第 {{ multiline.row }} 行</code></span>
            </div>
            <pre ref="$code6" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp6"></pre>
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref, reactive } from "vue"
    import headerInfo from "@/components/header-info.vue"
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js"

    const introduce: HeaderInfoData = {
        name: "b-input", 
        desc: ["该组件用于实现输入型表单元素。"],
        dependent: ["b-style"], 
        api: {
            methods: [
                {
                    name: "check",
                    ef: "表单验证",
                    params: "-",
                    return: "{name:'表单项属性', notic:'报错提示', pass:'是否通过'}"
                },
                {
                    name: "focus",
                    ef: "表单聚焦",
                    params: "-",
                    return: "-"
                },
                {
                    name: "blur",
                    ef: "表单失焦",
                    params: "-",
                    return: "-"
                },
                {
                    name: "clear",
                    ef: "文本清除",
                    params: "-",
                    return: "-"
                },
            ],
            event: [
                {
                    name: "on_focus",
                    ef: "表单聚焦",
                    params: "event",
                },
                {
                    name: "on_change",
                    ef: "表单输入变化",
                    params: "checkResult, event",
                },
                {
                    name: "on_blur",
                    ef: "表单失焦",
                    params: "checkResult, event",
                },
                {
                    name: "on_input",
                    ef: "自适应高度文本输入",
                    params: "text",
                },
                {
                    name: "multiline",
                    ef: "自适应输入框高度变化",
                    params: "ifMultiline, row, height",
                }
            ]
        },
        initData: [
            ["class", "string", "参照：b-style 组件入参"],
            ["type", "string", "表单元素类型 (text：单行文本、password：密码)"],
            ["name", "string", "表单元素数据键名"],
            ["v-model:text", "string", "表单输入内容"],
            ["maxlength", "string", "字符数上限"],
            ["placeholder", "string", "输入提示"],
            ["rule", "{ type: '自定义正则验证，或预置正则验证', notic: '验证报错提示' }", "正则验证 (包括：required、tel、email、url、uname、zh、uid)"],
            ["readonly", "boolean", "只读样式集"],
            ["focus", "string", "激活样式集"],
            ["aspect-height", "boolean", "自适应内容高度"]
        ] 
    }

    const $code = ref();
    const $code2 = ref();
    const $code3 = ref();
    const $code4 = ref();
    const $code5 = ref();
    const $code6 = ref();

    const data_1 = ref("");
    const data_2 = reactive({
        text: "",
        result: {} as any
    });
    const data_3 = reactive({
        text: "",
        result: {} as any
    });
    const data_4 = ref("hello BTXUI");
    const data_5 = ref("hello BTXUI");
    
    const checkData2 = (result: any) => {
        data_2.result = result;
    };
    const checkData3 = (result: any) => {
        data_3.result = result;
    };
    
    const $input = ref();
    const focus = () => {
        $input.value.focus();
    }
    const blur = () => {
        $input.value.blur();
    }
    
    const data_6 = ref("hello BTXUI");
    const multiline = reactive({
        show: false,
        height: 0,
        row: 1
    });
    const setData6 = (val: string) => {
        data_6.value = val;
    }
    const setMultiline = (val: boolean, row: number, height: number) => {
        multiline.show = val;
        multiline.row = row;
        multiline.height = height;
    }

    const exp1 = `
    <b-view>
        <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm"
            type="text"
            placeholder="请输入用户名" 
            name="uname" 
            :maxlength="6"
            v-model:text="data_1" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <b-view>
        <b-view class="flex flex-4 mrg-b-1">
            <b-text class="bold w-7">手机号</b-text>
            <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm"
                type="text"
                name="userTel"
                :rule="{type: 'tel'}"
                v-model:text="data_2.text"
                @on_change="checkData2"/>
        </b-view>
        <b-view class="flex flex-4">
            <b-text class="bold w-7">用户名</b-text>
            <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm"
                type="text"
                name="userName"
                :rule="{type: 'required', notic: '用户名为必填项！'}"
                v-model:text="data_3.text"
                @on_blur="checkData3"/>
        </b-view>
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <b-view>
        <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm" 
            type="text"
            name="uname" 
            focus="bg-color-light line-blue" v-model:text="data_4" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp4 = `
    <b-view>
        <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm" 
        type="text"
        name="uname"
        :states="{readonly: 'color-mgray'}" 
        state="readonly" :readonly="true" v-model:text="data_5" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp5 = `
    <b-view>
        <b-input class="pad-h-1 h-3 bg-color-lgray solid line-Cddd thick-1 round-sm" 
            type="text"
            name="uname"
            ref="$input"
            focus="bg-color-light line-blue"
            v-model:text="data_5" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp6 = `
    <b-view>
        <b-input class="pad-h-1 bh-2 lh-2 bg-color-lgray solid line-Cddd thick-1 round-sm w-20" 
            type="text"
            focus="bg-color-light line-blue"
            :aspect-height="true"
            @multiline="setMultiline"
            @on_input="setData6"
            v-model:text="data_6" />
    </b-view>`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
        hljs.highlightElement($code4.value);
        hljs.highlightElement($code5.value);
        hljs.highlightElement($code6.value);
    })
</script>