<template>
    <slot name="className" :class-name="className" />
</template>
<script setup lang="ts">
    import prestyles from "./prestyles.ts"
    import theme from "./theme.ts"
    import { onMounted, computed, reactive, ref } from "vue"
    import * as md5 from "md5"

    const props = defineProps<{
        // 样式集
        class?: any,

        // 聚焦样式集
        focus?: any,

        // 鼠标悬停样式集
        hover?: any,

        // 激活样式集
        active?: any,

        // 状态样式集
        states?: { [key: string]: any },
    }>()

    // 全局样式 id
    const GLOBAL_STYLE_NAME = "BTXUIGlobal"; 

    // 全局样式对象
    const $style = ref();

    // 解析应用 class
    const className = ref("");

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

    // 样式集
    const styles = reactive({}) as any;

    // 获取有效数值
    const validNumber = (val: any) => {
        if(!isNaN(val*1)) return val;

        let num = val;
        if(/^f\d+$/.test(num)) num = num.substr(1) * -1; // 负数处理
        if(/^\d*d\d+$/.test(num)) num = num.replace("d", ".") * 1; // 小数处理
        return isNaN(num)? false: num;
    }

    // 获取有效颜色值
    const validColor = (val: any) => {
        if(theme.colors[val]) return theme.colors[val]; // 预置颜色
        if(val && val.search("C") === 0) return `#${ val.substr(1) }`; // 16 进制颜色
        return false;
    }

    // 获取有效字符值
    const validValue = (val: any) => {
        // 字符串判断 (_ 前缀)
        // 【exp】：font-_iconfont 
        if(val && val.search("_") === 0) return val.substr(1);
        
        // 数值判断
        // 【exp】：mrg-5 | mrg-f5 | mrg-2d5 | mrg-f2d5
        const num = validNumber(val);
        if(num !== false) return num;

        // 颜色判断
        // 【exp】：color-red | color-Cec4334
        const color = validColor(val);
        if(color !== false) return color;

        return false;
    }

    // 解析样式集
    const parseStyle = (rule: any) => {
        // 使用预置样式
        let style = prestyles[rule];
        if(style) return style;
        
        const rules = rule.split("-"); 
        const dirs = {
            l: ["left"],
            t: ["top"],
            r: ["right"],
            b: ["bottom"],
            v: ["top", "bottom"],
            h: ["left", "right"]
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
            // 【exp】：mrg-l-5 | mrg-l-5-px | mrg-h-5 => margin-left: 5rem; | margin-left: 5px; | margin-left: 5rem; margin-right: 5rem;
            value = validValue(r3);    
            if(value) {
                const dir = dirs[<"l"|"t"|"r"|"b">r2];
                if(dir) {
                    let dirStyle = "";
                    dir.forEach(_dir => {
                        dirStyle += `${ style.pro }-${ _dir }: ${ value }${ r4 || style.unit || "" };`;    
                    })
                    return dirStyle;
                } else {
                    return `${ style.pro }-${ r2 }: ${ value }${ r4 || style.unit || "" }`;
                }
            }
        }
    }

    // 合成样式集
    const combineStyles = (_class) => {
        if(!_class) return "";
        const combineStyle = _class.split(" ").reduce((total: string, rule: string) => {
            const validateRule = parseStyle(rule);
            if(!validateRule) return;
            total += `${ validateRule };`;
            return total;
        }, "");
        return combineStyle.replace(/;+/g, ";");
    }

    // 添加样式集
    const appendStyle = (selector, rules) => {
        const validateRule = combineStyles(rules);
        if(!validateRule) return; 
        if(!styleMap.value.includes(selector)) {
            styleMap.value.push(selector);
            styles[selector] = validateRule;
        }
    }

    // 批量解析样式集
    const parseStyles = (_class) => { 
        if(!_class) return;
        _class.split(" ").forEach((selector: string) => {
            appendStyle(selector, selector);
        })
    }

    // 合成聚类名
    const combineClassName = (_class) => {
        const classArr = _class.split(" ").sort();
        const compSelector = `B-${ md5(classArr.join("&")) }`;
        className.value = `${ _class } ${ compSelector }`;
        if(!styleMap.value.includes(compSelector)) {
            styleMap.value.push(compSelector);
            // styles[compSelector] = combineStyles(_class);
        }
        return compSelector;
    }
    
    // 基于聚类名，生成聚焦样式集
    const genFocusStyles = (compSelector) => {
        if(props.focus) appendStyle(compSelector, props.focus);        
    }
    
    // 基于聚类名，生成鼠标悬停样式集
    const genHoverStyles = (compSelector) => {
        if(props.hover) appendStyle(compSelector, props.hover);        
    }

    // 基于聚类名，生成激活样式集
    const genActiveStyles = (compSelector) => {
        if(props.active) appendStyle(compSelector, props.active);        
    }

    // 基于聚类名，生成状态样式集
    const genStateStyles = (baseSelector) => {
        if(!props.states) return;
        Object.keys(props.states).forEach(state => {
            appendStyle(`${ baseSelector }[state="${ state }"]`, (props.states as any)[state]); 
        })
    }

    // 设置样式集
    const setStyle = () => {  
        Object.keys(styles).forEach(key => {
            $style.value.sheet.addRule(`.${ key }`, styles[key]);
        }) 
    }

    onMounted(() => {
        if(props.class) {
            initStyle();
            parseStyles(props.class);
            const compSelector = combineClassName(props.class);
            genFocusStyles(`${ compSelector }[focus='true']:focus`); // 生成聚焦伪类样式
            genHoverStyles(`${ compSelector }[hover='true']:hover`); // 生成鼠标悬停伪类样式
            genActiveStyles(`${ compSelector }[active='true']:active`); // 生成激活伪类样式
            genStateStyles(compSelector); // 生成状态样式
            setStyle();
        }
    })
</script>