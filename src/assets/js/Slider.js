//轮播器类
/*
 *【使用】：
 * 1. 视口尺寸规格同组件相等，组件宽、高可通过css设置，高度缺省为auto，宽度为100%;
 * 2. ？？？？支持图片预加载进度提示效果;
 * 3. 依赖 .sw_bg 实现图片背景化处理;
 *      a. 可通过 .sw_bg 设置图片背景化 background 样式
 */
function Slider($dom, setting){
    this.setting = $.extend({}, Slider.SETTING, setting);                                   //组件参数
    this.$wid = $dom.addClass("slider_wid");                                          //获取组件
    this.pointer = 0;                                                                       //图片定位指针
    this.$view = $("<div class='sw_view'>");                                                //视口
    this.view_width;                                                                        //视口宽度
    this.$cont_box = $("<div class='sw_cont_box'>");                                        //内容容器
    this.cont_num = this.$wid.children().size();                                         //内容数量
    this.$dot_box = $("<div class='sw_dot_box'>");                                          //轮播点容器
    this.clickbefore = 0;                                                                   //前次点击指针
    this.interval;                                                                          //循环播放开关
    if(/(android)|(iphone)/i.test(navigator.userAgent)){
        this.swipeEffects();
    }

    this._init_();
    if(this.setting.dot_enable === true) this._generate_dot_();                             //启用轮播点
    if(this.setting.autoplay === true) this._autoplay_();                                   //自动播放
}

Slider.SETTING = {
    "h_percent": null,      //组件高度
    "cache": false,         //缓存图片资源地址
    "ef": "SCROLL",         //切换方式
    "autoplay": true,       //自动播放
    "during": 5000,         //自动播放滞留时间
    "dot_enable": true      //启用轮播点
}

Slider.prototype = {

    //前一张
    "pre":function(){
        this.clickbefore = this.pointer;
        if(this.pointer > 0)
        {
            this.pointer --;
            this._exe_();
            this.reautoplay();
        }
    },

    //下一张
    "next":function(){
        var maxnum = this.cont_num;
        this.clickbefore = this.pointer;
        if(this.pointer < maxnum-1)
        {
            this.pointer ++;
            this._exe_();
            this.reautoplay();
        }
    },

    "scrollEffects":function(){//图片外框滚动效果（需配合jquery mobile ）未完成
        this.$wid.on("scrollstop",function(){
            var stoppos = this.scrollLeft
            var midpos = _this.view_width/2;
            var offset = stoppos % _this.view_width;
            if(offset < midpos)
            {
                //向左滑动动画
                var t = setInterval(function(){
                    if(offset > 0)
                    {
                        offset -= 3;
                        _this.$wid.get(0).scrollLeft -= 3;
                    }
                    else
                    {
                        clearInterval(t);
                    }
                },40)
            }
            else
            {
                //向右滑动动画
            }
        })
    },
    "swipeEffects":function(){//针对手机浏览器的触摸滑动效果（需配合jquery.touchwipe.js)
        var _this = this;
        var maxnum = this.cont_num;
        this.$wid.touchwipe({
            wipeLeft: function() {
                if(_this.pointer < maxnum-1)
                {
                    _this.pointer ++;
                    _this._exe_();
                    _this.reautoplay();
                }
            },
            wipeRight: function() {
                if(_this.pointer > 0)
                {
                    _this.pointer --;
                    _this._exe_();
                    _this.reautoplay();
                }
            },
            min_move_x: 20,
            preventDefaultEvents: false
        });
    },

    //返回当前指针
    "cur_pointer":function(){
        return this.pointer;
    },

    //返回轮播数
    "count":function(){
        return this.cont_num;
    },

    //--------------------------------------------内部算法----------------------------------------------

    //设置尺寸
    "_set_size_": function(){
        var h_percent = this.setting.h_percent;

        if(h_percent && h_percent.search("%")>0) this.$wid.height(view_height() * (h_percent.rtrim("%")/100));//相对于视口的百分比高度定位
        this.view_width = this.$wid.width();
        this.$cont_box.children().css("width", this.view_width);
        this.$cont_box.width(this.cont_num * this.view_width);
    },

    //初始化
    "_init_":function(){
        var _this = this;

        /*构建结构*/
        this.$wid.children().wrapAll(this.$cont_box);
        this.$cont_box = this.$wid.children("div");
        this.$wid.children().wrapAll(this.$view);
        this.$view = this.$wid.children("div");

        this._set_size_();

        /*加载完成显示*/
        var $imgs = this.$cont_box.children().children("img");

        if($imgs.size() > 0){
            this._loaded_count_ = 0;
            $imgs.each(function(){
                if(this.complete === true){
                    _this._loaded_($(this));
                }else{
                    $(this).on("load", function(){
                        _this._loaded_($(this)) })
                }
            })
        }

        $(window).on("resize", function(){ _this._set_size_(); })//事件绑定
    },

    //图片加载完成执行
    "_loaded_": function($img){
        var src = $img.attr("src");

        this._loaded_count_++;
        if(this.setting.cache === true) $B.cache_preload_img(src);//缓存图片资源地址
        if($img.hasClass("sw_bg")){//图片背景化处理
            $img.parent().css("background-image", "url("+ src +")").addClass("sw_bg");
            $img.detach();
        }
        if(this._loaded_count_ === this.cont_num){//全部加载完成
        }
    },

    //自动播放
    "_autoplay_":function(){//开启图片自动播放
        var _this = this,
            _exe = function(){
                _this.pointer ++;
                if(_this.pointer == _this.cont_num) _this.pointer = 0;
                _this._exe_();
            };

        if(this.cont_num <= 1) return false;
        this.interval = setInterval(_exe, this.setting.during);
    },

    /*生成轮播计数点*/
    "_generate_dot_":function(clickenable){
        if(this.cont_num > 1){
            var _this = this;

            for(var i =0;i<this.cont_num;i++){ this.$dot_box.append(i===0?$("<span class='act'>"):$("<span>")) }
            this.$wid.prepend(this.$dot_box);

            /*轮播点绑定触控事件*/
            if(clickenable == "click" || clickenable == "mouseover"){
                this.$dot_box.children("span").css("cursor","pointer");
                this.$dot_box.children("span")[clickenable](function(){
                    _this.pointer = $(this).index()
                    _this._exe_();
                    if(clickenable == "mouseover")
                    {
                        clearInterval(_this.interval);
                        $(this).one("mouseout",function(){
                            _this.reautoplay();
                        })
                    }
                    else
                    {
                        _this.reautoplay();
                    }
                })
            }

        }
    },

    //主执行算法
    "_exe_":function(){
        var _this = this;

        if(this.setting.ef === "SCROLL"){//图片切换效果
            var offset = this.pointer * -this.view_width + "px";

            this.$cont_box.css({
                "transform": "translateX(" + offset + ")",
                "-moz-transform": "translateX(" + offset + ")",
                "-webkit-transform": "translateX(" + offset + ")"
            })
        }
        if(this.setting.dot_enable){//轮播点动效
            this.$dot_box.children("span").removeClass("act");
            this.$dot_box.children("span").eq(this.pointer).addClass("act");
        }
        this.clickbefore = this.pointer;
    },

    "reautoplay":function(){//(内部方法)重启自动播放
        if(this.interval)
        {
            clearInterval(this.interval);
            setTimeout(this._autoplay_(this.setting.during), 0);
        }
    }
}