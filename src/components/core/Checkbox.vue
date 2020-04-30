<script>
    export default {
        name: "Checkbox",
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
                cur_select: []

            }
        },
        methods: {

            //多选按钮选择
            $_select(index){
                let cur_data = this.data_list[index],
                    data_index = this.cur_select.findIndex((item)=>{
                        return item.id === cur_data.id;
                    });
                if(data_index === -1){
                    this.cur_select.push(cur_data);
                }else{
                    this.cur_select.splice(data_index, 1);
                }
                this.$emit("on_select", this.group_id, this.cur_select)
            }

        }
    }
</script>