<template>
    <b-view v-for="item of dataTree" :state="`id-${item.id}`" :key="item.id">
        <b-hot
            :cname="`${item.id}-${Math.random()}`"
            :class="`flex-4 pad-v-${gap} pad-l-${setIndex(item.level)}`"
            :hover="hover"
            :states="{
                true: `${active ? active : ''}`,
                false: ''
            }" 
            :state="(selected?.findIndex(data => data.id === item.id) as number > -1).toString()">
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
            :state="item.spread ? 'show' : 'hide'">
            <content-node-wid v-bind="{...props, dataTree: item.children}" />
        </b-view>
    </b-view>
</template>

<script setup name="ContentNodeWid" lang="ts">
    import { computed, ref, inject } from "vue"
    import BView from "../core/b-view.vue"
    import BHot from "../core/b-hot.vue"
    import BIcon from "../core/b-icon.vue"
    import { DataTreeItem } from "../@types"

    const props = defineProps<{
        dataTree: DataTreeItem[],
        gap?: string,
        indent?: string,
        hover?: string,
        active?: string,
    }>();
    const dataTree = ref<DataTreeItem[]>(props.dataTree || []);
    const emit = defineEmits(["on_select"]); 

    const selected: any = inject('selected');

    // 层级间距 
    const gap = computed(() => {
        return props.gap || "d7"
    })

    // 层级缩进 
    const indent = computed(() => {
        return props.indent || "3"
    })
    const setIndex = (level) => {
        return (level * parseFloat(indent.value.replace('d', '.')) + parseFloat(gap.value.replace('d', '.'))).toString().replace('.', 'd');
    }
</script>