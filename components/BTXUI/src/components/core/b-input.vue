<template>
    <b-style :class="class" :focus="focus" :states="states" :cname="cname">
        <template v-slot:className="scope">
            <b-view class="flex-4 rel">
                <div v-if="aspectHeight"
                    :class="scope.className"
                    contenteditable
                    @focus="focusEvent($event)"
                    @blur="blurEvent"
                    @change="change"
                    @input="input2"
                    :type="type" 
                    ref="$input" 
                    style="outline: none;"
                    :name="name" 
                    :focus-state="focus ? 'true' : ''"
                    :state="state"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    :readonly="readonly"
                    autocomplete="off">{{ val2 }}</div>
                <input v-else
                    :class="scope.className"
                    @focus="focusEvent($event)"
                    @blur="blurEvent"
                    @change="change"
                    @input="input"
                    v-model="val"
                    :type="type" 
                    ref="$input" 
                    style="outline: none;"
                    :name="name" 
                    :focus-state="focus ? 'true' : ''"
                    :state="state"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    :readonly="readonly"
                    autocomplete="off" />
                <b-hot 
                    v-if="!readonly && !aspectHeight"
                    @on_click="clear" 
                    class="abs r-1 trans-fast"
                    :states="{
                        show: 'alpha-1 visible',
                        hide: 'alpha-0'
                    }"
                    :state="val?.length != 0 && focusState ? 'show' : 'hide'">
                    <slot name="cancel" v-if="$slots.cancel"></slot>
                    <b-icon v-else class="flex-5 h-1d8 w-1d8 bg-color-neutral round" icon="fail" />
                </b-hot>
            </b-view>
        </template>
    </b-style> 
</template>

<script setup lang="ts">
    import { ref, watchEffect, onMounted, nextTick } from "vue"
    import bStyle from "./styles/b-style.vue"
    import { State } from "./styles/@types"

    const props = defineProps<{
        // 表单类型
        type: "text" | "password",

        // 表单名
        name?: string,

        // 样式集
        class?: string,

        // 当前状态
        state?: State,

        // 状态样式集
        states?: { [key: string]: any },

        // 输入内容
        text?: string,

        // 输入提示
        placeholder?: string,

        // 字符数限制
        maxlength?: number,

        // 是否只读
        readonly?: boolean,

        // 聚焦样式集
        focus?: string,

        // 正则验证
        rule?: {
            type: RegExp | "required" | "tel" | "email" | "url" | "uname" | "zh" | "uid",
            notic?: string
        },

        // 样式集别名
        cname?: string,

        // 自适应高度
        aspectHeight?: boolean,
    }>();
    const emit = defineEmits(["update:text", "on_focus", "on_blur", "on_change", "on_input", "multiline"]);

    // 预置正则
    const preset_rules = {
        required: {
            regexp: /[\w\.\-_\u4e00-\u9fa5]+/,
            notic: "输入内容为空!"
        },
        tel: {
            regexp: /^1[3-9]\d{9}$/,
            notic: "手机号格式有误!"
        },
        email: {
            regexp: /^[\w\.]+@(\w+\.)+(com|net|org|wiki|cn|cc)$/,
            notic: "邮箱格式有误!"
        },
        url: {
            regexp: /^((http|https):\/\/)?(wwww\.)?(\w+\.)+(com|net|org|wiki|cn|cc)$/,
            notic: "url 格式有误!"
        },
        uname: {
            regexp: /^[\w_]+$/,
            notic: "请输入英文字母、数字或下划线!"
        },
        zh: {
            regexp: /^[\u4e00-\u9fa5]+$/,
            notic: "请输入中文字符!"
        },
        uid: {
            regexp: /^\d{15}(\d{2}[0-9x])?$/i,
            notic: "身份证号输入有误!"
        }
    };

    // 文字输入
    const val = ref(props.text);
    const val2 = ref(props.text);
    watchEffect(() => {
        val.value = props.text;
    })
    const origHeight = ref();
    const input = () => {
        emit("update:text", val.value?.trim());
    };
    const input2 = () => {
        emit("on_input", $input.value.innerText.trim());
        const curHeight = parseInt(getComputedStyle($input.value).height.split('px')[0]);
        emit("multiline", curHeight > origHeight.value, Math.ceil(curHeight / origHeight.value), curHeight); 
    };

    // 文字输入变化
    const change = (e) => {
        emit("on_change", check(), e);
    };

    // 文字聚焦/失焦
    const focusState = ref(false);
    const blurEvent = (e) => {
        focusState.value = false;
        emit("on_blur", check(), e);
    };
    const focusEvent = (e) => {
        focusState.value = true;
        emit("on_focus", e);
    };

    // 执行验证
    const check = () => {
        if(props.rule){
            const pre_rule = preset_rules[props.rule.type as any];
            const regexp = pre_rule? pre_rule.regexp: props.rule.type;
            return {
                name: props.name,
                notic: props.rule.notic? props.rule.notic: (pre_rule? pre_rule.notic: `${ props.name }格式有误!`),
                pass: regexp.test(val.value)
            };
        }
        return true;
    };

    // 内容重置
    const clear = () => {
        if(props.aspectHeight) {
            $input.value.innerText = '';
            input2();
        } else {
            val.value = '';
            input();
        }
    }

    const $input = ref();
    defineExpose({
        check,
        focus: function() {
            $input.value.focus()
        },
        blur: function() {
            $input.value.blur()
        },
        clear
    })

    onMounted(() => {
        nextTick(() => {
            origHeight.value = parseInt(getComputedStyle($input.value).height.split('px')[0].split('.')[0]);
        })
    })
</script>