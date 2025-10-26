<template>
    <b-hot @on_click="select" :event-proxy="true">
        <content-node-wid v-if="flatState" v-bind="{...props, dataTree: dataTree}" />
    </b-hot>
</template>

<script setup lang="ts">
    import { onBeforeMount, onMounted, ref, reactive, provide } from "vue"
    import contentNodeWid from "./content-node-wid.vue"
    import BHot from "../core/b-hot.vue"
    import { DataTreeItem } from "../@types"

    const props = defineProps<{
        dataTree: DataTreeItem[],
        gap?: string,
        indent?: string,
        hover?: string,
        active?: string,
    }>();
    const emit = defineEmits(["on_select"]); 

    // 节点展开数据
    let prefix = 0;
    const flatDataTree: DataTreeItem[] = reactive([]);
    const indexDataTree: any = reactive({});
    const dataTree = ref(props.dataTree);
    const flatState = ref(false);
    const flatData = (() => {
        const traverse = (items: DataTreeItem[], parent?: DataTreeItem, level=0) => {
            for (const item of items) {
                item.level = level; // 添加层级标志
                item.prefix = prefix++; // 添加动态序号属性
                if(parent) item.parent = parent; // 关联父节点属性
                if(item.children) item.spread = item.spread || false; // 重置展开/折叠属性（默认折叠）
                // if(item.selected) item.selected = item.selected || false; // 重置选中（默认单选）
                flatDataTree.push(item)
                indexDataTree[item.id] = item;
                if (item.children && item.children.length > 0) {
                    traverse(item.children, item, level+1);
                }
            }
        }
        traverse(dataTree.value);
    })
    const selected: any = ref([]);
    onBeforeMount(() => {
        provide('selected', selected.value);
    })
    onMounted(() => {
        flatData();
        flatState.value = true;
    })
    
    // 点击节点
    const select = (e) => {
        const x = e.clientX; 
        const y = e.clientY; 
        let element: Element|null = document.elementFromPoint(x, y);
        while(!(element?.getAttribute('state')?.indexOf('id-') === 0)) {
            element = element?.parentElement as Element;
        }
        const data = indexDataTree[element?.getAttribute('state')?.substring(3) as string];
        selected.value[0] = data;
        if(data.spread !== undefined) data.spread = !data.spread;
        emit('on_select', data);
    }
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