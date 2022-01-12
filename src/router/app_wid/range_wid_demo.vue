<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 v-model 可以初始化及双向绑定拖动数值；通过 <code>min</code> 及 <code>max</code> 属性可以设置滑块拖动区间的最大、最小值。</p>
            <div class="resize rw-50p rw-100p-s">
                <range-wid v-bind="data_1.props" v-model="data_1.cur_val" />
            </div>
            <p>当前选择数据：{{data_1.cur_val}}</p>
            <hr>
            <p></p>
        </section>

        <!--风格化-->
        <section>
            <h5>风格化</h5>
            <p>组件 <code>blockSize</code> 属性可设置拖拽滑块的宽高尺寸；<code>colors</code> 字段可设置配色风格，包括：<b>normal</b> 滑块常规色、<b>act</b> 滑块激活色、<b>track</b> 滑块轨道颜色。</p>
            <div class="resize rw-50p rw-100p-s">
                <range-wid v-bind="data_2.props" v-model="data_2.cur_val" />
            </div>
            <hr>
            <p></p>
        </section>

        <!--步进设置-->
        <section>
            <h5>步进设置</h5>
            <p>组件 <code>step</code> 属性可以设置拖动歩进值。</p>
            <div class="resize rw-50p rw-100p-s">
                <range-wid v-bind="data_3.props" v-model="data_3.cur_val" />
            </div>
            <p>当前选择数据：{{data_3.cur_val}}</p>
        </section>
    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import RangeWid from "@/components/BTXUI/range/range-wid"

    export default {
        name: "range_wid_demo",
        components: {
            HeaderInfo,
            RangeWid
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
                        max: 100,
                    },
                    cur_val: 0
                },

                data_2: {
                    props: {
                        min: 0,
                        max: 100,
                        blockSize: {
                            width: 3.7,
                            height: 3.7,
                        },
                        colors: {
                            normal: {
                                bg: "sub",
                                line: "none"
                            },
                            act: {
                                bg: "blue",
                                line: "none"
                            },
                            track: "dgray"
                        }
                    },
                    cur_val: 0
                },

                data_3: {
                    props: {
                        min: 0,
                        max: 100,
                    },
                    cur_val: 0
                },

            }
        }
    }
</script>