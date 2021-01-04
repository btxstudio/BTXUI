import global_style from '@/router/global_style'                //全局样式
import base_widget from '@/router/base_wid'                     //基础组件
import app_widget from '@/router/app_wid'                       //应用组件

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
        id: "a",
        text: "<b>起步</b>",
        spread: false
    },
    {
        id: "b",
        text: "<b>全局样式</b>",
        children: set_content(global_style)
    },
    {
        id: "c",
        text: "<b>基础组件</b>",
        children: set_content(base_widget)
    },
    {
        id: "e",
        text: "<b>应用组件</b>",
        children: set_content(app_widget),
        spread: true
    }
]