<template>
    <b-view :class="`fixed max bg-color-${matteColor || 'rgba_0_0_0_d2'} l-0 t-0 flex-5`"
        :state="visiable"
        :states="{
            true: 'alpha-1 visible',
            false: 'alpha-0'
        }">
        <b-view class="trans-fast"
            :state="visiable"
            :states="{
                true: 'alpha-1 visible',
                false: 'alpha-0'
            }">
            <slot/>
        </b-view>
    </b-view>
</template>

<script setup lang="ts">
    import { ref } from "vue"

    defineProps<{
        matteColor?: string
    }>();

    /** 显示弹窗 */
    const visiable = ref(false);
    const show = (duration: number) => {
        visiable.value = true;
        setTimeout(() => {
            visiable.value = false;
        }, duration || 2000)
    }
    
    defineExpose({
        show
    })
</script>