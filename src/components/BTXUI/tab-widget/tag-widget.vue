<template>
    <b-view styles="flex">
        <b-hot v-for="item of dataList" :key="item.id"
               @on_click="$_click(item.id)"
               styles="pad-h-1.4 pad-v-.4 round-sm round-t bg-color-light mrg-r-2px"
               :states="{
                   act: {
                       style: 'bg-color-blue color-light',
                       state:  value.indexOf(item.id) > -1
                   }
               }"
               hover="color-blue">
            {{item.text}}
        </b-hot>
    </b-view>
</template>

<script>
    import TagWidget from "@/components/BTXUI/tag-widget/tag-widget"

    export default {
        extends: TagWidget,
        name: "tag-widget"
    }
</script>