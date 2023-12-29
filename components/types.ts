type Desc = {
    cover: string,
    title: string
}

export type HeaderInfoData = {
    // 组件名
    name: string,

    // 组件介绍
    desc: Array<string | Desc>,

    // 组件继承
    extend?: Array<string>,

    // 组件依赖
    dependent?: Array<string>,

    // API
    api?: {
        extend?: string,
        props?: Array<{
            name: string,
            ef: string
        }>,
        event?: Array<{
            name: string,
            ef: string,
            params: string
        }>,
        methods?: Array<{
            name: string,
            ef: string,
            params: string,
            return: string
        }>
    },

    // 组件初始化入参
    initData?: Array<Array<string>>
}