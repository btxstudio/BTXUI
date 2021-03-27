<template>
    <b-view>
        <!--表单项-->
        <b-view v-for="(item, index) of formData" :key="index"
                styles="flex-4 mrg-b-1"
                :states="{
                        column: {
                            style: 'flex flex-column mrg-b-1.4',
                            state: layout.title_wrap
                        }
                    }">

            <!--标题区-->
            <b-view styles="flex-4"
                    :states="{
                        fixed_title_width: {
                            style: `w-${layout.title_width}`,
                            state: layout.title_width
                        },
                        column: {
                            style: 'mrg-b-.7',
                            state: layout.title_wrap
                        }
                    }">
                <b-icon v-if="item.icon" :icon="item.icon"
                        styles="mrg-r-1 fsize-1.4"/>
                <b-text v-if="item.text"
                        styles="mrg-r-1"
                        v-html="item.text" />
            </b-view>

            <!--输入型表单元素-->
            <b-view v-if="item.input_data"
                    :styles="`no-scroll round-sm ${layout.title_wrap? '': 'grow-1'}`">
                <component :is="item.input_data.type === 'textarea'? 'b-textarea': 'b-input'"
                           :styles="`fsize-1.1 pad-v-.5 pad-h-1 round-sm thick-1 ${baseLine? 'round-t line-b': 'line'}`"
                           :dynamic="item.input_data.readonly? 'bg-color-none line-none': item_colors.normal"
                           ref="input"
                           v-bind="{...item.input_data, focus: item_colors.focus}"
                           v-model="selected[item.input_data.name]"
                           @on_check="$_record_inp_check" />
            </b-view>

            <!--图片上传表单元素-->
            <imgs-upload-wid v-if="item.imgs"
                             v-bind="item.imgs.imgs_upload_data"
                             v-model="selected[item.imgs.name]"
                             ref="imgs_upload"
                             @on_change="$_append_file"/>

            <!--下拉框表单元素-->
            <b-view v-if="item.select"
                    :styles="`grow-1 pad-v-.5 pad-h-1 round-sm thick-1 ${item_colors.normal} ${baseLine? 'round-t line-b': 'line'}`">
                <form-select-wid v-bind="item.select.select_data" v-model="selected[item.select.name]" />
            </b-view>

        </b-view>

        <b-view v-if="submit" :styles="`mrg-t-2.4 flex-${btn_align}`">
            <!--提交按钮-->
            <b-view styles="mrg-r-1">
                <btn-wid @on_click="$_submit" v-bind="submit.btn_data" />
            </b-view>

            <!--重置按钮-->
            <b-view>
                <btn-wid v-if="submit.reset" @on_click="reset" v-bind="reset_btn" />
            </b-view>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BText from "@/components/BTXUI/core/b-text";
    import BHot from "@/components/BTXUI/core/b-hot";
    import BIcon from "@/components/BTXUI/core/b-icon";
    import BInput from "@/components/BTXUI/core/b-input";
    import BTextarea from "@/components/BTXUI/core/b-textarea";
    import BtnWid from "@/components/BTXUI/btn/btn-wid";
    import ImgsUploadWid from "@/components/BTXUI/imgsUpload/imgs-upload-wid";
    import FormSelectWid from "./form-select-wid";

    const desc = ["该组件用于表单构建及操作。"],
        extend = [],
        dependent = ["imgs-upload-wid", "form-select-wid", "btn-wid", "b-textarea", "b-input", "b-icon", "b-hot", "b-text", "b-view"],
        api = {
            methods: [
                {
                    name: "reset",
                    ef: "重置表单",
                    params: "-",
                    return: "-"
                },
                {
                    name: "set_only_read",
                    ef: "设置表单项只读",
                    params: "name",
                    return: "-"
                },
                {
                    name: "set_write",
                    ef: "设置表单项可写",
                    params: "name",
                    return: "-"
                }
            ]
        },
        init_data = `{
        selected: "（model）{
            'name（所选表单元素键名）': 'value（所选表单元素键值）',...
        }",
        formData: [
            {
                text: "表单元素字段，可缺省",
                icon: "表单元素图标，可缺省",
                select: {
                    name: "下拉数据键名",
                    select_data: "(参照：select-wid 组件入参)"
                },
                imgs: {
                    name: "图片数据键名",
                    imgs_upload_data: "(参照：imgs-upload-wid 组件入参。推荐使用后续上传)"
                }
                input_data: "(参照：b-input 组件入参)"
            },...
        ],
        /* layout: {
            title_width: "表单元素标题宽度，默认单位 rem",
            title_wrap: "表单元素标题是否折行",
        } */,
        /* submit: {
            align: "对齐方式：默认 left、center、right",
            callback(selected, check_result, form_data){
                "提交回调函数..."
            },
            reset: "启用重置按钮，可缺省",
            btn_data: "(参照：btn-wid 组件入参)"
        } */,
        /* colors: {
            normal: {
                text: "常规状态文字颜色",
                bg: "常规状态背景颜色",
                line: "常规状态描边颜色",
            },
            focus: {
                text: "激活状态文字颜色",
                bg: "激活状态背景颜色"
                line: "激活状态描边颜色",
            }
        } */,
        /* baseLine: "基线模式，默认 false" */,
    }`;

    export default {
        name: "form-wid",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText,
            BHot,
            BIcon,
            BTextarea,
            BInput,
            BtnWid,
            FormSelectWid,
            ImgsUploadWid
        },
        model: {
            prop: "selected",
            event: "on_reset"
        },
        props: {
            formData: {
                type: Array,
                required: true
            },
            selected: {
                type: Object,
                required: true
            },
            layout: {
                type: Object,
                required: false,
                default: ()=>{
                    return {title_width: "", title_wrap: false}
                }
            },
            submit: {
                type: Object,
                required: false
            },
            colors: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        normal: {},
                        focus: {}
                    }
                }
            },
            baseLine: {
                type: Boolean,
                required: false
            },
        },
        data(){
            return {

                //初始选择
                ori_selected: {...this.selected},

                //表单验证结果
                check_result: {},

                //重置按钮
                reset_btn: this.submit? { ...this.submit.btn_data, btnText: "重置" }: null,

                //按钮水平对齐
                btn_align: this.submit? (()=>{
                    switch(this.submit.align){
                        case "right": return 3;
                            break;
                        case "center": return 2;
                            break;
                        default: return 1;
                    }
                })(): null,

                //formData
                form_data: new FormData(),

            }
        },
        computed: {

            //输入型表单项集合
            inputs(){
                return this.$refs.input;
            },

            //表单项颜色风格
            item_colors(){
                var {text, bg, line} = {
                        text: "dgray",
                        bg: "neutral",
                        line: "none",
                        ...this.colors.normal
                    },
                    normal = `color-${text} bg-color-${bg} line-${line}`,
                    {text, bg, line} = {
                        text: "dgray",
                        bg: "rgba(134,134,134,.24);",
                        line: "none",
                        ...this.colors.focus
                    },
                    focus = `color-${text} bg-color-${bg} line-${line}`;
                return { normal, focus }
            }

        },
        methods: {

            //重置表单
            reset(){
                const imgs_upload = this.$refs.imgs_upload;
                this.$emit("on_reset", {...this.ori_selected});
                imgs_upload && imgs_upload.forEach(wid=>{
                    wid.clear_preview();
                })
            },

            //设置表单项只读
            set_only_read(name){
                this.$_set_readonly(name, true);
            },

            //设置表单项可写
            set_write(name){
                this.$_set_readonly(name, false);
            },

            //设置 readonly 属性
            $_set_readonly(name, state){
                this.$set(this.formData.find(item => {
                    const {input_data} = item;
                    return input_data && input_data.name === name;
                }).input_data, "readonly", state);
            },

            //记录表单项验证结果
            $_record_inp_check(result){
                if(!result) return;
                let res = this.check_result;
                if(!result.pass){ //验证有误，记录
                    res[result.name] = result.notic;
                }else { //验证无误，移除记录
                    delete res[result.name];
                }
            },

            //提交表单
            $_submit(){
                this.inputs.forEach((inp)=>{
                    this.$_record_inp_check(inp.check());
                })
                for(let pro in this.selected){
                    this.form_data.append(pro, this.selected[pro]);
                }
                this.submit && this.submit.callback(this.selected, this.check_result, this.form_data);
                this.form_data = new FormData();
            },

            //添加 formData 数据
            $_append_file(files){
                for(let i=0; i<files.length; i++){
                    this.form_data.append(`file_${i}`, files[i]);
                }
            }

        }
    }
</script>