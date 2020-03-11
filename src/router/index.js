import Vue from 'vue'
import Router from 'vue-router'

//页面
import home from '@/router/home'                                //首页介绍
//页面：全局样式
import layout from '@/router/global_style/layout'               //布局
import color from '@/router/global_style/color'                 //色彩
import text from '@/router/global_style/text'                   //文本
import decoration from '@/router/global_style/decoration'       //装饰

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/layout',
            name: 'layout',
            component: layout
        },
        {
            path: '/decoration',
            name: 'decoration',
            component: decoration
        },
        {
            path: '/color',
            name: 'color',
            component: color
        },
        {
            path: '/text',
            name: 'text',
            component: text
        }
    ]
})