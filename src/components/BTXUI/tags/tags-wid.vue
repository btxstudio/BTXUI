<template>
    <b-view :styles="column? 'flex-column': 'flex'">
        <tag-wid v-for="item of tag_list" :key="item.id"
                    @on_click="$_click"
                    :id="item.id"
                    :text="item.text"
                    v-bind="tag_data"
                    v-model="item.selected" />
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view"
    import TagWid from "@/components/BTXUI/tag/tag-wid"

    let desc = ["该组件用于进行单选及复选操作。"],
        extend = [],
        dependent = ["tag-wid", "b-view"],
        api = null,
        init_data = `{
        value: "（v-model）当前标签 id 列表",
        tagList: "[
            {
                id: "标签 id",
                text: "标签文字",
            },...
        ]",
        /* colors: "(参照：tag-wid 组件 colors 参数)" */,
        /* mode: "(参照：tag-wid 组件 mode 参数)" */,
        /* column: "纵向排列，默认 false" */,
    }`;

    export default {
        name: "tags-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            TagWid
        },
        model:{
            prop: "value",
            event: "on_select"
        },
        props: {
            value: {
                type: Array,
                required: true
            },
            tagList: {
                type: Array,
                required: true
            },
            colors: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        normal:{},
                        hover:{},
                        act:{},
                    }
                }
            },
            mode: {
                type: String,
                required: false,
                default: "radio"
            },
            column: {
                type: Boolean,
                required: false
            },
        },
        data(){
            return {

                //标签数据
                tag_data: {
                    colors: this.colors,
                    mode: this.mode
                }

            }
        },
        computed: {

            //标签数据列表
            tag_list(){
                return this.tagList.map(item=>{
                    return {
                        ...item,
                        selected: this.value.includes(item.id)
                    };
                })
            }

        },
        methods: {

            //点击事件
            $_click(id){
                if(this.mode === "checkbox"){ //多选
                    let index = this.value.indexOf(id);
                    index === -1? this.value.push(id): this.value.splice(index, 1);
                }else if(this.mode === "radio"){ //单选
                    this.$emit("on_select", [id]);
                }
            },

        }
    }
</script>