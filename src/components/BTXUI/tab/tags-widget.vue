<template>
    <b-view styles="flex">
        <b-hot v-for="item of tagList" :key="item.id"
               @on_click="$_click(item.id)"
               :styles="`pad-h-1.4 pad-v-.4 round-sm round-t mrg-r-.4 color-${tag_colors.normal.text} bg-color-${tag_colors.normal.bg}`"
               :states="{
                   act: {
                       style: `bg-color-${tag_colors.act.bg} color-${tag_colors.act.text}`,
                       state:  value.indexOf(item.id) > -1
                   }
               }"
               :hover="`bg-color-${tag_colors.hover.bg} color-${tag_colors.hover.text}`">
            <b-text>
                {{item.text}}
            </b-text>
        </b-hot>
    </b-view>
</template>

<script>
    import TagsWidget from "@/components/BTXUI/tags/tags-widget";

    export default {
        extends: TagsWidget,
        name: "tags-widget"
    }
</script>