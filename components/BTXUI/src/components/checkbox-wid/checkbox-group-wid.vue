<template>
    <b-view :class="class">
        <b-view class="mrg-b-1" v-if="title">{{ title }}</b-view>
        <b-row>
            <b-col class="flex-4" :span="span" v-for="(item, i) of checkboxData" :key="i">
                <checkbox-wid  
                    @change="change"
                    :label="item.label" 
                    :value="item.value" 
                    v-bind="item.checkboxData"
                    v-model:selected="item.selected">
                    <!-- 公共模板样式 -->
                    <template v-if="$slots.default" v-slot="scope">
                        <slot name="default" :state="scope.state" />
                    </template>

                    <!-- 定制化模板样式 -->
                    <template v-if="$slots[item.value]"  v-slot="scope">
                        <slot :name="item.value" :state="scope.state" />
                    </template>
                </checkbox-wid>
            </b-col>
        </b-row>
    </b-view>
</template>

<script setup lang="ts">
    import { computed } from "vue"
    import checkboxWid from "./checkbox-wid.vue"
    import { CheckboxData } from "../@types"
    import BView from "../core/b-view.vue"

    const props = defineProps<{
        // 选项集合
        options: {
            label: string,
            value: string,
            checkboxData?: CheckboxData
        }[],

        // 选中值集合
        selected: Array<string>,

        // 样式集
        class?: any,

        // 标题
        title?: string,

        // 栅格列比
        span?: number,
    }>();
    const emit = defineEmits(['update:selected', 'change']);

    // 输入所选值集合
    const checkboxData = computed(() => {
        return props.options.map(opt => {
            return { ...opt,
                checkboxData: {
                    ...opt?.checkboxData,
                    class: opt?.checkboxData?.class ?? 'bg-color-none mrg-r-1d5 flex-4 pad-4-px'
                },  
                selected: props.selected.includes(opt.value)
            };
        })
    })

    // 输出所选值集合
    const change = (value, state) => {
        const selected = [...props.selected];
        if (state && !selected.includes(value)) selected.push(value); // 添加
        if (!state && selected.includes(value)) selected.splice(selected.findIndex(val => val === value), 1); // 移除
        emit('update:selected', selected);
        emit('change', selected.map(value => {
            return {
                label: props.options.find(opt => opt.value === value)?.label,
                value 
            }
        }));
    }
</script>