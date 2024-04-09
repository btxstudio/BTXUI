<template>
    <slot name="className" :ani-states="aniStates.str || null" :class-name="className" :matrix-style="matrixStyle" />
</template>
<script setup lang="ts">
    import prestyles from "./prestyles.ts"
    import theme from "./theme.ts"
    import { onMounted, computed, reactive, ref } from "vue"
    import md5 from 'blueimp-md5'
    import { States } from "../styles/@types"
import { match } from "assert"

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
        states?: States,

        // 变形矩阵
        matrix?: {
            translate?: string,
            scale?: string,
            rotate?: string,
            skew?: string
        },

        // 样式集扩展
        extraClass?: {
            selector: '>' | '+' | ' ' | '~',
            value: string
        },

        // 样式集唯一标识
        cname?: string
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
        if(!isNaN(val*1) || val === 'auto') return val;

        let num = val.toString();
        if(num[0] === 'f') num = `-${num.substr(1)}`; // 负数处理
        if(/^-?\d*d\d+$/.test(num)) num = num.replace("d", ".") * 1; // 小数处理
        return isNaN(num)? false: num;
    }

    // 获取有效颜色值
    const validColor = (val: any) => {
        if(theme.colors[val]) return theme.colors[val]; // 预置颜色
        if(val && val.search("C") === 0) return `#${ val.substr(1) }`; // 16 进制颜色
        if(val && val.search("rgb") === 0) { // rgb 颜色
            const parts = val.split('_')
            return `${parts[0]}(${parts[1]},${parts[2]},${parts[3]}${parts[4] ? ',' + validNumber(parts[4]) : ''})`; 
        }
        return false;
    }
    
    // 获取有效渐变值
    const validGradient = (val: any) => {
        if(val && val.search("linear") === 0) { // 线性渐变
            const parts = val.split('_');
            const [type, dir, ...colors] = parts;
            return `${type}-gradient(${dir}deg,${colors.map(color => validColor(color)).join(',')})`; 
        }
        return false;
    }

    // 获取有效值
    const validValue = (val: any) => {
        if(!val) return false;

        // 字符串判断 (_ 前缀)
        // 【exp】：font-_iconfont 
        if(val.search("_") === 0) return val.substr(1);
        
        // 数值判断
        // 【exp】：mrg-5 | mrg-f5 | mrg-2d5 | mrg-f2d5
        const num = validNumber(val);
        if(num !== false) return num;

        // 颜色判断
        // 【exp】：color-red | color-Cec4334 | color-rgb_15_94_219
        const color = validColor(val);
        if(color !== false) return color;

        // 渐变判断
        // 【exp】：linear_45_C222_C555
        const gradient = validGradient(val);
        if(gradient !== false) return gradient;

        return false;
    }

    // 单位设置
    const setUnit = (val, customUnit?, Presetunit?) => {
        let unit = customUnit ?? Presetunit;
        if (val === 'auto') unit = '';
        if (unit === 'P') unit = '%';
        return unit ?? ''; 
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
            h: ["left", "right"],
            x: ["x"],
            y: ["y"],
        };
        let [r1, r2, r3, r4] = rules;
        
        // 设置多段样式
        style = prestyles[r1];
        if(style) {
            // property-value[-unit]：
            // 【exp】：mrg-5 | mrg-5-px => mrg: 5rem; | mrg: 5px;
            let value = validValue(r2);
            if(value) return `${ style.pro }: ${ value }${ setUnit(value, r3, style.unit) }`;
            
            // property[-direction]-value[-unit]：
            // 【exp】：mrg-l-5 | mrg-l-5-px | mrg-h-5 | mrg-h-auto => margin-left: 5rem; | margin-left: 5px; | margin-left: 5rem; margin-right: 5rem; | margin-left: auto; margin-right: auto;
            value = validValue(r3);    
            if(value) {
                const dir = dirs[r2];
                if(dir) {
                    let dirStyle = "";
                    dir.forEach(_dir => {
                        dirStyle += `${ style.pro }-${ _dir }: ${ value }${ setUnit(value, r4, style.unit) };`;    
                    })
                    return dirStyle;
                } else {
                    return `${ style.pro }-${ r2 }: ${ value }${ setUnit(value, r4, style.unit) }`;
                }
            }
        }
    }

    // 合成样式集
    const combineStyles = (_class) => {
        if(!_class) return "";
        const combineStyle = _class.trim().split(" ").reduce((total: string, rule: string) => {
            const validateRule = parseStyle(rule);
            if(!validateRule) return '';
            total += `${ validateRule };`;
            return total;
        }, "");
        return combineStyle.replace(/;+/g, ";");
    }

    // 添加样式集
    const appendStyle = (selector, rules) => {
        if(!styleMap.value.includes(selector)) {
            const validateRule = combineStyles(rules);
            if(!validateRule) return; 
            styleMap.value.push(selector);
            styles[selector] = validateRule;
        }
    }

    // 批量解析样式集
    const parseStyles = (_class) => { 
        if(!_class) return;

        // 类元素拆分及优先级处理
        // const classBak = _class.split(" ").reduce((total, cur) => {
        //     const index = total.findIndex(val => val === cur);
        //     if (index > -1) total.splice(index, 1);
        //     total.push(cur);
        //     return total;
        // }, []);

        _class.split(" ").forEach((selector: string) => {
            appendStyle(selector, selector);
        })
    }

    // 合成聚类名
    const combineClassName = (_class, key) => {
        const classArr = _class.split(" ").sort();
        const compSelector = `B-${ md5(classArr.join("&") + key) }`;
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
    const dealRule = (baseSelector, state, stateStyles) => {
        appendStyle(`${ baseSelector }[state="${ state }"]`, stateStyles); 
    }
    const aniStates = reactive({
        res: {},
        str: ''
    });
    const dealClassToggle = (state, ani) => {
        aniStates.res[state] = ani;
    }
    const genStateStyles = (baseSelector) => {
        if(!props.states) return;
        Object.keys(props.states).forEach(state => {
            if(props.states) {
                const stateStyles = props.states[state];
                if(typeof(stateStyles) === 'string') {
                    dealRule(baseSelector, state, stateStyles);   
                } else {
                    const { class: styles, ani } = stateStyles;
                    dealRule(baseSelector, state, styles);   
                    dealClassToggle(state, ani);
                }
            }
        })
        aniStates.str = Object.keys(aniStates.res).length === 0 ? '' : JSON.stringify(aniStates.res);
    }

    // 基于聚类名，生成派生样式集
    const genExtraStyles = (baseSelector) => {
        if(!props.extraClass) return;
        const { selector, value } = props.extraClass;
        appendStyle(`${ baseSelector }${ selector }*`, value); 
    }

    // 设置样式集
    const setStyle = () => {  
        Object.keys(styles).forEach(key => {
            $style.value.sheet.addRule(`.${ key }`, styles[key]);
        }) 
    }

    // 合成矩阵行内样式
    const matrixStyle = ref(); // 解析应用矩阵行内样式 
    const matrix = () => {  
        const translate = props.matrix?.translate? `translate(${ props.matrix?.translate })`: ""; // 位移
        const scale = props.matrix?.scale? `scale(${ props.matrix?.scale })`: ""; // 放缩
        const rotate = props.matrix?.rotate? `rotate(${ props.matrix?.rotate })`: ""; // 旋转
        const skew = props.matrix?.skew? `skew(${ props.matrix?.skew })`: ""; // 斜切
        matrixStyle.value = props.matrix? {
            transform: `${ translate } ${ scale } ${ rotate } ${ skew }`
        }: {};
    }

    onMounted(() => {
        if(props.matrix) matrix();

        initStyle();
        const _class = props.class ?? `style-${Math.round(Math.random() * 10000)}`;
        parseStyles(_class);
        const compSelector = combineClassName(_class, props.cname ?? '');
        genFocusStyles(`${ compSelector }[focus='true']:focus`); // 生成聚焦伪类样式
        genHoverStyles(`${ compSelector }[hover='true']:hover`); // 生成鼠标悬停伪类样式
        genActiveStyles(`${ compSelector }[active='true']:active`); // 生成激活伪类样式
        genStateStyles(compSelector); // 生成状态样式
        genExtraStyles(compSelector); // 生成派生样式
        setStyle();
    })
</script>