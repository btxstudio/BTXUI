<template>
    <b-view>
        <b-view v-for="item of dataTree">
            <b-hot 
                :class="`flex-4 mrg-b-${gap}`"
                :hover="hover" 
                @on_click="nodeSelect(item)">
                <b-icon 
                    v-if="item.children && item.children.length" 
                    class="mrg-r-d4"
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
                result.push(item)
                if (item.children && item.children.length > 0) {
                    traverse(item.children, item);
                }
            }
        }
        traverse(props.dataTree);
    })
    onBeforeMount(() => {
        if(props.sub) return;
        provide('onSelect', (data) => {
            emit('on_select', data);
        });
    })
    onMounted(() => {
        if(props.sub) return;
        flatDataTree();
    })
    
    // 点击节点
    let onSelect; 
    if(props.sub) {
        onSelect = inject('onSelect');
    }
    const nodeSelect = (item: dataTreeItem) => {
        if(item.spread !== undefined) item.spread = !item.spread;
        if(props.sub) {
            onSelect(item);
        } else {
            emit('on_select', item);
        }
    }   
</script>