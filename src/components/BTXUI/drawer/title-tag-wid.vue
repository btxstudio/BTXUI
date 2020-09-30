<template>
    <b-hot :styles="`flex-4 pad-v-1 pad-h-1.5 round-sm color-${tag_colors.normal.text} bg-color-${tag_colors.normal.bg}`"
           :states="{
               act: {
                   style: `bg-color-${tag_colors.act.bg} color-${tag_colors.act.text}`,
                   state: selected
               }
           }"
           :hover="`bg-color-${tag_colors.hover.bg} color-${tag_colors.hover.text}`"
           @on_click="$_click">
        <b-view styles="flex-4 grow-1">
            <b-icon v-if="iconData" v-bind="iconData" styles="mrg-r-1 scale-1.5" />
            <b-text v-html="tag_text"></b-text>
        </b-view>
        <b-icon icon="arrow-right"
                styles="mrg-l-1.5 trans-fast alpha-.6"
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

    export default {
        extends: TagWid,
        name: "title-tag-wid",
        components: {
            BHot,
            BText,
            BIcon,
            BView
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

            }
        },
    }
</script>