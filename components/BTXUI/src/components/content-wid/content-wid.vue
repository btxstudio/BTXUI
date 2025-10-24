<template>
    <b-hot @on_click="select" :event-proxy="true">
        <content-node-wid v-bind="props" />
    </b-hot>
</template>

<script setup lang="ts">
    import { onBeforeMount, onMounted, ref, reactive, provide } from "vue"
    import contentNodeWid from "./content-node-wid.vue"
    import BHot from "../core/b-hot.vue"

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
    const emit = defineEmits(["on_select"]); 

    // 节点展开数据
    let prefix = 0;
    const result: dataTreeItem[] = reactive([]);
    const flatDataTree = (() => {
        const traverse = (items: dataTreeItem[], parent?: dataTreeItem) => {
            for (const item of items) {
                item.prefix = prefix++; // 添加动态序号属性
                if(parent) item.parent = parent; // 关联父节点属性
                if(item.children) item.spread = item.spread || false; // 重置展开/折叠属性（默认折叠）
                // if(item.selected) item.selected = item.selected || false; // 重置选中（默认单选）
                result.push(item)
                if (item.children && item.children.length > 0) {
                    traverse(item.children, item);
                }
            }
        }
        traverse(props.dataTree);
    })
    const selected: any = ref([]);
    onBeforeMount(() => {
        provide('selected', selected.value);
    })
    onMounted(() => {
        flatDataTree();
    })
    
    // 点击节点
    // let onSelect;
    // const subSelected = ref<dataTreeItem[]>();  
    // const selected: dataTreeItem[] = reactive([]);
    const select = (e) => {
        const x = e.clientX; 
        const y = e.clientY; 
        const element = document.elementFromPoint(x, y);
        let targ;
        console.log(1111, element);
        emit('on_select');
    }
    // const selected: any = ref([]);
    // const emitSelected = (data) => {
    //     selected.value[0] = data;
    //     emit('on_select', data);
    // }
    // onBeforeMount(() => {
    //     if(props.sub) return;
    //     provide('onSelect', (data) => {
    //         emitSelected(data);
    //     });
    //     provide('selected', selected.value);
    // })
    // if(props.sub) {
    //     onSelect = inject('onSelect');
    //     // subSelected.value = inject('selected');
    //     selected.value = inject('selected');
    // }
    // const nodeSelect = (item: dataTreeItem) => {
    //     if(item.spread !== undefined) item.spread = !item.spread;
    //     item.selected = true;
    //     if(props.sub) {
    //         onSelect(item);
    //     } else {
    //         emitSelected(item);
    //     }
    // }   
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