interface Prestyles {
    [key:string]: any
}

export default <Prestyles>{

    //预置样式-----------------------------------------------------------------------------------

    // 文本对齐
    "pcenter": `text-align: center;`,
    "pright": `text-align: right;`,
    "pleft": `text-align: left;`,
    "pjustify": `text-align: justify;`,

    // 首行缩进
    "pindent": `text-indent: 2em;`,

    // 文字加粗
    "bold": `font-weight: bold;`,

    // 隐藏显示
    "show": `display: block;`,
    "hide": `display: none;`,

    // 布局
    "wrap": `flex-wrap: wrap;`,
    "flex": `display: flex; justify-content: flex-start; align-items: stretch;`,
    "flex-column": `display: flex; flex-direction: column;`,
    "flex-between": `display: flex; justify-content: space-between; align-items: center;`,
    "flex-around": `display: flex; justify-content: space-around; align-items: center;`,
    "grid": `display: flex; flex-wrap: wrap; align-content: flex-start;`,
    
    // 布局 - 九宫格
    "flex-1": `display: flex; justify-content: flex-start; align-items: flex-start;`,
    "flex-2": `display: flex; justify-content: center; align-items: flex-start;`,
    "flex-3": `display: flex; justify-content: flex-end; align-items: flex-start;`,
    "flex-4": `display: flex; justify-content: flex-start; align-items: center`,
    "flex-5": `display: flex; justify-content: center; align-items: center;`,
    "flex-6": `display: flex; justify-content: flex-end; align-items: center;`,
    "flex-7": `display: flex; justify-content: flex-start; align-items: flex-end;`,
    "flex-8": `display: flex; justify-content: center; align-items: flex-end;`,
    "flex-9": `display: flex; justify-content: flex-end; align-items: flex-end;`,

    // 布局 - 尺寸
    "max-h": `height: 100%;`,
    "max-w": `width: 100%;`,
    "max": `height: 100%; width: 100%;`,
    "max-fixed": `height: 100%; width: 100%; position: fixed; left: 0; top: 0;`,
    "max-screen": `height: 100vh; width: 100%;`,

    "item": {
        breakInside: "avoid",
        mozPageBreakInside: "avoid",
        webkitColumnBreakInside: "avoid"
    },

    // 定位
    "fixed": `position: fixed;`,
    "rel": `position: relative;`,
    "abs": `position: absolute;`,

    // 溢出处理
    "over-hide": `overflow: hidden;`,
    "over-show": `overflow: visible;`,
    "over-scroll": `overflow: auto;`,

    // 背景 - 重复
    "brepeat": `background-repeat: repeat;`,
    "brepeat-x": `background-repeat: repeat-x;`,
    "brepeat-y": `background-repeat: repeat-y;`,
    
    // 背景 - 尺寸
    "bsize-cover": `background-size: cover;`,
    "bsize-contain": `background-size: contain;`,
    "bsize-max": `background-size: 100% 100%;`,
    "bsize-max-h": `background-size: auto 100%;`,
    "bsize-max-w": `background-size: 100% auto;`,

    // 背景 - 布局 - 九宫格
    "bpos-1": `background-position: left top;`,
    "bpos-2": `background-position: center top;`,
    "bpos-3": `background-position: right top;`,
    "bpos-4": `background-position: left center;`,
    "bpos-5": `background-position: center center;`,
    "bpos-6": `background-position: right center;`,
    "bpos-7": `background-position: left bottom;`,
    "bpos-8": `background-position: center bottom;`,
    "bpos-9": `background-position: right bottom;`,

    // 背景 - 滚动行为
    "bg-fixed": `background-attachment: scroll;`,

    // 圆角
    "round": `border-radius: 50%;`,
    "round-lg": `borderRadius: 24px;`,
    "round-md": `border-radius: 10px;`,
    "round-sm": `border-radius: 4px;`,
    "round-t": `border-bottom-right-radius: 0; border-bottom-left-radius: 0;`,
    "round-b": `border-top-right-radius: 0; border-top-left-radius: 0;`,
    "round-l": `border-top-right-radius: 0; border-bottom-right-radius: 0;`,
    "round-r": `border-top-left-radius: 0; border-bottom-left-radius: 0;`,

    // 描边
    "solid": `border-style: solid;`,
    "dashed": `border-style: dashed;`,
    "solid-l": `border-left-style: solid;`,
    "solid-r": `border-right-style: solid;`,
    "solid-t": `border-top-style: solid;`,
    "solid-b": `border-bottom-style: solid;`,
    "dashed-l": `border-left-style: dashed;`,
    "dashed-r": `border-right-style: dashed;`,
    "dashed-t": `border-top-style: dashed;`,
    "dashed-b": `border-bottom-style: dashed;`,
    "line-outside": `background-clip: padding-box;`,

    // 阴影
    "shadow": `box-shadow: 0 4px 17px;`,
    "shadow-sm": `box-shadow: 0 2px 4px;`,
    "shadow-lg": `box-shadow: 0 14px 40px;`,
    "shadow-relief": `box-shadow: 1px 1px 0 rgba(0,0,0,.7) inset, 1px 1px 0 rgba(255,255,255,.4);`,

    // 过渡动画
    "trans": `transition: all .7s;`,
    "trans-fast": `transition: all .4s;`,
    "trans-slow": `transition: all 1.4s;`,
    "trans-no": `transition: none;`,

    // 模糊滤镜
    "blur-no": `filter: blur(0px);`,
    "blur-sm": `filter: blur(2px);`,
    "blur-md": `filter: blur(7px);`,
    "blur-lg": `filter: blur(17px);`,

    // 明度滤镜
    "dark-no": `filter: brightness(100%);`,
    "dark-sm": `filter: brightness(80%);`,
    "dark-md": `filter: brightness(50%);`,
    "dark-lg": `filter: brightness(20%);`,

    // 纯度滤镜
    "gray-no": `filter: grayscale(0%);`,
    "gray-sm": `filter: grayscale(40%);`,
    "gray-md": `filter: grayscale(70%);`,
    "gray-lg": `filter: grayscale(100%);`,

    // 特殊
    "bg-none": `pointerEvents: none;`,
    "bg-use": `pointerEvents: auto;`,
    "touch-none": `touchAction: none;`,
    "ellipsis": `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`,
    "text-line": `textShadow: 1px 0 0 rgba(200, 200, 200, .5), -1px 0 0 rgba(200, 200, 200, .5), 0 1px 0 rgba(200, 200, 200, .5), 0 -1px 0 rgba(200, 200, 200, .5);`,
    "alpha-0": `opacity: 0; visibility: hidden;`,
    "select-none": `-webkit-touch-callout:none; -webkit-user-select:none; -khtml-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none;`,

    // 图像布局
    "objfit-fill": `object-fit: fill;`,
    "objfit-cover": `object-fit: cover;`,
    "objfit-contain": `object-fit: contain;`,
    "objfit-none": `object-fit: none;`,
    "objfit-scaledown": `object-fit: scale-down;`,

    // 二段赋值-----------------------------------------------------------------------------------

    // 文字颜色
    "color": {
        pro: "color"
    },

    // 背景色
    "bg": {
        pro: "background"
    },

    // 不透明度
    "alpha": {
        pro: "opacity"
    },

    // 字体
    "font": {
        pro: "font-family"
    },

    // 行高
    "lh": {
        pro: "line-height"
    },

    // z 轴层级
    "z": {
        pro: "z-index"
    },

    // 描边颜色
    "line": {
        pro: "border-color"
    },

    // 变形中心点
    "origin": {
        pro: "transform-origin"
    },

    // 弹性布局项目排序
    "order": {
        pro: "order"
    },

    // 自生长比率
    "grow": {
        pro: "flex-grow"
    },

    // 自收缩比率
    "basis": {
        pro: "flex-basis"
    },

    // 多列布局容器
    "column": {
        pro: "columnCount"
    },

    // 背景尺寸
    "bsize": {
        pro: "background-size",
        unit: "%"
    },

    // 背景定位
    "bpos": {
        pro: "background-position",
        unit: "%"
    },

    // 字符间距
    "lspace": {
        pro: "letter-spacing",
        unit: "rem"
    },

    // 宽度
    "w": {
        pro: "width",
        unit: "rem"
    },

    // 高度
    "h": {
        pro: "height",
        unit: "rem"
    },

    // 最大宽
    "rw": {
        pro: "max-width",
        unit: "rem"
    },

    // 最小宽
    "lw": {
        pro: "min-width",
        unit: "rem"
    },
 
    // 最大高
    "th": {
        pro: "max-height",
        unit: "rem"
    },

    // 最小高
    "bh": {
        pro: "min-height",
        unit: "rem"
    },

    // 内边距
    "pad": {
        pro: "padding",
        unit: "rem"
    },

    // 外边距
    "mrg": {
        pro: "margin",
        unit: "rem"
    },

    // 字号
    "fsize": {
        pro: "font-size",
        unit: "rem"
    },

    // 水平基准左侧位移
    "l": {
        pro: "left",
        unit: "rem"
    },

    // 水平基准右侧位移
    "r": {
        pro: "right",
        unit: "rem"
    },

    // 垂直基准上侧位移
    "t": {
        pro: "top",
        unit: "rem"
    },

    // 垂直基准下侧位移
    "b": {
        pro: "bottom",
        unit: "rem"
    },

    // 描边粗细
    "thick": {
        pro: "border-width",
        unit: "px"
    },

    // 过渡动画延迟
    "delay": {
        pro: "transition-delay",
        unit: "s"
    }

}