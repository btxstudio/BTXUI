<template>
    <b-hot @on_click="$_click"
           @on_move="$emit('on_move', $event)"
           @on_enter="$emit('on_enter', $event)"
           @on_leave="$emit('on_leave', $event)"
           :styles="`flex-4 pad-v-.7 pad-h-1.4 round-sm color-${tag_colors.normal.text} bg-color-${tag_colors.normal.bg}`"
           :states="{
               act: {
                   style: `bg-color-${tag_colors.act.bg} color-${tag_colors.act.text}`,
                   state: selected
               }
           }"
           :hover="`bg-color-${tag_colors.hover.bg} color-${tag_colors.hover.text}`" >

        <!--复选框-->
        <b-view v-if="checkbox" styles="mrg-r-1">
            <checkbox-wid :id="id" v-model="item_selected" />
        </b-view>

        <!--标题文字-->
        <b-view styles="flex-4 grow-1">
            <b-icon v-if="iconData" v-bind="iconData" styles="mrg-r-1 scale-1.5" />
            <b-text v-html="tag_text"></b-text>
            <b-icon v-if="!arrowFixed"
                    icon="arrow-right"
                    styles="mrg-l-1.5 trans-fast alpha-.6"
                    :states="{
                    act: {
                        style: 'rotate-90',
                        state: selected
                    }
                }" />
        </b-view>

        <!--下拉箭头-->
        <b-icon v-if="arrowFixed"
                icon="arrow-right"
                styles="trans-fast alpha-.6"
                :states="{
                    act: {
                        style: 'rotate-90',
                        state: selected
                    }
                }" />
    </b-hot>
</template>

<script>
    import BHot from "@/components/BTXUI/core/b-hot"
    import BText from "@/components/BTXUI/core/b-text"
    import BView from "@/components/BTXUI/core/b-view"
    import BIcon from "@/components/BTXUI/core/b-icon"
    import TagWid from "@/components/BTXUI/tag/tag-wid"
    import CheckboxWid from "@/components/BTXUI/checkbox/checkbox-wid"

    export default {
        extends: TagWid,
        name: "title-tag-wid",
        components: {
            BHot,
            BText,
            BIcon,
            BView,
            CheckboxWid
        },
        props: {
            iconData: {
                type: Object,
                required: false
            },
            mode: {
                type: String,
                required: false,
                default: "checkbox"
            },
            arrowFixed: {
                type: Boolean,
                required: false,
                default: true
            },
            checkbox: {
                type: Boolean,
                required: false
            }
        },
        data(){
            return {

                //色彩方案
                tag_colors: {
                    normal: {
                        text: "dgray",
                        bg: "none",
                        ...this.colors.normal
                    },
                    hover: {
                        text: "blue",
                        bg: "none",
                        ...this.colors.hover
                    },
                    act: {
                        text: "dark",
                        bg: "none",
                        ...this.colors.act
                    },
                },

                //选中状态
                item_selected: false

            }
        }
    }
</script>