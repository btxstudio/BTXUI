<template>
    <article>
        <header-info v-bind="header_info" />

        <!--基础拖拽使用-->
        <section>
            <h5>基础拖拽使用</h5>
            <p>组件包裹的元素将具有拖拽交互效果，其中 <code>dragStart</code> 和 <code>dragOver</code> 属性则可以设置 "拖拽开始"（物品）及 "拖拽放入"（容器）时的状态样式。</p>
            <div class="flex-4">
                <b-drag id="obj" styles="flex-5 h-3 w-10 bg-color-blue color-light round-sm mrg-r-4"
                        :dataInfo="{id: 'obj'}"
                        dragStart="bg-color-green">
                    物品
                </b-drag>
                <b-drag styles="flex-5 h-4 w-12 dashed line-mgray thick-1 round-sm"
                        dragOver="bg-color-neutral"
                        @on_drop="$_append_obj1">
                    容器
                </b-drag>
            </div>
            <hr>
            <p></p>
        </section>

        <!--拖拽传递数据-->
        <section>
            <h5>拖拽传递数据</h5>
            <p>通过 <code>dataInfo</code> 属性可以绑定拖拽传递的数据。在 "拖拽放入"（容器）元素上通过 <code>on_drop</code> 事件可以接收，其中 <b>you</b> 字段存储传递数据；<b>me</b> 字段存储自身数据。</p>
            <div class="flex-4">
                <b-drag styles="flex-5 pad-h-2 pad-v-.5 bg-color-lgray round-sm mrg-r-4 line line-neutral thick-1"
                        :dataInfo="{book_name: data2.book_name}">
                    {{data2.book_name}}
                </b-drag>
                <b-drag styles="flex-5 pad-h-2 pad-v-.5 w-12 dashed line-mgray thick-1 round-sm"
                        @on_drop="$_append_book2">
                    购物车
                </b-drag>
            </div>
            <p>
                已购书籍：<b v-if="data2.bought">{{data2.bought}}</b><span v-else class="color-mgray">暂无购买书籍</span>
            </p>
            <hr>
            <p></p>
        </section>

        <!--自由拖动-->
        <section>
            <h5>自由拖动</h5>
            <p>通过 <code>freeDrag</code> 属性可以实现元素的自由拖放。元素的拖动区域，通常为拖动元素的 "包含块（offsetParent）"。</p>
            <div class="flex-5 h-20 bg-color-lgray round-sm rel">
                <div class="alpha-d4">拖动区域（offsetParent）</div>
                <b-drag styles="w-4 h-4 bg-color-lgray round line line-mgray thick-1 shadow" @on_move="$_set_move_pos" v-bind="data3.props"></b-drag>
            </div>
            <p>
                相对包含块当前坐标：<b>({{data3.pos.x}}, {{data3.pos.y}})</b>
            </p>
            <hr>
            <p></p>
        </section>

        <!--自由拖动方向限制-->
        <section>
            <h5>自由拖动方向限制</h5>
            <p>利用拖动元素的包含块区域限制特性，可以对拖动元素进行拖动方向限制。</p>
            <div class="grid">
                <div class="col-6 pad-d5">
                    <div class="flex-5 h-15 bg-color-neutral round-sm pad-1">
                        <div class="h-2 max-w rel round-lg bg-color-neutral ">
                            <div class="abs pad-h-2 t-1rem max-w">
                                <div class="line-b line-neutral thick-2"></div>
                            </div>
                            <b-drag styles="w-6 h-2 bg-color-lgray round-lg line line-mgray thick-1" v-bind="data4.props"></b-drag>
                        </div>
                    </div>
                </div>
                <div class="col-6 pad-d5">
                    <div class="flex-5 h-15 bg-color-neutral round-sm pad-1">
                        <div class="w-2 max-h round-lg rel bg-color-neutral">
                            <div class="abs pad-v-2 l-1rem max-h">
                                <div class="line-r max-h line-neutral thick-2"></div>
                            </div>
                            <b-drag styles="w-2 h-6 bg-color-lgray round-lg line line-mgray thick-1" v-bind="data4.props"></b-drag>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </article>
</template>

<script>
    import HeaderInfo from "@/components/header-info"
    import BDrag from "@/components/BTXUI/core/b-drag"

    export default {
        name: "b_drag_demo",
        components: {
            HeaderInfo,
            BDrag
        },
        data(){
            return {

                //初始化入参
                header_info: {
                    name: BDrag.name,
                    ...BDrag.introduce,
                },

                data2: {
                    book_name: "html + css 从入门到精通",
                    bought: null
                },

                data3: {
                    props: {
                        freeDrag: true,
                        dragStart: "bg-color-blue line-light"
                    },
                    pos: {
                        x: 0,
                        y: 0
                    }
                },

                data4: {
                    props: {
                        freeDrag: true,
                        dragStart: "bg-color-light line-light shadow color-neutral"
                    }
                }

            }
        },
        methods: {

            $_append_obj1(res, e){
                const target = document.querySelector(`#${res.you.id}`);
                target.style.transform = "scale(0)";
                e.target.innerHTML = "<div class='w-10 h-3 bg-color-blue flex-5 round-sm color-light'>物品</div>";
            },

            $_append_book2(res){
                const bought = this.data2.bought;
                if(bought){
                    this.$confirm.toast("该书籍已购买!", 2000, "notic");
                }else {
                    this.data2.bought = res.you.book_name;
                }
            },

            $_set_move_pos(move_pos){
                this.data3.pos = move_pos;
            }

        }
    }
</script>