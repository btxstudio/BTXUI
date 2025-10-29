<template>
    <b-view :class="`fixed t-0 l-0 max z-9 ${dirStyle.layout}`"
        :state="closeState" 
        :states="{
            true: 'alpha-1 visible',
            false: 'alpha-0'
        }">

        <!-- matte -->
        <b-hot
            @on_transend="matteAniend" 
            @on_click="hide" 
            :state="visiable" 
            :states="{
                true: 'alpha-1 visible',
                false: 'alpha-0'
            }"
            :class="`abs trans-fast max t-0 l-0 bg-color-${matteColor || 'C000000cc'}`"></b-hot>
        
        <!-- pannel -->
        <b-view 
            :class="`${dirStyle.pannal} rel ani-mode-both`"
            :state="aniDir"
            :states="{
                left: {
                    ani: 'ani-left-to-right'
                },
                right: {
                    ani: 'ani-right-to-left'
                },
                top: {
                    ani: 'ani-top-to-bottom'
                },
                bottom: {
                    ani: 'ani-bottom-to-top'
                },
                center: {
                    ani: 'ani-scale-fade-in'
                },
                leftBack: {
                    ani: 'ani-left-to-right-reverse'
                },
                rightBack: {
                    ani: 'ani-right-to-left-reverse'
                },
                topBack: {
                    ani: 'ani-top-to-bottom-reverse'
                },
                bottomBack: {
                    ani: 'ani-bottom-to-top-reverse'
                },
                centerBack: {
                    ani: 'ani-scale-fade-out'
                },
            }">
            <slot v-if="$slots.custom" name="custom" />
            <b-view v-else 
                :class="`bg-color-${pannelColor || 'light'} rel pad-2 ${roundEnable ? 'round-md' : ''} ${dirStyle.pannal}`">
                <b-hot v-if="!closeEnable" class="abs r-1 t-d7 color-mgray" @on_click="hide">
                    <b-icon icon="fail" class="fsize-2 lh-1d4" />
                </b-hot>
                <slot />
            </b-view>
        </b-view>
    </b-view>
</template>
<script lang="ts" setup>
    import { ref, computed, watchEffect } from 'vue';

    const props = defineProps<{
        visiable: boolean,
        matteColor?: string,
        closeEnable?: boolean,
        roundEnable?: boolean,
        pannelColor?: string,
        dir?: 'left' | 'right' | 'top' | 'bottom' | 'center', 
    }>()
    const emit = defineEmits(['update:visiable']);

    /** 模态窗方向 */
    const dir = computed(() => props.dir || 'bottom');
    const dirStyle = computed(() => {
        let layout, pannal;
        switch(dir.value) {
            case 'left':
                layout = 'flex-4';
                pannal = `max-h round-r`;
                break; 
            case 'right':
                layout = 'flex-6';
                pannal = `max-h round-l`;
                break; 
            case 'top':
                layout = 'flex-2';
                pannal = `max-w round-b`;
                break; 
            case 'bottom':
                layout = 'flex-8';
                pannal = `max-w round-t`;
                break; 
            case 'center':
                layout = 'flex-5';
                pannal = ``;
                break; 
        }
        return { layout, pannal }
    })

    /** 显示模态窗 */
    const aniDir = ref('');
    watchEffect(() => {
        if(props.visiable) { // 显示
            closeState.value = true;
            aniDir.value = dir.value;
        } else { // 隐藏
            aniDir.value = `${dir.value}Back`;
        }
    })

    
    /** 隐藏模态窗 */
    const closeState = ref(false);
    const matteAniend = (e) => {
        if(getComputedStyle(e.target).opacity === "0") closeState.value = false;
    }
    const hide = () => {
        emit('update:visiable', false);
    }
</script>