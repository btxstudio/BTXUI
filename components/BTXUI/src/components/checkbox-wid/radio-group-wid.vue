<template>
    <checkbox-group-wid :span="span" :title="title" :class="class" :selected="selected" :options="options" @change="change">
        <!-- 传统单选按钮风格 -->
        <template v-if="regular" v-slot="scope">
            <b-view class="h-24-px w-24-px round-lg pad-d5 bg-color-neutral">
                <b-view class="max round-lg bg-color-C99999944"
                    :state="scope.state"
                    :states="{
                        act: 'bg-color-blue'
                    }"></b-view>
            </b-view>
        </template>

        <!-- 定制化模板样式 -->
        <template v-for="slotName in slots" #[slotName]="scope">
            <slot :name="slotName" :state="scope.state" />
        </template>
    </checkbox-group-wid>
</template>

<script setup lang="ts">
    import { computed, getCurrentInstance, onMounted, ref } from "vue"
    import checkboxGroupWid from "./checkbox-group-wid.vue"
    import { CheckboxData } from "../@types"

    const props = defineProps<{
        // 选项集合
        options: {
            label: string,
            value: string,
            checkboxData?: CheckboxData
        }[],

        // 选中值
        selected: string,

        // 样式集
        class?: string,

        // 标题
        title?: string,

        // 栅格列比
        span?: number,

        // 传统单选按钮
        regular?: boolean,
    }>();
    const emit = defineEmits(['update:selected', 'change']);

    const selected = computed(() => [props.selected]);

    const change = (selected: any) => {
        const values = selected.map(item => item.value);
        if (values.length === 2) {
            emit('update:selected', values[1]);
            emit('change', values);
        }
    }

    const slots = ref<any>([]);
    onMounted(() => {
        slots.value = Object.keys(getCurrentInstance()?.slots ?? []);
    })
</script>