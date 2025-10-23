<template>
    <b-view>
        <b-view v-for="item of dataTree">
            <b-hot 
                :class="`flex-4 mrg-b-${gap}`"
                :hover="hover"
                :states="{
                    'true': `${active ? active : ''}`,
                    'false': ''
                }" 
                :state="selected?.findIndex(data => data.id === item.id) as number > -1"
                @on_click="nodeSelect(item)">
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
                <content-wid
                    @on_select="nodeSelect" 
                    v-bind="{...props, dataTree: item.children, sub: true}" />
            </b-view>
        </b-view>
    </b-view>
</template>

<script setup name="ContentWid" lang="ts">
    import { computed, onBeforeMount, onMounted, ref, reactive, provide, inject } from "vue"
    import BView from "../core/b-view.vue"

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
        sub?: boolean,
        gap?: string,
        indent?: string,
        hover?: string,
        active?: string,
    }>();
    const dataTree = ref<dataTreeItem[]>(props.dataTree || []);
    const emit = defineEmits(["on_select"]); 

    // 层级间距 
    const gap = computed(() => {
        return props.gap || "d5"
    })

    // 层级缩进 
    const indent = computed(() => {
        return props.indent || "3"
    })

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
    onMounted(() => {
        if(props.sub) return;
        flatDataTree();
    })
    
    // 点击节点
    let onSelect;
    // const subSelected = ref<dataTreeItem[]>();  
    // const selected: dataTreeItem[] = reactive([]);
    const selected: any = ref([]);
    const emitSelected = (data) => {
        selected.value[0] = data;
        emit('on_select', data);
    }
    onBeforeMount(() => {
        if(props.sub) return;
        provide('onSelect', (data) => {
            emitSelected(data);
        });
        provide('selected', selected.value);
    })
    if(props.sub) {
        onSelect = inject('onSelect');
        // subSelected.value = inject('selected');
        selected.value = inject('selected');
    }
    const nodeSelect = (item: dataTreeItem) => {
        if(item.spread !== undefined) item.spread = !item.spread;
        item.selected = true;
        if(props.sub) {
            onSelect(item);
        } else {
            emitSelected(item);
        }
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