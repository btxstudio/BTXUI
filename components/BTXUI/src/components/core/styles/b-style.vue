<template>
    <slot/>
</template>
<script setup lang="ts">
    import prestyles from "./prestyles.ts"
    import theme from "./theme.ts"
    import { onMounted, computed, reactive, ref } from "vue"

    const props = defineProps<{
        // 样式集
        class?: any,
    }>()

    // 全局样式 id
    const GLOBAL_STYLE_NAME = "BTXUIGlobal"; 

    // 全局样式对象
    const $style = ref();

    // 全局样式类映射表
    const styleMap = computed(() => {
        const list = <any>[];
        for(let item of $style.value.sheet.rules) {
            list.push(item.selectorText.substr(1)); 
        }
        return list;
    })

    // 设置全局 style
    const initStyle = () => {
        let $_style = document.head.querySelector(`#${ GLOBAL_STYLE_NAME }`);
        if(!$_style) {
            $_style = document.createElement("style");
            $_style.setAttribute("type", "text/css");
            $_style.setAttribute("id", GLOBAL_STYLE_NAME);
            document.head.appendChild($_style);
        }
        $style.value = $_style;
    }

    // 分解样式集
    const styles = reactive({}) as any;
    const validValue = (val: any) => {
        if(!isNaN(val*1)) return val; // 数值判断
        if(theme.colors[val]) return theme.colors[val]; // 颜色判断
        return false;
    }
    const parseStyle = (rule: any) => {
        // 使用预置样式
        let style = prestyles[rule];
        if(style) return style;
        
        const rules = rule.split("-"); 
        const dirs = {
            l: "left",
            t: "top",
            r: "right",
            b: "bottom",
        };
        let [r1, r2, r3, r4] = rules;
        
        // 设置多段样式
        style = prestyles[r1];
        if(style) {
            // property-value[-unit]：
            // 【exp】：mrg-5 | mrg-5-px => mrg: 5rem; | mrg: 5px;
            let value = validValue(r2);
            if(value) return `${ style.pro }: ${ value }${ r3 || style.unit || "" }`;

            // property[-direction]-value[-unit]：
            // 【exp】：mrg-l-5 | mrg-l-5-px => margin-left: 5rem; | margin-left: 5px;
            value = validValue(r3);    
            if(value) return `${ style.pro }-${ dirs[<"l"|"t"|"r"|"b">r2] || r2 }: ${ value }${ r4 || style.unit || "" }`;
        }
    }
    const parseStyles = (_class) => { 
        if(!_class) return;
        _class.split(" ").forEach((rule: string) => {
            if(!styleMap.value.includes(rule)) {  
                styleMap.value.push(rule);
                styles[rule] = parseStyle(rule); 
            }
        })
    }

    // 设置全局类
    const setStyle = () => {  
        Object.keys(styles).forEach(key => {
            $style.value.sheet.addRule(`.${ key }`, styles[key]);
        }) 
    }

    onMounted(() => {
        if(props.class) {
            initStyle();
            parseStyles(props.class);
            setStyle();
        }
    })
</script>