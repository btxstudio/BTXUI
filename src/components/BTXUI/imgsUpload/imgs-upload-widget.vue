<template>
    <b-view styles="flex">

        <!--单图上传预览-->
        <b-view v-if="solo_cover" :styles="`no-scroll bg-color-dgray ${round}`">
            <b-hot styles="flex alpha-.9"
                   hover="alpha-1"
                   @on_click="$_upload">
                <b-view :styles="`bg-size-cover w-${width} h-${height}`" :bg-img="solo_cover" />
            </b-hot>
        </b-view>

        <b-hot v-else :styles="`flex-5 pcenter pad-2 bg-color-neutral alpha-.8 ${round} w-${width} h-${height}`"
               hover="alpha-1"
               @on_click="$_upload" >
            <b-view>
                <b-icon icon="add" styles="scale-1.5" />
                <b-view v-if="notic" styles="alpha-.4 mrg-t-.7 fsize-.9">{{notic}}</b-view>
            </b-view>
        </b-hot>

        <!--多图上传预览-->
        <template v-if="!solo_cover">
            <b-view v-for="(img,index) of previews" :key="index"
                    :styles="`bg-size-cover mrg-l-1 ${round} w-${width} h-${height}`" :bg-img="img" />
        </template>

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
        /* notic: "提示文字" */,
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
            notic: {
                type: String,
                required: false
            },
            width: {
                type: [Number, String],
                required: false,
                default: 8
            },
            height: {
                type: [Number, String],
                required: false,
                default: 5
            },
            round: {
                type: String,
                required: false,
                default: "round-sm"
            },
            type: {
                type: Array,
                required: false,
                default: ()=>["png", "jpg", "jpeg", "gif", "svg"]
            }
        },
        computed: {

            //单图封面
            solo_cover(){
                return this.multiple? false: (this.previews[0] || this.remoteFiles[0]);
            },

        },
        data(){
            return {

                //预览图集合
                previews: this.remoteFiles

            }
        },
        watch: {

            //监听预览图加载
            "upload_file.files"(imgs){
                this.previews = [];
                [].forEach.call(imgs, img=>{
                    let file_reader = new FileReader();
                    file_reader.onload = (res)=>{
                        this.previews.push(res.target.result);
                    }
                    file_reader.readAsDataURL(img);
                })
            }

        }
    }
</script>