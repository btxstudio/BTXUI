<script>
    export default {
        name: "Radio",
        /*
        * init-data{
        *   group-id: "集合 id",
        *   data-list: [
        *       id: "数据标识",
        *       text: "数据标题",
        *       [* act: "当前激活项，默认为首项数据"],
        *       ...
        *   ],
        * }
        * */
        props: {

            //集合 id
            groupId: {
                type: String,
                required: true
            },

            //数据列表
            dataList: {
                type: Array,
                required: true
            },

        },
        data(){
            return {

                //当前选中项
                cur_select: {}

            }
        },
        methods: {

            //设置选项激活
            set_active(index){
                this.cur_select = this.dataList[index];
            },

            //初始化数据
            $_init_data(){
                let index = this.dataList.findIndex(item=>{
                    return item.act;
                });
                this.set_active(Math.max(0, index))
            },

            //单选按钮选择
            $_select(index){
                this.cur_select = this.dataList[index];
                this.$emit("on_select", this.groupId, this.cur_select)
            }

        },
        watch: {
            dataList(){
                this.$_init_data();
            }
        },
        mounted(){
            this.$_init_data();
        }
    }
</script>