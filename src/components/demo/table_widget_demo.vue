<template>
    <article>
        <header-info v-bind="header_info" />

        <section>
            <h5>基础使用</h5>
            <div class="resize">
                <table-widget v-bind="data_1" />
            </div>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>自定义色彩</h5>
            <p>通过 <code>colors</code> 属性可以自定义表格标题色、行首色、奇数行色、偶数行色、表格描边色及表格轮廓色。此外单元格内容都支持超文本设置。</p>
            <div class="resize">
                <table-widget v-bind="data_2" />
            </div>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>自定义单元格宽度</h5>
            <p>通过 <code>thead</code> 属性中的 <b>grow</b> 字段可以设置单元格的自生长比率从而决定其显示宽度。</p>
            <div class="resize">
                <table-widget v-bind="data_3" />
            </div>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>设置单元格按钮</h5>
            <p>通过 <code>tbody</code> 属性中的 <b>btn</b> 字段可以设置单元格按钮组件，实现点击交互业务。</p>
            <div class="resize">
                <table-widget v-bind="data_4" />
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/demo/common/header-info"
    import TableWidget from "@/components/BTXUI/table/table-widget"

    export default {
        name: "table_widget_demo",
        components: {
            HeaderInfo,
            TableWidget
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: TableWidget.name,
                    ...TableWidget.introduce,
                },

                //基础渲染数据1
                data_1: {
                    thead: [
                        {
                            title: "Name"
                        },
                        {
                            title: "Sex"
                        },
                        {
                            title: "Rank"
                        },
                    ],
                    tbody: [
                        ["nick", "male", 87],
                        ["tommy", "male", 92],
                        ["lucy", "female", 90],
                    ]
                },

                //基础渲染数据2
                data_2: {
                    thead: [
                        {
                            title: "<span class='color-main'>Name</span>"
                        },
                        {
                            title: "<span class='color-light'>Sex</span>"
                        },
                        {
                            title: "<span class='color-light'>Rank</span>"
                        },
                    ],
                    tbody: [
                        ["nick", "<span class='color-blue'>male</span>", 87],
                        ["tommy", "<span class='color-blue'>male</span>", 92],
                        ["lucy", "<span class='color-red'>female</span>", 90],
                        ["neo", "<span class='color-blue'>male</span>", "<span class='round-md bg-color-green color-light pad-h-1'>100</span>"],
                        ["robbin", "<span class='color-red'>female</span>", 88],
                    ],
                    colors: {
                        thead: "sub",
                        row: {
                            head: "#fff",
                            odd: "lgray",
                            even: "#ddd",
                        },
                        line: "lgray",
                        outline: "sub"
                    }
                },

                //基础渲染数据3
                data_3: {
                    thead: [
                        {
                            title: "Name",
                            grow: 1,
                        },
                        {
                            title: "Sex",
                            grow: 2,
                        },
                        {
                            title: "Rank",
                            grow: 3,
                        },
                    ],
                    tbody: [
                        ["nick", "male", 87],
                        ["tommy", "male", 92],
                        ["lucy", "female", 90],
                        ["neo", "male", 100],
                        ["robbin", "female", 88],
                    ],
                    colors: {
                        thead: "lgray",
                        row: {
                            head: "none",
                            odd: "lgray",
                            even: "lgray",
                        },
                        line: "#fff",
                        outline: "none"
                    }
                },

                //基础渲染数据4
                data_4: {
                    thead: [
                        {
                            title: "Name",
                            grow: 1,
                        },
                        {
                            title: "subject",
                            grow: 2,
                        },
                        {
                            title: "Rank",
                            grow: 3,
                        },
                    ],
                    tbody: [
                        ["nick", "javascript", {
                            btn_data: {
                                btnText: "查看详情"
                            },
                            callback: ()=>{
                                this.$_show_detail4("javascript score: 83")
                            }
                        }],
                        ["nick", "html", {
                            btn_data: {
                                btnText: "查看详情",
                                btnColor: {
                                    normal: {
                                        text: "light",
                                        bg: "red",
                                        line: "#b7072c",
                                    },
                                    hover: {
                                        text: "#ffcc00",
                                        bg: "#444",
                                        line: "#222",
                                    },
                                }
                            },
                            callback: ()=>{
                                this.$_show_detail4("html score: 89")
                            }
                        }],
                        ["nick", "css", {
                            btn_data: {
                                btnText: "查看详情",
                                btnColor: {
                                    normal: {
                                        text: "light",
                                        bg: ["blue", "green"],
                                        line: "none",
                                    },
                                    hover: {
                                        text: "#ffcc00",
                                        bg: ["#222", "#555"],
                                        line: "none",
                                    },
                                }
                            },
                            callback: ()=>{
                                this.$_show_detail4("css score: 99")
                            }
                        }],
                    ]
                },

            }
        },
        methods: {

            //显示细节数据4
            $_show_detail4(arg){
                this.$confirm.toast(arg);
            }

        }
    }
</script>