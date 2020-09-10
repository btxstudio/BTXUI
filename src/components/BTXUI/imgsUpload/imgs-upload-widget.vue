<template>
    <b-view styles="flex">
        <b-hot @on_click="$_upload" :styles="`flex-5 bg-color-neutral alpha-.8 ${round} w-${width} h-${height}`"
               hover="alpha-1">
            <b-icon icon="add" styles="scale-1.5" />
        </b-hot>
        <!--<b-img img="" :styles="`round-sm w-${width} h-${height}`" />-->
        <input type="file" style="display: none" ref="uploader" @change="$_exe_upload" :multiple="multiple"/>
    </b-view>
</template>

<script>
    import UploadWidget from "@/components/BTXUI/upload/upload-widget"
    import BView from "@/components/BTXUI/core/b-view"
    import BHot from "@/components/BTXUI/core/b-hot"
    import BImg from "@/components/BTXUI/core/b-img"
    import BIcon from "@/components/BTXUI/core/b-icon"

    const desc = ["该组件用于图片上传操作，支持预览功能。"],
        extend = ["upload-widget"],
        dependent = ["b-icon", "b-img", "b-hot", "b-view"],
        api = {
            extend: "继承自：<code>upload-widget</code> 组件"
        },
        init_data = `{
        "继承自：upload-widget 组件入参。type、btnData 入参无效",
        /* height: "热点区域高度" */,
        /* width: "热点区域宽度" */,
        /* round: "热点区域圆角" */,
    }`;

    export default {
        extends: UploadWidget,
        name: "imgs-upload-widget",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BHot,
            BImg,
            BIcon
        },
        props: {
            width: {
                type: Number,
                required: false,
                default: 8
            },
            height: {
                type: Number,
                required: false,
                default: 5
            },
            round: {
                type: String,
                required: false,
                default: "round-sm"
            }
        }
    }
</script>