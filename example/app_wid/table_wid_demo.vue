<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <div class="resize">
                <table-wid v-bind="data_1" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--自定义色彩及单元行点击效果-->
        <section>
            <h5>自定义色彩及单元行点击效果</h5>
            <p>通过 <code>colors</code> 属性可以自定义表格标题色、行首色、奇数行色、偶数行色、行悬停色、表格描边色及表格轮廓色。此外单元格内容都支持超文本设置。需要注意的是，只有在设置了行悬停色的前提下，才能够通过 <code>on_click</code> API 为单元行绑定点击事件，在回调函数中可获取当前行索引。</p>
            <p>通过 <code>enable_row_click</code> 和 <code>disable_row_click</code> 方法，可以切换单元行的点击效果，前提依然需要设置行悬停色。</p>
            <div class="resize">
                <table-wid ref="table_2" v-bind="data_2.props" @on_click="$_show_row_number2" />
                <div class="flex mrg-t-1">
                    <tag-wid @on_click="$_toggle_row_enable2" v-bind="data_2.tag_data" v-model="data_2.enable" />
                </div>
            </div>
            <hr>
            <p></p>
        </section>

        <!--自定义单元格宽度-->
        <section>
            <h5>自定义单元格宽度</h5>
            <p>通过 <code>thead</code> 属性中的 <b>grow</b> 字段可以设置单元格的自生长比率从而决定其显示宽度。此外 <b>width</b> 字段可以设置单元格的固定宽度。</p>
            <div class="resize">
                <table-wid v-bind="data_3" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--设置单元格封面及按钮-->
        <section>
            <h5>设置单元格封面及按钮</h5>
            <p><code>tbody</code> 属性对应的数据元素可以设置为 "纯文本"、"tag-wid" 以及 "b-img"。</p>
            <div class="resize">
                <table-wid v-bind="data_4" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--复选单元行-->
        <section>
            <h5>复选单元行</h5>
            <p>通过 <code>enable_row_select</code> 和 <code>disable_row_select</code> 方法，可以切换单元行的首项选择控件，进而实现单元行的复选效果。</p>
            <div class="resize">
                <table-wid ref="table_5" v-bind="data_5.props" @on_select="$_select5" />
                <div class="flex mrg-t-1">
                    <tag-wid @on_click="$_toggle_row_select5" v-bind="data_5.tag_data" v-model="data_5.enable" />
                </div>
            </div>
            <p>
                当前所选数据行：
                <template v-if="data_5.selected.length">
                    <code v-for="row of data_5.selected">{{row + 1}}</code>
                </template>
                <span v-else class="alpha-d5">暂无选择</span>
            </p>
            <hr>
            <p></p>
        </section>

        <!--单元行折叠-->
        <section>
            <h5>单元行折叠</h5>
            <p>通过 <code>collapse</code> 属性可设置单元行折叠显示行数。</p>
            <div class="resize">
                <table-wid v-bind="data_6.props"/>
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import tagWid from "@/components/BTXUI/tag/tag-wid"
    import TableWid from "@/components/BTXUI/table/table-wid"

    export default {
        name: "table_wid_demo",
        components: {
            HeaderInfo,
            TableWid,
            tagWid
        },
        data(){
            const tag_data = {
                text: "考试通过",
                actText: "考试未过",
                colors: {
                    normal: {
                        text: "dgray",
                        bg: "neutral",
                    },
                    act: {
                        text: "light",
                        bg: "green",
                    },
                    hover: {
                        text: "dgray",
                        bg: "#ddd",
                    }
                },
                mode: "checkbox"
            };

            return {

                //初始化入参
                header_info: {
                    name: TableWid.name,
                    ...TableWid.introduce,
                },

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

                data_2: {
                    props: {
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
                                head: "rgba(255,255,255,.7)",
                                odd: "lgray",
                                even: "#ddd",
                                hover: "#d7d7d7"
                            },
                            line: "lgray",
                            outline: "sub"
                        }
                    },
                    tag_data: {
                        id: "data_2",
                        text: "启用单元行点击",
                        actText: "禁用单元行点击",
                        colors: {
                            normal: {
                                text: "dgray",
                                bg: "lgray"
                            },
                            hover: {
                                text: "dgray",
                                bg: "#ddd",
                            }
                        },
                        mode: "checkbox"
                    },
                    enable: true
                },

                data_3: {
                    thead: [
                        {
                            title: "Name",
                            width: 7,
                        },
                        {
                            title: "Age",
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
                        ["nick", 23, "male", 87],
                        ["tommy", 22, "male", 92],
                        ["lucy", 23, "female", 90],
                        ["neo", 20, "male", 100],
                        ["robbin", 25, "female", 88],
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

                data_4: {
                    thead: [
                        {
                            title: "Cover",
                            grow: 1,
                        },
                        {
                            title: "Name",
                            grow: 1,
                        },
                        {
                            title: "subject",
                            grow: 2,
                        },
                        {
                            title: "pass",
                            grow: 1,
                        }
                    ],
                    tbody: [
                        [{
                            src: require("@/assets/img/head.jpg"),
                            height: 5
                        }, "nick", "javascript", {
                            tag_data,
                            selected: false,
                            callback: this.$_show_pass4
                        }],
                        [{
                            src: require("@/assets/img/head2.jpg"),
                            height: 5
                        }, "nick", "html", {
                            tag_data,
                            selected: false,
                            callback: this.$_show_pass4
                        }],
                        [{
                            src: require("@/assets/img/head.jpg"),
                            height: 5
                        }, "nick", "css", {
                            tag_data,
                            selected: false,
                            callback: this.$_show_pass4
                        }],
                    ]
                },

                data_5: {
                    props: {
                        thead: [
                            {
                                title: "Name"
                            },
                            {
                                title: "subject"
                            },
                            {
                                title: "Rank"
                            },
                        ],
                        tbody: [
                            ["nick", "javascript", 78],
                            ["nick", "html", 99],
                            ["nick", "css", 100],
                        ]
                    },
                    tag_data: {
                        id: "data_5",
                        text: "启用单元行选择",
                        actText: "禁用单元行选择",
                        colors: {
                            normal: {
                                text: "dgray",
                                bg: "lgray"
                            },
                            hover: {
                                text: "dgray",
                                bg: "#ddd",
                            }
                        },
                        mode: "checkbox"
                    },
                    selected: [],
                    enable: false
                },

                data_6: {
                    props: {
                        thead: [
                            {
                                title: "Name"
                            },
                            {
                                title: "subject"
                            },
                            {
                                title: "Rank"
                            },
                        ],
                        tbody: [
                            ["nick", "javascript", 78],
                            ["nick", "html", 99],
                            ["nick", "css", 100],
                            ["nick", "php", 89],
                            ["nick", "typescript", 91],
                        ],
                        collapse: {
                            rows: 3,
                            tag_data: {
                                text: "Spread",
                                actText: "Collapse",
                            }
                        },
                    }
                },

            }
        },
        methods: {

            $_show_row_number2(index){
                this.$confirm.toast(`当前点击行号为：${index + 1}`);
            },

            $_toggle_row_enable2(id, state){
                this.$refs.table_2[state? 'enable_row_click': 'disable_row_click']();
            },

            $_show_pass4(row, state) {
                const subject = this.data_4.tbody[row][2];
                this.$confirm.toast(`<b>${subject}</b> 学科${state? '通过': '未通过'}考试`, 2000, state? "success": "notic");
            },

            $_toggle_row_select5(id, state){
                this.$refs.table_5[state? 'enable_row_select': 'disable_row_select']();
            },

            $_select5(selected_rows){
                this.data_5.selected = selected_rows;
            },

        }
    }
</script>