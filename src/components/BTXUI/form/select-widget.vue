<template>
    <b-view styles="rel color-rgba(70,70,70,.2) z2">
        <!--热点区-->
        <b-hot styles="flex-4" @on_click="$_toggle_options">
            <b-text v-if="selected.text" styles="color-dgray grow-1" key="val">{{selected.text}}</b-text>
            <b-text v-else styles="color-#777 grow-1" key="notic">{{placeholder}}</b-text>
            <b-icon icon="arrow-right"
                    styles="trans-fast color-#777"
                    :states="{
                        spread: {
                            state: spread,
                            style: 'rotate-90'
                        }
                    }" />
        </b-hot>

        <!--下拉区-->
        <b-view styles="abs transform-translateY(f1.5rem) alpha-0 bg-color-light round-sm mrg-t-1 shadow-lg max-w no-scroll"
            :states="{
                spread: {
                    state: spread,
                    style: 'trans-fast alpha-1 transform-translateY(0)'
                }
            }">
            <b-list :styles="`color-mgray h-${rows? Math.min(rows, listData.length) * 2.7: 'auto'}`">
                <b-hot v-for="(item,index) of listData" :key="index"
                       @on_click="$_select(item.val + ':' + item.text)"
                       styles="flex pad-h-1"
                       :states="{
                            selected: {
                                state: selected.val === item.val,
                                style: 'color-blue'
                            }
                        }"
                       hover="bg-color-#f4f4f4 color-dgray">
                    <b-view :styles="`flex-4 grow-1 h-2.7 ${index>0? 'line-t thick-1 line-#f4f4f4': ''}`">
                        <b-text styles="bold mrg-r-1">·</b-text>
                        <b-text>{{item.text}}</b-text>
                    </b-view>
                </b-hot>
            </b-list>
        </b-view>
    </b-view>
</template>

<script>
    import SelectWidget from "@/components/BTXUI/select/select-widget";

    export default {
        extends: SelectWidget,
        name: "select-widget"
    };
</script>