<template>
    <div :style="bg_style? {...computed_style, position: 'relative', overflow: 'hidden'}: computed_style">
        <!--含背景图容器-->
        <template v-if="bg_style" >
            <div :style="bg_style"></div>
            <div style="position: relative">
                <slot />
            </div>
        </template>

        <!--普通容器-->
        <slot v-else />
    </div>
</template>

<script>
    import bStyle from "./styles/b-style";

    let desc = ["该组件用于实现基础布局。"],
        extend = ["b-style"],
        dependent = [],
        api = null,
        init_data = `{
        /* styles: "(参照：b-style 组件入参)" */,
        /* bgImg: "背景图" */,
        /* filters: [ "背景图滤镜函数",... ] */,
    }`;

    export default {
        extends: bStyle,
        name: "b-view",
        introduce: { desc, extend, dependent, api, init_data },
        props: {
            bgImg: {
                type: String,
                required: false
            },
            filters: {
                type: Array,
                required: false
            },
        },
        computed: {

            //背景图样式
            bg_style(){
                let bg_img = this.bgImg,
                    bg = ["backgroundSize", "backgroundPosition", "backgroundRepeat", "backgroundAttachment"].reduce((total, style)=>{
                        total[style] = this.computed_style[style];
                        delete this.computed_style[style];
                        return total;
                    }, {});
                if(bg_img){
                    return {
                        ...bg,
                        backgroundImage: `url(${bg_img})`,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        filter: this.filters,
                    }
                }
            }

        }
    }
</script>