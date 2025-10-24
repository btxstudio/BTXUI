<template>
    <b-view v-for="item of dataTree" :key="item.id">
        <b-hot
            :class="`flex-4 mrg-b-${gap}`"
            :hover="hover"
            :states="{
                'true': `${active ? active : ''}`,
                'false': ''
            }" 
            :state="selected?.findIndex(data => data.id === item.id) as number > -1">
            <b-icon 
                v-if="item.children && item.children.length"
                class="mrg-r-d4" 
                :state="item.spread ? 'content-wid-spread' : 'content-wid-collapse'"
                icon="arrow-right" />
            <b-text>{{ item.text }}</b-text>
        </b-hot>
        <b-view 
            v-if="item.children && item.children.length"
            :states="{
                'show': 'show',
                'hide': 'hide'
            }"
            :state="item.spread ? 'show' : 'hide'"
            :class="`pad-l-${indent}`">
            <content-node-wid v-bind="{...props, dataTree: item.children}" />
        </b-view>
    </b-view>
</template>

<script setup name="ContentNodeWid" lang="ts">
    import { computed, ref, inject } from "vue"
    import BView from "../core/b-view.vue"
    import BHot from "../core/b-hot.vue"
    import BIcon from "../core/b-icon.vue"

    type dataTreeItem = {
        id: string,
        text: string,
        checkbox?: boolean,
        selected?: boolean,
        spread?: boolean,
        children?: dataTreeItem[],
        prefix?: number,
        parent?: dataTreeItem,
    }
    const props = defineProps<{
        dataTree: dataTreeItem[],
        gap?: string,
        indent?: string,
        hover?: string,
        active?: string,
    }>();
    const dataTree = ref<dataTreeItem[]>(props.dataTree || []);
    const emit = defineEmits(["on_select"]); 

    const selected: any = inject('selected');

    // 层级间距 
    const gap = computed(() => {
        return props.gap || "d5"
    })

    // 层级缩进 
    const indent = computed(() => {
        return props.indent || "3"
    })
</script>
<style>
    [state="content-wid-spread"] {
        animation: content-wid-spread .3s forwards;
    }
    [state="content-wid-collapse"] {
        animation: content-wid-collapse .3s forwards;
    }
    @keyframes content-wid-spread {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(90deg);
        }
    }
    @keyframes content-wid-collapse {
        from {
            transform: rotate(90deg);
        }
        to {
            transform: rotate(0);
        }
    }   
</style>