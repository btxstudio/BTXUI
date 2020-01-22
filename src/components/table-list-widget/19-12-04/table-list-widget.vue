<!--19-12-04-->
<template>
    <div :class="`table-list-widget ani-left-slider-to-right flex flex-column max-h ${styleState}`">
        <div class="tl-w-table-head" v-if="Array.isArray(dataList.cols)">
            <table>
                <thead>
                <tr>
                    <th v-for="col of dataList.cols" :key="col.id" :width="td_width_percent">{{col.text}}</th>
                </tr>
                </thead>
            </table>
        </div>
        <div class="tl-w-table-body flex-grow auto-scroll">
            <table>
                <tbody>
                <tr v-for="(row, tr_index) of dataList.rows" :key="tr_index">
                    <td v-for="(col, td_index) of cols" :key="row.id + '_' + col.id" :width="td_width_percent" v-html="row[td_index].text || '-'"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "table-list-widget",
        /*
        * init-data{
        *   data-list: {
        *       cols: [
        *           {
        *               id: "列id",
        *               text: "列名"
        *           },...
        *       ],
        *       [*or cols: "列数"],
        *       rows: [
        *           [
        *               {
        *                   id: "单元格id",
        *                   text: "单元格数据"
        *               },...
        *           ],...
        *       ],
        *   },
        *   [* average-td: "是否均分单元格，默认：true],
        *   [* style-state: "表格特殊样式，预置：tl-w-medium、tl-w-big、tl-w-underline"],
        * }
        * */
        props: {
            dataList: {
                type: Object,
                required: true
            },
            averageTd: {
                type: Boolean,
                default: true,
                required: false
            },
            styleState: {
                type: String,
                default: "",
                required: false
            },
        },
        data(){
            return {

                /*单元格宽度百分比*/
                td_width_percent: 0,

            }
        },
        computed: {

            //cols 单元列
            cols(){
                let cols = this.dataList.cols;
                if(typeof(cols) === "number"){
                    let count = cols;
                    cols = [];
                    while(count--){
                        cols.push({
                            id: count,
                            name: ""
                        })
                    }
                }
                return cols;
            }

        },
        methods: {

            //组件初始化
            $_init(){
                this.averageTd && this.$_set_td_width_percent();
            },

            //设置单元格宽度占比
            $_set_td_width_percent(){
                let cols = this.dataList.cols,
                    len = Array.isArray(cols)? cols.length: cols;
                this.td_width_percent = Math.round(100 / len) + "%";
            }

        },
        mounted(){
            this.$_init();
        }
    }
</script>

<style scoped>
    @import "../assets/css/table-list-widget.css";
    @import "../assets/css/table-list-widget-extend.css";
</style>