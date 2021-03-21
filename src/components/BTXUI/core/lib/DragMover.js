class DragMover {
    constructor(ani_speed=.2, offset=0, callback=null){
        this.ani_speed = ani_speed;             //平移动画缓动速率：0 - 1，默认：0.2，0 为硬切换"
        this.offset = offset;                   //位移偏移
        this.callback = callback;               //滚动完成回调函数
        this.mousewheel = window.onmousewheel;  //鼠标滚轮事件
        this.touchstart = window.ontouchstart;  //手势触控事件
    }

    //跳转指定 dom 章节
    go_chapter(id){
        let $chapter = document.querySelector("#" + id);
        $chapter && this.go_top($chapter.offsetParent, $chapter.offsetTop + this.offset);
    }

    //跳转指定位置
    go_top($box, top){
        top = Math.min(Math.max(0, top), $box.scrollHeight - $box.offsetHeight); //校正滚动范围
        if($box.nodeName === "BODY") $box = document.documentElement;
        if(this.ani_speed > 0){ //平滑跳转
            let offset;
            this.$_stop_scroll();
            window.onmousewheel = window.ontouchstart = this.$_stop_scroll;
            ChapterLink.t = setInterval(()=>{
                offset = (top - $box.scrollTop) * this.ani_speed;
                if(offset === 0){
                    this.$_scroll_over();
                    return;
                }
                if(Math.abs(offset) < 1) offset = offset < 0? -1: 1;
                $box.scrollTop += offset;
            }, 17);
        }else { //硬跳转
            $box.scrollTop = top;
        }
    }

    //终止滚动
    $_stop_scroll(){
        clearInterval(ChapterLink.t);
        window.onmousewheel = window.ontouchstart = this.mousewheel;
    }

    //滚动停止
    $_scroll_over(){
        this.$_stop_scroll();
        this.callback && this.callback();
    }
}

export default DragMover