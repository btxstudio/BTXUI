import Vue from 'vue'
import Router from 'vue-router'

import home from '@/router/home'                                //首页
import download from '@/router/download'                        //下载及安装
import start from '@/router/start'                              //起步
import level_widget from '@/router/level_widget'                //level UI
import global_style from '@/router/global_style'                //全局样式
import base_widget from '@/router/base_wid'                     //基础组件
import app_widget from '@/router/app_wid'                       //应用组件
import test from '@/router/test'                                //debug 测试

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: home
        },
        {
            path: '/download',
            component: download
        },
        {
            path: '/start',
            component: start
        },
        {
            path: '/level_widget',
            component: level_widget
        },
        {
            path: '/test',
            component: test
        },
        ...global_style,
        ...base_widget,
        ...app_widget
    ]
})