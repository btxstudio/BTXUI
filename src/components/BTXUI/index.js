import Vue from "vue"

const components = {
    core: [
        "b-grid",
        "b-hot",
        "b-icon",
        "b-img",
        "b-input",
        "b-list",
        "b-text",
        "b-textarea",
        "b-view",
        "b-webview"
    ],
    wids: [
        "btn",
        "checkbox",
        "content",
        "drawer",
        "form",
        "formPannel",
        "imgsUpload",
        "pageFlip",
        "pannel",
        "select",
        "slider",
        "range",
        "search",
        "tab",
        "table",
        "tag",
        "tags",
        "tooltip",
        "upload",
        "app",
    ]
}

//加载核心组件
components.core.forEach((name)=>{
    Vue.component(name, ()=>import(`./core/${name}`));
})

//加载通用组件
components.wids.forEach((dir)=>{
    const name = dir.replace(/([A-Z])/g, "-$1").toLowerCase(),
        wid = `${name}-wid`;
    Vue.component(wid, ()=>import(`./${dir}/${wid}`));
})
