export default {

    //预置样式-----------------------------------------------------------------------------------

    //重置初始字号及行高
    "resize": {
        fontSize: "1rem",
        lineHeight: "1.5"
    },

    //文字加粗
    "bold": {fontWeight: "bold"},

    //文本对齐
    "pright": {textAlign: "right"},
    "pleft": {textAlign: "left"},
    "pcenter": {textAlign: "center"},
    "pjustify": {textAlign: "justify"},

    //隐藏显示
    "show": { display: "block" },
    "hide": { display: "none" },

    //布局
    "flex": {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    "flex-column": {
        display: "flex",
        flexDirection: "column"
    },
    "flex-1": {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    "flex-2": {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    "flex-3": {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },
    "flex-4": {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    "flex-5": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    "flex-6": {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    "flex-7": {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
    "flex-8": {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    "flex-9": {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    "flex-between": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    "flex-around": {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },
    "grid": {
        display: "flex",
        flexWrap: "wrap",
    },
    "max-h": {
        height: "100%",
    },
    "max-w": {
        width: "100%",
    },
    "max": {
        height: "100%",
        width: "100%",
    },
    "max-screen": {
        height: "100%",
        width: "100%",
        position: "fixed",
        left: 0,
        top: 0
    },
    "item": {
        breakInside: "avoid",
        mozPageBreakInside: "avoid",
        webkitColumnBreakInside: "avoid"
    },
    "fixed": { position: "fixed" },
    "rel": { position: "relative" },
    "abs": { position: "absolute" },
    "z-1": { zIndex: -1 },
    "z0": { zIndex: 0 },
    "z1": { zIndex: 1 },
    "z2": { zIndex: 2 },
    "z3": { zIndex: 3 },
    "z4": { zIndex: 4 },
    "z5": { zIndex: 5 },
    "z6": { zIndex: 6 },
    "z7": { zIndex: 7 },
    "z8": { zIndex: 8 },
    "z9": { zIndex: 9 },
    "z10": { zIndex: 10 },

    //溢出处理
    "no-scroll": { overflow: "hidden" },
    "over-show": { overflow: "visible" },
    "over-scroll": { overflow: "scroll" },
    "over-hide": { overflow: "hidden" },

    //背景
    "bg-repeat": { backgroundRepeat: "repeat" },
    "bg-repeat-x": { backgroundRepeat: "repeat-x" },
    "bg-repeat-y": { backgroundRepeat: "repeat-y" },
    "bg-size-cover": { backgroundSize: "cover" },
    "bg-size-contain": { backgroundSize: "contain" },
    "bg-size-max": { backgroundSize: "100% 100%" },
    "bg-size-max-h": { backgroundSize: "auto 100%" },
    "bg-size-max-w": { backgroundSize: "100% auto" },
    "bg-pos-1": { backgroundPosition: "left top" },
    "bg-pos-2": { backgroundPosition: "center top" },
    "bg-pos-3": { backgroundPosition: "right top" },
    "bg-pos-4": { backgroundPosition: "left center" },
    "bg-pos-5": { backgroundPosition: "center center" },
    "bg-pos-6": { backgroundPosition: "right center" },
    "bg-pos-7": { backgroundPosition: "left bottom" },
    "bg-pos-8": { backgroundPosition: "center bottom" },
    "bg-pos-9": { backgroundPosition: "right bottom" },

    //圆角
    "round": { borderRadius: "50%" },
    "round-lg": { borderRadius: "24px" },
    "round-md": { borderRadius: "10px" },
    "round-sm": { borderRadius: "4px" },
    "round-t": {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    "round-b": {
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },
    "round-l": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    "round-r": {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },

    //描边
    "line": { borderStyle: "solid" },
    "dashed": { borderStyle: "dashed" },
    "line-l": { borderLeftStyle: "solid" },
    "line-r": { borderRightStyle: "solid" },
    "line-t": { borderTopStyle: "solid" },
    "line-b": { borderBottomStyle: "solid" },
    "dashed-l": { borderLeftStyle: "dashed" },
    "dashed-r": { borderRightStyle: "dashed" },
    "dashed-t": { borderTopStyle: "dashed" },
    "dashed-b": { borderBottomStyle: "dashed" },
    "line-outside": { backgroundClip: "padding-box" },

    //文字描边
    "text-line": {
        textShadow: "1px 0 0 rgba(200, 200, 200, .5), -1px 0 0 rgba(200, 200, 200, .5), 0 1px 0 rgba(200, 200, 200, .5), 0 -1px 0 rgba(200, 200, 200, .5)"
    },

    //单行省略文本
    "ellipsis": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },

    //阴影
    "shadow": { boxShadow: "0 4px 17px" },
    "shadow-sm": { boxShadow: "0 2px 4px" },
    "shadow-lg": { boxShadow: "0 14px 40px" },
    "shadow-relief": { boxShadow: "1px 1px 0 rgba(0,0,0,.7) inset, 1px 1px 0 rgba(255,255,255,.4)" },

    //过渡动画
    "trans": { transition: "all .7s" },
    "trans-fast": { transition: "all .4s" },
    "trans-slow": { transition: "all 1.4s" },
    "trans-no": { transition: "none" },

    //模糊滤镜
    "blur-no": { filter: "blur(0px)" },
    "blur-sm": { filter: "blur(2px)" },
    "blur-md": { filter: "blur(7px)" },
    "blur-lg": { filter: "blur(17px)" },

    //明度滤镜
    "dark-no": { filter: "brightness(100%)" },
    "dark-sm": { filter: "brightness(80%)" },
    "dark-md": { filter: "brightness(50%)" },
    "dark-lg": { filter: "brightness(20%)" },

    //纯度滤镜
    "gray-no": { filter: "grayscale(0%)" },
    "gray-sm": { filter: "grayscale(40%)" },
    "gray-md": { filter: "grayscale(70%)" },
    "gray-lg": { filter: "grayscale(100%)" },

    //特殊
    "bg-none": { pointerEvents: "none" },
    "bg-use": { pointerEvents: "auto" },
    "touch-none": { touchAction: "none" },

        //二段赋值-----------------------------------------------------------------------------------

        "rule_2": {

            //字体
            "font": {
                pro: "fontFamily"
            },

            //字号
            "fsize": {
                pro: "fontSize",
                unit: "em"
            },

            //行高
            "lh": {
                pro: "lineHeight",
            },

            //字符间距
            "lspace": {
                pro: "letterSpacing",
                unit: "rem"
            },

            //不透明度
            "alpha": {
                pro: "opacity",
                extra: {
                    visibility: "visible"
                },
                escape: {
                    "0": {
                        visibility: "hidden"
                    },
                }
            },

            //文字颜色
            "color": {
                pro: "color"
            },

            //背景颜色
            "bg": {
                pro: "background"
            },

            //描边颜色
            "line": {
                pro: "borderColor"
            },

            //自生长比率
            "grow": {
                pro: "flexGrow",
                extra: {
                    flexBasis: 0
                },
            },

            //弹性布局项目排序
            "order": {
                pro: "order"
            },

            //多列布局容器
            "column": {
                pro: "columnCount",
                extra: {
                    columnGap: 0
                },
            },

            //内边距
            "pad": {
                pro: "padding",
                unit: "rem"
            },

            //外边距
            "mrg": {
                pro: "margin",
                unit: "rem"
            },

            //宽度
            "w": {
                pro: "width",
                unit: "rem"
            },

            //高度
            "h": {
                pro: "height",
                unit: "rem"
            },

            //最大宽
            "rw": {
                pro: "maxWidth",
                unit: "rem"
            },

            //最小宽
            "lw": {
                pro: "minWidth",
                unit: "rem"
            },

            //最大高
            "th": {
                pro: "maxHeight",
                unit: "rem"
            },

            //最小高
            "bh": {
                pro: "minHeight",
                unit: "rem"
            },

            //基于容器左侧水平位移
            "l": {
                pro: "left",
                unit: "rem"
            },

            //基于容器右侧水平位移
            "r": {
                pro: "right",
                unit: "rem"
            },

            //基于容器上侧垂直位移
            "t": {
                pro: "top",
                unit: "rem"
            },

            //基于容器下侧垂直位移
            "b": {
                pro: "bottom",
                unit: "rem"
            },

            //水平位移
            "translateX": {
                pro: "transform",
                tmp: "translateX(%{}%)",
                unit: "%"
            },

            //垂直位移
            "translateY": {
                pro: "transform",
                tmp: "translateY(%{}%)",
                unit: "%"
            },

            //放缩
            "scale": {
                pro: "transform",
                tmp: "scale(%{}%)"
            },

            //旋转
            "rotate": {
                pro: "transform",
                tmp: "rotate(%{}%)",
                unit: "deg"
            },

            //变形
            "transform": {
                pro: "transform",
            },

            //变形中心点
            "origin": {
                pro: "transformOrigin"
            },

            //描边粗细
            "thick": {
                pro: "borderWidth",
                unit: "px"
            },

            //过渡动画延迟
            "trans": {
                pro: "transition"
            },

        },

            //三段赋值-----------------------------------------------------------------------------------

            "rule_3": {

                //左侧
                "l": {
                    pro: ["Left"],
                    unit: "rem"
                },

                //右侧
                "r": {
                    pro: ["Right"],
                    unit: "rem"
                },

                //上侧
                "t": {
                    pro: ["Top"],
                    unit: "rem"
                },

                //下侧
                "b": {
                    pro: ["Bottom"],
                    unit: "rem"
                },

                //垂直方向
                "v": {
                    pro: ["Top", "Bottom"],
                    unit: "rem"
                },

                //水平方向
                "h": {
                    pro: ["Left", "Right"],
                    unit: "rem"
                },

                //背景颜色
                "gradient": {
                    pro: ["Image"],
                    tmp: "-webkit-linear-gradient(%{}%)"
                },

                //背景颜色
                "color": {
                    pro: ["Color"],
                },

                //背景尺寸
                "size": {
                    pro: ["Size"],
                },

                //背景定位
                "pos": {
                    pro: ["Position"],
                },

                //过渡动画延迟
                "delay": {
                    pro: ["Delay"],
                    unit: "s"
                },
            }

}