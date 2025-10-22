import global_style from './global_style'                //全局样式
import base_widget from './base_wid'                     //基础组件

const set_content = (data)=>{
    return data.map((item)=>{
        return {
            id: item.path,
            text: item.text
        }
    })
}

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
        id: "a",
        text: "全局样式",
        children: set_content(global_style)
    },
    {
        id: "b",
        text: "主题组件",
        children: [
            {
                id: "/level_widget",
                text: "Level 主题 UI 库"
            }
        ]
    },
    {
        id: "c",
        text: "基础组件",
        children: set_content(base_widget)
    },
    // {
    //     id: "e",
    //     text: "应用组件",
    //     children: set_content(app_widget),
    //     spread: true
    // }
]