<template>
    <b-view styles="flex">
        <b-hot v-for="item of dataList" :key="item.id"
               @on_click="$_click(item.id)"
               styles="pad-h-1.4 round-sm bg-color-light mrg-r-.4"
               :states="{
                   act: {
                       style: 'bg-color-blue color-blue shadow-sm',
                       state:  value.indexOf(item.id) > -1
                   }
               }"
               hover="color-blue">
            <b-text :states="{
                       act: {
                           style: 'color-light',
                           state:  value.indexOf(item.id) > -1
                       }
                   }">
                {{item.text}}
            </b-text>
        </b-hot>
    </b-view>
</template>

<script>
    import BHot from "@/components/BTXUI/core/b-hot";
    import BView from "@/components/BTXUI/core/b-view";
    import BText from "@/components/BTXUI/core/b-text";

    export default {
        name: "tag-widget",
        components: {
            BView,
            BText,
            BHot
        },
        /*
        * init-data{
        *   data-list: [
        *       {
        *           id: "数据标识",
        *           text: "数据标题",
        *       },...
        *   ],
        *   v-model: [ "选中数据 id",... ],
        *   [* mode: "勾选模式（默认"radio"：单选、"checkbox"：复选）"],
        * }
        * */
        props: {
            dataList: {
                type: Array,
                required: true
            },
            value: {
                type: Array,
                required: true
            },
            mode: {
                type: String,
                required: false,
                default: "radio"
            },
        },
        model:{
            prop: "value",
            event: "on_select"
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
            }

        }
    }
</script>