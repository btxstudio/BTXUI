<template>
    <!--动态图标-->
    <b-view v-if="icon && icon.search('ani_') === 0" :style="computed_style">
        <!--success-->
        <ani-success v-if="icon === 'ani_success'" key="success" />

        <!--fail-->
        <ani-fail v-if="icon === 'ani_fail'" key="fail" />

        <!--notic-->
        <ani-notic v-if="icon === 'ani_notic'" key="notic" />

        <!--loading-->
        <ani-loading v-if="icon === 'ani_loading'" key="loading"  />
    </b-view>

    <!--字体图标-->
    <i v-else-if="icon" :class="`ico-${icon}`" :style="computed_style"></i>

    <!--图片图标-->
    <b-view v-else-if="bgImg" :bg-img="bgImg" :style="computed_style" />
</template>

<script>
    import bStyle from "./styles/b-style";
    import BView from "./b-view";
    import BText from "./b-text";
    import AniSuccess from "./anis/ani-success";
    import AniFail from "./anis/ani-fail";
    import AniNotic from "./anis/ani-notic";
    import AniLoading from "./anis/ani-loading";

    let desc = ["该组件用于显示图标，包括 “字体图标”、“图片图标”、“css 动画图标”。"],
        extend = ["b-style"],
        dependent = ["b-view", "b-text", "ani-success", "ani-fail", "ani-notic", "ani-loading"],
        api = null,
        init_data = `{
        /* styles: "(参照：b-style 组件入参)" */,
        /* icon: "字体图标名（无需 ico 前缀）| 动态图标（ani_success、ani_fail、ani_notic）" */,
        /* bgImg: "图片地址" */,
    }`;

    export default {
        extends: bStyle,
        name: "b-icon",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText,
            AniSuccess,
            AniFail,
            AniNotic,
            AniLoading
        },
        props: {
            icon: {
                type: String,
                required: false
            },
            imgData: {
                type: Object,
                required: false
            },
            bgImg: {
                type: String,
                required: false
            }
        }
    }
</script>