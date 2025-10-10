<template>
    <upload-wid 
        @on_upload="imgUpload"
        :size="size"
        :multiple="multiple"
        :type="['image/jpeg', 'image/png', 'image/gif']">
        <template v-if="preview">
            <b-view 
                :class="`w-${cover?.width || 7} h-${cover?.height || 7} bsize-${bsize || 'cover'} bpos-2 round-sm bg-color-neutral`"
                :bg-img="preview" />
        </template>
        <b-icon v-else 
            icon="add" 
            :class="`flex-5 w-${cover?.width || 7} h-${cover?.height || 7} ${cover?.color ? 'color-'+cover?.color : ''} round-sm bg-color-neutral`" />
    </upload-wid>   
</template>

<script setup lang="ts">
    import { computed } from "vue"
    import UploadWid from "./upload-wid.vue"

    const props = defineProps<{
        preview: string,
        cover?: {
            width: number,
            height: number,
            color: string
        },
        size?: number,
        multiple?: boolean,
        bsize?: string,
        compress?: {
            quality: number,
            width?: number,
            height?: number,
        }
    }>();
    const emit = defineEmits(['update:preview', 'on_upload'])

    /** 图片压缩 */
    const size = computed(() => props.compress ? 1024 * 1024 * 20 : 1024 * 1024 * 2);
    const compress = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
                    const { naturalHeight, naturalWidth } = img;
                    const ratio = naturalWidth / naturalHeight;
                    
                    // 重绘制图片
                    canvas.width = props.compress?.width || naturalWidth;
                    canvas.height = props.compress?.height || canvas.width / ratio;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // 将canvas内容转换为 blob 对象
                    canvas.toBlob((blob: any) => {
                        resolve(new File([blob], file.name, {
                            type: blob.type,
                            lastModified: new Date().getTime()
                        }));
                    }, file.type, props?.compress?.quality || 0.7);
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    }

    /** 图片上传 */
    const imgUpload = async (files, checkResult) => {
        if(checkResult.success) {
            let file = files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]);
            fileReader.onload = (e) => {
                emit('update:preview', e.target?.result);
            }
            if(props.compress) file = await compress(files[0]);
            emit('on_upload', file, checkResult);
        }
    }
</script>