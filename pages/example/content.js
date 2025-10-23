export default [
    {
        id: "/download",
        text: "下载及安装"
    },
    {
        id: "/start",
        text: "起步"
    },
    {
        id: "global_style",
        text: "全局样式",
        children: [
            {
                id: 'text',
                text: "文本"
            },
            {
                id: 'layout',
                text: "布局"
            },
            {
                id: 'table',
                text: "表格"
            },
            {
                id: 'decoration',
                text: "装饰"
            },
            {
                id: 'icon',
                text: "图标"
            },
            {
                id: 'color',
                text: "色彩"
            },
            {
                id: 'special',
                text: "特殊"
            },
            {
                id: 'animation',
                text: "动画"
            }
        ]
    },
    {
        id: "base_wid",
        text: "基础组件",
        children: [
            {
                id: 'b_style_demo',
                text: "b-style 样式机制"
            },
            {
                id: 'b_view_demo',
                text: "b-view 基础布局"
            },
            {
                id: 'b_text_demo',
                text: "b-text 文字区域"
            },
            {
                id: 'b_hot_demo',
                text: "b-hot 热点区域"
            },
            {
                id: 'b_img_demo',
                text: "b-img 图像"
            },
            {
                id: 'b_icon_demo',
                text: "b-icon 图标"
            },
            {
                id: 'b_grid_demo',
                text: "b-grid 栅格布局"
            },
            {
                id: 'b_input_demo',
                text: "b-input 表单输入"
            },
            {
                id: 'b_textarea_demo',
                text: "b-textarea 文字域输入"
            },
            {
                id: 'b_list_demo',
                text: "b-list 滚动列表"
            },
            {
                id: 'b_video_demo',
                text: "b-video 视频媒体"
            },
            {
                id: 'b_drag_demo',
                text: "b-drag 拖拽元素"
            }
        ],
        spread: true
    },
    {
        id: "app_wid",
        text: "应用组件",
        children: [
            {
                id: 'app_wid_demo',
                text: "app_wid App 框架"
            },
            {
                id: 'btn_wid_demo',
                text: "btn_wid 按钮"
            },
            {
                id: 'toast_wid_demo',
                text: "toast_wid 浮窗提示"
            },
            {
                id: 'checkbox_wid/checkbox_wid_demo',
                text: "checkbox_wid 复选按钮"
            },
            {
                id: 'checkbox_wid/checkbox_group_wid_demo',
                text: "checkbox_group_wid 复选按钮组"
            },
            {
                id: 'checkbox_wid/radio_group_wid_demo',
                text: "radio_group_wid 单选按钮组"
            },
            {
                id: 'checkbox_wid/tabs_wid_demo',
                text: "tabs_wid 选项卡"
            },
            {
                id: 'upload_wid/upload_wid_demo',
                text: "upload_wid 文件上传"
            },
            {
                id: 'upload_wid/img_upload_wid_demo',
                text: "img_upload_wid 图片预览上传"
            },
            {
                id: 'content_wid_demo',
                text: "content_wid 目录"
            },
        ],
        spread: true
    },
    {
        id: "theme_wid",
        text: "主题组件",
        children: [
            {
                id: "/level_widget",
                text: "Level 主题 UI 库"
            }
        ]
    }
]