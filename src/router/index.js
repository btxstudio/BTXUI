import Vue from 'vue'
import Router from 'vue-router'

import home from '@/router/home'                                //首页介绍
import global_style from '@/router/global_style'                //全局样式
import base_widget from '@/router/base_wid'                     //基础组件
import app_widget from '@/router/app_wid'                       //应用组件

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: home
        },
        ...global_style,
        ...base_widget,
        ...app_widget
    ]
})