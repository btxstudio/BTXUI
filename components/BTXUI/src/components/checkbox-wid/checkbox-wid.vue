<template>
    <b-hot :class="combClass"
           hover="alpha-d9"
           :state="selected ? 'act' : ''"
           :states="{ act: combActClass }"
           :cname="combClass + combActClass"
           @on_click="toggle">

        <!-- 选框 -->
        <slot :state="selected ? 'act' : ''">
            <b-view class="w-24-px h-24-px bg-color-neutral round-sm flex-5"
                :state="selected ? 'act' : ''"
                :cname="combClass + combActClass"
                :states="{
                    act: `bg-color-${actColor ? (actColor?.bg ?? 'blue') : 'blue'} color-${actColor ? (actColor?.icon ?? 'light') : 'light'}`
                }">
                <b-icon icon="success" class="alpha-d3"
                    :state="selected ? 'act' : ''"
                    :states="{
                        act: 'alpha-1'
                    }"/>
            </b-view>
        </slot>

        <!-- 文字 -->
        <b-view v-if="label" class="pad-h-1 ellipsis">
            {{ selected ? label[1] : label[0] }}
        </b-view>
    </b-hot>
</template>

<script setup lang="ts">
    import { computed, ref } from "vue"
    import BHot from "../core/b-hot.vue"
    import BView from "../core/b-view.vue"
    import BIcon from "../core/b-icon.vue"
    import { CheckboxData, Label } from "../@types"

    interface CheckboxDataProp extends CheckboxData {
        selected: boolean,
        value?: string,
        class?: string,
        actClass?: string,
        actColor?: {
            bg?: string,
            icon?: string,
        },
        label?: Label,
    }
    const props = defineProps<CheckboxDataProp>();
    const emit = defineEmits(['update:selected', 'change']);

    const combClass = ref(props.class ?? 'flex-4 bg-color-neutral round-sm pad-4-px');
    const combActClass = ref(`color-blue ${props.actClass ?? ''}`);

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
        emit('change', props.value, state);
    }
</script>