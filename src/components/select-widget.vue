<template>
    <div :class="`select-widget relative ${state? 's-w-spread': ''}`">
        <div class="round-lg line light-gray shadow pad-v-d5 pad-r-3 pad-l-2" @click="toggle_options">
            <span v-if="show_selected" class="deep-gray">{{show_selected}}</span>
            <span v-else class="alpha-7">{{placeholder}}</span>
            <span class="absolute r0 t0 max-h w-3 flex-layout-5">
                <img class="s-w-ico h-1 alpha-4 trans-fast scale-d7" src="/static/img/more_icon.png" />
            </span>
        </div>
        <ul class="s-w-list hide light-bg round-sm mrg-t-1 z9 absolute shadow-lg middle-gray auto-scroll max-w" :style="list_left_offset" ref="$list">
            <li v-for="item of data_list"
                @click="$_select(item.val + ':' + item.text)"
                class="s-w-item deep-gray pad-h-1 pleft relative pad-v-d5"
                :class="`${-1 === selected.vals.indexOf(item.val.toString())? '': 's-w-selected'}`">
                <div class="pad-l-1d5">
                    <b class="s-w-dot absolute lx1 middle-gray alpha-4">·</b>
                    <span class="s-w-val alpha-5">{{item.text}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "select-widget",
        /*
         * init-data{
         *   list-data: [
         *       {
         *           text: "文本显示",
         *           val: "实际传值",
         *           [* selected: "是否选中"]
         *       },...
         *   ],
         *   [* placeholder: "选择提示"],
         *   [* list-align: "列表对齐方式：left（默认）、center、right"],
         *   [* multiple: "是否启用多选"]
         * }
         * */
        props: {
            listData: {
                type: Array,
                required: true
            },
            placeholder: {
                type: String,
                required: false
            },
            listAlign: {
                type: String,
                required: false
            },
            multiple: {
                type: Boolean,
                required: false
            }
        },
        model: {
            event: "on_select"
        },
        data() {
            return {

                //下拉面板状态
                state: false,

                //下拉选择值
                data_list: null,

                //选中值
                selected: {
                    keys: [],
                    vals: []
                },

                //下拉列表水平位移
                list_left_offset: 0
            };
        },
        methods: {

            //切换面板显示
            toggle_options(e) {
                e.stopPropagation();
                this[(this.state ? "hide" : "show") + "_options"]();
            },

            //显示切换面板
            show_options() {
                this.state = true;
                this.$nextTick(() => {
                    this.$_set_list_left_offset();
                });
            },

            //隐藏切换面板
            hide_options() {
                this.state = false;
            },

            //下拉选择
            $_select(info) {
                if (this.multiple) { //多选
                    this.$_select_as_multiple(e);
                } else { //单选
                    let val = info.split(":");
                    this.selected.vals = [val[0]];
                    this.selected.keys = [val[1]];
                    this.hide_options();
                }
                this.$emit("on_select", this.selected);
            },

            //设置下拉列表水平位移
            $_set_list_left_offset() {
                let align = this.listAlign,
                    left_offset = this.$refs.$list.clientWidth - this.$el.clientWidth,
                    left = 0;
                if (align === "right") {
                    //右对齐
                    left = -left_offset;
                } else if (align === "center") {
                    //居中对齐
                    left = -left_offset / 2;
                }
                this.list_left_offset = `margin-left: ${left}px`;
            }
        },
        watch: {

            //设置默认值显示
            data_list(list) {
                let selected = {
                    keys: [],
                    vals: []
                };
                list.forEach(data => {
                    if (data.selected) {
                        selected.keys.push(data.text);
                        selected.vals.push(data.val);
                    }
                });
                this.selected = selected;
            }

        },
        mounted(){
            this.data_list = this.listData;
        },
        computed: {

            //显示所选值
            show_selected() {
                return this.selected.keys.join(",");
            }

        }
    };
</script>

<style lang="scss" scoped>
    .select-widget {

        //下拉选择列表
        .s-w-list {
            animation: sliderDown 0.4s;

            .s-w-item {
                &:nth-of-type(odd) {
                    background-color: rgba(100, 100, 100, .07);
                }

                //选中状态
                &.s-w-selected {
                    background-color: rgba(170, 170, 170, .4);

                    .s-w-dot {
                        color: #4085f3;
                        opacity: 1;
                    }
                    .s-w-val {
                        opacity: 1;
                    }
                }
            }
        }

        //下拉列表展开状态
        &.s-w-spread {
            .s-w-list {
                display: block !important;
            }
            .s-w-ico {
                transform: rotate(90deg) scale(.7);
            }
        }
    }

    @-webkit-keyframes sliderDown {
        from {
            opacity: 0;
            -webkit-transform: translateY(-1.7rem);
        }
        to {
            opacity: 1;
            -webkit-transform: translateY(0);
        }
    }
    @keyframes sliderDown {
        from {
            opacity: 0;
            transform: translateY(-1.7rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>