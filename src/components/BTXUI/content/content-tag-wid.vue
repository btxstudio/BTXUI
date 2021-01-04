<template>
    <b-hot @on_click="$_click"
           @on_move="$emit('on_move', $event)"
           @on_enter="$emit('on_enter', $event)"
           @on_leave="$emit('on_leave', $event)"
           :styles="`flex max-w pad-h-1.4 pad-v-.5 round-sm color-${tag_colors.normal.text} bg-color-${tag_colors.normal.bg}`"
           :states="{
               act: {
                   style: `bg-color-${tag_colors.act.bg} color-${tag_colors.act.text}`,
                   state: selected
               }
           }"
           :hover="`bg-color-${tag_colors.hover.bg} color-${tag_colors.hover.text}`">
        <b-text v-html="tag_text" />
    </b-hot>
</template>

<script>
    import TagWid from "@/components/BTXUI/tag/tag-wid"

    export default {
        extends: TagWid,
        name: "content-tag-wid"
    }
</script>