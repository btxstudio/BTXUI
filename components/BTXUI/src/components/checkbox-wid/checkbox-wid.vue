<template>
    <b-hot :class="combClass"
           hover="alpha-d9"
           :state="selected ? 'act' : ''"
           :states="{
                act: `color-${actColor ? (actColor?.text ?? 'blue') : 'blue'}`
            }"
           @on_click="toggle">

        <!-- 选框 -->
        <slot v-if="$slots.default" :state="selected ? 'act' : ''" />
        <b-view v-else class="w-24-px h-24-px bg-color-neutral round-sm flex-5"
            :cname="`bg-color-${actColor ? (actColor?.bg ?? 'blue') : 'blue'} color-${actColor ? (actColor?.text ?? 'light') : 'light'}`"
            :state="selected ? 'act' : ''"
            :states="{
                act: `bg-color-${actColor ? (actColor?.bg ?? 'blue') : 'blue'} color-${actColor ? (actColor?.icon ?? 'light') : 'light'}`
            }">
            <b-icon icon="success" class="alpha-d3"
                :state="selected ? 'act' : ''"
                :states="{
                    act: 'alpha-1'
                }"/>
        </b-view>

        <!-- 文字 -->
        <b-view v-if="label" class="mrg-l-1 ellipsis">
            {{ selected ? label[1] : label[0] }}
        </b-view>
    </b-hot>
</template>

<script setup lang="ts">
    import { computed } from "vue"
    import BHot from "../core/b-hot"
    import BView from "../core/b-view"
    import BIcon from "../core/b-icon"

    const props = defineProps<{
        // 选中状态
        selected: boolean,

        // 样式集
        class?: string,

        // 选中颜色
        actColor?: {
            text?: string,
            bg?: string,
            icon?: string,
        },

        // 标签文字
        label?: string | [string, string],
    }>();
    const emit = defineEmits(['update:selected', 'change']);

    const combClass = ref(`${props.class} flex-4 bg-color-neutral round-sm ${props.label? 'pad-r-1 pad-v-4-px pad-l-4-px': 'pad-4-px'}`);

    // 标签文字
    const label = computed(() => {
        const label = props.label;
        if (!label) return null;
        return Array.isArray(label) ? label : [label, label];
    });

    // 切换状态
    const selected = computed(() => props.selected);
    const toggle = () => {
        const state = !selected.value;
        emit('update:selected', state);
        emit('change', state);
    }
</script>