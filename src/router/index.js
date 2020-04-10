import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/router/Home'                                //首页介绍

//全局样式
import Layout from '@/router/global_style/Layout'               //布局
import Table from '@/router/global_style/Table'                 //表格
import Color from '@/router/global_style/Color'                 //色彩
import Text from '@/router/global_style/Text'                   //文本
import Decoration from '@/router/global_style/Decoration'       //装饰
import Icon from '@/router/global_style/Icon'                   //图标
import Animation from '@/router/global_style/Animation'         //动画

//组件
import Core from '@/router/components/Core'                     //核心

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/text',
            component: Text
        },
        {
            path: '/layout',
            component: Layout
        },
        {
            path: '/table',
            component: Table
        },
        {
            path: '/decoration',
            component: Decoration
        },
        {
            path: '/icon',
            component: Icon
        },
        {
            path: '/color',
            component: Color
        },
        {
            path: '/animation',
            component: Animation
        },
        {
            path: '/core',
            component: Core
        }
    ]
})