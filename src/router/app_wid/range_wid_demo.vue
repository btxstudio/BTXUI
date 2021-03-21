<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>min</code> 及 <code>max</code> 属性可以设置滑块拖动区间的最大、最小值。</p>
            <div class="resize rw-50p">
                <range-wid v-bind="data_1.props" />
            </div>
            <p>当前选择数据：
                <!--
                <template v-if="data_3.selected.length">
                    <code v-for="data of data_3.selected">{{data}}</code>
                </template>
                <span v-else class="alpha-d4">暂无</span>
                -->
            </p>
            <hr>
            <p></p>
        </section>

        <!--风格化-->
        <section>
            <h5>风格化</h5>
            <p>组件 <code>tagData</code> 属性 <b>text</b> 字段支持富文本；<b>colors</b> 字段可设置配色风格；<code>iconData</code> 属性可设置 "抽屉" 图标；<code>arrowFixed</code> 属性可设置 "下拉箭头" 图标位置。</p>
            <div class="resize flex">
                <!--
                <drawer-wid v-bind="data_2">
                    <div class="bg-color-lgray pad-2 round-sm round-b line-t thick-1 line-light">
                        <h5>hello javascript</h5>
                        <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                        <div class="pright alpha-d5">—— btxstudio</div>
                    </div>
                </drawer-wid>
                -->
            </div>
            <hr>
            <p></p>
        </section>

        <!--步进设置-->
        <section>
            <h5>步进设置</h5>
            <p>组件 <code>step</code> 属性可以设置拖动歩进值。</p>
            <div class="resize flex-column bg-color-lgray">
                <!--
                <drawer-wid v-bind="data" v-for="(data,i) of data_3.list" :key="i">
                    <div class="bg-color-dgray color-mgray pad-2 round-sm round-b line-t thick-1 line-light">
                        <h5>hello {{data.tagData.text}}</h5>
                        <p>When it comes to a secure website and passwords it is all in your hands to create a password that a hacker simply cannot crack.</p>
                        <div class="pright alpha-d5">—— btxstudio</div>
                    </div>
                </drawer-wid>
                -->
            </div>
            <p>当前选择数据：
                <!--
                <template v-if="data_3.selected.length">
                    <code v-for="data of data_3.selected">{{data}}</code>
                </template>
                <span v-else class="alpha-d4">暂无</span>
                -->
            </p>
        </section>
    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import RangeWid from "@/components/BTXUI/range/range-wid"
    import BView from "@/components/BTXUI/core/b-view"

    export default {
        name: "range_wid_demo",
        components: {
            HeaderInfo,
            RangeWid,
            BView
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: RangeWid.name,
                    ...RangeWid.introduce,
                },

                data_1: {
                    props: {
                        min: 0,
                        max: "5",
                    },
                    cur_val: ""
                }

            }
        }
    }
</script>