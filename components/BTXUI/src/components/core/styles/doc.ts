export default {
    name: "b-style", 
    desc: [
        "BTX·UI 推荐使用组件取代全局样式作为前端视图层开发的基础，秉持组件复用而非样式复用可以让开发更为高效且易于管理。框架在组件分层设计上分为了 “基础组件”、“应用组件”、“主题组件”。",
        "<code>b-style</code> 是样式处理的底层模块，所有基础组件均继承自该模块，可通过 <b>styles</b> 属性进行样式绑定，其样式规范，基于并扩展 BTX·UI 全局样式语法，因此可以像添加标签类属性那样进行样式设置，目的是为了让 web 和 webApp 在样式语法上尽可能的统一。",
        {
            cover: "b-style.png",
            title: "样式解析机制原理"
        },
        "【exp】：",
        "class 全局样式：<code>&lt;div class=\"pright fsize-1d5\"&gt;hello world&lt;/div&gt;</code>",
        "styles 组件样式：<code>&lt;b-view styles=\"pright fsize-1.5\"&gt;hello world&lt;/b-view&gt;</code>",
        "组件样式使用时需要注意两点：",
        "<b>1.</b> 部分样式值添加顺序会影响样式优先级，比如添加上侧圆角样式，应该先设置尺寸，再设置方向，否则方向设置会被覆盖而无效。<br>【exp】：<code>&lt;b-view styles=\"round-sm round-t\"&gt;&lt;/b-view&gt;</code>",
        "<b>2.</b> 部分样式值需要通过组件结构嵌套进行复合使用，比如同时添加模糊和低明度滤镜样式。<br>【exp】：<code>&lt;b-view styles=\"blur-sm\"&gt;&lt;b-view styles=\"dark-sm\"&gt;&lt;/b-view&gt;&lt;/b-view&gt;</code>"
        ],
    extend: [],
    dependent: [], 
    api: {
        methods: [
            {
                name: "toggle_style",
                ef: "切换状态样式",
                params: "states",
                return: "-"
            },
            {
                name: "reset_style",
                ef: "恢复原始样式",
                params: "-",
                return: "-"
            },
            {
                name: "has_state",
                ef: "判断是否具备某项样式状态",
                params: "state",
                return: "bool"
            },
            {
                name: "append_state",
                ef: "追加样式状态",
                params: "styles, state",
                return: "-"
            }
        ]
    }, 
    init_data: `{
        /* styles: "样式值规范" */,
        /* states: {
            state: "样式状态",
            style: "样式值规范"
        }... */,
        /* dynamic: "动态样式值规范" */
    }` 
};