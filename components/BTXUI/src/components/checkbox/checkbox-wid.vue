<template>
    <b-hot :styles="`flex-4 bg-color-neutral round-sm ${tag_text? 'pad-r-1 pad-v-.4 pad-l-.4': ''}`"
           hover="bg-color-rgba(134,134,134,.24)"
           :states="{
                act: {
                    style: 'color-blue',
                    state: selected
                }
            }"
           @on_click="$_click">

        <!--选框-->
        <b-view styles="w-1.7 h-1.7 bg-color-neutral round-sm flex-5"
                :states="{
                    act: {
                        style: 'bg-color-blue color-light',
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
        <b-view v-if="tag_text" styles="mrg-l-1 ellipsis">
            {{tag_text}}
        </b-view>

    </b-hot>
</template>

<script>
    import TagWid from "@/components/BTXUI/tag/tag-wid"
    import BHot from "@/components/BTXUI/core/b-hot"
    import BView from "@/components/BTXUI/core/b-view"
    import BIcon from "@/components/BTXUI/core/b-icon"

    let desc = ["该组件用于复选框切换选择操作。"],
        extend = ["tag-wid"],
        dependent = ["b-hot", "b-icon", "b-view"],
        api = {
            extend: "继承自：<code>tag-wid</code> 组件"
        },
        init_data = "继承自：tag-wid 组件入参。text 为非必须参数，colors、mode 入参无效";

    export default {
        extends: TagWid,
        name: "checkbox-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BHot,
            BIcon
        },
        props: {
            text: {
                type: String,
                required: false
            },
            mode: {
                type: String,
                required: false,
                default: "checkbox"
            },
        }
    }
</script>