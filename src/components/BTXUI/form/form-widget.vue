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

                <!--表单元素区-->
                <b-view styles="grow-1 bg-color-neutral round-sm pad-v-.3 pad-h-1"
                        :states="{
                        readonly: {
                            style: 'bg-color-none alpha-.8',
                            state: item.input_data.readonly
                        }
                     }">
                    <b-input ref="input" v-bind="item.input_data" v-model="selected[item.input_data.name]" @on_check="$_record_inp_check" />
                </b-view>
            </b-view>
        </b-view>
        <b-view v-if="submit" :styles="`mrg-t-2.4 p${submit.align || 'left'}`">
            <!--提交按钮-->
            <b-text styles="mrg-r-1">
                <btn-widget @on_click="$_submit" :btn-text="submit.text" :btn-color="submit.btnColor" />
            </b-text>

            <!--重置按钮-->
            <b-text>
                <btn-widget v-if="submit.reset" @on_click="reset" btn-text="重置" :btn-color="submit.btnColor" />
            </b-text>
        </b-view>
    </b-view>
</template>

<script>
    import BView from "@/components/BTXUI/core/b-view";
    import BText from "@/components/BTXUI/core/b-text";
    import BHot from "@/components/BTXUI/core/b-hot";
    import BIcon from "@/components/BTXUI/core/b-icon";
    import BInput from "@/components/BTXUI/core/b-input";
    import BtnWidget from "@/components/BTXUI/btn/btn-widget";

    export default {
        name: "form-widget",
        components: {
            BView,
            BText,
            BHot,
            BIcon,
            BInput,
            BtnWidget
        },
        /*
        * init-data{
        *   form-data: [
        *       {
        *           [* text: "表单元素字段"],
        *           [* icon: "表单元素图标"],
        *           input_data: { (参照：b-input 组件入参) }
        *       },...
        *   ],
        *   selected（model）: {
        *       name（所选表单元素键名）: value（所选表单元素键值）,...
        *   },
        *   [* layout: {
        *       title_width: "表单元素标题宽度，默认单位 rem",
        *       title_wrap: "表单元素标题是否折行",
        *   }],
        *   [* submit: {
        *       text: "按钮文字",
        *       align: "对齐方式：默认 left、center、right",
        *       callback: "回调函数",
        *       [* btnColor: "按钮颜色"],
        *       [* reset: "启用重置按钮"]
        *   }],
        * }
        * */
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
        data(){
            return {

                //表单验证结果
                check_result: {}

            }
        },
        methods: {

            //重置表单
            reset(){
                this.$refs.input.forEach((inp)=>{
                    inp.reset();
                })
            },

            //记录表单项验证结果
            $_record_inp_check(result){
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
                    inp.check();
                })
                this.submit && this.submit.callback(this.selected, this.check_result);
            },

        }
    }
</script>