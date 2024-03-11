<template>
    <b-style :class="class" :states="states" :cname="cname">
        <template v-slot:className="scope">
            <b-view :class="`${scope.className} rel`">
                <!--容器描边-->
                <b-view class="abs max bg-none z-1 t-0 l-0"
                        :states="{
                            line: {
                                style: `line line-${outlineColor} thick-${ line }`,
                                state: outlineColor
                            }
                        }">
                </b-view>
        
                <!--网格-->
                <b-view class="grid">
                    <b-view v-for="(item,i) of colData.items" :key="i"
                            :class="`${colData.common_plan || item.plan } rel line-b line-r solid thick-${ line } h-${gridHeight} pad-${gap}`">
                        <slot :name="item.Id || item.Id" />
                    </b-view>
                </b-view>
            </b-view>
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import bStyle from "./styles/b-style.vue"
    import bView from "./b-view.vue"

    defineProps<{
        colData: {
            common_plan: number,
            items: [
                {
                    plan: number,
                    Id: number | string
                }
            ]
        },

        // 样式集
        class?: string,

        // 当前状态
        state?: string | boolean,

        // 状态样式集
        states?: { [key: string]: any },

        gap?: number,

        gridHeight?: number,

        line?: number,

        outlineColor?: string,

        // 样式集别名
        cname?: string,
    }>();
</script>