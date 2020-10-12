//基础组件
import basic_websit_demo from '@/components/demo/basic/websit_demo'
import b_style_demo from '@/components/demo/basic/b_style_demo'
import b_view_demo from '@/components/demo/basic/b_view_demo'
import b_hot_demo from '@/components/demo/basic/b_hot_demo'
import b_img_demo from '@/components/demo/basic/b_img_demo'
import b_icon_demo from '@/components/demo/basic/b_icon_demo'
import b_input_demo from '@/components/demo/basic/b_input_demo'
import b_textarea_demo from '@/components/demo/basic/b_textarea_demo'
import b_list_demo from '@/components/demo/basic/b_list_demo'
import b_app_demo from '@/components/demo/basic/b_app_demo'
import b_app_data_demo from '@/components/demo/basic/b_app/data_demo'
import b_app_download_demo from '@/components/demo/basic/b_app/download_demo'
import b_app_list_demo from '@/components/demo/basic/b_app/list_demo'
import b_app_system_demo from '@/components/demo/basic/b_app/system_demo'

//功能组件
import content_wid_demo from '@/components/demo/content_wid_demo'
import tag_wid_demo from '@/components/demo/tag_wid_demo'
import tags_wid_demo from '@/components/demo/tags_wid_demo'
import checkbox_wid_demo from '@/components/demo/checkbox_wid_demo'
import tab_wid_demo from '@/components/demo/tab_wid_demo'
import pannel_wid_demo from '@/components/demo/pannel_wid_demo'
import form_pannel_wid_demo from '@/components/demo/form_pannel_wid_demo'
import form_wid_demo from '@/components/demo/form_wid_demo'
import btn_wid_demo from '@/components/demo/btn_wid_demo'
import confirm_wid_demo from '@/components/demo/confirm_wid_demo'
import table_wid_demo from '@/components/demo/table_wid_demo'
import select_wid_demo from '@/components/demo/select_wid_demo'
import upload_wid_demo from '@/components/demo/upload_wid_demo'
import imgs_upload_wid_demo from '@/components/demo/imgs_upload_wid_demo'
import slider_wid_demo from '@/components/demo/slider_wid_demo'
import drawer_wid_demo from '@/components/demo/drawer_wid_demo'
import tooltip_wid_demo from '@/components/demo/tooltip_wid_demo'

export default [
    //基础组件
    {
        path: '/basic_websit_demo',
        component: basic_websit_demo
    },
    {
        path: '/b_style_demo',
        component: b_style_demo
    },
    {
        path: '/b_view_demo',
        component: b_view_demo
    },
    {
        path: '/b_hot_demo',
        component: b_hot_demo
    },
    {
        path: '/b_img_demo',
        component: b_img_demo
    },
    {
        path: '/b_icon_demo',
        component: b_icon_demo
    },
    {
        path: '/b_input_demo',
        component: b_input_demo
    },
    {
        path: '/b_textarea_demo',
        component: b_textarea_demo
    },
    {
        path: '/b_list_demo',
        component: b_list_demo
    },
    {
        path: '/b_app_demo',
        component: b_app_demo,
        children: [
            {
                path: 'data',
                component: b_app_data_demo
            },
            {
                path: 'download',
                component: b_app_download_demo
            },
            {
                path: 'list',
                component: b_app_list_demo
            },
            {
                path: 'system',
                component: b_app_system_demo
            }
        ]
    },

    //功能组件
    {
        path: '/content_wid_demo',
        component: content_wid_demo
    },
    {
        path: '/tag_wid_demo',
        component: tag_wid_demo
    },
    {
        path: '/tags_wid_demo',
        component: tags_wid_demo
    },
    {
        path: '/checkbox_wid_demo',
        component: checkbox_wid_demo
    },
    {
        path: '/tab_wid_demo',
        component: tab_wid_demo
    },
    {
        path: '/pannel_wid_demo',
        component: pannel_wid_demo
    },
    {
        path: '/form_pannel_wid_demo',
        component: form_pannel_wid_demo
    },
    {
        path: '/form_wid_demo',
        component: form_wid_demo
    },
    {
        path: '/btn_wid_demo',
        component: btn_wid_demo
    },
    {
        path: '/confirm_wid_demo',
        component: confirm_wid_demo
    },
    {
        path: '/table_wid_demo',
        component: table_wid_demo
    },
    {
        path: '/select_wid_demo',
        component: select_wid_demo
    },
    {
        path: '/upload_wid_demo',
        component: upload_wid_demo
    },
    {
        path: '/imgs_upload_wid_demo',
        component: imgs_upload_wid_demo
    },
    {
        path: '/slider_wid_demo',
        component: slider_wid_demo
    },
    {
        path: '/drawer_wid_demo',
        component: drawer_wid_demo
    },
    {
        path: '/tooltip_wid_demo',
        component: tooltip_wid_demo
    },
]