//功能组件
import content_wid_demo from './content_wid_demo'
import tag_wid_demo from './tag_wid_demo'
import tags_wid_demo from './tags_wid_demo'
import checkbox_wid_demo from './checkbox_wid_demo'
import tab_wid_demo from './tab_wid_demo'
import pannel_wid_demo from './pannel_wid_demo'
import form_pannel_wid_demo from './form_pannel_wid_demo'
import form_wid_demo from './form_wid_demo'
import btn_wid_demo from './btn_wid_demo'
import search_wid_demo from './search_wid_demo'
import confirm_wid_demo from './confirm_wid_demo'
import table_wid_demo from './table_wid_demo'
import select_wid_demo from './select_wid_demo'
import range_wid_demo from './range_wid_demo'
import upload_wid_demo from './upload_wid_demo'
import imgs_upload_wid_demo from './imgs_upload_wid_demo'
import slider_wid_demo from './slider_wid_demo'
import drawer_wid_demo from './drawer_wid_demo'
import tooltip_wid_demo from './tooltip_wid_demo'
import app_wid_demo from './app_wid_demo'
import app_wid_data_demo from './app/data_demo'
import app_wid_download_demo from './app/download_demo'
import app_wid_list_demo from './app/list_demo'
import app_wid_system_demo from './app/system_demo'

export default [
    {
        path: '/btn_wid_demo',
        component: btn_wid_demo,
        text: "<b>btn_wid</b> 基础按钮"
    },
    {
        path: '/table_wid_demo',
        component: table_wid_demo,
        text: "<b>table_wid</b> 表格"
    },
    {
        path: '/tag_wid_demo',
        component: tag_wid_demo,
        text: "<b>tag_wid</b> 标签"
    },
    {
        path: '/tags_wid_demo',
        component: tags_wid_demo,
        text: "<b>tags_wid</b> 标签组"
    },
    {
        path: '/checkbox_wid_demo',
        component: checkbox_wid_demo,
        text: "<b>checkbox_wid</b> 复选框"
    },
    {
        path: '/tab_wid_demo',
        component: tab_wid_demo,
        text: "<b>tab_wid</b> 标签切换"
    },
    {
        path: '/search_wid_demo',
        component: search_wid_demo,
        text: "<b>search_wid</b> 搜索栏"
    },
    {
        path: '/select_wid_demo',
        component: select_wid_demo,
        text: "<b>select_wid</b> 下拉选择"
    },
    {
        path: '/range_wid_demo',
        component: range_wid_demo,
        text: "<b>range_wid</b> 范围选择"
    },
    {
        path: '/upload_wid_demo',
        component: upload_wid_demo,
        text: "<b>upload_wid</b> 文件上传"
    },
    {
        path: '/imgs_upload_wid_demo',
        component: imgs_upload_wid_demo,
        text: "<b>imgs_upload_wid</b> 图片上传"
    },
    {
        path: '/pannel_wid_demo',
        component: pannel_wid_demo,
        text: "<b>pannel_wid</b> 浮动面板"
    },
    {
        path: '/form_wid_demo',
        component: form_wid_demo,
        text: "<b>form_wid</b> 表单"
    },
    {
        path: '/form_pannel_wid_demo',
        component: form_pannel_wid_demo,
        text: "<b>form_pannel_wid</b> 浮动表单面板"
    },
    {
        path: '/confirm_wid_demo',
        component: confirm_wid_demo,
        text: "<b>confirm_wid</b> 确认弹窗"
    },
    {
        path: '/slider_wid_demo',
        component: slider_wid_demo,
        text: "<b>slider_wid</b> 轮播器"
    },
    {
        path: '/drawer_wid_demo',
        component: drawer_wid_demo,
        text: "<b>drawer_wid</b> 抽屉折叠"
    },
    {
        path: '/tooltip_wid_demo',
        component: tooltip_wid_demo,
        text: "<b>tooltip_wid</b> 悬浮提示"
    },
    {
        path: '/content_wid_demo',
        component: content_wid_demo,
        text: "<b>content_wid</b> 树形目录"
    },
    {
        path: '/app_wid_demo',
        component: app_wid_demo,
        children: [
            {
                path: 'data',
                component: app_wid_data_demo
            },
            {
                path: 'download',
                component: app_wid_download_demo
            },
            {
                path: 'list',
                component: app_wid_list_demo
            },
            {
                path: 'system',
                component: app_wid_system_demo
            }
        ],
        text: "<b>app_wid</b> app 基础布局"
    },
]