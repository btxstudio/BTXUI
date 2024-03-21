<template>
    <b-style :class="class" :focus="focus" :states="states" :cname="cname">
        <template v-slot:className="scope">
            <input :class="scope.className" :type="type" 
                   @focus="$emit('on_focus', $event)"
                   @blur="blur"
                   @change="change"
                   @input="input"
                   v-model="val"
                   :name="name" 
                   :focus="focus? true: ''"
                   :state="state"
                   :placeholder="placeholder"
                   :maxlength="maxlength"
                   :readonly="readonly"
                   autocomplete="off" />
        </template>
    </b-style> 
</template>

<script setup lang="ts">
    import { ref } from "vue"
    import bStyle from "./styles/b-style.vue"
    import { State } from "./styles/@types"

    const props = defineProps<{
        // 表单类型
        type: "text" | "password",

        // 表单名
        name: string,

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
    }>();
    const emit = defineEmits(["update:text", "on_focus", "on_blur", "on_change"]);

    // 输入文字
    const val = ref(props.text);

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
    const input = () => {
        emit("update:text", val.value?.trim());
    };

    // 文字输入变化
    const change = (e) => {
        emit("on_change", check(), e);
    };

    // 文字失焦
    const blur = (e) => {
        emit("on_blur", check(), e);
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

    defineExpose({
        check
    })
</script>