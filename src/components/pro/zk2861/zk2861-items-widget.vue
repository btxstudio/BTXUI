<template>
    <ul class="bg-color-light pad-v-2 pad-h-4">
        <li v-for="data of dataTree" :key="data.id"
            class="mrg-b-d5 pad-1 line-b thick-1 line-lgray">
            <zk2861-content-node-radio-widget :data-node="data"
                                              :radio-mode="radioMode"
                                              :select-filter="selectFilter"
                                              @on_select="$_select" />
        </li>
    </ul>
</template>

<script>
    import ContentWidget from "@/components/BTXUI/content-widget"
    import Zk2861ContentNodeRadioWidget from "@/components/pro/zk2861/zk2861-content-node-radio-widget"

    export default {
        extends: ContentWidget,
        components: {
            Zk2861ContentNodeRadioWidget
        },
        name: "zk2861-items-widget",
    }
</script>