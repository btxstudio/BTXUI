<template>
    <b-style :class="class" :states="states" :cname="cname">
        <template v-slot:className="scope">
            <!-- 动态图标 -->
            <template v-if="icon.search('ani_') === 0">
                <!--success-->
                <ani-success v-if="icon === 'ani_success'" key="success" />
        
                <!--fail-->
                <ani-fail v-if="icon === 'ani_fail'" key="fail" />
        
                <!--notic-->
                <ani-notic v-if="icon === 'ani_notic'" key="notic" />
        
                <!--loading-->
                <ani-loading v-if="icon === 'ani_loading'" key="loading"  />
            </template>
            
            <!-- 图片图标 -->
            <b-view v-if="icon.search('/') > -1" :bg-img="icon" :states="states" :class="class" :state="state" />
    
            <!-- 字体图标 -->
            <i v-else :class="`ico-${props.icon} ${ scope.className }`" :state="state"></i>   
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import bStyle from "./styles/b-style.vue"
    import bView from "./b-view.vue"
    import AniSuccess from "./anis/ani-success.vue";
    import AniFail from "./anis/ani-fail.vue";
    import AniNotic from "./anis/ani-notic.vue";
    import AniLoading from "./anis/ani-loading.vue";
    import { State } from "./styles/@types"

    const props = defineProps<{
        // 图标类型
        icon: string,

        // 样式集
        class?: string,

        // 当前状态
        state?: State,

        // 状态样式集
        states?: { [key: string]: any },

        // 样式集别名
        cname?: string,
    }>()
</script>