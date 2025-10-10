<template>
    <article>
        <header-info v-bind="introduce" />

        <!--基础使用-->
        <section>
            <h5>基础使用</h5>
            <p>通过 <code>on_upload</code> 事件可以接收上传文件内容，以及上传检测结果。</p>
            <upload-wid @on_upload="upload" />
            <p>上传结果：
                <code v-if="data_1">{{ data_1.name }} 上传成功!</code>
                <span v-else class="alpha-d5">暂未上传</span>
            </p>
            <pre ref="$code" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp1"></pre>
        </section>

        <!--上传限制-->
        <section class="mrg-t-5">
            <h5>上传限制</h5>
            <p>通过 <code>type</code> 字段可以限制上传文件类型，默认可上传任意类型。通过 <code>size</code> 字段可以限制上传文件大小，默认限制为 2M。此外通过 <code>btnData</code> 字段可以设置上传按钮。</p>
            <upload-wid @on_upload="upload2" :btn-data="btnData" :type="types" />
            <p>上传结果：
                <code v-if="data_2">{{ data_2.name }} 上传成功!</code>
                <span v-else class="alpha-d5">暂未上传</span>
            </p>
            <pre ref="$code2" class="lang-html round-md pad-v-1 mrg-t-2 over-scroll" v-html="exp2"></pre>
        </section>

        <!--多文件上传-->
        <section class="mrg-t-5">
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
        </section>
    </article>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import HeaderInfo from "@/components/header-info.vue";
    import { HeaderInfoData } from "@/components/types";
    import hljs from "highlight.js";
    import { showToast } from "@/components/BTXUI/src/components/core/lib/glob";

    const introduce: HeaderInfoData = {
        name: "upload-wid", 
        // desc: ["该组件用于文件上传操作。", {
        //     cover: "upload-wid.png",
        //     title: "执行机制原理"
        // }],
        desc: ["该组件用于文件上传操作。"],
        dependent: ["btn-wid", "b-view"], 
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
            ["type", "Mime[]", "上传类型，数组格式，支持：jpg、png、text...，默认为所有类型"],
            ["size", "number", "大小限制，默认：2M"],
            ["multiple", "boolean", "是否多文件上传，默认 false"],
            ["btnData", "Object", "参照：btn-wid 组件入参"],
        ]
    };

    const $code = ref();
    const data_1: any = ref<File>();
    const upload = (files: File[]) => {
        data_1.value = files[0];
    }

    const $code2 = ref();
    const btnData = {
        btnText: "uplaod file",
        btnRound: true,
        btnWidth: 16,
        iconData: {
            icon: "download"
        }
    }
    const types = ["image/jpeg", "image/png"];
    const data_2: any = ref<File>();
    const upload2 = (files: File[], checkResult: any) => {
        if(!checkResult.success) {
            showToast('上传失败!');
        } else {
            data_2.value = files[0];
        }
    }

    const $code3 = ref();
    const data_3: any = ref([]);
    const upload3 = (files: File[], checkResult: any) => {
        data_3.value = checkResult;
    }

    const exp1 = `
    <upload-wid @on_upload="upload" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp2 = `
    <upload-wid @on_upload="upload2" :btn-data="btnData" :type="types" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const exp3 = `
    <upload-wid @on_upload="upload3" :multiple="true" />`.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    onMounted(() => {
        hljs.highlightElement($code.value);
        hljs.highlightElement($code2.value);
        hljs.highlightElement($code3.value);
    })
</script>