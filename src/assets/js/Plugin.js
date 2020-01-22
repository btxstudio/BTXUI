//jquery plugin

;(function($, prototype){
    //动画切换扩展
    /*
    * String method ["show|hide|toggle|toast"]：元素切换方式
    * [Object setting {
    *       Number delay：延迟执行时间，单位毫秒
    *       Number during：动画暂留时长（仅针对“toast”），单位毫秒
    *       String speed ["fast|normal|slow'秒数'"]：执行动画速度,0为无动画效果，默认为 “normal-0.54s”
    *       Function callback：动画结束后回调方法
    *       String state: 组件状态名（css类名）
    * }：动画参数]
    * */
    $.fn.ani = function(method, setting){
        this.data("_ani_") || this.data("_ani_", new prototype.Ani());
        return this.data("_ani_").init(this, setting)[method]() || this;
    }


    //组件类
    function Widget(selector){
        this.$widget = $(selector);         //组件封装
        this.mode_lib = {"all":null};       //子组件库
        this.action_lib = {};               //动作库
    }
    Widget.prototype = {

        //【隐藏组件】
        "hide":function(){
            this.$widget.ani("hide");
        },

        //【显示组件】
        "show":function(){
            this.$widget.ani("show");
        },

        /*
         * 【记录组件模式及动作，仅限单次调用】
         * Object{ name:selector } para:组件模式名
         */
        "record_once":function(para){
            try{
                if(this.mode_lib["all"]) throw "widget.record_once 仅限单次调用";
            }catch(e){
                console.error(e);
            }

            var _sel = "";
            for(var i in para){
                if(typeof(para[i]) == "function"){//添加动作
                    this.action_lib[i] = para[i];
                }else{//添加子组件
                    this.mode_lib[i] = this.$widget.find(para[i]);
                    _sel += (para[i]+",");
                }
            }
            this.mode_lib["all"] = this.$widget.find( _sel.rtrim(",") );
        },

        /*
         * 【变换组件模式，支持链式调用】
         * String name:组件模式名
         */
        "change_mode":function(name){
            this.mode_lib["all"].hide(0);
            this.mode_lib[name].show(0);
            return this
        },

        //【执行预置动作】
        "do":function(action_name, para){
            this.action_lib[action_name].call(this.$widget, para);
            return this;
        },

        //【打印全部组件模式名】
        "console_all_mode":function(){
            for(var name in this.mode_lib){ console.log(name)}
        }
    }


    //数字键盘类
    /*function KeyBoard($dom){
     this.$self = $dom;                                          //键盘组件
     this.$screen = this.$self.children("div");                  //显示屏
     this.$inp;                                                  //表单输入组件
     this.$text;                                                 //输入显示
     this.inp_setting;                                           //输入参数设置
     this.keys = {                                               //键盘输入映射表
     "190":".",
     "48":"0",
     "49":"1",
     "50":"2",
     "51":"3",
     "52":"4",
     "53":"5",
     "54":"6",
     "55":"7",
     "56":"8",
     "57":"9",
     "8":"C",
     "13":"OK"
     };
     }
     KeyBoard.prototype = {
     //输入显示
     "typing":function(w){
     switch(w){
     case "collapse"://下拉
     this.close();
     break;
     case "C"://回退
     this.$screen.text(function(i, _w){ return _w.length == 1?"0":_w.substr(0, _w.length-1) });
     break;
     case "OK"://确定输入
     var setting = this.inp_setting, v = this.$screen.text();

     if(setting.min) v = Math.max(v, setting.min);//值域下限修正
     if(setting.max) v = Math.min(v, setting.max);//值域上限修正
     this.$inp.val(v);
     this.$text.text(v);
     this.close();
     break;
     case "AC"://清空
     this.$screen.text("0");
     break;
     default://数字字符输入
     var force_int = this.inp_setting.force_int;

     this.$screen.text(function(i, _w){
     if(_w.length >= 10 || (w == "." && _w.indexOf(".") != -1) || (w == "0" && _w == "0") || (force_int && w == ".")) return;//数字上限10位|小数点唯一|首位禁止输入0|强制整型
     return _w == "0" && w != "."?w:_w + w;//首位输入非小数点则替换
     });
     }
     },

     //开启组件
     "open":function($number, force_int){
     this.$inp = $number?$number.find("input[type='number']"):false;
     if(this.$inp){
     var _inp = this.$inp, keys = this.keys, _this = this;

     this.$text = $number.children("span");
     this.inp_setting = {
     "min": _inp.attr("min") || 0,//最小值
     "max": _inp.attr("max"),//最大指
     "step": _inp.attr("step"),//步进值
     "force_int": force_int//强制整型
     }
     this.$screen.text(this.$inp.val() || this.inp_setting.min);
     $(window).on("keydown.keyboard", function(e){//键盘事件绑定
     if(keys[e.keyCode]) _this.typing(keys[e.keyCode]);
     if(e.keyCode == 8) return false;
     })
     this.$self.ani("show");
     $B.matte({"$fronter":this.$self});
     }else{
     console.error("keyboard has not bind input:number!");
     }
     },

     //关闭组件
     "close":function(){
     this.$self.ani("hide");
     $(window).off("keydown.keyboard");
     $B.matte(0);
     }

     }

    */
        /*this.keyboard = new KeyBoard($("<div data-form-keyboard class='transition'>" +
         "<div>0</div>" +
         "<ul data-btxc='btn' data-btxf='_typing'>" +
         "<li data-btn>0</li>" +
         "<li data-btn>1</li>" +
         "<li data-btn>2</li>" +
         "<li data-btn>3</li>" +
         "<li data-btn>4</li>" +
         "<li data-btn>5</li>" +
         "<li data-btn>6</li>" +
         "<li data-btn>7</li>" +
         "<li data-btn>8</li>" +
         "<li data-btn>9</li>" +
         "<li data-btn>.</li>" +
         "<li data-btn class='fk_no_bottom_line'>C</li>" +
         "<li data-btn class='fk_no_bottom_line'>AC</li>" +
         "<li data-btn class='fk_no_bottom_line'><i class='arrow_bottom_ico'>collapse</i></li>" +
         "<li data-btn class='fk_no_bottom_line'>OK</li>" +
         "</ul></div>"));*/



})(jQuery, {"Ani":Ani})




