<template>
    <b-view styles="flex">

        <!--单图上传预览-->
        <b-hot v-if="solo_cover" :styles="`flex bg-color-dgray alpha-.9 ${round}`"
               key="solo"
               hover="alpha-1"
               @on_click="$_upload">
            <b-img :styles="`w-${width} h-${height} ${round}`"
                   :img="solo_cover" />
        </b-hot>

        <!--上传按钮-->
        <b-hot v-else :styles="`flex-5 pcenter pad-2 bg-color-neutral alpha-.8 ${round} w-${width} h-${height}`"
               hover="alpha-1"
               @on_click="$_upload" >
            <b-view>
                <b-icon icon="add" styles="scale-1.5" />
                <b-view v-if="notic" styles="alpha-.4 mrg-t-.7 fsize-.9">{{notic}}</b-view>
            </b-view>
        </b-hot>

        <!--多图上传预览-->
        <template v-if="previews.length > 1">
            <b-img v-for="(img,index) of previews" :key="index"
                   :styles="`mrg-l-1 w-${width} h-${height} ${round}`"
                   :img="img" />
        </template>

        <input type="file" style="display: none" ref="uploader" @change="$_exe_upload" :multiple="multiple"/>
    </b-view>
</template>

<script>
    import UploadWid from "@/components/BTXUI/upload/upload-wid"
    import BView from "@/components/BTXUI/core/b-view"
    import BHot from "@/components/BTXUI/core/b-hot"
    import BImg from "@/components/BTXUI/core/b-img"
    import BIcon from "@/components/BTXUI/core/b-icon"

    const desc = ["该组件用于图片上传操作，支持预览功能。"],
        extend = ["upload-wid"],
        dependent = ["b-icon", "b-img", "b-hot", "b-view"],
        api = {
            extend: "继承自：<code>upload-wid</code> 组件",
            methods: [
                {
                    name: "clear_preview",
                    ef: "清除预览图",
                    params: "-",
                    return: "-"
                }
            ]
        },
        init_data = `{
        "继承自：upload-wid 组件入参。type、btnData 入参无效",
        /* notic: "提示文字" */,
        /* height: "热点区域高度" */,
        /* width: "热点区域宽度" */,
        /* round: "热点区域圆角" */
    }`;

    export default {
        extends: UploadWid,
        name: "imgs-upload-wid",
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
        data(){
            return {

                //预览图源
                img_res: null

            }
        },
        computed: {

            //预览图
            previews(){
                const img_res = this.img_res,
                    remote_files = this.remote_files;
                return img_res? img_res: (remote_files || []);
            },

            //单预览图
            solo_cover(){
                return this.multiple? false: this.previews[0];
            },

        },
        watch: {

            //监听上传文件进行预览
            "upload_file.files"(){
                if(!this.uploadApi){
                    this.img_res = [];
                    [].forEach.call(this.upload_file.files, file=>{
                        const file_reader = new FileReader();
                        file_reader.onload = (res)=>{
                            this.img_res.push(res.target.result);
                        }
                        file_reader.readAsDataURL(file);
                    })
                }
            },

        },
        methods: {

            //清除预览图
            clear_preview(){
                this.img_res = null;
                this.uploader.value = "";
            }

        }
    }
</script>