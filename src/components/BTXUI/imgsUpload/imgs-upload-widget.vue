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

        <b-hot v-else :styles="`flex-5 bg-color-neutral alpha-.8 ${round} w-${width} h-${height}`"
               hover="alpha-1"
               @on_click="$_upload" >
            <b-icon icon="add" styles="scale-1.5" />
        </b-hot>

        <!--多图上传预览-->
        <template v-if="!solo_cover">
            <b-view v-for="(img,index) of previews" :key="index"
                    :styles="`bg-size-cover mrg-r-.4 w-${width} h-${height}`" :bg-img="img" />
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
            multiple: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        computed: {

            //单图封面
            solo_cover(){
                let cover = this.multiple? (this.previews[0] || this.remoteFiles[0]): false;
                console.log(cover)
                return cover;
            },

        },
        data(){
            return {

                //文件读取器
                file_reader: new FileReader(),

                //预览图集合
                previews: []

            }
        },
        watch: {

            //监听预览图加载
            "upload_file.files"(imgs){
                new Promise((resolve, reject)=>{
                    let covers = [];
                    this.file_reader.onloadend = (res)=>{
                        covers.push(res.target.result);
                    }
                    resolve(covers);
                }).then(covers=>{
                    this.previews = covers;
                });
                [].forEach.call(imgs, img=>{
                    this.file_reader.readAsDataURL(img);
                })
            }

        }
    }
</script>