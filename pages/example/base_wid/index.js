//基础组件
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
import b_grid_demo from './b_grid_demo'
import b_drag_demo from './b_drag_demo'

export default [
    {
        path: '/b_style_demo',
        component: b_style_demo,
        text: "b-style 样式机制"
    },
    {
        path: '/b_view_demo',
        component: b_view_demo,
        text: "b-view 基础布局"
    },
    {
        path: '/b_grid_demo',
        component: b_grid_demo,
        text: "b-grid 栅格布局"
    },
    {
        path: '/b_video_demo',
        component: b_video_demo,
        text: "b-video 视频媒体"
    },
    {
        path: '/b_text_demo',
        component: b_text_demo,
        text: "b-text 文字区域"
    },
    {
        path: '/b_hot_demo',
        component: b_hot_demo,
        text: "b-hot 热点区域"
    },
    {
        path: '/b_img_demo',
        component: b_img_demo,
        text: "b-img 图像"
    },
    {
        path: '/b_icon_demo',
        component: b_icon_demo,
        text: "b-icon 图标"
    },
    {
        path: '/b_input_demo',
        component: b_input_demo,
        text: "b-input 表单输入"
    },
    {
        path: '/b_textarea_demo',
        component: b_textarea_demo,
        text: "b-textarea 文字域输入"
    },
    {
        path: '/b_list_demo',
        component: b_list_demo,
        text: "b-list 滚动列表"
    },
    {
        path: '/b_drag_demo',
        component: b_drag_demo,
        text: "b-drag 拖拽元素"
    }
]