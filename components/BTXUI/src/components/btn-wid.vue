<template>
    <b-hot v-bind="hotData"
           :class="`flex-5 pad-h-1d4 pad-v-d4 thick-1 ellipsis ${btnRound ? 'round-lg' : 'round-sm'} ${btnWidth ? 'lw-' + btnWidth : ''} ${normal.bg} ${normal.text} ${normal.line} solid`"
           :hover="`${hover.text} ${hover.bg} ${hover.line}`"
           :active="`${active.text} ${active.bg} ${active.line}`">

        <!--图标-->
        <b-icon v-if="iconData" v-bind="iconData" class="mrg-r-d7" />

        {{ btnText }}
    </b-hot>
</template>

<script setup lang="ts">
    import { computed } from "vue"
    import BHot from "./core/b-hot.vue";
    import BIcon from "./core/b-icon.vue";

    const props = defineProps<{
        // 文字内容
        btnText: string,

        // 按钮状态颜色
        btnColor?: { 
            normal?: {
                text: string,
                bg: string,
                line: string,
            },
            hover?: {
                text: string,
                bg: string,
                line: string,
            },
            active?: {
                text: string,
                bg: string,
                line: string,
            }
        },

        // 启用圆角
        btnRound?: boolean,

        // 按钮宽度
        btnWidth?: number,

        // b-hot 组件属性
        hotData?: any,

        // b-icon 组件属性
        iconData?: any

    }>();

    // 按钮色彩风格
    const setBg = (type, defaultVal) => {
        const btnColor = props['btnColor'];
        if (btnColor) {
            const bg = btnColor[type]['bg'];
            if (bg?.search('linear') === 0) return `bg-image-${bg}`;
            return `bg-color-${bg || defaultVal}`;
        }
        return `bg-color-${defaultVal}`;
    }
    const normal = computed(() => { // 常规状态
        return {
            text: `color-${props?.btnColor?.normal?.text || 'C777'}`,
            line: `line-${props?.btnColor?.normal?.line || 'none'}`,
            bg: setBg('normal', 'lgray')
        }
    })
    const hover = computed(() => { // 悬停状态
        return {
            text: `color-${props?.btnColor?.hover?.text || 'dgray'}`,
            line: `line-${props?.btnColor?.hover?.line || 'none'}`,
            bg: setBg('hover', 'Ce7e7e7')
        }
    })
    const active = computed(() => { // 激活状态
        return {
            text: `color-${props?.btnColor?.active?.text || 'dgray'}`,
            line: `line-${props?.btnColor?.active?.line || 'Cd7d7d7'}`,
            bg: setBg('active', 'Ce7e7e7')
        }
    })
</script>