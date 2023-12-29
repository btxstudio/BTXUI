<template>
    <b-style :class="class">
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
            <b-img v-if="icon.search('/') > -1" :img="icon" :class="scope.className" />
    
            <!-- 字体图标 -->
            <i v-else :class="`ico-${props.icon} ${ scope.className }`"></i>   
        </template>
    </b-style>
</template>

<script setup lang="ts">
    import bStyle from "./styles/b-style.vue"
    import bImg from "./b-img.vue"
    import AniSuccess from "./anis/ani-success.vue";
    import AniFail from "./anis/ani-fail.vue";
    import AniNotic from "./anis/ani-notic.vue";
    import AniLoading from "./anis/ani-loading.vue";

    const props = defineProps<{
        // 图标类型
        icon: string,

        // 样式集
        class?: string
    }>()
</script>