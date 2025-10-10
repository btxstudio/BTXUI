<template>
    <b-view class="flex">
        <b-hot v-if="$slots.default" @on_click="$uploader.click()">
            <slot />
        </b-hot>
        <btn-wid v-else @on_click="$uploader.click()" v-bind="btnData" />
        <input type="file" style="display: none" ref="$uploader" @change="trigerUpload" :multiple="multiple"/>
    </b-view>
</template>

<script setup lang="ts">
    import { ref, computed } from "vue"
    import BView from "../core/b-view.vue"
    import BtnWid from "../btn-wid.vue"

    const props = defineProps<{
        type?: string[],
        size?: number,
        multiple?: boolean,
        btnData?: {}
    }>();
    const emit = defineEmits(['on_upload']);
    
    // 触发上传
    const $uploader = ref();
    const btnData = computed(() => {
        return {
            btnText: '上传', 
            ...props.btnData,
        }
    })
    let checkResult: any;
    const trigerUpload = (e) => {
        checkResult = [];
        const files = e.currentTarget.files;

        // 上传文件验证
        for(let file of files) {
            let pass = true;
            if(typeCheck(file, props.type) || sizeCheck(file, props.size || 1024 * 1024 * 2)){
                e.currentTarget.value = null;
                pass = false;
            };
            checkResult.push({
                file,
                pass
            });
        }
        checkResult['success'] = checkResult.every(res => res.pass);

        emit("on_upload", checkResult.reduce((carry, item) => {
            if(item.pass) carry.push(item.file)
            return carry;
        }, []), checkResult);
    }

    // 类型检测
    const typeCheck = (file, types) => {
        if(types) {
            if (!types.includes(file.type)) {
                console.error(`${file.name} 文件格式有误！`);
                return true;
            }
        }
        return false;
    }

    // 大小检测
    const sizeCheck = (file, size: number) => {
        if (file.size > size) {
            console.error(`${file.name} 文件尺寸有误！`);
            return true
        }
        return false
    }
</script>