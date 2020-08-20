class ChapterLink {
    constructor(ani_speed=.1, offset=0, callback=null){
        this.ani_speed = ani_speed;         //平移动画缓动速率：0 - 1，默认：0.1，0 为硬切换"
        this.offset = offset;               //位移偏移
        this.cur_top = -1;                  //当前滚动位置
        this.t = null;                      //滚动计时器
        this.callback = callback;           //滚动完成回调函数
    }

    //跳转指定 dom 章节
    $_go_chapter(id){
        let $chapter = document.querySelector("#" + id);
        this.$_go_top($chapter.offsetParent, $chapter.offsetTop + this.offset);
    }

    //跳转指定位置
    $_go_top($box, top){
        if($box.nodeName === "BODY") $box = document.documentElement;
        if(this.ani_speed > 0){ //平滑跳转
            this.t = setInterval(()=>{
                let offset = (top - $box.scrollTop) * this.ani_speed;
                if(offset === 0){
                    this.$_scroll_over();
                }else{
                    if(Math.abs(offset) < 1){
                        offset = 1 * offset < 0? -1: 1;
                    }
                    $box.scrollTop += offset;
                    if(this.cur_top === $box.scrollTop){
                        this.$_scroll_over();
                    }else{
                        this.cur_top = $box.scrollTop;
                    }
                }
            }, 17);
        }else { //硬跳转
            $box.scrollTop = this.cur_top = top;
        }
    }

    //终止滚动
    $_stop_scroll(){
        clearInterval(this.t);
    }

    //滚动停止
    $_scroll_over(){
        this.$_stop_scroll();
        this.callback && this.callback();
    }
}

export default ChapterLink