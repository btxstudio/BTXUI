<template>
    <b-view styles="rel color-rgba(70,70,70,.2) z2">
        <!--热点区-->
        <b-hot styles="flex-4" @on_click="$_toggle_options">
            <b-text v-if="selected_text" :styles="`grow-1 color-${option_color.text}`" key="val">
                {{selected_text}}
            </b-text>
            <b-text v-else :styles="`alpha-.7 grow-1 color-${option_color.text}`" key="notic">
                {{placeholder}}
            </b-text>
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
        <b-view :styles="`abs transform-translateY(f1.5rem) alpha-0 round-sm mrg-t-1 shadow-lg max-w no-scroll bg-color-${option_color.normal.bg}`"
            :states="{
                spread: {
                    state: spread,
                    style: 'trans-fast alpha-1 transform-translateY(0)'
                }
            }">
            <b-list :styles="`color-${option_color.normal.text} h-${rows? Math.min(rows, listData.length) * 2.7: 'auto'}`">
                <b-hot v-for="(item,index) of listData" :key="index"
                       @on_click="$_select(item.val)"
                       styles="flex pad-h-1"
                       :states="{
                            selected: {
                                state: selected === item.val,
                                style: `color-${option_color.act.text} bg-color-${option_color.act.bg}`
                            }
                        }"
                       :hover="`color-${option_color.hover.text} bg-color-${option_color.hover.bg}`">
                    <b-view :styles="`flex-4 grow-1 h-2.7 ${index>0? 'line-t thick-1 line-neutral': ''}`">
                        <b-text styles="bold mrg-r-1">·</b-text>
                        <b-text>{{item.text}}</b-text>
                    </b-view>
                </b-hot>
            </b-list>
        </b-view>
    </b-view>
</template>

<script>
    import SelectWid from "@/components/BTXUI/select/select-wid";

    export default {
        extends: SelectWid,
        name: "form-select-wid"
    };
</script>