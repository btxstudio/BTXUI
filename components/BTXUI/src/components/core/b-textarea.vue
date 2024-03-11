<template>
    <b-style :class="class" :focus="focus" :states="states" :cname="cname">
        <template v-slot:className="scope">
            <textarea :class="scope.className"
                      @focus="$emit('on_focus', $event)"
                      @blur="$emit('on_blur', $event)"
                      @change="$emit('on_change', $event)"
                      @input="inputText"
                      v-model="val"
                      :name="name" 
                      :focus="focus? true: ''"
                      :state="state"
                      :placeholder="placeholder"
                      :maxlength="maxlength"
                      :readonly="readonly"
                      :rows="rows || 7" />
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import { ref } from "vue"
    import bStyle from "./styles/b-style.vue"

    const props = defineProps<{
        // 表单输入内容
        text: string,

        // 表单名
        name: string,
        
        // 样式集
        class?: string,

        // 当前状态
        state?: string | boolean,

        // 状态样式集
        states?: { [key: string]: any },

        // 显示行数
        rows?: number,

        // 输入提示
        placeholder?: string,

        // 字符数限制
        maxlength?: number,

        // 是否只读
        readonly?: boolean,

        // 聚焦样式集
        focus?: string,

        // 样式集别名
        cname?: string,
    }>();
    const emit = defineEmits(["on_focus", "on_blur", "on_change", "update:text"]);

    // 输入内容
    const val = ref(props.text);
    
    // 格式化内容
    const formatText = (text) => text.replace(/[\n\r]/g, "<br>"); // 将换行符转换为 html <br> 标签
    
    const inputText = () => {
        emit('update:text', formatText(val.value));
    }

</script>