<template>
    <b-style :class="class" :cname="cname" :states="states" :matrix="matrix">
        <template v-slot:className="scope">
            <div ref="$el"
                @animationend="aniEnd"
                :class="scope.className" 
                :data-ani-states="scope.aniStates"
                :state="state"
                :style="{...bgStyle, ...scope.matrixStyle}">
                <slot/>
            </div>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import { computed, ref, watch, onMounted } from "vue"
    import bStyle from "./styles/b-style.vue"
    import { ViewData, State, States } from "./styles/@types"
    import { useRuntimeConfig } from 'nuxt/app'

    interface ViewDataProps extends ViewData {
        class?: any,
        state?: State,
        states?: States,
        bgImg?: string,
        matrix?: {
            translate?: string,
            scale?: string,
            rotate?: string,
            skew?: string
        },
        cname?: string,
        prevent?: boolean,
    }
    const props = defineProps<ViewDataProps>();
    const emit = defineEmits(['on_aniEnd']);

    // 切换动效
    const $el = ref();
    const state = computed(() => props.state);
    let lastAni;
    watch(state, (val, old) => {
        if (val == null || val == undefined || !$el.value.dataset.aniStates) return;
        const aniStates = JSON.parse($el.value.dataset.aniStates);
        if (aniStates[val]) {
            if (old != null || old != undefined) $el.value.classList.remove(aniStates[old]);
            $el.value.classList.add('ani-fast', aniStates[val]);
            lastAni = aniStates[val];
        }
    });
    const aniEnd = (e) => {
        $el.value.classList.remove(lastAni);
        emit('on_aniEnd', e);
    };

    // 背景图样式
    const { public: publicConfig } = useRuntimeConfig()
    const bgStyle = computed(() => props.bgImg? {backgroundImage: `url(${publicConfig.baseURL}${ props.bgImg.replace(/^\//, '') })`}: {});

    // 设置禁止默认
    onMounted(() => {
        if(props.prevent) {
            $el.value.ontouchstart = $el.value.ontouchend = (e) => {
                e.preventDefault();
            }
        }
    })
</script>