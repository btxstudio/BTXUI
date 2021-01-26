<template>
    <b-view styles="flex-column">
        <template v-for="item of treeData">
            <!--子级-->
            <b-view v-if="item.sub_data" styles="mrg-b-2px">
                <drawer-wid :ref="`drawer_${item.index_data.tag_data.id}`"
                            :tag-data="item.index_data.tag_data"
                            :spread="item.spread"
                            :arrow-fixed="false"
                            @on_title_enter="item.tooltip && $_show_tooltip(item.tooltip, $event)"
                            @on_title_move="item.tooltip && $_move_tooltip($event)"
                            @on_title_leave="item.tooltip && $_hide_tooltip()"
                            @on_toggle="$_content_toggle">
                    <b-view styles="pad-l-3 pad-t-4px">
                        <content-node-wid :tree-data="item.sub_data"
                                          :content-id="item.index_data.tag_data.id"
                                          @on_tooltip_show="$_show_tooltip"
                                          @on_tooltip_move="$_move_tooltip"
                                          @on_tooltip_hide="$_hide_tooltip"
                                          @on_select="$_item_select"
                                          @on_toggle="$_drawer_resize" />
                    </b-view>
                </drawer-wid>
            </b-view>

            <!--选项-->
            <b-view v-else styles="mrg-b-2px" :key="item.index_data.tag_data.id">
                <!--单选-->
                <content-tag-wid v-if="item.index_data.tag_data.mode === 'radio'"
                                 v-bind="item.index_data.tag_data"
                                 v-model="item.index_data.selected"
                                 @on_click="$_item_select"
                                 @on_enter="item.tooltip && $_show_tooltip(item.tooltip, $event)"
                                 @on_move="item.tooltip && $_move_tooltip($event)"
                                 @on_leave="item.tooltip && $_hide_tooltip()" />

                <!--多选-->
                <content-checkbox-wid v-else-if="item.index_data.tag_data.mode === 'checkbox' && item.checkbox"
                                      v-bind="item.index_data.tag_data"
                                      v-model="item.index_data.selected"
                                      @on_click="$_item_select"
                                      @on_enter="item.tooltip && $_show_tooltip(item.tooltip, $event)"
                                      @on_move="item.tooltip && $_move_tooltip($event)"
                                      @on_leave="item.tooltip && $_hide_tooltip()" />
                <b-view v-else
                        :styles="`flex max-w pad-h-1.4 pad-v-.5 round-sm color-${item.index_data.tag_data.colors.normal.text} bg-color-${item.index_data.tag_data.colors.normal.bg}`">
                    {{item.index_data.tag_data.text}}
                </b-view>
            </b-view>
        </template>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import DrawerWid from "@/components/BTXUI/drawer/drawer-wid"
    import ContentTagWid from "./content-tag-wid"
    import ContentCheckboxWid from "./content-checkbox-wid"
    import ContentNodeWid from "./content-node-wid";

    export default {
        name: "content-node-wid",
        components: {
            DrawerWid,
            ContentTagWid,
            ContentCheckboxWid,
            ContentNodeWid,
            BView,
        },
        props: {
            treeData: {
                required: true,
                type: Array
            },
            contentId: {
                required: false,
                type: [String, Number]
            },
        },
        methods: {

            //透传数据选择
            $_item_select(id, state){
                this.$emit("on_select", id, state);
            },

            //透传子级展开状态
            $_content_toggle(state){
                this.$emit("on_toggle", state, this.contentId);
            },

            //重置下级内容高度
            $_drawer_resize(state, content_id){
                this.$refs[`drawer_${content_id}`][0].comp_height();
            },

            //显示浮框
            $_show_tooltip(text){
                this.$emit("on_tooltip_show", text);
            },

            //移动浮框
            $_move_tooltip(e){
                this.$emit("on_tooltip_move", e);
            },

            //隐藏浮框
            $_hide_tooltip(){
                this.$emit("on_tooltip_hide");
            },

        }
    }
</script>