<template>
    <b-view class="flex-7">
        <radio-group-wid :options="options" :title="title" v-model:selected="selected">
            <!-- grid 风格模板 -->
            <template v-if="slots.length === 0 && tabStyle === 'grid'" v-slot="scope"><span></span></template>

            <!-- card 风格模板 -->
            <template v-else-if="slots.length === 0 && tabStyle === 'card'" v-slot="scope">
                <b-view class="w-4-px b-f1-px h-1-px bg-color-neutral r-f5-px abs"></b-view>
            </template>

            <!-- 默认风格模板 -->
            <template v-else-if="slots.length === 0" v-slot="scope">
                <b-view :class="`max-w l-0 b-f1-px round-sm h-2-px bg-color-none abs`"
                    :state="scope.state"
                    :states="{
                        act: `bg-color-${color}`
                    }"></b-view>
            </template>
    
            <!-- 定制化模板样式 -->
            <template v-for="slotName in slots" #[slotName]="scope">
                <slot :name="slotName" :state="scope.state" />
            </template>
        </radio-group-wid>
        <b-view v-if="contLine" class="grow-1 h-1-px bg-color-neutral"></b-view>
    </b-view>
    <b-view class="pad-v-1d5 over-hide" v-if="contArea">
        <b-view v-if="selected">
            <div v-html="tabConts[selected]" :class="smooth ? `ani-fast ani-${flipDir}` : ''" @animationend="flipDir = ''"></div>
        </b-view>
        <b-view v-else class="alpha-d5">
            <div v-html="noDataNotic ?? '暂未选择标签'"></div>
        </b-view>
    </b-view>
</template>

<script setup lang="ts">
    import { computed, onBeforeMount, getCurrentInstance, reactive, watch, ref } from "vue"
    import radioGroupWid from "./radio-group-wid.vue"
    import bView from "../core/b-view.vue"

    const props = defineProps<{
        // 选项集合
        options: {
            label: string,
            value: string,
            cont: string,
            checkboxData?: any
        }[],

        // 选中值
        selected: string,

        // 标题
        title?: string,

        // 主题色
        color?: string,

        // 网格风格
        tabStyle?: 'grid' | 'card',

        // 滑动切换
        smooth?: boolean,

        // 无数据提示
        noDataNotic?: string,
    }>();
    const emit = defineEmits(['update:selected', 'change']);

    // 选项内容
    const tabConts = reactive<any>({});

    // 主题色
    const color = computed(() => props.color ?? 'blue');

    // 标签顺序
    const tabOrder = reactive<any>({});

    // 数据处理
    const contLine = ref(false);
    const options = computed(() => {
        return props.options.map((opt, i) => {
            const { label, value, cont } = opt;
            let checkboxData = opt.checkboxData; // 自定义风格
            tabConts[value] = cont;
            tabOrder[value] = i;
            
            if (!checkboxData) {
                // 默认风格
                contLine.value = true;
                checkboxData = {
                    class: 'round-none solid-b line-neutral thick-1 pad-b-1 bg-color-none rel',
                    actClass: `color-${color.value}`
                }
                
                // 网格风格
                if (props.tabStyle === 'grid') {
                    contLine.value = false;
                    checkboxData = {
                        class: 'round-none thick-1 solid line-neutral bg-color-none',
                        actClass: `line-${color.value} color-${color.value}`
                    }    
                }
    
                // 卡片风格
                if (props.tabStyle === 'card') {
                    checkboxData = {
                        class: 'round-sm round-t thick-1 solid line-neutral bg-color-neutral rel mrg-r-4-px',
                        actClass: `bg-color-none solid-b-none t-f1-px color-${color.value}`
                    }    
                }
            }
            return { label, value, checkboxData };
        });
    });
    const contArea = computed(() => props.options.findIndex(opt => opt.cont) > -1);

    const selected = ref(props.selected);
    const flipDir = ref('');
    watch(selected, (val, oldVal) => {
        flipDir.value = tabOrder[val] > tabOrder[oldVal] ? 'right-to-left' : 'left-to-right';
        emit('update:selected', val);
        emit('change', {
            cur: val,
            old: oldVal,
            dir: tabOrder[val] > tabOrder[oldVal] ? 1 : 0,
            aniClass: `ani-${flipDir.value}`,
        });
    })

    const slots = ref<any>([]);
    onBeforeMount(() => {
        slots.value = Object.keys(getCurrentInstance()?.slots ?? []);
    })
</script>