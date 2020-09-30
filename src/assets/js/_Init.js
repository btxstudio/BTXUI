/*
Init基于jQuery框架;

包含类文件：
Init:初始化类
Matte:遮罩类
Scroller:滚动条类
Pointer:指针类

静态方法:
init(datas_arr):void 数据初始化
arr_loop_event(arr, _event, fn):void 为数组元素循环添加事件
calculate_date(year, month):int 根据年份及月份计算日期数
offsetpos(clientpos,relobj):void 获取鼠标操作对象的相对定位(兼容性方法)
view_dir_notice(dir):void 终端视口方向限制提示

实例方法(系统数据处理):
ajax_request(url, beforefn, resultfn, notice, form_ele, clone_deal, extra) 智能异步请求
ani_page() 动画页组件执行
ani_page_off() 动画页组件移除
external() 堆栈封装函数
mk_check_send() 构造表单提交验证项
creatdateoption(selector,aftermonth,formate) 创建option时间格式：20XX-X-X 通常用于预约时间选择
creatdateoption2(selector,type,method,_unit) 创建option时间格式：年、月、日、小时、分钟、秒
gotop(useease) 设置一键置顶按钮（依靠特定属性data-role="gotop")
btnlist(btnlist,outer) 创建按钮列表对象

组件函数:
btx_btn() 按钮样式绑定触控事件
btx_scroller(areawidth,speed) 实现自定义滚动条控件添加
btx_fixed_thead() 实现表格滚动,标题固定定位效果
    btx_addr_pad() 表单控件扩充-地理位置下拉列表数据填充
    btx_timepicker(format, mattealpha) 表单控件扩充-时间选择器
    btx_pricepicker() 表单控件扩充-金额选择器
btx_checkbox() 表单控件扩充-自定义复选框
btx_radio() 表单控件扩充-自定义单选按钮
btx_select() 表单控件扩充-自定义下拉列表选择器
btx_input() 表单控件扩充-自定义表单输入器
btx_search() 异步搜索控件
btx_bgmplay() 背景音乐播放
btx_fixed() 实现fixed定位元素的空位填充
btx_subnav() 实现导航按钮二级下拉
btx_tip() 实现鼠标悬浮提示
btx_record_check() 实现列表数据检测，无值时自动提示
    btx_cname(cnames) 别名显示dom数据
btx_forbid_copy() 禁止该元素内容复制
btx_forbid_cut() 禁止该元素内容剪切
btx_forbid_pase() 禁止该元素内容粘贴
btx_center_relative(type) 基于父对象居中布局元素
btx_order() 列表排序

工具方法:
btx_toast():void 注册全局工具方法-弹窗
btx_load():void 注册全局工具方法-加载提示
getclientsize(ele, dir, ifmargin):Number 获取元素的client尺寸,dir:String("height" or "width")
preloadimg(imgarr,srcarr):void 图片预加载低分辨率图，imgarr:Array[<img>] or jquerylist; srcarr:Array[imgurl:String]
preload_img_data(url,img_data):void 预加载图片方法 url:String;img_data:[String,String...]
setPluginPos(plug,insertmethod,dropobj,css):void 设置外部js脚本生成元素的定位 plug:JqueryObject;insertmethod:String(APPEND\INSERT);dropobj:Element(放置对象);css:Object{css...}
testIEVersion():Numer 判断IE浏览器版本
browsercheck():void 检测ie浏览器版本，低于9则建议升级或是使用指定浏览器
事件方法：
mousescroll(ele,upfn,downfn):void 兼容性解决鼠标滚动事件

私有方法：
__splitlist__(ele,datarole):jQueryObjs|Boolean 将ol、ul、dl data-role事件绑定分配给其列表子集元素
__initdatarole__(ele, rolename, yesfn, nofn, default_set) 判断元素是否具有指定自定义属性，没有则设置添加该属性并赋值为“no”
__formplugin__(selector, plugin) 添加表单扩充控件，核心算法
__set_cname__(ele) 设置别名
__external__(fn_str) 执行外接函数
*/

function Init(){
    /*域名黑名单*/
    var black_list = ["luxelakes", "runxinan"],
        url = location.hostname;
    if(in_array(black_list, url)){
        $("html").empty();
        return;
    }

    //临时限制
    if(location.href.search("luxelakes")>1){
        $("html").empty();
        return;
    }

    //根目录
    this.BASE_ROOT = location.protocol + "//" + location.hostname + "/";

    /*遮幕*/
    this.matte;
    //动画页缓存数据
    //this.anidata = {"ani_dom":null, "ani_t":[], "ani_class":[]};

    /*loading计数器*/
    this.loading = 0;
    this.loading_buffer;

    /*别名集合*/
    this.cnames = [];

    /*堆栈外接函数集合*/
    this.external_fns = {};

    /*返回动画效果控制器*/
    this.ani = new Ani();

    /*返回微信控制器*/
    this.wx = new WX();
	}


/*静态属性、方法*/

//数据初始化
/*
 * datas_arr结构：[{selector, value, callback},...]
 */
Init.init = function(datas_arr){
    var _selector, _value, _callback, tagname;
    for(var i in datas_arr)
    {
        _selector = $(datas_arr[i]["selector"]);
        _value = datas_arr[i]["value"] || "";
        _callback = datas_arr[i]["callback"];
        if(!is_dom(_selector)) continue;
        if(!empty(_callback) && _callback instanceof Function){
            _callback(_selector, _value);
        }else{
            tagname = _selector[0].tagName.toLowerCase();
            if(tagname == "input"){
                _selector.val(_value);
            }else{
                _selector.text(_value);
            }
        }
    }
}

//为数组元素循环添加事件
Init.arr_loop_event = function(arr, _event, fn){
	for(var i in arr){
		if(arr[i].nodeType == 1){
			$(arr[i]).on(_event,fn)
			}else{
				return i+" 项下标内容非DOM对象！";
				}
		}
	}

//根据年份及月份计算日期数
Init.calculate_date = function(year, month){
	var februarynum, datenum;
	if(year%4 == 0)//闰年
	{
		if(year%100 == 0 && year%400 == 0)
		{
			februarynum = 29;
			}
			else
			{
				februarynum = 28;
				}
		}
		else{//平年
			februarynum = 28;
			}
	if(/^[13578]$|10|12/.test(month))
	{
		datenum = 31;
		}
		else if(month == 2)
		{
			datenum = februarynum;
			}
			else
			{
				datenum = 30;
				}
	return datenum
	}

//获取鼠标操作对象的相对定位(兼容性方法)
/*
 clientpos:Number 一般为鼠标的坐标定位（e.clientY\X）
 relobj:jQueryObj 相对元素
 */
Init.offsetpos = function(clientpos, relobj){
    var _offset = relobj.offset();
        return {"x":clientpos - _offset.left, "y":clientpos - _offset.top};
    }

//终端视口方向限制提示
Init.view_dir_notice = function(dir){
    if(empty(window.btx_notice_matte)){
        btx_notice_matte = $("<div style='z-index: 101; color: #ccc; display: none'><p class='icon-mobile' style='text-align: center;font-size: 7rem;margin-bottom: 1.4rem;'></p><p style='font-size: 1.4rem'></p></div>");
        btx_notice_matte.prependTo("body");
    }
    if(empty(dir)){//消除提示
        btx_notice_matte.hide(0);
    }else{
        if(dir == "h"){//使用横屏提示
            btx_notice_matte.children("p:last").text("请使用横屏以浏览");
            btx_notice_matte.children("p:first").css({"-webkit-transform": "rotate(90deg)", "-moz-transform": "rotate(90deg)", "-ms-transform": "rotate(90deg)", "-o-transform": "rotate(90deg)"});
        }else if(dir == "v"){//使用竖屏提示
            btx_notice_matte.children("p:last").text("请使用竖屏以浏览");
            btx_notice_matte.children("p:first").css({"-webkit-transform": "rotate(0)", "-moz-transform": "rotate(0)", "-ms-transform": "rotate(0)", "-o-transform": "rotate(0)"});
        }
        center_ele(btx_notice_matte);
        setTimeout(function(){
            btx_notice_matte.fadeIn(700);
        }, 200)
    }
}


Init.prototype = {
    //智能异步请求
    /*
     * string url: 请求地址
     * [mixed beforefn]: 执行请求前前端检测数据包,存在多种形态
     * [mixed resultfn]: 请求结果处理方案,存在两种形态
     * [string|number notice]: 加载提示,为0则取消提示效果
     * [mixed form_data]: 伪form封装,操作对象或选择器 | post数据结构:{"post_datas":{...}}
     * [obj{"clone_name":id标识, "success_fn(clone_dom, json_data)":正常返回处理函数, "type":处理类型[insert、list]} clone_deal]: dom模版解析处理
     * [object extra]: Jquery.ajax请求的配置项
     * 配合属性：data-clone-section="btx_clone_section-id标识", data-clone="btx_clone"(列表项标识), data-clone="btx_clone-对应数据键名", data-no-result-clone="btx_no_result_clone"
     * 使用: form_data设置为伪form封装,可以自动匹配其范围内含name属性的表单元素,自动进行数据封装并提交
     * 使用: 请求方式为post,接收json结果集,基于框架服务端Controller类ajax_data()方法联同使用
     * 使用: data-clone-section、data-clone使用规范:
     *  data-clone常配合系统框架animation.css联同使用以实现动画效果
     *  需作用于div或thead元素,常同smarty结果集联用,需注意其使用顺序,exp:
     *  <!--smarty初始化数据-->
     *      {//section name=n loop=$datas.list}
     *         {//include "wid_info.tpl"}
     *      {///section}
     *  <!--Init异步获取数据-->
     *      <thead data-clone-section="btx_clone_section-WidInfo">
     *         {//include "wid_info.tpl"}
     *      </thead>
     * 使用: 服务端需协同BTXphp框架 -> Controller -> ajax_data()使用
     * 使用: 循环创建dom是基于框架服务端L()返回datas["list"]数据集合,或基于服务端返回array("list"=>array(datas...))结构数据
     * 支持: 列表项数据动画入场展示效果
     * 支持: 请求发送前数据检测或初始化(beforefn):
     *  beforefn多态:
     *      about_us: String - 含操作提示,直接请求
     *      2: fn - 无操作提示,含检测/初始化函数
     *      3: [String, fn] - 含操作提示,含检测/初始化函数
     *      4: {"mult":true, "notice":"", "fns":[{"express":express, "desc":"", "success":fn, "error":fn}, ... ...]} - 含多段操作提示及检测/初始化函数
 *          注：success及error函数内部允许嵌套btx_confirm(),若确定使用则需保证next自变量函数的调用在其内部执行
     *      5: null - 无操作提示,直接请求
     * 支持: 异步模拟表单发送,可配合btx_fmcheck标识联用,实现表单自动验证
     * 支持: 请求响应后数据处理(resultfn):
     *  resultfn多态:
     *      about_us: fn - successfn(执行成功后回调)
     *      2: array - [successfn, errorfn](允许处理失败回调)
     */
    "ajax_request":function(url, beforefn, resultfn, notice, form_data, clone_deal, extra){
        var _this = this, form_ele, extra = extra || {"async":true},
            clone_data = {
                "clone_name": clone_deal?clone_deal["clone_name"] || null:null,
                "success_fn": clone_deal?clone_deal["success_fn"] || null:null,
                "type": clone_deal?clone_deal["type"] || "list":"list"
            };

        /*请求前执行函数*/
        if(beforefn && beforefn["mult"] && beforefn["fns"] instanceof Array){//多段提示及检测函数
            if(typeof(beforefn["notice"]) == "string"){//含操作提示
                btx_confirm(beforefn["notice"], function(){_mult_check(0)});
            }else{//无操作提示
                _mult_check(0);
            }
        }else if(typeof(beforefn) == "string"){//含操作提示,直接请求
            btx_confirm(beforefn, _send);
        }else if(beforefn instanceof Function){//无操作提示,含检测函数
            beforefn(_send);
        }else if(beforefn instanceof Array && beforefn.length == 2){//含操作提示,含检测函数
            if(typeof(beforefn[0]) == "string"){
                btx_confirm(beforefn[0], function(){
                    if(beforefn[1] instanceof Function){
                        beforefn[1](_send);
                    }else{
                        console.error("Init异步请求前beforefn检测函数有误!");
                    }
                })
            }else{
                console.error("Init异步请求前beforefn提示有误!");
            }
        }else{//无操作提示,直接请求
            _send();
        }

        function _mult_check(n){//多段提示及检测函数
            if(beforefn["fns"][n]){
                if(beforefn["fns"][n]["express"]){
                    btx_confirm(beforefn["fns"][n]["desc"], [function(){
                        exefn(beforefn["fns"][n]["success"], function(){_mult_check(n+1)});//调用自变量函数以递归
                        }
                    , function(){
                        exefn(beforefn["fns"][n]["error"], function(){_mult_check(n+1)});//调用自变量函数以递归
                    }])
                }else{//递归调用
                    _mult_check(n+1);
                }
            }else{
                _send();
            }
        }
        function _send(){//发送执行函数
            var post_datas = {}, _type;
            //封装POST提交数据
            if(form_data){
                if(form_data["post_datas"]){
                    post_datas = form_data["post_datas"];
                    _send_ajax();
                }else{
                    form_ele = _jquery(form_data);
                    if(is_dom(form_ele)){
                        //处理input数据
                        form_ele.find("input").each(function(){
                            _type = $(this).attr("type").toLowerCase();
                            if($(this).attr("name") && _type != "file"){//表单项必须拥有name属性(file除外)
                                if(_type == "radio" || _type == "checkbox"){//单选按钮|复选框,数据处理
                                    if(empty($(this).attr("checked"))) return;
                                }
                                post_datas[$(this).attr("name")] = $(this).val();
                            }
                        })
                        //处理textarea数据
                        form_ele.find("textarea").each(function(){
                            if($(this).attr("name")) post_datas[$(this).attr("name")] = $(this).val();
                        })
                        //处理select数据
                        form_ele.find("select").each(function(){
                            if($(this).attr("name")) post_datas[$(this).attr("name")] = $(this).val();
                        })
                        //构造表单提交验证项
                        if(_this.mk_check_send(form_ele, function(){_send_ajax()}) === false){
                            _send_ajax();
                        }
                    }else{
                        console.error("form_data设置有误,无法识别!");
                    }
                }
            }else{
                _send_ajax();
            }
            function _send_ajax(){//发送请求数据
                if(notice !== 0) btx_loading(notice);//notice为0则不启用操作进度加载提示
                $.ajax({
                    "url":url,
                    "type":"post",
                    "async":extra["async"],
                    "data":post_datas,
                    "complete":function(xhr, status){
                        var data = $.parseJSON(xhr.responseText);
                        if(status == "success"){
                            btx_loading(0);
                            if(data["error"]){
                                if(resultfn instanceof Array && resultfn.length == 2){
                                    resultfn[1](data["error_desc"]);//若存在,则执行请求失败回调
                                }else{
                                    btx_alert(data["error_desc"], "error");
                                }
                            }else{
                                _successfn(data);
                            }
                        }
                    }
                });
            }
            function _successfn(a){//响应回调函数
                //异步初始化数据列表
                if(clone_data["clone_name"]){
                    var _origin, _clone, _ani_style, _parent, _parent_tagname, _tmp_clone, _tmp_clone_ele, section_no_result_clone, _v;
                    _origin = $("[data-clone-section='btx_clone_section-"+ clone_data["clone_name"] +"']");
                    if(is_dom(_origin)){//根据json数据,循环创建dom对象
                        _parent = _origin.parent();
                        _parent_tagname = _parent[0].tagName.toLowerCase();
                        if(_parent_tagname != "ul" && _parent_tagname != "ol" && _parent_tagname != "dl" && _parent_tagname != "table") console.warn("data-clone-section父级建议使用ul、table等序列标签!");
                        _clone = _origin.children("[data-clone='btx_clone']").clone();
                        if(!is_dom(_clone)){
                            console.error("异步搜索未设置data-clone克隆源!");
                            return false;
                        }
                        //获取动画样式
                        _ani_style = match_class(_clone, "btx_ani_in", "after");
                        //无数据显示元素
                        section_no_result_clone = _parent.next("[data-no-result-clone='btx_no_result_clone']");
                        if(!is_dom(section_no_result_clone)) console.warn("未设置无结果显示模板!");
                        //框架元素指向修正
                        if(_parent_tagname == "table") _parent = _parent.children("tbody");
                        //模版数据处理
                        if(clone_data["type"] == "list"){//列表展示数据
                            //清空原始数据
                            _parent.children("[data-clone='btx_clone']").remove();
                            if(a["datas"] && a["datas"]["list"] instanceof Array){
                                if(a["datas"]["list"].length == 0){//0行数据返回
                                    Ani.reset(section_no_result_clone);
                                }else{//多行数据返回
                                    _deal_clone();
                                }
                            }
                        }else if(clone_data["type"] == "insert"){//插入数据
                            if(a["datas"] && a["datas"]["list"] instanceof Array){
                                _deal_clone();
                            }
                        }
                    }else{
                        console.error("未找到列表展示模板源!");
                        return false;
                    }
                }
                //执行回调函数
                if(resultfn instanceof Function){
                    resultfn(a["datas"]);
                }else if(resultfn instanceof Array){
                    resultfn[0](a["datas"]);
                }
                function _deal_clone(){
                    section_no_result_clone.hide(0);
                    Ani.clear(_clone, _ani_style);//移除预置动画样式
                    for(var i=0; i<a["datas"]["list"].length; i++){//循环创建是基于服务端L()返回datas["list"]数据集合
                        _tmp_clone = _clone.clone();
                        exefn(clone_data["success_fn"], a["datas"]["list"][i], _tmp_clone);//根据数据对dom体执行自定义函数
                        for(var j in a["datas"]["list"][i]){
                            _tmp_clone_ele = _tmp_clone.find("[data-clone='btx_clone-"+j+"']");
                            if(is_dom(_tmp_clone_ele)){
                                //初始化赋值
                                _v = a["datas"]["list"][i][j];
                                _v = _v == null?"":_v;
                                switch(_tmp_clone_ele[0].tagName.toLowerCase()){
                                    case "input":
                                        _tmp_clone_ele.val(_v);
                                        break;
                                    default:
                                        _tmp_clone_ele.text(_v);
                                }
                                if(_tmp_clone_ele.attr("data-cname")) _this.__set_cname__(_tmp_clone_ele);//应用别名
                            }
                        }
                        if(clone_data["type"] == "list"){//显示数据
                            _parent.append(_tmp_clone.css("visibility", "hidden"));
                        }else if(clone_data["type"] == "insert"){//插入数据
                            if(_parent.children("[data-clone='btx_clone']").size() > 0){
                                _parent.children("[data-clone='btx_clone']:eq(0)").before(_tmp_clone.css("opacity", 0));
                            }else{
                                _parent.append(_tmp_clone.css("opacity", 0));
                            }
                            //闪动效果(此处由于已使用Animation动画,有display:block效果,故无法再应用transition动画)
                            var t = setInterval(function(){
                                _tmp_clone.css("opacity", function(i, v){
                                    if(v < 1){
                                        v = parseFloat(v)+0.04;
                                        return v;
                                    }else{
                                        clearInterval(t);
                                        return 1;
                                    }
                                })
                            }, 40)
                        }
                        //递进式动画效果显示
                        _ani_style?Ani.ani(_tmp_clone, [_ani_style], 0+i*100):_tmp_clone.show(0).css("visibility", "visible");
                    }
                    //滚动组件重置
                    var _scroller;
                    if(is_dom(_scroller = _origin.parents("[data-scroller='btx_scroller']"))) _scroller.data("btxfns")["reset"]();
                }
            }
        }
    },

    //动画页组件执行
    /*
     * 配合属性：data-ani="btx_ani", data-ani-args="毫秒数(进入帧)-动画类名("btx_ani_"缺省)"
     * css动画执行方案基于animation类"btx_ani_classname"命名形式
     */
    /*"ani_page":function(ele){
        var _this = this, old_ani_dom, ani_dom = _jquery(ele), ani_args;
        //移除动画
        if(old_ani_dom = _this.anidata["ani_dom"]){
            var i = 0;
            old_ani_dom.find("[data-ani='btx_ani']").each(function(){
                Ani.ani($(this), null, _this.anidata["ani_class"][i]);
                i++;
            })
        }
        //添加动画
        _this.anidata["ani_dom"] = ani_dom;
        ani_dom.find("[data-ani='btx_ani']").each(function(){
            var _img = $(this);
            ani_args = $(this).attr("data-ani-args").split("-");
            var t = setTimeout(function(){
                Ani.ani(_img, ani_args[about_us]);
                clearTimeout(t);
            }, ani_args[0])
            _this.anidata["ani_t"].push(t);
            _this.anidata["ani_class"].push(ani_args[about_us]);
        })
    },*/

    //动画页组件移除
    /*"ani_page_off":function(){
        var _this = this, old_ani_dom;
        if(old_ani_dom = _this.anidata["ani_dom"]){
            var i = 0;
            old_ani_dom.find("[data-ani='btx_ani']").each(function(){
                Ani.ani($(this), null, _this.anidata["ani_class"][i]);
                i++;
            })
            _this.anidata["ani_dom"] = null;
        }
    },*/

    //堆栈封装函数
    /*
     * obj{"fn_name":function, ...} fns: 外接函数集合
     * 可“分段式”或“集中式”使用
     */
    "external":function(fns){
        for(var i in fns){
            this.external_fns[i] = fns[i];
        }
    },

    //创建option时间格式：20XX-X-X 通常用于预约时间选择
	"creatdateoption":function(selector,aftermonth,formate){
		var now = new Date()//获取当前时间
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var date = now.getDate();
		var timer=new Timer(), _formate, formate_arr=[], year_add, _month, month_count, n=-1, month_arr=[];
		_formate = formate || "y.m.d";//时间显示格式
		formate_arr = /y(.+?)m(.+?)d/ig.exec(_formate);
		if(!formate_arr) return "时间格式输入错误!";
		formate_arr.shift();
		//格式化预约时间的月份延期
		aftermonth = Math.abs(Number(aftermonth))
		aftermonth = aftermonth?Number(aftermonth):1;
		aftermonth = aftermonth>36?36:aftermonth;//最多预约3年时间
		month_count = aftermonth+month;
		if((month_count)%12 ==0)
		{
			year_add = Math.floor(month_count/12)-1;
			}
			else
			{
				year_add = Math.floor(month_count/12);
				}
		for(var k=0; k<=year_add; k++)
		{
			if(year_add == 0)
			{
				month_arr[0] = month_count;
				}
				else
				{
					if(k == year_add)
					{
						month_arr[k] = month_count%12;
						}
						else
						{
							month_arr[k] = 12;
							}
					}
			}
		//创建option
		for(var y=year; y<=year_add+year; y++)
		{
			timer.setyear(y);
			n++;
			for(var j = (y==year)?month:1; j<=month_arr[n]; j++)
			{
				timer.setmonth(j);
				for(var i = (j==month)?date:1;i<=timer.getdate();i++)
				{
					var option= $("<option>");
					option.text(y+formate_arr[0]+j+formate_arr[1]+i);
					$(selector).append(option);
					}
				}
			}
		},

    //创建option时间格式：年、月、日、小时、分钟、秒
	"creatdateoption2":function(selector,type,method,_unit){
		var _method, _unit=_unit?_unit:"", curyear, option, timer;
		if(!type) return false;
		switch(type)
		{
			case "y":
			curyear = new Date().getFullYear();
			if(method > curyear) return false;
			for(var i=method; i<curyear; i++)
			{
				option= $("<option>");
				option.text(i+_unit);
				$(selector).append(option);
				}
			return true;
			_method = 12;
			break;
			case "m":
			_method = 12;
			break;
			case "d":
			timer = new Timer();
			if(method instanceof Array && method.length == 2)
			{
				timer.setyear(method[0]);//method传参为数组形式array("year","month")
				timer.setmonth(method[1]);
				_method = timer.getdate();
				}
				else
				{
					_method = 1;
					}
			break;
			case "h":
			_method = method==12?12:24;
			break;
			case "i":
			case "s":
			_method = 60;
			break;
			}
		operate();
		function operate()
		{
			var i;
			if(type == "m" || type == "d")
			{
				i=1;
				_method++;
				}
				else
				{
					i=0;
					}
			for(i;i<_method; i++)
			{
				option= $("<option>");
				option.text(i+_unit);
				$(selector).append(option);
				}
			}
		},

    //设置一键置顶按钮（依靠特定属性data-role="gotop")
	"gotop":function(useease){
		var gotop = $(document).find("[data-role='gotop']");
		if(useease)//使用缓动特效
		{

			}
			else
			{
				gotop.click(function(){
					document.body.scrollTop = 0;
					})
				}
		},

    //创建按钮列表对象
	"btnlist":function(btnlist,outer){
		return new BtnList(btnlist,outer);
		},

    /*-------------------------------------------------------------------------------------------------------------*/

	/*组件函数*/

    //#单页面内部定位,区块激活效果
    /*
     * ele_init: none
     * event_init: none
     * external: none
     * media: All
     * 配合属性：data-section="btx_section"
     * style: button.css
     * 支持:
     * 使用:
     */
    "btx_section":function(tolerance){
        var section_arr = {"section":[], "top":[], "cur_section":{}};

        this.__init__("data-section", function(){
            section_arr["section"].push($(this));
            section_arr["top"].push(Math.round($(this).offset().top));
        })

        /*滚动监听*/
        /*$(window).scroll(function(){
            console.log($(this).scrollTop())
            console.log(section_arr["top"][0])
            for(var i= 0, ss = section_arr["section"], st = section_arr["top"]; i<ss.length; i++){
                if($(this).scrollTop() >= st[i] - (tolerance || 140)){
                    section_arr["cur_section"] = ss[i];
                }else{
                    break;
                }
                ss[i].hasClass("section_out") || ss[i].addClass("section_out");//初始化冻结
                if($(this).scrollTop() >= st[i]){

                }
            }
            //section_arr["cur_section"].hasClass("section_in") || section_arr["cur_section"].addClass("section_in");//激活效果
            //console.log(section_arr["cur_section"].attr("id"));
        })*/

    },

    //按钮样式绑定触控事件
    /*
     * ele_init: none
     * event_init: self、target
     * external: enable, disable | data-btn-callback
     * media: All
     * 配合属性：data-btn="btx_btn-flag"(flag默认缺省,用于确定按钮对象获取模式,可选), data-btn="yes"(上下文形式按钮子项,可选), data-btn-callback="自定义函数"(可选), data-btn-name="按钮名"(可选), data-btn-open-pannel="IDselector-zindex"(可不包含"zindex",默认40,可选), data-btn-close-pannel="IDselector"(可选), data-btn-tab="IDselector"(切换标签按钮,可选), data-pannel-name="btx_pannel-data_btn_name"(切换标签面板,可选), data-btn-disable="yes"(按钮禁用,可选)
     * 【style】:
     *  1. button.css
     *  2. .disable: 按钮禁用
     *  3. .down: 按钮按下
     *  4. .show: pannel面板显现效果。需自定义
     *  5. .close: pannel面板关闭按钮。含预设,可自定义
     * 支持: 点击tab面板切换效果
     * 【支持】:
     *  1. 按钮禁用;
     *  2. 同名(data-btn-name)按钮组点压状态切换效果;
     *  3. 点击外接函数;
     *  4. 开关显示浮动面板,可传递外接函数(data-btn-callback(btn))操控权限;
     * 【使用】:
     *  1. 存在两种按钮模式: 快捷模式（btx_btn-d）、标准模式(btx_btn)
     *      1-1. 快捷模式不支持动态创建,但判断更迅速
     *      1-2. 标准模式支持动态创建,响应时间相对较慢
     *      1-3. 标准模式下又存在三种使用场景: 纯按钮场景、复合按钮场景、列表项场景
     *          1-3-1. 纯按钮场景（data-btn=btx_btn）仅限绑定button、inp:button、inp:submit、a元素;
     *          1-3-2. 复合按钮场景（data-btn=btx_btn）纯按钮元素当中包含其它子元素;
     *          1-3-3. 纯按钮场景（data-btn=yes）可用于绑定非按钮元素,常用于列表项;
     *  2. data-btn-open-pannel="IDselector-zindex",可设置浮动面板z轴深度,默认40;
     */
    "btx_btn":function(){
        var pannel_id, pannel_index, tab_name, scroller, fn_args;

        /*初始化*/
        if(location.href.search("#") > 0) _button_press.call($("[data-btn-tab='"+ location.href.substr(location.href.search("#")+1) +"']"));//url"#"参数设置初始化开启面板
        this.__init__("data-btn", function(){
            //tab_pannel初始化,按下按钮(拥有"button_n_down\down"类样式)会影响显示面板("tab_pannel")
            if(like_class($(this), "_down", "before") && $(this).attr("data-btn-tab")){
                $("#"+$(this).attr("data-btn-tab")).show(0);
            }
            //禁用初始化
            var btn = $(this);
            if(btn.attr("data-btn-disable") == "yes" && btn[0].tagName.toLowerCase() == "button"){
                _disable_style(btn);
            }
            //绑定外接内部函数
            $(this).data("btxfns", {
                "enable":function(){//按钮启用
                    btn.removeAttr("data-btn-disable");
                    _enable_style(btn);
                },
                "disable":function(){//按钮禁用
                    btn.attr("data-btn-disable", "yes");
                    _disable_style(btn);
                }
            })
        })

        /*点击效果*/
        this.__init__("$data-btn", function(init, flag, target, e){
            this.callback = $(this).attr("data-btn-callback");
            target = flag?$(this):_mk_btn(target);//模式确定(快捷模式、标准模式)
            if(target){
                if(target.attr("type") != "submit" && target[0].tagName.toLowerCase() != "a"){//超链接、提交表单按钮默认行为不禁用
                    e.preventDefault();//防止默认表单提交
                }
                if(target.attr("data-btn-disable") == "yes") return false;//按钮禁用
                tab_name = target.attr("data-btn-name");
                fn_args = {"name":(tab_name || ""), "cont":target.text(), "self":target};
                _button_press.call(target);//同名按钮组点压状态切换效果,同名按钮应设置相同button样式

                /*浮动面板控制*/
                if(pannel_id = ($(this).attr("data-btn-open-pannel") && $(this).attr("data-btn-open-pannel").split("-"))){//开启
                    pannel_index = pannel_id.length == 2?pannel_id[1]:40;
                    pannel_id = pannel_id[0];
                    empty(this.callback)?_open_pannel():fn_args["open"] = _open_pannel;//直接开启 or "开启面板"外接函数权限
                }else if(pannel_id = $(this).attr("data-btn-close-pannel")){//关闭
                    if(empty(this.callback)){//直接关闭
                        _close_pannel();
                    }else{//"关闭面板"外接函数权限
                        fn_args["close"] = _close_pannel;
                    }
                }

                /*tab面板切换效果*/
                if(target.attr("data-btn-tab") && tab_name){
                    if(empty(this.callback)){//直接切换
                        _toggle.call(target);
                    }else{//"切换函数"传递外接函数
                        fn_args["toggle"] = function(){_toggle.call(target)};
                    }
                }
                init.__external__(this.callback)(fn_args);//fn_args:{"name"(按钮名,可为空), "cont"(按钮内容,可为空), "self"(按钮dom), "open()"(开启面板函数), "close()"(关闭面板函数), "toggle"(切换面板函数)}
            }
        }, this.click)

        //点击按钮对象修正,标准模式
        function _mk_btn(ele){
            if(ele.attr("data-btn") == "yes" || _is_btx_btn(ele)){//点击纯按钮
                return ele;
            }else if(is_dom(ele.parents("[data-btn='yes']"))){//点击列表项
                return ele.parents("[data-btn='yes']");
            }else if(is_dom(ele.parents("[data-btn='btx_btn']")) && _is_btx_btn(ele)){//点击复合按钮
                return ele.parents("[data-btn='btx_btn']");
            }else{
                return false;
            }
        }
        //禁用样式
        function _disable_style(ele){
            if(!ele.hasClass("down")) ele.addClass("disable");//"按下"按钮无法禁用
        }
        //启用样式
        function _enable_style(ele){
            ele.removeClass("disable");
        }
        //开启面板函数
        function _open_pannel(){
            $("#"+pannel_id).css("z-index", pannel_index).addClass("show");//显现面板,支持z轴定位
            if(is_dom(scroller = $("#"+pannel_id).find("[data-scroller='btx_scroller']"))) scroller.data("btxfns")["reset"]();//滚动条重置
        }
        //关闭面板函数
        function _close_pannel(){
            $("#"+pannel_id).removeClass("show");
        }
        //切换面板
        function _toggle(){
            //同名面板恢复(需设置data-btn-name),当前面板显示
            pannel_id = this.attr("data-btn-tab");
            $("[data-pannel-name='btx_pannel-" + tab_name + "']").css("display", "none");
            //防止生硬跳转
            window.scrollTo(0, 0);//页面置顶
            $("#"+pannel_id).css("display", "block");
            if(is_dom(scroller = $("#"+pannel_id).find("[data-scroller='btx_scroller']"))) scroller.data("btxfns")["reset"]();//滚动条重置
            /*var t = setTimeout(function(){
                clearTimeout(t);
                window.scrollTo(0, 0);//页面置顶
                $("#"+pannel_id).css("display", "block");
                if(is_dom(scroller = $("#"+pannel_id).find("[data-scroller='btx_scroller']"))) scroller.data("btxfns")["reset"]();//滚动条重置
            }, 400);*/
        }
        //按钮按下效果
        function _button_press(){
            //同名按钮恢复(需设置data-btn-name),当前按钮按下
            if(tab_name = this.attr("data-btn-name")){
                $("[data-btn-name='" + tab_name + "']").removeClass("down");
                this.addClass("down");
            }
        }
        //判断是否为btx_btn
        function _is_btx_btn(ele){
            return (ele.attr("data-btn") == "btx_btn" && (ele[0].tagName.toLowerCase() == "button" || ele[0].tagName.toLowerCase() == "a" || ele.attr("type") == "submit" || ele.attr("type") == "button"))
        }
    },

    //实现自定义滚动条添加
    /*
     * ele_init: each
     * event_init: none
     * external: reset
     * media: pc
     * 配合属性: data-scroller="btx_scroller"
     * 【使用】:
     *  1. 作用于定高（不包含padding宽度）外框内,应用元素本身无需设置css样式
     *  2. 仅限应用于div、section等标准布局元素,切勿作用于table之类非标准布局类元素
     */
    "btx_scroller":function(areawidth, speed){
        this.__init__("data-scroller", function(){
            $(this).data("btx_scroller", new Scroller(this, areawidth, speed));
            var self = $(this);
            $(this).data("btxfns", {
                "reset":function(){
                    self.data("btx_scroller").reset();//特殊处理:滚动条重置
                    if(is_dom(fixed_thead = self.find("[data-fixed-thead='btx_fixed_thead']"))) fixed_thead.data("btxfns")["reset"]();//特殊处理:重置表格固定头宽度
                }
            });
        }, null, "pc");
    },

    //实现表格滚动,标题固定定位效果
    /*
     * ele_init: each
     * event_init: none
     * external: reset
     * media: pc
     * 配合属性: data-fixed-thead="btx_fixed_thead"
     * 使用: 常同data-scroller="btx_scroller"联用
     */
    "btx_fixed_thead":function(){
        var insert_pos, _tr;
        this.__init__("data-fixed-thead", function(){
            //均分单元格宽度
            var _new_table;
            if($(this)[0].tagName.toLowerCase() != "table") return false;//仅限于table标签
            $(this).find("tr:first td").css("width", (100/$(this).find("tr:first td").size())+"%");
            insert_pos = $(this).parents("[data-scroller='btx_scroller']");
            if(insert_pos.size()!=0){ //当其外部拥有data-scroller='btx_scroller'包裹时执行
                //创建并插入新table
                _new_table = $("<table></table>");
                _tr = $(this).find("tr").eq(0);
                _new_table.css({"position":"absolute", "width":$(this).outerWidth(), "z-index":2}).attr("class", $(this).attr("class")).append(_tr.clone());
                _tr.css({"border":"none", "box-shadow":"none"});
                insert_pos.before(_new_table);
            }
            //外接内部方法
            var self = $(this);
            $(this).data("btxfns", {
                "reset":function(){//重置新建表格宽度
                    if(_new_table) _new_table.width(self.outerWidth());
                }
            })
        }, null, "pc")
    },

	//表单控件扩充-地理位置下拉列表数据填充
	/*
	配合属性：data-location="btx_country / btx_province / btx_city", data-location-name="分组名称"(数据分组名), data-location-default="默认数据"（可选）
	* 国家/省份/市区表单控件允许拆分使用：国家、省份、省份+市区、国家+省份+市区
	*/
	"btx_addr_pad":function(){
		//优先判断是否存在该对象
		if($("[data-location]").size() == 0) return false;
		//初始化数据
        var country_ele, province_ele, city_ele;
        var nodata = ["--可不选--"];
        var country = ["中国","阿根廷","澳大利亚","比利时","玻利维亚","巴西","白俄罗斯","加拿大","智利","哥伦比亚","哥斯达黎加","古巴","捷克斯洛伐克","丹麦","多米尼加","厄瓜多尔","埃及","萨尔瓦多","埃塞俄比亚","法国","希腊","危地马拉","海地","洪都拉斯","印度","伊朗","伊拉克","黎巴嫩","利比里亚","卢森堡","墨西哥","荷兰","新西兰","尼加拉瓜","挪威","巴拿马","巴拉圭","秘鲁","菲律宾","波兰","俄罗斯联邦","沙特阿拉伯","南非","阿拉伯叙利亚共和国","土耳其","乌克兰","北爱尔兰","美国","乌拉圭","委内瑞拉","南斯拉夫","阿富汗","冰岛","瑞典","泰国","巴基斯坦","也门","缅甸","以色列","印度尼西亚","阿尔巴尼亚","澳地利","保加利亚","柬埔寨","芬兰","匈牙利","爱尔兰","意大利","约旦","老挝人民民主共和国","罗马利亚","西班牙","斯里兰卡","阿拉伯利比亚民众国","尼泊尔","葡萄牙","日本","摩洛哥","苏丹","突尼斯","加纳","马来西亚","几内亚","贝宁","布基纳法索","喀麦隆","中非","乍得","刚果","科特迪瓦","塞浦路斯","加蓬","马达加斯加","马里","尼日尔","尼日利亚","塞内加尔","索马里","多哥","刚果","毛里塔尼亚","蒙古","塞拉利昂","坦桑尼亚","阿尔及利亚","布隆迪","牙买加","卢旺达","特立尼达和多巴哥","乌干达","肯尼亚","科威特","马拉维","马耳他","赞比亚","冈比亚","马尔代夫","新加坡","巴巴多斯","博茨瓦纳","圭亚那","莱索托","民主也门","赤道几内亚","毛里求斯","斯威士兰","斐济","巴林","不丹","阿曼","卡塔尔","阿拉伯","巴哈马","德意志联邦共和国","德意志民主共和国","孟加拉国","格林纳达","几内亚比绍","佛得角","科摩罗","莫桑比克","巴布亚新几内亚","所罗门群岛","苏里南","安哥拉","萨摩亚","塞舌尔","吉布提","越南","圣卢西亚","津巴布韦","安提瓜和巴布达","伯利兹","瓦努阿图","圣基茨和尼维斯","文莱达鲁萨兰国","列支敦士登","纳米比亚","朝鲜","爱沙尼亚","密克罗尼西亚联邦","拉脱维亚","立陶宛","马绍尔群岛","韩国","亚美尼亚","阿塞拜疆","克罗地亚","格鲁吉亚","哈萨克斯坦","吉尔吉斯","摩尔多瓦","斯洛文尼亚","塔吉克斯坦","土库曼斯坦","乌兹别克斯坦","安道尔","捷克","厄立特里亚","摩纳哥","斯洛伐克共和国","帕劳","基里巴斯","瑙鲁","汤加","图瓦卢","南斯拉夫","瑞士","东帝汶"];
		var province = ["北京市","天津市","上海市","重庆市","河北省","河南省","云南省","辽宁省","黑龙江省","湖南省","安徽省","山东省","新疆维吾尔","江苏省","浙江省","江西省","湖北省","广西壮族","甘肃省","山西省","内蒙古","陕西省","吉林省","福建省","贵州省","广东省","青海省","西藏","四川省","宁夏回族","海南省","台湾","香港","澳门"];
		var city = {
            "河北省":["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","廊坊市","衡水市","沧州市"],
            "河南省":["郑州市","开封市","洛阳市","平顶山市","焦作市","鹤壁市","新乡市","安阳市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市","济源市"],
            "云南省":["昆明市","曲靖市","玉溪市","保山市","昭通市","思茅","临沧","丽江","文山州","红河州","西双版纳州","楚雄州","大理州","德宏州","怒江州","迪庆州"],
            "辽宁省":["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","盘锦市","阜新市","辽阳市","铁岭市","朝阳市"],
            "黑龙江省":["哈尔滨市","齐齐哈尔市","鹤岗市","双鸭山市","伊春市","牡丹江市","七台河市","黑河市","绥化市","木斯市","鸡西市","大庆市"],
            "湖南省":["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西州"],
            "安徽省":["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","巢湖市","六安市","毫州市","池州市","宣城市"],
            "山东省":["济南市","青岛市","淄博市","枣庄市","东营市","潍坊市","烟台市","威海市","济宁市","泰安市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市"],
            "新疆维吾尔":["乌鲁木齐市","克拉玛依市","石河子市","阿拉尔市","图木舒克市","五家渠市","吐鲁番","哈密","和田","阿克苏","喀什","克孜勒苏州","巴音郭楞州","昌吉州","博尔塔拉州","伊犁州","塔城","阿勒泰州"],
            "江苏省":["南京市","徐州市","连云港市","淮安市","宿迁市","盐城市","扬州市","泰州市","南通市","镇江市","常州市","无锡市","苏州市"],
            "浙江省":["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市"],
            "江西省":["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市"],
            "湖北省":["武汉市","黄石市","襄樊市","十堰市","荆州市","宜昌市","荆门市","鄂州市","孝感市","黄冈市","咸宁市","随州市","恩施州","仙桃市","天门市","潜江市"],
            "广西壮族":["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市"],
            "甘肃省":["兰州市","金昌市","白银市","天水市","嘉峪关市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西地区","陇南地区","甘南州","临夏回族自治州"],
            "山西省":["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市"],
            "内蒙古":["呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","乌兰察布盟","锡林郭勒盟","巴彦淖尔盟","阿拉善盟","兴安盟"],
            "陕西省":["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市"],
            "吉林省":["长春市","吉林市","四平市","通化市","辽源市","白山市","松原市","白城市","延吉市","图们市","敦化市","珲春市","龙井市","大安市","洮南市","临江市","集安市","梅河口市","双辽市","公主岭市","磐石市","舒兰市","桦甸市","蛟河市","榆树市","九台市","德惠市"],
            "福建省":["福州市","厦门市","三明市","莆田市","泉州市","漳州市","南平市","龙岩市","宁德市"],
            "贵州省":["贵阳市","六盘水市","遵义市","安顺市","铜仁","毕节","黔西南州","黔东南州","黔南州"],
            "广东省":["广州市","深圳市","珠海市","汕头市","韶关市","河源市","梅州市","汕尾市","东莞市","中山市","江门市","佛山市","阳江市","湛江市","茂名市","肇庆市","清远市","潮州市","揭阳市","云浮市"],
            "青海省":["西宁市","海东","海北州","海南州","果洛州","玉树州","海西州"],
            "西藏":["拉萨市","那曲","昌都","山南","日喀则","阿里","林芝"],
            "四川省":["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","宜宾市","广安市","达州市","眉山市","雅安市","巴中市","资阳市","阿坝州","甘孜州","凉山州"],
            "宁夏回族":["银川市","石嘴山市","吴忠市","固原市"],
            "海南省":["海口市","三亚市","琼山市","文昌市","琼海市","万宁市","五指山市","东方市","儋州市"]
        };
        $("[data-location]").each(function() {
            switch ($(this).attr("data-location")) {
                case "btx_country":
                    paddata(this, 1);
                    break;
                case "btx_province":
                    resetprovince($(this).attr("data-location-name"));
                    break;
                case "btx_city":
                    resetcity($(this).attr("data-location-name"));
            }
        })
		//事件驱动
        $("[data-location]").change(function(){
            if($(this).attr("data-location") == 'btx_country'){//设置省份及市区
                resetprovince($(this).attr("data-location-name"));
                resetcity($(this).attr("data-location-name"));
            }
            else if($(this).attr("data-location") == 'btx_province'){//设置市区
                resetcity($(this).attr("data-location-name"));
            }
        })
		//内建函数
        function resetprovince(name){
            province_ele = $("[data-location-name='"+name+"']").filter("[data-location='btx_province']");
            country_ele = $("[data-location-name='"+name+"']").filter("[data-location='btx_country']");
            if((province_ele && country_ele.val() == "中国") || country_ele[0] == undefined){
                paddata(province_ele, 2);
            }
            else{
                paddata(province_ele, 4);
            }
        }
        function resetcity(name){
            city_ele = $("[data-location-name='"+name+"']").filter("[data-location='btx_city']");
            province_ele = $("[data-location-name='"+name+"']").filter("[data-location='btx_province']");
            if(city_ele && province_ele[0] != undefined && province_ele.val() != "--可不选--" && province_ele.val() != "香港" && province_ele.val() != "台湾" && province_ele.val() != "澳门" && province_ele.val() != "北京市" && province_ele.val() != "天津市" && province_ele.val() != "上海市" && province_ele.val() != "重庆市"){
                paddata(city_ele, 3, province_ele.val());
            }
            else{
                paddata(city_ele, 4);
            }
        }
		function paddata(_this, type, provinceval){//追加下拉列表
			switch(type){
                case 1://设置国家
                    pad.call(_this, country);
                    break;
                case 2://设置省
                    pad.call(_this, province);
                    break;
                case 3://设置市
                    pad.call(_this, city[provinceval]);
                    break;
                case 4://数据可不选
                    pad.call(_this, nodata);
            }
			}
        function pad(dataarr){
            $(this).empty();
            for(var i=0; i<dataarr.length; i++)
            {
                if($(this).attr("data-location-default") == dataarr[i])
                {
                    $(this).append("<option selected>"+dataarr[i]+"</option>");
                }
                else
                {
                    $(this).append("<option>"+dataarr[i]+"</option>");
                }
            }
        }
		},

	//表单控件扩充-时间选择器
	/*
	配合属性：data-timepicker="btx_timepicker", data-timepicker-year="before/after"(可设置当前年年份之前或之后年份（默认）时间,可选)
	* format可选设置：year、month、date、hour、minute、second（或无值）,表示时间显示精度；
	*/
	"btx_timepicker":function(format){
		//优先判断是否存在该对象
        //this.__formplugin__("[data-timepicker='btx_timepicker']", new TimePicker(format, ($(this).attr("data-timepicker-year") || "after"), $(this)));
		},

    //表单控件扩充-金额选择器
    /*
     配合属性：data-pricepicker="btx_pricepicker"
     */
    "btx_pricepicker":function(){
        //优先判断是否存在该对象
        if($("[data-pricepicker='btx_pricepicker']").size() == 0) return false;
        var pricepicker = new PricePicker(), _v;
        $("[data-pricepicker='btx_pricepicker']").each(function(){
            $(this).attr("readonly", "readonly").css("cursor","pointer");
        }).on("click", function(){
            pricepicker.toast_show();
            pricepicker.connect_dom($(this), function(_this){
                _v = $(_this).val().replace(".", "").replace(/^0+/g, "");
                pricepicker.price = _v;
                pricepicker.__mk_price__();
            });
        })
    },

    //表单控件扩充-自定义复选框
    /*
     * ele_init: each
     * event_init: Static | self
     * external: data-ckb-select-callback | select
     * media: All
     * 配合属性:data-checkbox="btx_checkbox", data-ckb-select-callback="自定义函数名"(勾选外接函数,勾选传参1,取消勾选传参0,可选), data-ckb-btn="btx_ckb_btn"(自动生成), data-ckb-name(自动生成), data-ckb-checked(自动生成);
     * 使用: 默认为inline-block,定宽;
     * 支持: 可单独使用,用作勾选toggle按钮(通常用于处理前端操作,请勿用于服务端请求,以免影响用户体验);
     *
     * 支持: 按钮附件:
     * ele_init: none
     * event_init: Dynamic | self
     * external: none
     * media: All
     * 配合属性:data-ckb-sel="btx_ckb_sel-all\allnot\reverse"(操作方式:全选、全不选、反选)
     * 使用: 需要设置name属性以对应操作复选框组
     */
    "btx_checkbox":function(){
        this.__init__("data-checkbox", function(init){
            if(this.type != "checkbox") return false; //dom本身必须为input:checkbox
            if(empty($(this).attr("name"))){
                console.error("复选框name尚未设置!");
                return false;
            }
            var ckbox_span = $("<span data-ckb-btn='btx_ckb_btn'></span>").addClass("btx_basic_inp").attr("data-ckb-name", rtrim($(this).attr("name"), "[]"));
            $(this).before(ckbox_span).attr("name", rtrim($(this).attr("name"), "[]")+"[]");//重置复选框name属性
            ckbox_span.data("checkbox", $(this));
            //外接内部函数
            $(this).data("btxfns", {
                "select":function(arg, initfn){
                    if(arg == 1){//开启
                        if(!ckbox_span.attr("data-ckb-checked")){
                            ckbox_span.data("checkbox").click();
                            _select.call(init, ckbox_span, initfn);
                        }
                    }else{//关闭
                        if(ckbox_span.attr("data-ckb-checked")){
                            ckbox_span.data("checkbox").click();
                            _unselect.call(init, ckbox_span, initfn);
                        }
                    }
                }
            })
            //初始化,默认样式设置
            if($(this).attr("checked")){
                _select.call(init, ckbox_span);
            }else{
                _unselect.call(init, ckbox_span);
            }
        })
        //虚拟按钮绑定点击事件
        this.__init__("$data-ckb-btn", function(init, a, target, e){
            e.preventDefault();
            $(this).data("checkbox").click()
            if($(this).attr("data-ckb-checked")){
                _unselect.call(init, $(this))
            }else{
                _select.call(init, $(this))
            }
        }, "click")
        //按钮操、全不选、反选
        this.__init__("data-ckb-sel", function(init, flag){
            $("[data-ckb-name='" + $(this).attr("name") + "']").each(function(){
                switch(flag){
                    case "all"://全选按钮操作
                        if(empty($(this).attr("data-ckb-checked"))){
                            _select.call(init, $(this));
                            $(this).data("checkbox").click();
                        }
                        break;
                    case "allnot"://全不选按钮操作
                        if(!empty($(this).attr("data-ckb-checked"))){
                            _unselect.call(init, $(this));
                        }
                        break;
                    case "reverse"://反选按钮操作
                        if(empty($(this).attr("data-ckb-checked"))){
                            _select.call(init, $(this));
                            $(this).data("checkbox").click();
                        }else{
                            _unselect.call(init, $(this));
                        }
                }
            })
        }, "click")
        function _select(ele, initfn){//按钮选中
            ele.removeClass("btx_unchecked").addClass("btx_ckb_checked icon-checkmark").attr("data-ckb-checked", true);
            ele.data("checkbox").attr("checked", true);
            //外接函数
            if(initfn instanceof Function){//外部函数-勾选初始化
                initfn();
            }else{//外部函数-勾选切换
                this.__external__(ele.data("checkbox").attr("data-ckb-select-callback"))(1);
            }
        }
        function _unselect(ele, initfn){//按钮未选中
            ele.removeClass("btx_ckb_checked icon-checkmark").addClass("btx_unchecked").removeAttr("data-ckb-checked");
            ele.data("checkbox").removeAttr("checked");
            //外接函数
            if(initfn instanceof Function){//外部函数-勾选初始化
                initfn();
            }else{//外部函数-勾选切换
                this.__external__(ele.data("checkbox").attr("data-ckb-select-callback"))(-1);
            }
        }
    },

    //表单控件扩充-自定义单选按钮
    /*
     * ele_init: each
     * event_init: Static | self
     * external: data-radio-select-callback | select
     * media: All
     * 配合属性：data-radio="btx_radio", data-radio-select-callback="自定义函数名"(可选), data-radio-btn="btx_radio_btn"(自动生成), data-radio-name="name"(自动生成), data-radio-val="value"(自动生成)
     * 使用: 默认为inline-block,定宽;
     * 使用: 单选按钮的data-radio-select-callback应用于具有相同data-radio-name属性的单选按钮组,其中的data-radio-val将作为外接函数的自变量
     */
    "btx_radio":function(){
        var callback_arr={}, tmp_fn;
        this.__init__("data-radio", function(init){
            if($(this).attr("type") == "radio"){ //dom本身必须为input:radio
                var radio_span = $("<span data-radio-btn='btx_radio_btn'></span>").addClass("btx_basic_inp btx_unchecked").css("border-radius", "20px").attr({"data-radio-name":$(this).attr("name"), "data-radio-val":$(this).val(), "data-radio-select-callback":$(this).attr("data-radio-select-callback")});
                $(this).before(radio_span);
                radio_span.data("radio", $(this));//radio关联
                if(this.checked) _select(radio_span); //默认样式设置
                //外接内部函数
                $(this).data("btxfns", {
                    "select":function(){
                        _select(radio_span);
                    }
                })
                //启用同组（拥有相同data-radio-name）单选按钮的点击功能
                tmp_fn = $(this).attr("data-radio-select-callback");
                if(!empty(tmp_fn)) callback_arr[$(this).attr("name")] = tmp_fn;
            }
        })
        //虚拟按钮绑定点击事件
        this.__init__("$data-radio-btn", function(init, a, target, e){
            e.preventDefault();
            _select($(this));
            init.__external__(callback_arr[$(this).attr("data-radio-name")])($(this).attr("data-radio-val"));//外接函数
        }, "click")
        function _select(ele){//按钮选中
            $("[data-radio-name='"+ ele.attr("data-radio-name") +"']").removeClass("btx_radio_checked").addClass("btx_unchecked");
            ele.removeClass("btx_unchecked").addClass("btx_radio_checked");
            $(":radio").filter("[name='" + ele.attr("data-radio-name") + "']").removeAttr("checked");
            ele.data("radio").attr("checked", true).click();
        }
    },

    //表单控件扩充-自定义下拉列表选择器
    /*
     * ele_init: each
     * event_init: none | native
     * external: data-select-callback | init
     * media: All
     * 配合属性:data-select="btx_select", data-select-callback="自定义函数名", data-select-value="value_str"（option初始化数据值,可选）, data-select-text="text_str"（option初始化数据内容,可选）
     * style: select.css
     * 标准结构:
     * <p>-<span>&<select>-<option> (span用作标注前缀,可缺省;option不可缺省,无值时请设置为<option/>)
     * 支持: 类似单选按钮组的tab切换函数效果
     * 支持: 同步初始化数据缺省值
     * 支持: 异步初始化数据填充及数据缺省值
     * 使用: 初始化数据缺省值可通过4种方式实现: 缺省值、selected属性、data-select-value属性、data-select-text属性
     * 使用: 默认为inline-block,宽度自适应
     */
    "btx_select":function(){
        var _select, texts_d, values_d;
        //组件构造
        this.__init__("data-select", function(init){
            _select = $(this).children("select")[0];
            var _small = $("<small></small>"), self = $(this);
            //数据初始化
            _init.call(_small, _select, {"text":$(this).attr("data-select-text") ,"value":$(this).attr("data-select-value")});
            //组件初始化,支持<span>标注前缀
            if(is_dom($(this).children("span"))){
                $(this).children("span").append(_small);
            }else{
                $(this).prepend($("<span>").append(_small.css("margin-left", 0)));
            }
            if(!like_class($(this), "select_", "after")) $(this).children("span").css("padding-left", 0);//样式修正
            //事件绑定
            $(_select).on("change", function(){
                _small.text(this.options[this.selectedIndex].text);
                init.__external__(self.attr("data-select-callback"))($(this).val());
            })
            //外接函数绑定
            var self = $(this);
            $(this).data("btxfns", {
                //datas数据格式:{"text":text_arr, ["value":value_arr]}
                //default_data数据格式:{["text":text_str], ["value":value_str]}
                "init":function(datas, default_data){
                    //灌数据
                    texts_d = datas["text"];
                    values_d = datas["value"] || datas["text"];
                    _select = self.find("select");
                    _select.empty();
                    for(var i=0; i<texts_d.length; i++){
                        _select.append($("<option value='"+ values_d[i] +"'>"+ texts_d[i] +"</option>"));
                    }
                    //数据初始化
                    _init.call(_small, _select[0], default_data);
                }
            })
        })
        //数据初始化
        //default_data数据格式:{["text":text_str], ["value":value_str]}
        var t, v, option;
        function _init(select, default_data){
            if(default_data && (v = default_data["value"])){//基于option值取默认值
                select.value = v;
                for(var i=0; i<select.options.length; i++){
                    if(select.options[i].value == v) this.text(select.options[i].text);
                }
            }else if(default_data && (t = default_data["text"])){//基于option内容取默认值
                this.text(t);
                for(var i=0; i<select.options.length; i++){
                    if(select.options[i].text == t) select.value = select.options[i].value;
                }
            }else{//基于<option selected>或首个option取默认值
                option = select.options[(select.selectedIndex?select.selectedIndex:0)];
                select.value = option.value;
                this.text(option.text);
            }
        }
    },

    //表单控件扩充-自定义表单输入器
    /*
     * ele_init: each
     * event_init: none
     * external: none
     * media: All
     * 配合属性:data-input="btx_input", data-input-width="width"(输入框宽度,默认100%,支持百分比值、定值,可选), data-input-mult="yes"(多行文本输入及显示,可选), data-input-p="btx_input_p"(自动生成), data-input-time="btx_input_time"(时间选择器组件,可选), data-input-time-format="year/month/day/hour/minute/second"(时间选择器格式,可选)
     * 【style】:
     *  1. .input_custom;
     * 【支持】:
     *  1. 多行文本输入及显示,且支持字符上限控制
     * 【使用】:
     *  1. 默认为block,100%宽;设置有data-input-width则为inline-block,定宽
     * 【标准结构】:
     *  <span>
     *      <input />
     *  </span>
     *
     * 多行文本输入:
     * ele_init: each
     * event_init: Static | self
     * external: none
     * media: All
     */
    "btx_input":function(){
        //数据初始化处理
        var use_input_css, _input, _width, input_p, time_format;
        this.__init__("data-input", function(){
            _input = $(this).children("input");
            if(_width = $(this).attr("data-input-width")) $(this).width(_width).css({"position":"relative", "display":"inline-block", "margin":"0 0.4rem"});//定宽组件
            use_input_css = like_class(_input, "input_", "after");//无input.css样式选择设置
            if(!use_input_css){
                $(this).css("margin", 0);
                _input.css("padding", 0);
            }
            //多行文本显示
            if($(this).attr("data-input-mult") == "yes"){
                //隐藏input改用contenteditable="true"方案
                _input.hide(0);
                input_p = $("<p data-input-p='btx_input_p'></p>");
                $(this).prepend(input_p.attr("contenteditable", true).css({"text-overflow":"clip", "white-space":"pre-wrap", "font-size":"about_us.3rem"}).text(_input.val()));
                if(use_input_css) input_p.css("padding", "1rem");
            }
            //初始化扩展组件
            if($(this).attr("data-input-time") == "btx_input_time"){
                time_format = $(this).attr("data-input-time-format") || "year";
                _input.attr("readonly", "readonly").css("cursor","pointer").data("time_picker", new TimePicker(time_format));
            }
        })
        //时间选择器组件操作
        this.__init__("data-input-time")
        //多行文本输入
        var _str, max_limit;
        this.__init__("$data-input-p", function(){
            //字符上限控制
            _str = $(this).text();
            max_limit = $(this).next("input").attr("maxlength");
            if(_str.length > max_limit) $(this).text(_str.substr(0, max_limit));
            //添加表单输入文本
            $(this).next("input").val($(this).text()).change();
        }, "blur")
    },

    //异步搜索控件
    /*
     * ele_init: each
     * event_init: Static | target
     * external: data-search-callback
     * media: All
     * 配合属性: 伪form: data-search="btx_search", data-search-action="cgi脚本定位", data-search-clone-section="clone_section_name"搜索结果显示依赖于data-clone-section组件, data-clone-section="btx_clone_section-自定义名", data-clone="btx_clone"(列表项标识), data-clone="btx_clone-对应数据键名", data-no-result-clone="btx_no_result_clone", data-search-notice="搜索提示(可选)", data-search-callback="callback"外接函数(可选), data-search-btn="yes"(自动创建) | 搜索组件: data-search-wid="btx_search_wid", data-search-width="width"(组件宽度,默认100%,支持百分比值、定值,可选)
     * style: search.css
     * 使用: 默认为block,100%宽;设置有data-search-width则为inline-block,定宽
     * 使用: 搜索数据由post形式传输
     * 使用: 基于ajax_request()方法实现
     * 使用: data-clone-section、data-clone使用规范可参考ajax_request()
     * 标准结构:
     * <div>-<p>-<input> (div内部可扩展任意表单项,其作用等效于form, p通常作为搜索组件以进行相关设置)
     */
    "btx_search":function(){
        var _style, btn_style, _width;
        //样式初始化
        this.__init__("data-search-wid", function(){
            if(_width = $(this).attr("data-search-width")){
                $(this).css({"width":_width, "display":"inline-block"});
            }
            if($(this).find("button").size() > 0){//使用自定义按钮样式
                $(this).find("button").attr("data-search-btn", "yes");
            }else{//使用预置按钮样式
                if($(this).attr("class") && (_style = $(this).attr("class").match(/search_(\d)+\b/))){
                    //启用按钮样式风格,基于框架button.css
                    switch(_style[1]){
                        case "about_us":btn_style = "button_4"//ios风格
                            break;
                    }
                }
                $(this).append("<button data-search-btn='yes' class='icon-search "+ btn_style +"' data-btn='btx_btn' data-btn-callback='btx_search'></button>")
            }
        })
        //btx_btn按钮功能绑定
        this.external_fns["btx_search"] = function(data){
            var wid = data["self"].parents("[data-search='btx_search']"),
                request_url = wid.attr("data-search-action"),
                search_notice = wid.attr("data-search-notice") || "搜索中...",
                search_clone_section = wid.attr("data-search-clone-section");
            init.ajax_request(request_url, function(send){
                /^\s*$/.test(wid.find(":text").val())?btx_toast("搜索空值!", 2000, "error"):send();
            }, null, search_notice, wid, {"clone_name":search_clone_section, "success_fn":init.external_fns[wid.attr("data-search-callback")]});
        }
    },

	//背景音乐播放
	/*
     * ele_init: each
     * event_init: Static | self
     * external: none
     * media: All
	 * 配合属性:data-bgm="btx_bgm", data-bgm-auto="yes/no"(背景音乐是否自动播放,针对iphone有兼容性设计,不设置则用作按键音,可选), data-bgm-pos="left-top/left-bottom/right-top/right-bottom"(播放按钮定位,“-”左右两侧值顺序不固定,基于data-bgm-auto="no",可选), data-bgm-color="背景色"(播放按钮背景色，可选), data-bgm-btn="btx_bgm_btn"(自动生成)
	 * 使用: 可用作背景音乐,存在两种方式: about_us.自动播放:无按键,不可停止; 2.手动播放:有按键,可进行基本播放\暂停操作
	 * 使用: 可用作按键音(仅限微信环境,需原生配置)
	 */
	"btx_bgmplay":function(){
		this.__init__("data-bgm", function(){
            if(this.tagName.toLowerCase() == "audio"){
                var audio = this;
                //播放初始化
                this.loop = true;
                $(this).wrap($("<div>")).parent().css("display", "none");//防止"幽灵占位"
                if($(this).attr("data-bgm-auto") == "yes"){//背景音乐,自动播放
                    this.autoplay = true;
                    if(Init.media_query()['sys'] == "ios"){
                        $(document).on("touchstart",function(){
                            audio.play();
                        })
                    }
                }else if($(this).attr("data-bgm-auto") == "no"){//背景音乐,手动播放
                    var player=$("<span class='icon-music' data-bgm-btn='btx_bgm_btn'></span>").data("audio", audio), bgcolor = $(this).attr("data-bgm-color") || "#000", pos = $(this).attr("data-bgm-pos").split("-"), pos_obj = {};
                    this.autoplay = false;
                    //设置播放器样式
                    player.css({"position":"absolute", "width":"3.1rem", "height":"3.1rem", "text-align":"center", "line-height":"3.1rem", "border-radius":"3.1rem", "background-color":bgcolor, "color":"#fff", "opacity":"0.7", "font-size":"about_us.4rem", "cursor":"pointer", "z-index":99});
                    //设置播放器定位
                    pos_obj[pos[0]] = "0.7rem";
                    pos_obj[pos[1]] = "0.7rem";
                    player.css(pos_obj);
                    $("body").prepend(player);
                }else{//按键音,可通过外接内部函数实现播放
                    $(this).wrap($("<div>")).parent().css("display", "none");//防止"幽灵占位"
                }
                //外接内部函数
                $(this).data("btxfns", {
                    "play":function(){//单次播放
                        audio.loop = false;
                        audio.play();
                    }
                })
            }
        })
        this.__init__("$data-bgm-btn", function(init, flag, target, e){
            e.preventDefault();
            toggle(this, function(){//播放
                this.data("audio").play();
                this.removeClass("icon-pause2").addClass("anim_rotate_clockwise icon-music");//动画效果
            }, function(){//暂停
                this.data("audio").pause();
                this.removeClass("anim_rotate_clockwise icon-music").addClass("icon-pause2");
            })
        }, "click")
    },

    //实现fixed定位元素的空位填充
    /*
     * ele_init: each
     * event_init: none
     * external: none
     * media: All
     * 配合属性：data-fixed="btx_fixed", data-fixed-orientation="top/bottom"（放置方向）, data-fixed-zindex="z轴定位"（可选）
     */
    "btx_fixed":function(){
        var top_div=$("<div style='top:0;'></div>"), bottom_div=$("<div style='bottom:0;'></div>"), top_pad=$("<div></div>"), bottom_pad=$("<div></div>"), zindex, min_zindex=[];
        this.__init__("data-fixed", function(){
            zindex = $(this).attr("data-fixed-zindex") || 0;
            min_zindex.push(zindex);
            $(this).css("position", "relative");
            if($(this).attr("data-fixed-orientation") == "top"){
                top_div.append($(this).detach());
            }else if($(this).attr("data-fixed-orientation") == "bottom"){
                bottom_div.append($(this).detach());
            }
        })
        $("body").prepend(top_div).prepend(top_pad).append(bottom_div).append(bottom_pad);
        top_div.add(bottom_div).css({"width":"100%", "position":"fixed", "z-index":array_min(min_zindex)});
        top_pad.height(top_div.outerHeight());
        bottom_pad.height(bottom_div.outerHeight());
    },

    //实现导航按钮二级下拉
    /*
     * ele_init: each
     * event_init: Static | self
     * external: none
     * media: pc
     * 配合属性：data-subnav="btx_subnav", data-subnav-pos="left/right"(下拉定位,默认居中,可选), data-subnav-width="width"(列表按钮宽度,可选), data-subnav-bgcolor="color"(列表背景色,默认透明,可选), data-subnav-trigger="mouseenter/click"(下拉触发事件,默认为mouseenter,可选)
     */
    "btx_subnav":function() {
        var parent_width, bgcolor, subnav_left, tmp_width;
        this.__init__("data-subnav", function(){
            if (this.tagName.toLowerCase() == "li" || this.tagName.toLowerCase() == "dd") { //外层包裹仅限li、dd标签
                $(this).css("position", "relative");
                parent_width = $(this).attr("data-subnav-width") || $(this).outerWidth();//默认取父标签宽度
                bgcolor = $(this).attr("data-subnav-bgcolor") || "transparent";
                var _ul = $(this).children("ul");
                _ul.css({"width": parent_width, "top": $(this).outerHeight(), "background-color": bgcolor}).find("li").css({"width": "100%", "line-height": "normal"});//下拉仅限使用<ul><li>元素体
                tmp_width = $(this).outerWidth();
                subnav_left = tmp_width < parent_width ? -Math.abs((tmp_width - parent_width) / 2) : Math.abs((tmp_width - parent_width) / 2);
                //定位设置,在parent_width等于父标签宽度时,效果始终为左右居中对称
                if ($(this).attr("data-subnav-pos") == "left") { //左对齐定位
                    _ul.css("left", 0);
                } else if ($(this).attr("data-subnav-pos") == "right") { //右对齐定位
                    _ul.css("right", 0);
                } else { //居中定位
                    _ul.css("left", subnav_left);
                }
                //事件绑定
                /*var trigger = $(this).attr("data-subnav-trigger") || "mouseenter",
                    _ul_h = _ul.outerHeight();
                _ul.css({"display":"block", "height":0});
                $(this).on(trigger, function () {
                    _ul.css("height", _ul_h);
                }).on("mouseleave", function () {
                    _ul.css("height", 0);
                })*/

                $(this).children("ul").css("height", _ul.outerHeight());
                console.log(123);
                //_ul.css({"display":"block", "height":0});
            }
        }, $(this).attr("data-subnav-trigger") || "mouseenter", "pc")
        /*this.__init__("data-subnav", function(){
            $(this).children("ul").css("height", _ul_h);
        }, $(this).attr("data-subnav-trigger") || "mouseenter")*/
        this.__init__("data-subnav", function(){
            $(this).children("ul").css("height", 0);
        }, "mouseleave")

        //var _this = this, _w, _bgcolor, _subnav_left, _tmp_width;
        /*$("[data-subnav='btx_subnav']").each(function () {
            if (this.tagName.toLowerCase() == "li" || this.tagName.toLowerCase() == "dd") { //外层包裹仅限li、dd标签
                $(this).css("position", "relative");
                _w = $(this).attr("data-subnav-width") || $(this).outerWidth();//默认取父标签宽度
                _bgcolor = $(this).attr("data-subnav-bgcolor") || "transparent";
                var _ul = $(this).children("ul");
                _ul.css({
                    "width": _w,
                    "top": $(this).outerHeight(),
                    "background-color": _bgcolor
                }).find("li").css({"width": "100%", "line-height": "normal"});//下拉仅限使用<ul><li>元素体
                _tmp_width = $(this).outerWidth();
                _subnav_left = _tmp_width < _w ? -Math.abs((_tmp_width - _w) / 2) : Math.abs((_tmp_width - _w) / 2);
                //定位设置,在_w等于父标签宽度时,效果始终为左右居中对称
                if ($(this).attr("data-subnav-pos") == "left") { //左对齐定位
                    _ul.css("left", 0);
                } else if ($(this).attr("data-subnav-pos") == "right") { //右对齐定位
                    _ul.css("right", 0);
                } else { //居中定位
                    _ul.css("left", _subnav_left);
                }
                //事件绑定
                var trigger = $(this).attr("data-subnav-trigger") || "mouseenter",
                    _ul_h = _ul.outerHeight();
                _ul.css({"display":"block", "height":0});
                $(this).on(trigger, function () {
                        _ul.css("height", _ul_h);
                    }).on("mouseleave", function () {
                        _ul.css("height", 0);
                    })
            }
        })*/
    },

    //实现鼠标悬浮提示
    /*
     * ele_init: dynamic
     * event_init: Dynamic | self
     * external: none
     * media: pc
     * 配合属性：data-tip="btx_tip-提示陈述", data-tip-width="width"(提示面板宽度,可选), data-tip-delay="time"(出现提示延迟时间,可选), data-tip-pos="left/right"(提示定位,默认居中,可选), data-tip-vpos="top/bottom"(提示竖直方向定位,默认top,可选), data-tip-delay="显现延迟时间"(可选)
     * 自动生成属性:data-tip-pannel="btx_tip_pannel"
     */
    "btx_tip":function(){
        var notice_pannel, t, pannel_width, pannel_v, pannel_v_pos, pannel_left, tmp_width;
        this.__init__("data-tip", function(init, flag){
            if(!is_dom($(this).children("[data-tip-pannel='btx_tip_pannel']"))){
                if($(this).css("position") == "static") $(this).css("position", "relative");//添加非静态定位属性
                //宽度设置
                notice_pannel = $("<span data-tip-pannel='btx_tip_pannel'>"+ flag +"</span>").addClass("btx_tip");
                pannel_width = $(this).attr("data-tip-width");
                if(empty(pannel_width)) notice_pannel.css("max-width",180);
                notice_pannel.width(pannel_width);
                $(this).data("notice_pannel", notice_pannel).append(notice_pannel);
                tmp_width = $(this).outerWidth();
                //竖直定位
                pannel_v_pos = notice_pannel.outerHeight()+4;
                pannel_v = $(this).attr("data-tip-vpos") || "top";
                notice_pannel.addClass("btx_tip_"+pannel_v).css(pannel_v, -pannel_v_pos);
                //水平定位
                pannel_left = tmp_width < notice_pannel.outerWidth()?-Math.abs((tmp_width - notice_pannel.outerWidth())/2):Math.abs((tmp_width - notice_pannel.outerWidth())/2);
                if($(this).attr("data-tip-pos") == "left"){ //左对齐定位
                    notice_pannel.css("left", 0).addClass("btx_tip_left");
                }else if($(this).attr("data-tip-pos") == "right"){ //右对齐定位
                    notice_pannel.css("right", 0).addClass("btx_tip_right");
                }else{ //居中定位
                    notice_pannel.css("left", pannel_left).addClass("btx_tip_center");
                }
            }
            var _this = this;
            t = setTimeout(function(){
                $(_this).data("notice_pannel").fadeIn(400);
                clearTimeout(t);
            }, ($(this).attr("data-tip-delay") || 2000));
        }, "mouseenter", "pc")
        this.__init__("data-tip", function(){
            clearTimeout(t);
            notice_pannel = $(this).data("notice_pannel");
            if(is_dom(notice_pannel)) notice_pannel.fadeOut(200);
        }, "mouseleave", "pc")
    },

    //实现列表数据检测，无值时自动提示
    /*
     * ele_init: each
     * event_init: none
     * external: none
     * media: All
     * 配合属性：data-no-result-clone="btx_no_result_clone", data-clone="btx_clone"(列表项标识)
     * 使用: 需定位于相邻监测对象(通常为ul/ol/dl/table元素)之后
     */
    "btx_record_check":function(){
        this.__init__("data-no-result-clone", function(){
            var datas_frame = $(this).prev(), datas_frame_tagname = datas_frame[0].tagName.toLowerCase();
            if(datas_frame_tagname != "ul" && datas_frame_tagname != "ol" && datas_frame_tagname != "dl" && datas_frame_tagname != "table"){
                console.warn("data-clone-section父级推荐使用ul、table等序列标签!");
            }
            if(datas_frame_tagname == "table") datas_frame = datas_frame.children("tbody");
            //执行检测
            datas_frame.children("[data-clone='btx_clone']").size() == 0?$(this).show(0):$(this).hide(0);
        })
    },

    //异步上传控件
    /* data-upload-btn="flag"
     * 使用: 上传图片预览仅用作单图上传,若上传多图则仅预览首张图
     * 使用: 单图上传为覆盖模式,使用预置图片名;多图上传为追加模式,系统基于特定字段+时间戳命名
     *  上传文件名决定上传模式:
     *      追加,覆盖模式(多图上传): 1; 追加模式(多图上传): 2; 覆盖模式(单图上传): 3;
     */

    //别名显示dom数据
    /*
     * init: Static | Dynamic
     * 配合属性：data-cname="btx_cname-index"
     * cnames为别名数组，数组下标同应用别名dom对象btx_cname-index一一对应,数组元素对应别名对象数据
     */
    "btx_cname":function(cnames){
        //优先判断是否存在该对象
        if($("[data-cname]").size() == 0) return false;
        var _this = this;
        this.cnames = cnames;
        $("[data-cname]").each(function(){
            _this.__set_cname__($(this));
        })
    },

    //禁止该元素内容复制
    /*
     * ele_init: none
     * event_init: Static | self
     * external: none
     * media: pc
     * 配合属性：data-forbid-copy="btx_forbid_copy"
     */
    "btx_forbid_copy":function(){
        this.__init__("$data-forbid-copy", function(init, flag, target, e){
            e.preventDefault();
            return false;
        }, "copy", "pc")
    },

    //禁止该元素内容剪切
    /*
     * ele_init: none
     * event_init: Static | self
     * external: none
     * media: pc
     * 配合属性：data-forbid-cut="btx_forbid_cut"
     */
    "btx_forbid_cut":function(){
        this.__init__("$data-forbid-cut", function(init, flag, target, e){
            e.preventDefault();
            return false;
        }, "cut", "pc")
    },

    //禁止该元素内容粘贴
    /*
     * ele_init: none
     * event_init: Static | self
     * external: none
     * media: pc
     * 配合属性：data-forbid-paste="btx_forbid_paste"
     */
    "btx_forbid_paste":function(){
        this.__init__("$data-forbid-paste", function(init, flag, target, e){
            e.preventDefault();
            return false;
        }, "paste", "pc")
    },

    //基于父对象居中布局元素
    /*
     * ele_init: each
     * event_init: none
     * external: none
     * media: All
     * 配合属性：data-center-relative="btx_center_relative", data-center-percent="h/t/b/a-元素高度设置百分比"(可选)
     * 支持:元素高度百分比设置、元素竖直方向边距百分比设置
     * 支持:两套设计方案,about_us.基于标准布局元素;2.基于table元素(通过type传参设置)
     * data-center-percent="h/t/b/a"四种前缀分别代表设置元素:height高度、top上边距、bottom下边距、all上下边距百分比值
     */
    "btx_center_relative":function(type){
        var percent_data, parent, percent_val, _table;
        this.__init__("data-center-relative", function(){
            parent = $(this).parent();
            //解析元素尺寸
            $(this).find("[data-center-percent]").each(function(){
                percent_data = $(this).attr("data-center-percent").split("-");
                percent_val = parent.outerHeight()*percent_data[1].split("%")[0]*0.01;
                switch(percent_data[0]){
                    case "h":$(this).css("height", percent_val);
                        break;
                    case "t":$(this).css("margin-top", percent_val);
                        break;
                    case "b":$(this).css("margin-bottom", percent_val);
                        break;
                    case "a":$(this).css({"margin-top":percent_val, "margin-bottom":percent_val});
                }
                $(this).show(0);
            })
            if(type != 2){//方案1:基于标准布局元素,需要设置top定位
                $(this).css("top", (parent.outerHeight() - $(this).outerHeight())/2);
            }else{//方案2:基于table元素,不用设置top定位
                _table = $("<table><tr><td></td></tr></table>").css("height", "100%");
                $(this).after(_table);
                _table.find("td").css({"vertical-align":"middle", "text-align":"center"}).append($(this));
            }
        })
    },

    //列表排序
    /*
     * ele_init: none
     * event_init: Dynamic | target
     * external: none
     * media: All
     * 配合属性：data-order-section="btx_ope_section-CGI控制器名", data-order-method="up/down/top"(排序方式), data-order-scope="排序标识", data-order(序号,通常为cgi脚本赋值)
     * action依赖于框架cgi排序接口方法，详见：OrderPage接口类
     */
    "btx_order":function(){
        var order_ele_frame, order_ele, order_page, order_scope, action;
        this.__init__("data-order-section", function(init, flag, target){
            order_ele_frame = $(this);
            action = "?c="+flag;
            order_ele = target.parents("[data-order]");
            order_scope = $(this).attr("data-order-scope");
            order_page = order_ele.attr("data-order");
            switch(target.attr("data-order-method")){
                case "up"://升序
                    init.ajax_request(action+"&a=up_article&page="+order_page+"&scope="+order_scope, null, function(datas){
                        Ani.ani(order_ele, ["offset_up", "offset_down"]);
                        order_ele.attr("data-order", datas.page).prev("[data-order]").attr("data-order",function(i, val){
                            return --val;
                        }).before(order_ele);
                    }, "调序中...");
                    break;
                case "down"://降序
                    init.ajax_request(action+"&a=down_article&page="+order_page+"&scope="+order_scope, null, function(datas){
                        Ani.ani(order_ele, ["offset_down", "offset_up"]);
                        order_ele.attr("data-order", datas.page).next("[data-order]").attr("data-order",function(i, val){
                            return ++val;
                        }).after(order_ele);
                    }, "调序中...");
                    break;
                case "top"://置顶
                    init.ajax_request(action+"&a=top_article&page="+order_page+"&scope="+order_scope, null, function(datas){
                        Ani.ani(order_ele, ["offset_up", "offset_down"]);
                        order_ele.attr("data-order", datas.page);
                        order_ele_frame.find("[data-order]").eq(datas.page-order_page).prevAll("[data-order]").attr("data-order", function(i, val){
                            return --val;
                        })
                        order_ele_frame.find("[data-order]").eq(0).before(order_ele);
                    }, "调序中...");
                    break;
                case "insert"://插序
                    break;
            }
        }, "click");
    },


    /*工具方法*/

    //注册全局工具方法-异步数据加载提示
    /*
     * [number delay]: 提示缓冲时间,默认1000毫秒
     * 配合属性: data-loading="yes"(自动生成)
     * 使用: 出现多重加载时,后一次加载提示会覆盖前一次,但加载次数会累加,只有当全部加载完成后加载提示才会消失
     * 使用: 加载图片位于系统核心资源中loading.gif
     */
    "btx_load":function(delay){
        var self = this, loader = $("<div data-loading='yes'><p></p></div>");
        /*
         * string flag: 加载提示,空值为使用图片
         * number<0> flag: 提示消失
         */
        window.btx_loading = function(flag){
            if(loader.find("img").size() == 0) loader.prepend($("<div><img src='" + CDN_HOST +"res/loading.gif" + "'/></div>"));//启用加载图
            if(!is_dom($("[data-loading='yes']"))) $("body").prepend(loader);
            if(flag === 0){//提示消失
                self.loading--;
                if(self.loading <= 0){
                    self.loading = 0;
                    clearTimeout(self.loading_buffer);
                    loader.hide(0);
                }
            }else{//提示出现
                self.loading_buffer = setTimeout(function(){//提示缓冲,默认为1s
                    self.loading++;
                    if(typeof(flag) == "string"){//加载文字形式
                        loader.children("p").show(0).text(flag);
                        loader.children("div").hide(0);
                    }else{//加载图形式
                        loader.children("div").show(0);
                        loader.children("p").hide(0);
                    }
                    center_ele(loader);
                    Ani.in(loader);
                }, delay || 1000)
            }
        }
    },

    //获取元素的client尺寸,dir:String("height" or "width")
	"getclientsize":function(ele,dir,ifmargin,fn){
		var a1,a2,a3,a4,a5,a6,p1,p2,p3,p4,p5,p6;
		var imgnum = 0;
		var tmpnum = 0;
		if(dir == "width")
		{
			a1 = "padding-left";
			a2 = "padding-right";
			a3 = "margin-left";
			a4 = "margin-right";
			a5 = "border-left-width";
			a6 = "border-right-width";
			}
			else if(dir == "height")
			{
				a1 = "padding-top";
				a2 = "padding-bottom";
				a3 = "margin-top";
				a4 = "margin-bottom";
				a5 = "border-top-width";
				a6 = "border-bottom-width";
				}
		p1 = ele.css(a1)==0?0:ele.css(a1);//padding-left\top值
		p2 = ele.css(a2)==0?0:ele.css(a2);//padding-right\bottom值
		p3 = ele.css(a3)==0?0:ele.css(a3);//margin-left\top值
		p4 = ele.css(a4)==0?0:ele.css(a4);//margin-right\bottom值
		p5 = ele.css(a5)==0?0:ele.css(a5);//border-left-width\top-width值
		p6 = ele.css(a6)==0?0:ele.css(a6);//border-right-width\bottom-width值
		p1 = parseInt(p1);
		p2 = parseInt(p2);
		p3 = parseInt(p3);
		p4 = parseInt(p4);
		p5 = parseInt(p5);
		p6 = parseInt(p6);
		var compute = function(){
			return parseInt(ele.css(dir)) + p1 + p2 + p5 + p6 + (ifmargin?(p3+p4):0);
			}
		imgnum = ele.find("img").size();
		if(imgnum > 0)
		{
			ele.find("img").each(function(){
				tmpnum ++;
				if(this.complete)
				{
					if(tmpnum == imgnum)
					{
						fn(compute());
						}
					}
					else
					{
						if(tmpnum == imgnum)
						{
							var rand = Math.round(Math.random()*1000) + "a";
							fn(rand);//通过外部函数（外部函数有限定，见：BtnList类init()内部方法）接收参数（通常是数组元素添加），先用临时随机数填充；
							this.onload = function(){
								fn(rand,compute());
								}
							}
						}
				})
			}
			else
			{
				return compute();
				}
		},

    //图片预加载低分辨率图
    /*
     * imgarr:Array[<img>] or jquerylist; srcarr:Array[imgurl:String]
     */
	"preloadimg":function(imgarr,srcarr){
		var _imgarr;
		if(imgarr instanceof Array)
		{
			_imgarr = imgarr;
			}
			else
			{
				_imgarr = imgarr.toArray()//jquery对象需要转化为数组
				}
		for(var i in _imgarr)
		{
			var img = new Image();
			_imgarr[i].src = _imgarr[i].lowsrc;
			img.src = srcarr[i];
			img.onload = function(){
				_imgarr[i].src = img.src;
				}
			}
		},

    //预加载图片方法
    /*
     * url:String;img_data:[String,String...]
     */
	"preload_img_data":function(url,img_data){
		var str = "";
		for(var i=0;i<img_data.length;i++)
		{
			str += ("<img src='"+url+img_data[i]+"' />");
			}
		$("<span style='display:none'></span>").html(str).prependTo("body");
		},

    //设置外部js脚本生成元素的定位
    /*
     * plug:JqueryObject;insertmethod:String(APPEND\INSERT);dropobj:Element(放置对象);css:Object{css...}
     */
	"setPluginPos":function(plug,insertmethod,dropobj,css){
		var insertmethod = insertmethod || "APPEND";
		if(insertmethod == "APPEND")
		{
			dropobj.append(plug);
			}
			else if(insertmethod == "INSERT")
			{
				dropobj.insertAfter(plug);
				}
		plug.css(css);
		},
	"testIEVersion":function(){//(工具方法)判断IE浏览器版本
		var browser=navigator.appName
		var b_version=navigator.appVersion
		var version=b_version.split(";")
		if(!version[1])
		{
			return false;
			}
		var trim_Version=version[1].replace(/[ ]/g,"");
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0")
		{
			return 7;
			}
			else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0")
			{
				return 6;
				}
				else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0")
				{
					return 8;
					}
					else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0")
					{
						return 9;
						}
						else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE10.0")
						{
							return 10;
							}
		},

    //检测ie浏览器版本
    /*
     * 低于9则建议升级或是使用指定浏览器
     */
	"browsercheck":function(){
		if(this.testIEVersion() && this.testIEVersion() < 9)
		{
			$("body").empty();
			$("body").height(440);
			var c = $("<div>");
			var cont = "<p style='font-size:55px; margin-bottom:40px'>NOTICE</p>";
			cont += "<p>您的浏览器版本过低，请升级IE浏览器至9以上版本，我们更加推荐您使用</p>";
			cont += "<p style='margin-bottom:20px'><b> Chrome </b>浏览器或是<b> Firefox </b>浏览器</p>";
			cont += "<p style='margin-bottom:17px'><a href='http://windows.microsoft.com/zh-cn/internet-explorer/download-ie'><img src='http://btx-studio.com/footage/ie_icon.png' style='border:none;width:64px'/></a> <a href='http://www.firefox.com.cn/download/'><img src='http://btx-studio.com/footage/ff_icon.png' style='border:none;width:64px'/></a> <a href='http://www.google.cn/intl/zh-CN/chrome/'><img src='http://btx-studio.com/footage/chorme_icon.png' style='border:none;width:64px'/></a></p>";
			cont += "<p style='color:#bbb;font-size:11.5px'><span style='padding:22px'>升级</span><span style='padding:22px'>下载</span><span style='padding:22px'>下载</span></p>";
			cont += "<p style='color:#bbb; margin-top:17px; letter-spacing:1px'>Technical&nbsp;&nbsp;Support&nbsp;&nbsp;BTXstudio</p>";
			c.css({"width":500,"height":300,"text-align":"center","font-size":13});
			c.html(cont);
			}
		},

    //(事件方法)兼容性解决鼠标滚动事件
	"mousescroll":function(ele,upfn,downfn){
		ele = ele || document;//默认使用为全局滚动禁止
		upfn = upfn || function(){};
		downfn = downfn || function(){};
		ele.onmousewheel = function(e){//IE、其它标准
			if(e.wheelDelta == -120)//向下滚动
			{
				downfn.apply(this);
				e.cancelBubble = true;
				}
				else if(e.wheelDelta == 120)//向上滚动
				{
					upfn.apply(this);
					e.cancelBubble = true;
					}
			}
		ele.addEventListener("DOMMouseScroll",function(e){//ff标准
			if(e.detail == 3)//向下滚动
			{
				downfn.apply(this);
				e.preventDefault();
				}
				else if(e.detail == -3)//向上滚动
				{
					upfn.apply(this);
					e.preventDefault();
					}
			})
		},


    /*私有方法*/

    //初始化封装
    "__init__":function(btx_data_str, callback, event, media){
        var init = this, btx_ele = _jquery("["+ ltrim(btx_data_str, "$") +"]");
        if(btx_ele !== false){
            if(event){//基于事件,动态构造
                if(btx_data_str[0] == "$"){//静态初始化触发
                    btx_data_str = btx_data_str[0] == "$"?btx_data_str.substr(1):btx_data_str;
                    $("["+btx_data_str+"]").on(event, function(e){
                        init.__init_check__.call(this, btx_data_str, init, callback, $(e.target), e);
                    })
                }else{//动态构造触发
                    $("body").on(event, "["+btx_data_str+"]", function(e){
                        init.__init_check__.call(this, btx_data_str, init, callback, $(e.target));
                    })
                }
            }else{//不基于事件,静态初始化
                if(btx_data_str[0] == "$"){
                    console.error("静态初始化设置标识名禁止“$”前缀!");
                    return false;
                }
                btx_ele.each(function(){
                    init.__init_check__.call(this, btx_data_str, init, callback);
                })
            }
        }
    },

    //初始化检测
    "__init_check__":function(btx_data_str, init, callback, target, event){
        var btx_data = $(this).attr(btx_data_str).split("-");
        if(btx_data[0] == btx_data_str.replace("data", "btx").replace(/-/g, "_")){
            callback.call(this, init, (btx_data[1] || null), (target || null), (event || null));
        }
    },

    //将ol、ul、dl data-role事件绑定分配给其列表子集元素
	"__splitlist__":function(ele,datarole){
		var tlc = "toLowerCase";
		if(ele.get(0).tagName[tlc]() == "ul" || ele.get(0).tagName[tlc]() == "ol"){
			return ele.children("li")
        }else if(ele.get(0).tagName[tlc]() == "dl"){
            return ele.children("dd")
            }else{
                return false;
                }
    },

    //判断元素是否具有指定自定义属性，没有则设置添加该属性并赋值为“no”
    "__initdatarole__":function(ele, rolename, yesfn, nofn, default_set){
        default_set = default_set || "no";
        var name = "data-"+rolename;
        if(ele.attr(name) == undefined){
                ele.attr(name, default_set);
            }
        if(ele.attr(name) == "yes"){//默认选中
            yesfn.call(ele);
        }
        else if(ele.attr(name) == "no"){//默认未选中
            nofn.call(ele);
        }
    },

    //添加表单扩充控件，核心算法
    "__formplugin__":function(selector, toast_plugin, fn){
        $("body").on("mouseover", selector, function(){
            $(this).attr("readonly", "readonly").css("cursor","pointer");
        }).on("click", selector, function(){
            toast_plugin.connect_dom($(this));
            fn.call(toast_plugin);
            toast_plugin.toast_show();
        });
    },

    //设置别名
    "__set_cname__":function(ele){
        var _index,
            data_cname = ele.attr("data-cname").split("-"),
            _fn;
        if(data_cname[0] == "btx_cname"){
            _index = data_cname[1];
            _fn = ele[0].tagName.toLowerCase() == "input"?"val":"text";
            if(ele[_fn]() in this.cnames[_index]){
                ele[_fn](this.cnames[_index][ele[_fn]()]);
            }
        }
    },

    //执行外接函数
    "__external__":function(fn_str){
        return this.external_fns[fn_str] instanceof Function?this.external_fns[fn_str]:function(){};
    }
}

//滚动条类
/*
 * 方法:
 * reset():void 重置滚动条;
 * init():void 初始化
 * setboxinner():void 配置内容区域
 * setarea():void 配置滚动区域
 * setbar():void 配置滑块儿
 * bindevent():void 为控件绑定事件
 * upfn():void 滚轮向上滚动函数
 * downfn():void 滚轮向下滚动函数
 * resetpointer():void 矫正pointer
 * scrollmove():void 滚动实现
 * 说明:
 * 配合属性: data-scroller="yes"(自动生成)
*/
function Scroller(box, areawidth, speed){
	this.areawidth = Math.max(4, Math.abs(Math.floor(areawidth)));                                          //初始化滚动条滑块儿宽度
    this.speed = Math.max(4, Math.abs(Math.floor(speed)));                                                  //初始化滚动速度(步进值)
    this.box = $(box).css({"position":"relative", "height":"100%", "width":"100%", "overflow":"hidden"});   //滚动条容器
	this.box[0].selfclass = this;                                                                           //box对象self属性反指向Scroller类
	this.boxinner = $("<div data-scroller='yes'>");                                                         //创建滚动内容区
	this.scrollarea = $("<div>");                                                                           //创建滚动区域
	this.scrollbar = $("<div>");                                                                            //创建滚动滑块儿
    this.slen;                                                                                              //滚动条位移总长
    this.clen;                                                                                              //内容位移总长
    this.relpercent;                                                                                        //内容区同滚动条的相对位移比例
    this.btx_scroller_id = window.btx_scroller_id?window.btx_scroller_id+1:1;                               //当前滚动条编号(会添加全局属性：btx_scroller_id)
    //方法初始化
    window.btx_scroller_id = this.btx_scroller_id;
    this.init();
    this.bindevent();
	}
Scroller.prototype = {
    "reset":function(){//重置滚动条
        this.init();
        },
    "init":function(){//初始化
        var content = this.box.children();
        if(content.size() == 3 && content.eq(2).attr("data-scroller") == "yes") content = content.eq(2).children();
        //滚动条定位指针
        this.pointer = 0;
        this.clen = this.box[0].scrollHeight - this.box[0].clientHeight;
        this.percent = this.box[0].clientHeight / this.box[0].scrollHeight;//滚到条滑块儿和滚动区域的百分比
        if(this.clen > 0){
            this.setboxinner(content);
            this.setarea();
            this.setbar();
        }else{
            content = content.detach();
            this.box.empty();
            this.box.prepend(content);
        }
    },
	"setboxinner":function(content){//配置内容区域
        this.boxinner.css({"width":"97%","position":"relative","z-index":1,"top":0}).prepend(content).prependTo(this.box);
    },
	"setarea":function(){//配置滚动区域
		this.scrollarea.css({"width":this.areawidth,"height":"100%","background-color":"black","opacity":0,"position":"absolute","right":0,"top":0,"cursor":"pointer","border-radius":2,"z-index":2});
		this.box.prepend(this.scrollarea);
    },
	"setbar":function(){//配置滑块儿
        var scrollbarheight = Math.abs(Math.floor(this.percent * this.scrollarea[0].clientHeight));
        this.scrollbar.css({"width":this.areawidth,"height":scrollbarheight,"background-color":"black","opacity":0.1,"position":"absolute","right":0,"top":0,"cursor":"pointer","border-radius":2,"z-index":3});
        this.box.prepend(this.scrollbar);
        this.slen = this.scrollarea.height() - this.scrollbar.height();
        this.relpercent = Math.abs(this.clen / this.slen).toFixed(2)*1;
    },
	"bindevent":function(){//为控件绑定事件
		var _this= this;
		var _clickpointer;//滚动条点击位置
		var _switch = false;
		var relpos;//拖拽事件点击滑块儿时的相对滑块儿定位
		//滑块儿绑定拖拽事件（开始绑定）
		this.scrollbar.on("mousedown", function(e){
            e.preventDefault();
            _switch = true;
            relpos = Init.offsetpos(e.clientY, _this.scrollbar)["y"];
            })
		//滚动条的触碰动画效果
        this.box.on({"mouseenter":function(){
				_this.scrollarea.fadeTo(400,0.1)
				_this.scrollbar.fadeTo(200,0.5)
				},
			"mouseleave":function(){
				_this.scrollarea.fadeTo(400,0)
				_this.scrollbar.fadeTo(200,0.2)
				_switch = false;
				},
			"mousemove":function(e){//拖拽事件（拖拽过程）
				if(_switch == true)
				{
					_this.pointer = Init.offsetpos(e.clientY, _this.scrollarea)["y"] - relpos;
					_this.resetpointer();
					_this.scrollmove();
					}
				},
			"mouseup":function(){//拖拽事件（解除绑定）
				_switch = false;
				},
            "click":function(){//确定当前滚动操作区域，用于键盘事件
                window.btx_operate_scroller_id = _this.btx_scroller_id;//设置当前操作滚动条编号(会添加全局属性：btx_operate_scroller_id)
                }
			})
		//滚动区域的点击事件
		this.scrollarea.on("click",function(e){
			_clickpointer = Init.offsetpos(e.clientY, $(this))["y"];
            if(_clickpointer <= _this.pointer)
            {
                _this.pointer = _clickpointer;
                }
                else if(_clickpointer > _this.scrollbar.height() + _this.pointer)
                {
                    _this.pointer = _clickpointer - _this.scrollbar.height();
                    }
			_this.scrollmove();
			})
        //键盘事件
        $(document).on("keydown", function(e){
            if(window.btx_operate_scroller_id == _this.btx_scroller_id){
                if(e.keyCode == 38){//上移
                    _this.upfn();
                }
                else if(e.keyCode == 40){//下移
                    _this.downfn();
                }
                _this.scrollmove();
            }
        })
		//鼠标滚动事件（该方法需要Init类mousescroll()方法）
		new Init().mousescroll(this.box[0], this.upfn, this.downfn)
    },
	"upfn":function(){//滚轮向上滚动函数
		var _this = this.selfclass || this;
		_this.pointer -= _this.speed;
		_this.resetpointer();
		_this.scrollmove();
    },
	"downfn":function(){//滚轮向下滚动函数
        var _this = this.selfclass || this;
		_this.pointer += _this.speed;
		_this.resetpointer();
		_this.scrollmove();
    },
	"resetpointer":function(){//矫正pointer
		if(this.pointer <= 0){
			this.pointer = 0;
			}else if(this.pointer >= this.slen){
				this.pointer = this.slen;
				}
    },
	"scrollmove":function(){//滚动实现
		this.scrollbar.css("top",this.pointer);//滚动条位移
		this.boxinner.css("top",Math.ceil((this.pointer * this.relpercent))*-1);//内容位移
    }
}

//指针类
/*
arguments:
方法：
up();
down();
jump();
limit();
*/
function Pointer(maxnum,loop,default_p){
	this.maxnum = maxnum || 9999;
	this.loop = loop || false;
	this._p = default_p || 0;//前次定位
	this.p = default_p || 0;//当前定位
	}
Pointer.prototype = {
	"up":function(){//增加
		this._p = this.p;
		this.p++;
		this.limit();
		},
	"down":function(){//减少
		this._p = this.p;
		this.p--;
		this.limit();
		},
	"jump":function(index){//指定跳转
		this._p = this.p;
		this.p = index;
		this.limit();
		},
	"limit":function(){//循环限制（内部算法）
		if(this.loop)//开启循环
		{
			if(this.p >= this.maxnum){
				this.p = 0;
				}
				else if(this.p < 0)
				{
					this.p = this.maxnum-1;
					}
			}
			else//单向切换
			{
				if(this.p >= this.maxnum){
					this.p = this.maxnum-1;
					}
					else if(this.p < 0)
					{
						this.p = 0;
						}
				}
		}
	}


//时间选择器类
/*
arguments:
format:String 可选设置：year、month、date、hour、minute、second（或无值）,表示时间显示精度；
before_curyear:Boolean 选择当前年之前/之后时间；
show_box:jQueryElement 显示数据元素；
方法：
*/
function TimePicker(format, before_curyear, show_box){
	this.format = format;
	this.show_box = show_box;//显示数据元素
	this.timedata = {"年":""+new Date().getFullYear(),"月":"about_us","日":"about_us","时":"0","分":"0","秒":"0"};//时间记录
	this.before_curyear = before_curyear || false;//使用之前\之后年份时间
	this.output_timedata;//输出时间数据
	this.output_timestamp;//确定时间戳
	//定义组件
	this.picker_wid;
	this.picker_wid_navs;
	this.picker_wid_preview;
	this.picker_wid_sec;
	this.picker_wid_okbtn;
	this.picker_wid_cancelbtn;
	//分配显示
	this.timeformat_arr = ["Year","Month","Date","Hour","Minute","Second"];
	this.timepreview_arr = ["<span>"+new Date().getFullYear()+"</span>", "-<span>01</span>", "-<span>01</span>", "&nbsp;&nbsp;<span>00</span>", ":<span>00</span>", ":<span>00</span>"];
	switch(this.format)
	{
		case "year":this.fnav = 1;
		break;
		case "month":this.fnav = 2;
		break;
		case "date":this.fnav = 3;
		break;
		case "hour":this.fnav = 4;
		break;
		case "minute":this.fnav = 5;
		break;
		case "second":this.fnav = 6;
		break;
		default :this.fnav = 6;
		}
	this.__mk_ui__();
	//绑定事件
	this.__cancel__();
	this.__ok__();
	this.__nav_click__();
	this.__option_click__();
	}
TimePicker.prototype = {
	"__mk_ui__":function(){//生成UI组件(兼容手机端)
		this.picker_wid = $("<div class='btx_toast_basicbox'><table id='btx_timepicker_table' class='btx_toast_nav'><tr></tr></table><div class='btx_toast_select'><select id='btx_timepicker_sec'></select></div><div id='btx_timepicker_preview' class='btx_toast_preview'></div><div class='btx_toast_widbox'><button id='btx_toast_okbtn' class='button_2' data-btn='btx_btn'>OK</button><button class='button_2_1' data-btn='btx_btn' id='btx_toast_cancelbtn'>Cancel</button></div></div>");
		this.picker_wid_okbtn = this.picker_wid.find("#btx_toast_okbtn");
		this.picker_wid_cancelbtn = this.picker_wid.find("#btx_toast_cancelbtn");
		this.picker_wid_sec = this.picker_wid.find("#btx_timepicker_sec");
		this.picker_wid_preview = this.picker_wid.find("#btx_timepicker_preview");
		this.picker_wid_navs = this.picker_wid.find("#btx_timepicker_table");
		for(var i=0; i<this.fnav; i++)
		{
			this.picker_wid_navs.find("tr").append($("<td><button class='button_14' data-btn='btx_btn' data-btn-name='btx_timepicker_nav'>"+this.timeformat_arr[i]+"</button></td>"));
			this.picker_wid_preview.append(this.timepreview_arr[i]);
			}
		this.picker_wid_navs.find("td:first button").addClass("button_14_down");
		this.__insert_option__("Year");
		$("body").prepend(this.picker_wid);
		center_ele(this.picker_wid)//居中定位
		},
	"__cancel__":function(){//取消操作
		var _this = this;
		this.picker_wid_cancelbtn.on("click",function(){
			_this.hide();
			})
		},
	"__ok__":function(){//确认操作
		var _this = this;
		this.picker_wid_okbtn.on("click",function(){
			_this.output_timedata = _this.picker_wid_preview.text();
			if(_this.show_box[0].tagName.toLowerCase() == "input" || _this.show_box[0].tagName.toLowerCase() == "textarea")
			{
				_this.show_box.val(_this.output_timedata);
				}
				else
				{
					_this.show_box.text(_this.output_timedata);
					}
			_this.__mktimestamp__();//生成时间戳
			_this.show_box.attr("data-timestamp", _this.output_timestamp);//记录时间戳
			_this.hide();
			})
		},
	"__nav_click__":function(){//导航点击效果
		var _this=this;
		this.picker_wid_navs.find("td").on("click",function(){
			_this.__insert_option__($(this).text());
			})
		},
	"__insert_option__":function(timedata){//插入option标签
		var limit, _unit, _stime, _year, _month, _select;
		switch(timedata)
		{
			case "Year":_unit="年";_stime = new Date().getFullYear();
			limit = this.before_curyear?-50:50//使用年份时间区段
			break;
			case "Month":limit=12;_unit="月";_stime =1;
			break;
			case "Date":
			_year = this.timedata["年"];
			_month = this.timedata["月"];
			if(_year && _month)//计算日期数
			{
				_unit = "日";
				_stime = 1;
				limit = Init.calculate_date(_year, _month);
				}
				else
				{
					this.picker_wid_sec.empty();
					this.picker_wid_sec.append($("<option>请优先设置年份及月份 !</option>"));
					return false;
					}
			break;
			case "Hour":limit=24;_unit="时";_stime =0;
			break;
			case "Minute":limit=60;_unit="分";_stime =0;
			break;
			case "Second":limit=60;_unit="秒";_stime =0;
			}
		this.picker_wid_sec.empty();
		for(var i=Math.min(_stime+limit, _stime); i<Math.max(_stime+limit, _stime+1); i++)
		{
			_select = this.timedata[_unit] == i?"selected":"";
			this.picker_wid_sec.append($("<option "+_select+">"+i+"  "+_unit+"</option>"));
			}
		},
	"__option_click__":function(){//option点击时间选择效果
		var arr = [], _this=this, _i;
		this.picker_wid_sec.on("click",function(){
			arr = $(this).val().split(/\s+/);
			_this.timedata[arr[1]] = arr[0]*1;//内存记录时间数据
			switch(arr[1])
			{
				case "年":_i=0;
				break;
				case "月":_i=1;
				break;
				case "日":_i=2;
				break;
				case "时":_i=3;
				break;
				case "分":_i=4;
				break;
				case "秒":_i=5;
				break;
				}
			_this.picker_wid_preview.find("span").eq(_i).text(BTXUtils.pad_zero(arr[0]*1, 2));
			})
		},
	"__mktimestamp__":function(){//生成时间戳
		var date = new Date();
		date.setFullYear(this.timedata['年']);
		date.setMonth(this.timedata['月']-1);
		date.setDate(this.timedata['日']);
		date.setHours(this.timedata['时']);
		date.setMinutes(this.timedata['分']);
		date.setSeconds(this.timedata['秒']);
		this.output_timestamp = Math.floor(date.getTime()/1000);
		}
	}

//金额选择器类
/*
 public_funcs:
 继承自Toast类方法;
 private_funcs:
 继承自Toast类方法;
 __mk_wid__(price_limit, price) 构建金额选择器输入输出组件;
 __key_press__() 键入操作;
 __mk_price__() 输出金额;
 注:最高位限制为亿
 */
function PricePicker(){
    this.wid;
    this.screen;
    this.keyboard;
    this.price = "";
    this.format_price = "";
    this.__mk_box__();
    this.__mk_wid__();
    this.inner_data(this.wid);
    this.bind_event(this.__show_price__);
    this.__key_press__();
}
PricePicker.prototype = new Toast();//继承自Toast类
PricePicker.prototype.__mk_wid__ = function(){//构建金额IO组件
    //生成键盘
    this.keyboard = $("<div class='btx_toast_keyboard'><p><button>C</button><button >Back</button></p><p><button>0</button><button>about_us</button><button>2</button><button>3</button><button>4</button><button>5</button><button>6</button><button>7</button><button>8</button><button>9</button></p></div>");
    this.keyboard.find("button").addClass("button_1").attr("data-btn","btx_btn");
    //生成显示屏
    this.screen = $("<div class='btx_toast_screen'>0.00</div>");
    this.wid = $("<div></div>").append(this.screen).append(this.keyboard);
}
PricePicker.prototype.__key_press__ = function(){//键入操作
    var _this = this, _t;
    //控件操作
    this.keyboard.find("button").on("click",function(){
        switch(_t = $(this).text()){
            case "C"://清空按键
                _this.price = "";
                break;
            case "Back"://回退按键
                _this.price = _this.price.substr(0, _this.price.length-1);
                break;
            default://数字按键
                if(_t == 0 && _this.price == "") return false;//禁止前置0
                _this.price += _t;
                break;
        }
        _this.__mk_price__();
    })
    //键盘操作
    $(document).on("keydown", function(e){
        //只接受数字
        if(e.which >= 48 && e.which <= 57){
            _this.price += String.fromCharCode(e.which);
        }
        _this.__mk_price__();
    })
}
PricePicker.prototype.__mk_price__ = function(){//输出金额
    if(this.price.length > 11) this.price = this.price.substr(0, 11);//最高位限制
    var tmp_price_arr = this.price.split("").reverse(), tmp_price="";
    if(tmp_price_arr[0] == undefined) tmp_price_arr[0] = "0";
    if(tmp_price_arr[1] == undefined) tmp_price_arr[1] = "0";
    if(tmp_price_arr[2] == undefined){
        tmp_price_arr[2] = "0.";
    }else{
        tmp_price_arr[2] += ".";
    }
    if(tmp_price_arr[6]) tmp_price_arr[6] += " ";
    if(tmp_price_arr[10]) tmp_price_arr[10] += " ";
    tmp_price = tmp_price_arr.reverse().join("");
    //显示屏显示
    this.screen.text(tmp_price);
    //格式化金额
    this.format_price = tmp_price.replace(/\s+/g, "");
}
PricePicker.prototype.__show_price__ = function(){//显示金额
    this.ele.val(this.format_price);
}