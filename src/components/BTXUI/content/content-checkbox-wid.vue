<template>
    <b-hot :styles="`flex-4 bg-color-neutral round-sm ${tag_text? 'pad-r-1 pad-v-.4 pad-l-.4': ''} color-${tag_colors.normal.text} bg-color-${tag_colors.normal.bg}`"
           :hover="`bg-color-${tag_colors.hover.bg} color-${tag_colors.hover.text}`"
           :states="{
               act: {
                   style: `bg-color-${tag_colors.act.bg} color-${tag_colors.act.text}`,
                   state: selected
               }
           }"
           @on_click="$_click">

        <!--选框-->
        <b-view styles="w-1.7 h-1.7 bg-color-neutral round-sm flex-5"
                :states="{
                    act: {
                        style: `bg-color-${tag_colors.act.text} color-${tag_colors.act.bg}`,
                        state: selected
                    }
                }">
            <b-icon icon="success" styles="alpha-.3"
                    :states="{
                        act: {
                            style: 'alpha-1',
                            state: selected
                        }
                    }"/>
        </b-view>

        <!--文字-->
        <b-view v-if="tag_text" styles="mrg-l-1">
            {{tag_text}}
        </b-view>

    </b-hot>
</template>

<script>
    import CheckboxWid from "@/components/BTXUI/checkbox/checkbox-wid"

    export default {
        extends: CheckboxWid,
        name: "content-checkbox-wid"
    }
</script>