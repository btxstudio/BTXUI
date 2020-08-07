//核心组件
import basic_websit_demo from '@/components/demo/basic/websit_demo'
import b_hot_demo from '@/components/demo/basic/b_hot_demo'

//应用组件
import content_widget_demo from '@/components/demo/content_widget_demo'
import tags_widget_demo from '@/components/demo/tags_widget_demo'
import tab_widget_demo from '@/components/demo/tab_widget_demo'
import pannel_widget_demo from '@/components/demo/pannel_widget_demo'
import form_pannel_widget_demo from '@/components/demo/form_pannel_widget_demo'
import form_widget_demo from '@/components/demo/form_widget_demo'
import btn_widget_demo from '@/components/demo/btn_widget_demo'
import confirm_widget_demo from '@/components/demo/confirm_widget_demo'
import table_widget_demo from '@/components/demo/table_widget_demo'

//项目测试
import zk2861_demo1 from '@/components/pro/zk2861/demo1'
import zk2861_demo2 from '@/components/pro/zk2861/demo2'
import zk2861_demo3 from '@/components/pro/zk2861/demo3'

export default [
    {
        path: '/zk2861_demo1',
        component: zk2861_demo1
    },
    {
        path: '/zk2861_demo2',
        component: zk2861_demo2
    },
    {
        path: '/zk2861_demo3',
        component: zk2861_demo3
    },

    //基础组件
    {
        path: '/basic_websit_demo',
        component: basic_websit_demo
    },
    {
        path: '/b_hot_demo',
        component: b_hot_demo
    },

    //功能组件
    {
        path: '/content_widget_demo',
        component: content_widget_demo
    },
    {
        path: '/tags_widget_demo',
        component: tags_widget_demo
    },
    {
        path: '/tab_widget_demo',
        component: tab_widget_demo
    },
    {
        path: '/pannel_widget_demo',
        component: pannel_widget_demo
    },
    {
        path: '/form_pannel_widget_demo',
        component: form_pannel_widget_demo
    },
    {
        path: '/form_widget_demo',
        component: form_widget_demo
    },
    {
        path: '/btn_widget_demo',
        component: btn_widget_demo
    },
    {
        path: '/confirm_widget_demo',
        component: confirm_widget_demo
    },
    {
        path: '/table_widget_demo',
        component: table_widget_demo
    },
]