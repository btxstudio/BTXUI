<template>
    <b-view>
        <b-view>
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
                            style: 'mrg-b-.4',
                            state: layout.title_wrap
                        }
                    }">
                    <b-icon v-if="item.icon" :icon="item.icon"
                            styles="mrg-r-1 fsize-1.4"/>
                    <b-text v-if="item.text"
                            styles="mrg-r-1">
                        {{item.text}}
                    </b-text>
                </b-view>

                <!--输入型表单元素-->
                <b-view v-if="item.input_data"
                        styles="grow-1 bg-color-neutral round-sm pad-v-.5 pad-h-1"
                        :states="{
                        readonly: {
                            style: 'bg-color-none alpha-.8',
                            state: item.input_data.readonly
                        }
                     }">
                    <component :is="item.input_data.type === 'textarea'? 'b-textarea': 'b-input'"
                               styles="fsize-1.1" ref="input"
                               v-bind="item.input_data"
                               v-model="selected[item.input_data.name]"
                               @on_check="$_record_inp_check" />
                </b-view>

                <!--封面上传表单元素-->
                <b-view v-if="item.imgs">
                    <imgs-upload-widget v-bind="item.imgs.imgs_upload_data" v-model="selected[item.imgs.name]" />
                </b-view>

                <!--下拉框表单元素-->
                <b-view v-if="item.select"
                        styles="grow-1 bg-color-neutral round-sm pad-v-.5 pad-h-1">
                    <form-select-widget v-bind="item.select.select_data" v-model="selected[item.select.name]" />
                </b-view>

            </b-view>
        </b-view>
        <b-view v-if="submit" :styles="`mrg-t-2.4 flex-${btn_align}`">
            <!--提交按钮-->
            <b-view styles="mrg-r-1">
                <btn-widget @on_click="$_submit" v-bind="submit.btn_data" />
            </b-view>

            <!--重置按钮-->
            <b-view>
                <btn-widget v-if="submit.reset" @on_click="reset" v-bind="reset_btn" />
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
    import BtnWidget from "@/components/BTXUI/btn/btn-widget";
    import ImgsUploadWidget from "@/components/BTXUI/imgsUpload/imgs-upload-widget";
    import FormSelectWidget from "./form-select-widget";

    const desc = ["该组件用于表单构建及操作。"],
        extend = [],
        dependent = ["imgs-upload-widget", "form-select-widget", "btn-widget", "b-textarea", "b-input", "b-icon", "b-hot", "b-text", "b-view"],
        api = null,
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
                    select_data: "(参照：select-widget 组件入参)"
                },
                imgs: {
                    name: "图片数据键名",
                    imgs_upload_data: "(参照：imgs-upload-widget 组件入参)"
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
            callback: "回调函数",
            reset: "启用重置按钮，可缺省",
            btn_data: "(参照：btn-widget 组件入参)"
        } */
    }`;

    export default {
        name: "form-widget",
        introduce: { desc, extend, dependent, api, init_data },
        components: {
            BView,
            BText,
            BHot,
            BIcon,
            BTextarea,
            BInput,
            BtnWidget,
            FormSelectWidget,
            ImgsUploadWidget
        },
        model: {
            prop: "selected",
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
            }
        },
        computed: {

            //表单项集合
            inputs(){
                return this.$refs.input;
            }

        },
        data(){
            return {

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
                })(): null

            }
        },
        methods: {

            //重置表单
            reset(){
                let inputs = this.inputs;
                inputs && this.inputs.forEach((inp)=>{
                    inp.reset();
                })
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
                this.$refs.input.forEach((inp)=>{
                    this.$_record_inp_check(inp.check());
                })
                this.submit && this.submit.callback(this.selected, this.check_result);
            },

        }
    }
</script>