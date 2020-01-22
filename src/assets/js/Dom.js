//Dom

;(function(w){
    function Dom(arg){
        var dom;

        if(typeof(arg) === "string"){//传参为selector
            dom = this._get_dom(arg);
        }else if(arg.length > 0){//传参为jquery对象
            dom = arg.length === 1? arg[0]: arg;
        }else if(arg.nodeType === 1){//传参为dom
            dom = arg;
        }

        this.dom = dom;
    };

    Dom.prototype = {

        //获取dom滚动距离
        "scroll": function(body){
            var x, y;

            if(body === "body"){
                x = w.scrollX;
                y = w.scrollY;
            }else{
                x = this.dom.scrollLeft;
                y = this.dom.scrollTop;
            }
            return {"x":x, "y":y};
        },


        //获取dom对象定位坐标
        /*
         * refer: parent（相对offsetParent）
         * refer: body（默认：相对body）
         * refer: viewport（相对视口）
         */
        "pos": function(refer){
            var dom = this.dom,
                x = dom.offsetLeft,
                y = dom.offsetTop;

            if(refer !== "parent"){
                do{
                    dom = dom.offsetParent;
                }while(dom.offsetParent.nodeName.toLowerCase() === "body"){
                    x += dom.offsetLeft;
                    y += dom.offsetTop;
                }
                if(refer === "viewport"){
                    var scroll = this.scroll("body");

                    x = x - scroll.x;
                    y = y - scroll.y;
                }
            }
            return {"x":x, "y":y};
        },


        //transition过渡
        /*
         * css：样式对象或样式类
         */
        "trans": function(css, callback){
            var dom = this.dom, class_name,
                transend_callback = function(){
                    dom.removeEventListener("transitionend", transend_callback);
                    callback && callback();
                }

            dom.addEventListener("transitionend", transend_callback);
            if(typeof(css) === "string"){//样式类
                class_name = css;
                this.addClass(class_name);
            }else{
                this.css(css);
            }
        },

        //-----------------------------css操作--------------------------------

        //设置css|获取指定行内css样式值
        "css": function(css){
            var css_pro,
                mk_css = function(css){
                    css_pro = css.split("-");
                    if(css_pro.length === 3){//内核前缀场景
                        css_pro = css_pro[0] + css_pro[1].capitalize() + css_pro[2].capitalize();
                    }else if(css_pro.length === 2){//含“-”分隔
                        css_pro = css_pro[0] + css_pro[1].capitalize()
                    }else{
                        css_pro = css_pro[0];
                    }
                    return css_pro;
                }

            if(typeof(css) === "string"){//获取css
                return this.dom.style[mk_css(css)];
            }else{//设置css
                for(var c in css) this.dom.style[mk_css(c)] = css[c];
            }
        },


        //添加css类
        "addClass": function(class_name){
            if(!this.hasClass(class_name)) this.dom.className += (" " + class_name);
        },


        //移除css类
        "removeClass": function(class_name){
            var class_names = this.dom.className.split(" "), index;

            if((index = class_names.indexOf(class_name)) !== -1){
                class_names.splice(index, 1);

                this.dom.className = class_names.join(" ");
            }
        },


        //判断是否具有css类
        "hasClass": function(class_name){
            var class_names = this.dom.className;

            if(class_names){
                return class_names.split(" ").indexOf(class_name) === -1? false: true;
            }else{
                return false;
            }
        },


        //切换class类
        "toggle_class": function(class_name1, class_name2){
            if(class_name2){//两个类之间切换
                if(this.hasClass(class_name1)){
                    this.removeClass(class_name1);
                    this.addClass(class_name2);
                }else if(this.hasClass(class_name2)){
                    this.removeClass(class_name2);
                    this.addClass(class_name1);
                }
            }else{//单个类的切换
                this.hasClass(class_name1)? this.removeClass(class_name1): this.addClass(class_name1);
            }
            return this;
        },


        //判断dom是否隐藏（display:none）
        "is_none_display": function(){
            return this.dom.clientHeight === 0 && this.dom.clientWidth === 0? true: false;
        },

        //-----------------------------遍历操作--------------------------------

        //返回dom对象
        "get": function(){
            return this.dom;
        },


        //查找Dom对象
        "find": function(selector){
            return new Dom(this._get_dom(selector));
        },


        //dom获取
        "_get_dom": function(selector){
            var dom, parent = this.dom || document;

            dom = parent.querySelectorAll(selector);
            if(dom.length === 0) return false;
            return dom.length === 1? dom[0]: dom;
        }

    };

    //-----------------------------私有方法--------------------------------

    w.Dom = Dom;

})(window);