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
import animation from '@/router/global_style/animation'         //动画

//组件
import core from '@/router/components/core'                     //核心
import b_list from '@/router/components/b_list'                 //内容滚动

//测试
import test from '@/router/test'

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
            path: '/animation',
            component: animation
        },
        {
            path: '/core',
            component: core
        },
        {
            path: '/b_list',
            component: b_list
        },
        {
            path: '/test',
            component: test
        },
    ]
})