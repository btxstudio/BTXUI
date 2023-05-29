<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>items</code> 属性可以配置走马灯的播放内容；<code>visiableCount</code> 属性可设置显示内容数目；<code>rule</code> 属性可设置内容间隔；<code>speed</code> 属性可设置播放速率。</p>
            <div>
                <carousel-wid v-bind="data_1">
                    <div :slot="item.id" :key="item.id" v-for="item of data_1.items"
                         :class="`flex-5 round-sm bg-color-${item.color} h-10`">
                        {{item.text}}
                    </div>
                </carousel-wid>
            </div>
            <hr>
            <p></p>
        </section>

        <!--外部控制-->
        <section>
            <h5>外部控制</h5>
            <p>通过 API <code>play</code> 和 <code>pause</code> 方法可以实现走马灯的外部控制。</p>
            <div>
                <carousel-wid v-bind="data_2" ref="carousel">
                    <div :slot="item.id" :key="item.id" v-for="item of data_1.items"
                         :class="`flex-5 bg-color-lgray h-10 line line-neutral thick-1`">
                        {{item.text}}
                    </div>
                </carousel-wid>
            </div>
            <div class="flex mrg-t-1">
                <tag-wid @on_click="$_toggle_state" v-bind="data_2.tag_data" v-model="data_2.enable" />
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import CarouselWid from "@/components/BTXUI/carousel/carousel-wid"
    import tagWid from "@/components/BTXUI/tag/tag-wid"

    export default {
        name: "carousel_wid_demo",
        components: {
            HeaderInfo,
            CarouselWid,
            tagWid
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: CarouselWid.name,
                    ...CarouselWid.introduce,
                },

                data_1: {
                    items: [
                        {
                            id: "a",
                            text: "Html",
                            color: "red"
                        },
                        {
                            id: "b",
                            text: "Css",
                            color: "blue"
                        },
                        {
                            id: "c",
                            text: "Javascript",
                            color: "green"
                        },
                        {
                            id: "d",
                            text: "Php",
                            color: "yellow"
                        },
                        {
                            id: "e",
                            text: "Typescript",
                            color: "lgray"
                        }
                    ],
                    visiableCount: 4,
                    rule: 6,
                    speed: 2
                },

                data_2: {
                    items: [
                        {
                            id: "a",
                            text: "Html",
                            color: "red"
                        },
                        {
                            id: "b",
                            text: "Css",
                            color: "blue"
                        },
                        {
                            id: "c",
                            text: "Javascript",
                            color: "green"
                        },
                        {
                            id: "d",
                            text: "Php",
                            color: "yellow"
                        },
                        {
                            id: "e",
                            text: "Typescript",
                            color: "lgray"
                        }
                    ],
                    tag_data: {
                        id: "data_2",
                        text: "暂停",
                        actText: "播放",
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
                    enable: false
                }

            }
        },
        methods: {

            $_toggle_state(){
                this.$refs.carousel[this.data_2.enable? "pause": "play"]();
            }

        }
    }
</script>