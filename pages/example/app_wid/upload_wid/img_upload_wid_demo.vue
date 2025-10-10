<template>
    <article>
        <header-info v-bind="introduce" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>该组件仅支持图片格式上传及预览，默认为单图上传。通过 <code>on_upload</code> 事件可以接收上传文件内容，以及上传检测结果。</p>
            <img-upload-wid v-model:preview="data_1" />
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!--压缩上传-->
        <section class="mrg-t-5">
            <h5>压缩上传</h5>
            <p>通过配置 <code>compress</code> 属性可以开启图片的压缩上传，其中 <code>width</code>、<code>height</code> 字段为图片转换新尺寸。<code>quality</code> 字段为图片转换质量，区间为：0 - 1。</p>
            <img-upload-wid 
                @on_upload="upload"
                v-model:preview="data_2" 
                :compress="{width: 200, quality: .8}" />
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!--多图上传预览-->
        <!-- <section class="mrg-t-5">
            <h5>多文件上传</h5>
            <p>通过 <code>multiple</code> 字段可以开启多文件上传。</p>
            <div class="resize">
                <upload-wid @on_upload="upload3" :multiple="true" />
            </div>
            <p>上传结果：
                <template v-for="item of data_3">
                    <span class="color-green mrg-h-1" v-if="item.pass">{{ item.file.name }} 上传成功!</span>
                    <span class="color-red mrg-h-1" v-else>{{ item.file.name }} 上传失败!</span>
                </template>
                <span v-if="data_3.length === 0" class="alpha-d5">暂未上传</span>
            </p>
            <pre ref="$code3" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp3"></pre>
        </section> -->
    </article>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import HeaderInfo from "@/components/header-info.vue";
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js";

    const introduce: HeaderInfoData = {
        name: "img-upload-wid", 
        desc: ["该组件用于图片上传操作。"],
        dependent: ["upload-wid", "b-view", "b-icon"], 
        api: {
            event: [
                {
                    name: "on_change",
                    ef: "执行上传",
                    params: "files, checkResult"
                }
            ]
        },
        initData: [
            ["v-model:priview", "string", "预览图地址"],
            ["cover", "[*]", "预览图选项集合"],
            ["cover[*].width", "string", "预览图宽度样式值"],
            ["cover[*].height", "string", "预览图高度样式值"],
            ["cover[*].color", "string", "上传图标颜色"],
            ["size", "number", "大小限制，默认：2M"],
            ["multiple", "boolean", "是否多文件上传，默认 false"],
            ["bsize", "string", "预览图尺寸样式值"],
            ["compress", "[*]", "图片压缩配置"],
            ["compress[*].quality", "number", "图片压缩质量 0-1"],
            ["compress[*].width", "number", "图片生成宽度"],
            ["compress[*].height", "number", "图片生成高度"],
            ["btnData", "Object", "参照：btn-wid 组件入参"],
        ]
    };

    const $code = ref();
    const data_1 = ref('');

    const $code2 = ref();
    const data_2 = ref('');
    const upload = (file: File) => {
        const formData = new FormData();
        formData.append('ss', file);
        uploadImg(formData);
    }

    const exp1 = `
    <img-upload-wid v-model:priview="data_1" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <img-upload-wid 
        @on_upload="upload"
        v-model:preview="data_2" 
        :compress="{width: 200, quality: .8}" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
    })
</script>