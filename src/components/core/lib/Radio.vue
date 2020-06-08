<script>
    export default {
        name: "Radio",
        data(){
            return {

                //集合id
                group_id: "",

                //数据列表
                /*
                * [
                *   {
                *       id: "数据标识",
                *       text: "数据标题"
                *   },...
                * ]
                * */
                data_list: [],

                //当前选中项
                cur_select: {}

            }
        },
        methods: {

            //单选按钮选择
            $_select(index){
                this.cur_select = this.data_list[index];
                this.$emit("on_select", this.group_id, this.cur_select)
            }

        }
    }
</script>