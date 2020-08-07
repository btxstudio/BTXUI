<template>
    <div class="max rel bg-color-lgray flex-column">
        <div class="w-10 pad-v-1 bg-color-lgray" @click="$_clear">清空数据</div>

        <div class="flex-2 mrg-b-8">
            <zk2861-circle-slider-widget ref="circleSlider"
                                         :items="slider_datas"
                                         :item-width="300"
                                         :radius="-380"
                                         :item-limit="1"
                                         :x-angle="3">
                <zk2861-slider-item-widget v-for="(page, p_i) of slider_datas" :key="p_i" :title="page.title" :state="cur_point === p_i + 1? 'act': ''" :slot="page.id" />
            </zk2861-circle-slider-widget>
        </div>

        <!--
        <zk2861-content-widget ref="downloader"
                               class="fsize-d9"
                               :data-tree="table_datas"
                               @on_select="$_select" />
        -->

        <!--
        <zk2861-items-widget class="fsize-d9"
                             :data-tree="items_data"
                             :radio-mode="true"
                             :select-filter="$_select_filter"
                             @on_select="$_flip_item" />
         -->

        <div class="grow-1 flex-5">
            <div class="abs l-4rem">
                <zk2861-btn-widget dir="left" :text="items_title[0]" @on_click="$_flip('prev')" />
            </div>
            <div class="abs r-4rem">
                <zk2861-btn-widget dir="right" :text="items_title[2]" @on_click="$_flip('next')" />
            </div>
        </div>
    </div>
</template>

<script>
    import Zk2861BtnWidget from "@/components/pro/zk2861/zk2861-btn-widget"
    import Zk2861SliderItemWidget from "@/components/pro/zk2861/zk2861-slider-item-widget"
    import Zk2861CircleSliderWidget from "@/components/pro/zk2861/zk2861-circle-slider-widget"
    import Zk2861ContentWidget from "@/components/pro/zk2861/zk2861-content-widget"
    import Zk2861ItemsWidget from "@/components/pro/zk2861/zk2861-items-widget"

    export default {
        name: "demo2",
        components: {
            Zk2861CircleSliderWidget,
            Zk2861SliderItemWidget,
            Zk2861BtnWidget,
            Zk2861ContentWidget,
            Zk2861ItemsWidget
        },
        data(){
            return {

                //轮播数据
                slider_datas: [],

                //表格下载数据
                table_datas: [],

                //项目选择数据
                items_data: [],

                //按钮文字
                btn_text: [],

                //3d 轮播器
                circle_slider: null,

                //项目选择器
                radio_group: null,

                //当前指针
                cur_point: 1,

                //下页标题
                next_item_title: "",

                //上页标题
                prev_item_title: "",

                //项目指针
                item_point: 0,

            }
        },
        computed: {

            //分页标题
            items_title(){
                let datas = this.slider_datas,
                    cur_title = "",
                    prev_title = "",
                    next_title = "";
                if(datas.length){
                    let max = datas.length - 1,
                        i = this.cur_point - 1;
                    cur_title = datas[i].title,
                    prev_title = datas[i - 1 < 0? max: i - 1].title,
                    next_title = datas[i + 1 > max? 0: i + 1].title;
                }
                return [prev_title, cur_title, next_title];
            }

        },
        watch: {
            "circle_slider.cur_point"(point){
                this.cur_point = point;
            }
        },
        methods: {

            //清空数据
            $_clear(){
                this.downloader.clear_selected();
            },

            //翻转
            $_flip(dir){
                this.circle_slider[dir]();
                this.$nextTick(()=>{
                    console.log(this.slider_datas[this.cur_point - 1]); //？？？？当前数据
                })
            },

            //请求数据
            $_get_data(){
                this.$axios({
                    url: "http://192.168.0.52:5669/menu",
                    method: "post"
                }).then((res)=>{
                    let point = 1;
                    this.slider_datas = Object.values(res.data.items).reduce((total, item)=>{
                        let {type, vcode, code, name} = item;
                        if(type === "v" && vcode) total.push({
                            id: code,
                            title: name,
                            vcode,
                            point: point++
                        });
                        return total;
                    }, [])
                    this.$_set_table_data(res.data.items);
                    this.$_set_items_data(res.data.items);
                })
            },

            //设置表格数据
            $_set_table_data(data){
                let i = 0,
                    table_datas = Object.values(data).reduce((total, item)=>{
                    if(item.code.length === 3){
                        let {code, type, name} = item;
                        total.push({
                            id: `${code}_${++i}`,
                            flag: {type},
                            text: `<b class="fsize-1d3" style="color: #009af3">${name}</b>`,
                            children: this.$_set_table_children_data(item, data, i),
                            spread: true,
                            checkbox: true
                        })
                    }
                    return total
                }, [])
                this.table_datas = this.$_empty_children_filter(table_datas);
            },

            //设置项目选择数据
            $_set_items_data(data){
                let i = 0,
                    table_datas = Object.values(data).reduce((total, item)=>{
                        if(item.code.length === 3){
                            let {code, type, name} = item;
                            total.push({
                                id: `${code}_${++i}`,
                                flag: {type},
                                text: `<b class="fsize-1d3" style="color: #009af3">${name}</b>`,
                                children: this.$_set_items_children_data(item, data, i),
                                spread: true,
                                spread_fixed: true,
                            })
                        }
                        return total
                    }, [])
                this.items_data = this.$_empty_children_filter(table_datas);
            },

            //设置表格 children 子级数据
            $_set_table_children_data(item, data, p_id){
                let i = 0,
                    children = item.children,
                    _item,
                    next_children;
                if(children){
                    return children.reduce((total, code)=>{
                        _item = data[code];
                        if(_item){
                            let {code, name, vcode, type, children} = _item;
                            if(type === "g" || vcode){
                                next_children = {
                                    id: `${code}_${p_id}_${++i}`,
                                    flag: {vcode, type},
                                    text: name,
                                    spread: true,
                                    spread_fixed: true,
                                    checkbox: true,
                                    children: children? this.$_set_table_children_data(_item, data, `${p_id}_${i}`): false
                                }
                                total.push(next_children);
                            }
                        }
                        return total;
                    }, [])
                }
            },

            //设置项目 children 子级数据
            $_set_items_children_data(item, data, p_id){
                let i = 0,
                    children = item.children,
                    _item,
                    next_children;
                if(children){
                    return children.reduce((total, code)=>{
                        _item = data[code];
                        if(_item){
                            let {code, name, vcode, type, children} = _item,
                                point = type === "v" && vcode && ++this.item_point;
                            next_children = {
                                id: `${code}_${p_id}_${++i}`,
                                flag: {vcode, type, point},
                                text: name,
                                spread: true,
                                spread_fixed: true,
                                checkbox: type === "v"? true: false,
                                children: children? this.$_set_items_children_data(_item, data, `${p_id}_${i}`): false
                            }
                            total.push(next_children);
                        }
                        return total;
                    }, [])
                }
            },

            //执行表格数据选择
            $_select(data){
                console.log(data); //？？？？勾选数据
            },

            //轮播项目切换
            $_flip_item(selected){
                this.circle_slider.go(selected.extra.point);
            },

            //移除空 children 数据
            $_empty_children_filter(datas){
                return datas.filter(data=>{
                    let children = data.children;
                    if(children === false){
                        return true;
                    }else if(children && children.length){
                        data.children = this.$_empty_children_filter(children);
                        return true;
                    }
                })
            },

            //快速选择拦截过滤
            $_select_filter(data){
                if(data.extra.vcode){
                    return true
                }else{
                    this.$confirm.toast("该指标数据准备中...", 2000, "notic")
                }
            }

        },
        mounted(){
            this.$_get_data();
            this.circle_slider = this.$refs.circleSlider;
            this.radio_group = this.$refs.radioGroup;
            this.downloader = this.$refs.downloader;
        }
    }
</script>