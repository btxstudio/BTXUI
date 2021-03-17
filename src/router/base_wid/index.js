//基础组件
import basic_websit_demo from './websit_demo'
import b_style_demo from './b_style_demo'
import b_view_demo from './b_view_demo'
import b_video_demo from './b_video_demo'
import b_text_demo from './b_text_demo'
import b_hot_demo from './b_hot_demo'
import b_img_demo from './b_img_demo'
import b_icon_demo from './b_icon_demo'
import b_input_demo from './b_input_demo'
import b_textarea_demo from './b_textarea_demo'
import b_list_demo from './b_list_demo'

export default [
    {
        path: '/basic_websit_demo',
        component: basic_websit_demo,
        text: "网站示例"
    },
    {
        path: '/b_style_demo',
        component: b_style_demo,
        text: "<b>b_style</b> 样式机制"
    },
    {
        path: '/b_view_demo',
        component: b_view_demo,
        text: "<b>b_view</b> 基础布局"
    },
    {
        path: '/b_video_demo',
        component: b_video_demo,
        text: "<b>b_video</b> 视频媒体"
    },
    {
        path: '/b_text_demo',
        component: b_text_demo,
        text: "<b>b_text</b> 文字区域"
    },
    {
        path: '/b_hot_demo',
        component: b_hot_demo,
        text: "<b>b_hot</b> 热点区域"
    },
    {
        path: '/b_img_demo',
        component: b_img_demo,
        text: "<b>b_img</b> 图像"
    },
    {
        path: '/b_icon_demo',
        component: b_icon_demo,
        text: "<b>b_icon</b> 图标"
    },
    {
        path: '/b_input_demo',
        component: b_input_demo,
        text: "<b>b_input</b> 表单输入"
    },
    {
        path: '/b_textarea_demo',
        component: b_textarea_demo,
        text: "<b>b_textarea</b> 文字域输入"
    },
    {
        path: '/b_list_demo',
        component: b_list_demo,
        text: "<b>b_list</b> 滚动列表"
    }
]