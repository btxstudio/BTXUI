<script>
    export default {
        name: "chapter-link",
        /*
        * init-data{
        *   [* ani-speed: "缓动速率：0 - 1"],
        * }
        * */
        props: {
            aniSpeed: {
                type: Number,
                required: false,
                default: .1
            },
        },
        data(){
            return {

                //当前滚动位置
                cur_top: -1,

                //滚动计时器
                t: null

            }
        },
        methods: {

            //跳转指定 dom 章节
            $_go_chapter(id, ani, offset=0, callback=false){
                let $chapter = document.querySelector("#" + id);
                this.$_go_top($chapter.offsetParent, $chapter.offsetTop + offset, ani, callback);
            },

            //跳转指定位置
            $_go_top($box, top, ani, callback=false){
                if(ani){ //平滑跳转
                    this.t = setInterval(()=>{
                        let offset = (top - $box.scrollTop) * this.aniSpeed;
                        if(offset === 0){
                            this.$_scroll_stop(callback);
                        }else{
                            if(Math.abs(offset) < 1){
                                offset = 1 * offset < 0? -1: 1;
                            }
                            $box.scrollTop += offset;
                            if(this.cur_top === $box.scrollTop){
                                this.$_scroll_stop(callback);
                            }else{
                                this.cur_top = $box.scrollTop;
                            }
                        }
                    }, 17);
                }else { //硬跳转
                    this.cur_top = $box.scrollTop = top;
                }
            },

            //滚动停止
            $_scroll_stop(callback){
                clearInterval(this.t);
                callback && callback();
            }

        }
    }
</script>