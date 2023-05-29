//全局样式
import layout from './layout'               //布局
import table from './table'                 //表格
import color from './color'                 //色彩
import text from './text'                   //文本
import decoration from './decoration'       //装饰
import icon from './icon'                   //图标
import special from './special'             //特殊
import animation from './animation'         //动画

export default [
    {
        path: '/text',
        component: text,
        text: "文本"
    },
    {
        path: '/layout',
        component: layout,
        text: "布局"
    },
    {
        path: '/table',
        component: table,
        text: "表格"
    },
    {
        path: '/decoration',
        component: decoration,
        text: "装饰"
    },
    {
        path: '/icon',
        component: icon,
        text: "图标"
    },
    {
        path: '/color',
        component: color,
        text: "色彩"
    },
    {
        path: '/special',
        component: special,
        text: "特殊"
    },
    {
        path: '/animation',
        component: animation,
        text: "动画"
    }
];