<template>
    <span :style="{display: 'inline-block', ...computed_style}">
        <slot/>
    </span>
</template>

<script>
    import bStyle from "./styles/b-style";

    let desc = ["该组件是用于布局的基础组件，相当于 html 中 div 的作用，可以接收 <code>styles</code> 属性来应用框架封装样式体系。"],
        extend = ["b-style"],
        dependent = [],
        api = {
            event: [
                {
                    name: "on_enter",
                    ef: "鼠标移入",
                    params: "event"
                },
                {
                    name: "on_leave",
                    ef: "鼠标移出",
                    params: "event"
                },
                {
                    name: "on_move",
                    ef: "鼠标移动",
                    params: "event"
                },
                {
                    name: "on_touchstart",
                    ef: "触控开始",
                    params: "event"
                },
                {
                    name: "on_touchmove",
                    ef: "触控移动",
                    params: "event"
                },
                {
                    name: "on_touchend",
                    ef: "触控结束",
                    params: "event"
                },
                {
                    name: "on_transitionend",
                    ef: "过渡动画结束",
                    params: "event"
                }
            ]
        },
        init_data = `{
        /* styles: "(参照：b-style 组件入参)" */,
        /* bgImg: "背景图" */,
    }`;

    export default {
        extends: bStyle,
        name: "b-text",
        introduce: { desc, extend, dependent, api, init_data },
    }
</script>