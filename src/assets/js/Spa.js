//SPA

;(function(w){
    function Spa(config){
        this.load;                                  //解析加载完成回调方法
        this.init(config);
    }

    Spa.prototype = {

        //配置初始化
        "init":function(config){
            for(var i in config){
                spa_lib[i] = {};
                spa_lib[i].title = config[i];
                spa_lib[i].pages = [];
            }
            return this;
        },


        //基于url获取请求参数
        "get_request_arg": function(url){
            var _url_arr = url && url.split("?"),
                _url = _url_arr[1] && _url_arr[1].split("/");

            if(_url){
                var hash = null, page_name = _url[2] && _url[2].split("&")[0], hash_index;

                hash_index = page_name? page_name.indexOf("#"): -1;
                if(hash_index !== -1){//存在哈希参数
                    hash = page_name.substr(hash_index);
                    page_name = page_name.substr(0, hash_index);
                }
                return {
                    "controller": _url[0],              //控制器
                    "method": _url[1],                  //方法
                    "page_name": page_name,             //页面名
                    "hash": hash,                       //哈希参数
                    "search": _url_arr[1]               //url参数
                };
            }
        },


        //spa页面请求
        /*
         * 【使用】:
         * 1. 缓存方案支持;
         *      a. 一级缓存：服务端静态化模版缓存
         *      b. ？？？？二级缓存：本地，脚本缓存静态化页面片段，直接调用;
         * 2. 支持客户端函数加工模板数据：data_deal 注：回调函数务必return返回数据;
         * 4. 支持页面动态加载完成执行回调函数：load（仅在生成模版时执行一次）;
         * */
        "page_request": function(url, data_deal, _complete, load, $_stage, no_history, no_static){
            var request_arg = this.get_request_arg(url),
                cur_url_arg = this.get_request_arg(location.search);

            tpl_name = request_arg.page_name;
            tpl_hash = request_arg.hash;
            controller = request_arg.controller;
            complete = _complete;
            page_id = url.substr(url.indexOf("?")+1);
            $stage = this.mk_stage($_stage);

            /*配置页面加载模式*/
            if(!spa_lib[tpl_name]) spa_lib[tpl_name] = {"title":null, "pages":[]};
            if($stage[0].nodeName.toLowerCase() === "body"){//body内插入模版
                load_mode = "create";
            }else if($stage.attr("id") === "Cont"){//#Cont内插入模版
                var title = spa_lib[tpl_name].title;

                /*历史记录*/
                if(title) document.title = title;
                if(no_history === true){
                    history.replaceState({"spa": "1"}, null);
                }else{
                    if(!cur_url_arg || cur_url_arg.search !== request_arg.search) this.history_record(url);
                }

                load_mode = no_static === "on"? "reload": "load";
            }else{//内部结构插入模版
                load_mode = "refresh";
            }
            if(load_mode !== "create") $stage.css({"visibility":"hidden", "opacity":0});

            /*？？？？模板显示*/
            if(5>6){//获取客户端本地缓存
                this._cache_spa_(tpl_name, page_id);
                _final_deal_(spa_lib[tpl_name].enable);
            }else{//异步生成
                var _this = this;

                data_deal = data_deal || function(datas){ return datas; }
                $.getJSON(url, function(data, status, xhr){
                    if(status === "success"){
                        _page_generate_(data.tpl, data_deal(data.datas), load);
                    }
                })
            }

        },


        //spa渲染
        "render": function(tpl_url, data, $_stage, _complete){
            var _this = this;

            /*加载模式*/
            $stage = this.mk_stage($_stage);
            if($stage.attr("id") === "Cont"){//#Cont内插入模版
                load_mode = "reload";
            }else{//内部结构插入模版
                load_mode = "refresh";
            }

            complete = _complete;

            /*模版获取*/
            tpl_url = (tpl_url.indexOf(".") !== 0 && tpl_url.indexOf("/") !== 0)? (APP + "home/wid/" + tpl_url): tpl_url;
            $.get(tpl_url + ".tpl?r=" + Math.round(Math.random()*1000), function(tpl){
                _page_generate_(tpl, data);
            });

        },


        //历史记录堆栈
        "history_record": function(url){
            url = url[0] === "?"? url: "?" + url
            history.pushState({"spa": "1"}, null, url)
        },


        //构建stage
        "mk_stage": function($stage){
            return $stage || ($("#Cont").size() === 1?$("#Cont"):$("body"));
        },


        //本地缓存
        "_cache_spa_": function(){
            var pages_lib = spa_lib[tpl_name].pages;

            if(spa_lib.fronter) spa_lib.fronter.enable = false;
            if(!pages_lib.in_array(page_id)) pages_lib.push(page_id);
            spa_lib.fronter = spa_lib[tpl_name];
        }

    }

    //-----------------------------私有方法--------------------------------

    var datas = {},
        spa_lib = {
            "debug":        false,
            "fronter":      null,
            "include_lib":  []
        },
        controller,
        static_tpl = "",
        load_mode,                                  //页面加载模式：“create”、“load”、“refresh”
        tpl_name = "",                              //模板页面名
        tpl_hash = "",                              //模板页面哈希参数
        page_id,                                    //模板页面id
        complete = null,                            //页面渲染完成回调函数
        $stage;                                     //模版显示区域


    //模板引擎
    /*
     * 【使用】:
     * 1. 变量解析；
     *   a. 存在2种变量模式：直接量：{$var}; 判断\循环参数量：$var
     *   b. 关联数组（对象）属性值直接量替换：exp:{$obj.name}
     *   c. 索引数组下标直接量替换：exp:{$arr[2]}
     *   d. 混合数组（关联、索引混合）属性值\下标直接量替换
     *   e. 支持“快速或”语法：exp：{$a||"默认值"}，注：默认值为常量需双引号包裹
     *   f. 对象属性的获取仅支持“.”语法，数组下标元素的获取仅支持“[]”语法
     *   g. ？？？？支持变量“+-*%”表达式计算
     *   h. ？？？？支持模板引擎内置函数处理变量
     *      h.1 内置函数：
     * 2. 判断语句编译：<%if><%else><%elseif></%if>
     *   a. 条件语句直接编译：exp:<%if 3!=2>
     *   b. 条件语句直接量编译：exp:<%if $arr[3].length>2>
     *   c. 模板语句直接量编译：exp:<li>{$arr[2].name}</li>
     *   d. else从句编译；
     *   e. else if从句编译；
     *   f. “|| &&” 表达式编译;
     *   g. 多层判断语句嵌套：<%if><%-if></%-if></%if>
     *   h. 支持三元表达式判断语法，注：常量值需双引号包裹
     *       h.1 注：html结构切勿使用单引号，否则会引起解析错误
     *       h.2 “?”前仅支持常量判断，且常量位于右侧，仍需双引号包裹，exp：$a>"34"?...
     * 3. 循环语句编译：<%sec loop=$loop index=i method></%sec>;
     *   a. 模版语句直接编译：exp:<li><span>123</span></li>
     *   b. 模版直接量编译;
     *       b.1 单直接量编译输出：exp:<li><span>{$d.b}</span></li>
     *       b.2 多直接量编译输出：exp:<li><span>{$d.b}</span><b>{$d.c[1]}</b></li>
     *       b.3 循环下标编译：exp:<li><span>{$arr[index]}</span></li>
     *   c. 多层嵌套循环编译实现：<%sec><%-sec></%-sec></%sec>
     *   d. ？？？？对象的遍历
     *   e. ？？？？支持循环下标输出：exp：<%sec loop=$loop index=i>{$i}</%sec>
     *   f. ？？？？内置循环方法：倒序、截取、过滤
     * 4. 循环混合条件判断语句识别编译；
     *   a. 单层嵌套编译实现;
     *   b. 多层嵌套编译实现;
     * 5. 注释语法编译：<* ... *>;
     * 6. 页面静态化缓存至服务端"tpl/cp"目录；
     *   a. 设置非body或非#Cont"stage",视为局部刷新，不静态化处理
     * 7. debug模式（js原生语法编译,存在安全性漏洞）：spa_lib.debug = true
     *   a. 仅编译模版时执行
     *   b. debug_mode默认关闭，代码片段会被注释
     *   c. debug_mode脚本无法对模板dom进行操作（尚未解析），仅可作为字符串读取
     *   d. 控制台自动打印相关数据
     * 8. 中文编译实现;
     *   d. include模板不会单独静态化处理，也不会单独进行缓存;
     *   e. include模板可混用于条件判断及循环语句;
     *   f. 模板语法完全适用于include结构;
     * 10. ？？？？系统常量：
     * 11. ？？？？switch判断语句解析;
     * */
    function _page_generate_(tpl, _datas, load){
        datas = _datas;
        //this.load = function(){
        //spa_lib[tpl_name].dom = $stage.children();//？？？？本地缓存静态化页面
        //load && load()
        //};
        if(datas["TYPE"] === "static"){//静态模版
            _final_deal_(tpl);
            //this.load();
        }else{
            spa_lib.include_lib.length = 0;//清空include_lib记录
            _parse_include_(tpl);//include编译
        }
    }


    //include解析方法
    function _parse_include_(tpl_str){
        var include, tpl;

        if(include = tpl_str.match(/<%include\s+["']([\w\.\/\[\]\$\{\}]+)["']\s*\/>/)){

            /*内部变量解析*/
            var _tpl_name = include[1].replace(/{\$([\w\.\[\]]+)}/g, function(match, _g){
                var arg_front = _g.split(".")[0].split("[")[0],
                    arg_behind = _g.substr(arg_front.length);

                return new Function("arg", "datas",
                    "var arg_obj = datas[arg]; " +
                    "return typeof(arg_obj) === 'object'?arg_obj" + arg_behind + ":arg_obj; ")(arg_front, datas);
            });
            tpl = (_tpl_name.indexOf(".") !== 0 && _tpl_name.indexOf("/") !== 0)? (APP + "home/wid/" + _tpl_name): _tpl_name; //系统tpl缺省目录|自定义路径

            /*嵌套加载*/
            if(spa_lib.include_lib.indexOf(_tpl_name) >-1){//禁止重复加载
                error("repeat include same tpl!");
            }else{//正常加载
                spa_lib.include_lib.push(_tpl_name);
                $.get(tpl + "?rand=" + Math.round(Math.random()*1000), null, function(load_tpl, state){
                    if(state === "success"){
                        tpl_str = tpl_str.replace(include[0], load_tpl);//include模板替换
                        _parse_include_(tpl_str);
                    }
                });
            }

        }else{
            _main_exe_(tpl_str)
        }
    }


    //变量解析方法
    function _parse_var_(tpl_str){
        return tpl_str.replace(/\$[\w\.\[\]"_]+|{\$[\w\.\[\]"_\$]+}|{\$[\w\.\[\]"_]+\|\|(\$[\w\.\[\]"_]+|"[\s\w\.\-\u4e00-\u9fa5#_]+")}|{\$[\w\.\[\]"_]+([><!=]+"[\w\.\-\u4e00-\u9fa5#_]+")?\?(\$[\w\.\[\]"_]+|"[\w\.\-\u4e00-\u9fa5#_]+"):(\$[\w\.\[\]"_]+|"[\w\.\-\u4e00-\u9fa5#_]+")}/g, function(match){
            var _r = match.replace(/\$([\w\.\[\]"_]+)/g, function(a, b){
                var arg_front = b.split(".")[0].split("[")[0],
                    arg_behind = b.substr(arg_front.length);

                return 'datas["' + arg_front + '"]' + arg_behind;
            });

            if(match.search("{") === 0){//结构:{$var}; ins:html结构数据拼接，支持 “快速或” 及 “三元表达式” 语法
                match = match.rtrim("}").split("$INDEX_");//sec循环下标语法：{$INDEX_"sec循环index属性值"}
                if(match[1]){//sec循环下标处理
                    return "'+" + match[1] + "+'";
                }else{
                    return "'+(" + _r.substr(1, _r.length-2) + ")+'";
                }
            }else{//结构:$var; ins:变量结构数据
                return _r;
            }
        })
    }


    //循环解析方法
    function _parse_sec_(tpl_str, is_inner){
        var parse_tpl = (is_inner === true?"":"var _str='';");

        parse_tpl += _parse_var_(tpl_str).replace(/<\/%-?sec>|<%-?sec\s+([\$\w\s_=\.\[\]'"]+)>/g, function(match, sec_args_g){
            if(sec_args_g){
                var _var = sec_args_g.match(/index=([\w_]+)/)[1], _loop = sec_args_g.match(/loop=([\w\.\[\]_"']+)\s+/)[1];

                if(match.search("<%sec") === 0) return (is_inner === true?"';":"") + "for(var " + _var + "=0; " + _var + "<" + _loop + "; " + _var + "++){ _str+='";//sec start编译
                if(match.search("<%-sec") === 0) return "';" + "for(var " + _var + "=0; " + _var + "<" + _loop + "; " + _var + "++){ _str+='";//嵌套sec start编译
            }
            if(match.search("</%-sec>") === 0) return "';}_str+='";//嵌套sec end编译
            if(match.search("</%sec>") === 0) return "';}" + (is_inner === true?"_str+='":"");//sec end编译
        });
        parse_tpl += "return _str;";
        return parse_tpl.match(/<%if.+?<\/%if>/)? _parse_if_(parse_tpl, true): new Function("datas", parse_tpl)(datas);//内嵌条件判断检测
    }


    //条件判断解析方法
    function _parse_if_(tpl_str, is_inner){
        var parse_tpl = (is_inner === true?"":"var _str='';");

        parse_tpl += _parse_var_(tpl_str).replace(/<%else>|<%(?:else)?-?if\s+((?:[\$\w\s_\.\[\]'"]+[!<>=]+[\$\w\s\.\[\]'"]+(?:[|&]+)?)+)>|<\/%-?if>/g, function(match, if_args_g){
            if(match.search("<%elseif") === 0) return "';}else if(" + if_args_g + "){_str+='";//else if编译
            if(match.search("<%else>") === 0) return "';}else{_str+='";//else编译
            if(match.search("<%if") === 0) return (is_inner === true?"';":"") + "if(" + if_args_g + "){_str+='";//else start编译
            if(match.search("<%-if") === 0) return "'; if(" + if_args_g + "){_str+='";//嵌套else start编译
            if(match.search("</%if>") === 0) return "';}" + (is_inner === true?"_str+='":"");//else end编译
            if(match.search("</%-if>") === 0) return "';}_str+='";//嵌套else end编译
        });
        parse_tpl += (is_inner === true?"":"return _str;");
        return parse_tpl.match(/<%sec.+?<\/%sec>/)? _parse_sec_(parse_tpl, true): new Function("datas", parse_tpl)(datas);//内嵌循环检测
    }


    //主执行方法
    function _main_exe_(tpl_str){
        tpl_str = tpl_str.replace(/\\|\r|\n|\t|\u2028|\u2029/g, "");//过滤特殊字符
        tpl_str = tpl_str.replace(/<\*.+?\*>/g, "");//注释编译

        /*debug模式*/
        tpl_str = tpl_str.replace(/<%>(.+?)<\/%>/g, function(match, _exe_g){
            if(spa_lib["debug"]){//模式启用
                new Function("datas", _exe_g)(datas);
            }else{//模式禁用
                return "";
            }
        })

        /*解析主执行*/
        tpl_str = tpl_str.replace(/<%sec.+?<\/%sec>|<%if.+?<\/%if>|{\$[\w\.\[\]"_]+}|{\$[\w\.\[\]"_]+\|\|(\$[\w\.\[\]"_]+|"[\s\w\.\-\u4e00-\u9fa5#_]+")}|{\$[\w\.\[\]"_]+([><!=]+"[\w\.\-\u4e00-\u9fa5#_]+")?\?(\$[\w\.\[\]"_]+|"[\w\.\-\u4e00-\u9fa5#_]+"):(\$[\w\.\[\]"_]+|"[\w\.\-\u4e00-\u9fa5#_]+")}/g, function(match){
            if(match.search("<%sec") === 0){//循环解析
                return _parse_sec_(match)
            }else if(match.search("<%if") === 0){//条件判断解析
                return _parse_if_(match)
            }else{//直接量解析，支持 “快速或” 及 “三元表达式” 语法
                var _r = match.replace(/\$([\w\.\[\]"_]+)/g, function(a, b){
                    var arg_front = b.split(".")[0].split("[")[0],
                        arg_behind = b.substr(arg_front.length);

                    return 'datas["' + arg_front + '"]' + arg_behind;
                });

                _r = ("return " + _r.substr(1, _r.length-2));
                return new Function("datas", _r)(datas);
            }
        });

        _final_deal_(tpl_str);
    }


    //最终解析处理
    function _final_deal_(tpl_str){
        var preload = {"css":[], "js":[], "css_count":0, "js_count":0};

        static_tpl = tpl_str;

        /*“按需加载”:样式表及脚本*/
        tpl_str = tpl_str.replace(/<%preload\s*['"]([\w\.\/_:]+\.(css|js))['"]\s*\/>/g, function(match, url, type){
            preload[type].push(url);
            preload[type + "_count"]++;
            return "";
        })
        _load_css_(tpl_str, preload);//优先加载css

    }


    //预加载css
    function _load_css_(tpl_str, preload){
        if(preload["css_count"] > 0){
            while(preload["css"].length > 0){//加载css
                var link = document.createElement('link'),
                    url = preload["css"].pop(),
                    _url = url.split("/"),
                    css_id = _url[_url.length - 1].rtrim(".css").toUpperCase() + "CSS",
                    rm_link = document.getElementById(css_id);

                link.setAttribute('type', 'text/css');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', url);
                link.setAttribute('id', css_id);
                link.onload = function(){ if(0 === --preload["css_count"]) _load_js_(tpl_str, preload) }
                rm_link && $("head")[0].removeChild(rm_link);
                $("head")[0].appendChild(link);
            }
        }else{
            _load_js_(tpl_str, preload);
        }
    }


    //预加载js
    function _load_js_(tpl_str, preload){
        if(preload["js_count"] > 0){
            while(preload["js"].length > 0){//加载js
                var script = document.createElement('script'),
                    url = preload["js"].pop(),
                    _url = url.split("/"),
                    js_id = _url[_url.length - 1].rtrim(".js").toUpperCase() + "JS",
                    rm_script = document.getElementById(js_id);

                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', url);
                script.setAttribute('id', js_id);
                script.onload = function(){ if(0 === --preload["js_count"]) _show_(tpl_str) }
                rm_script && $("head")[0].removeChild(rm_script);
                $("head")[0].appendChild(script);
            }
        }else{
            _show_(tpl_str);
        }
    }


    //显示模版
    function _show_(tpl_str){
        var sec_id = tpl_hash;

        $stage.html(tpl_str);

        /*页面静态化处理*/
        if(load_mode === "load"){//加载内页
            window.scrollTo(0, 0);
            $.post("?" + controller + "/static_tpl", {"tpl":static_tpl, "tpl_name":tpl_name, "page_id":page_id});
        }else if(load_mode === "reload"){//重加载内页（无静态化处理）
            window.scrollTo(0, 0);
        }else if(load_mode === "create"){//创建基版
            static_tpl = "<!doctype html><html>" + document.documentElement.innerHTML + "</html>";
            $.post("?" + controller + "/static_tpl", {"tpl":static_tpl, "tpl_name":tpl_name});
        }

        $stage.css({"visibility":"visible", "opacity":1});
        complete && complete(page_id, datas);//加载完成回调执行
        if(sec_id) window.window.scrollTo(0, $(sec_id).offset().top);//内链跳转

        /*debug模式*/
        if(spa_lib["debug"]){
            c("--------------tpl_name_" + tpl_name + "-----------------");
            c("datas:");
            c(datas);
            c("cache:");
            c(spa_lib);
            c("-------------------------------");
        }

    }

    w.Spa = Spa;

})(window);