import Vue from 'vue'
import Router from 'vue-router'

import home from '@/router/home'                                //首页介绍

//全局样式
import layout from '@/router/global_style/layout'               //布局
import table from '@/router/global_style/table'                 //表格
import color from '@/router/global_style/color'                 //色彩
import text from '@/router/global_style/text'                   //文本
import decoration from '@/router/global_style/decoration'       //装饰
import icon from '@/router/global_style/icon'                   //图标
import special from '@/router/global_style/special'             //特殊
import animation from '@/router/global_style/animation'         //动画

//测试
import demo from '@/router/demo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: home
        },
        {
            path: '/text',
            component: text
        },
        {
            path: '/layout',
            component: layout
        },
        {
            path: '/table',
            component: table
        },
        {
            path: '/decoration',
            component: decoration
        },
        {
            path: '/icon',
            component: icon
        },
        {
            path: '/color',
            component: color
        },
        {
            path: '/special',
            component: special
        },
        {
            path: '/animation',
            component: animation
        },
        ...demo
    ]
})