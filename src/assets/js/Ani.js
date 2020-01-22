/*Ani*/

function Ani(){}
Ani.prototype = {
    //初始化参数
    "init": function($dom, setting){
        this.$dom = $dom;
        this.setting = $.extend({}, {
                "delay":"0s",           //延迟执行时间，单位毫秒
                "during":4000,          //动画暂留时长（仅针对“toast”），单位毫秒
                "speed":"normal",       //["fast|normal|slow'秒数'"]：执行动画速度,0为无动画效果，默认为 “normal-0.54s”
                "callback":null,        //动画结束后回调方法
                "state": "show"         //操作样式类
            }, setting);
        this.state = this.setting.state;
        return this;
    },

    //显示状态
    "show": function(){
        return this._toggle_(true);
    },

    //隐藏状态
    "hide": function(){
        return this._toggle_(false);
    },

    //切换状态
    /*
     *【使用】：
     * 1. 返回含切换状态（1：显示，-1：隐藏）
     */
    "toggle": function(){
        this.$dom.hasClass(this.state)?this.hide():this.show();
        return this.$dom.hasClass(this.state)?1:-1;
    },

    //定时显示
    "toast": function(){
        var _this = this;
        clearInterval(this.$dom.data("t"));
        this.show();
        this.$dom.data("t", setInterval(function(){
            _this.hide();
            clearInterval(_this.$dom.data("t"));
        }, this.setting.during))
    },

    /*---------------------------------内部算法------------------------------------*/

    //切换算法
    /*
     * 【使用】：
     *
     * 2. 支持链式调用;
     */
    "_toggle_": function(method){
        this._exe_(method);
        return this;
    },

    //切换核心算法
    /*
     * 【使用】：
     * 1. 支持延迟执行;
     */
    "_exe_": function(method){
        var $dom = this.$dom, speed = this.setting.speed, callback = this.setting.callback, state = this.state, delay = this.setting.delay,
            cb = function(flag){ callback && callback($dom, flag) };

        if(!$dom) throw new Error("dom has not bind!");
        speed = { "slow": "1s", "normal": "0.54s", "fast": "0.2s" }[speed] || speed;
        if(speed != 0){//渐进式动画切换，注：css属性无渐进式过度，则回调函数不执行
            var transiton_end = e("transition", "end"), tran = e("transition"), tran_css = "all " + speed + " " + delay, tran_style;

            if($dom.css("display") === "none") throw new Error("ani dom display is none!");
            $dom.css(tran, tran_css);
            tran_style = $dom.attr("style").replace(tran + ": " + tran_css + ";", "");
            $dom.on(transiton_end, function(){
                $(this).off(transiton_end).attr("style", tran_style);
                cb(method);
            })
        }
        method === true?$dom.addClass(state):$dom.removeClass(state);
        if(speed == 0) cb(method);//无动画切换
    }
}


