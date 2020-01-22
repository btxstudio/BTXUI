//基本常用函数库

var BTXUtils = {
    "str":{}
	}

/*
* 默认支持追加前导0，也可以追加其它字符,追加数目依据：limit长度 - 原字符长度；
* 若追加数目计算为0或负数，则直接返回原字符串str；
* padchar限制为单个字符，否则同样以0代替；
*/		
BTXUtils.pad_zero = function(str, limit, padchar){//追加前导零或其它字符
	str = String(str);
	padchar = padchar || 0;
	padchar = String(padchar);
	padchar = padchar.length == 1?padchar:"0";
	var pad_len = limit - str.length, _padchar="";
	if(pad_len <= 0) return str;
	for(var i=0; i<pad_len; i++)
	{
		_padchar += padchar;
		}
	return _padchar + str;
	}
		
BTXUtils.hex2rgb = function(colour){//将16进制颜色值转换为rgb颜色值
	var r, g, b;
	if(colour[0] == '#') {  
		colour = colour.substr(1); 		
    }  
    if(colour.length == 6) {  
		r = colour[0] + colour[1];
		g = colour[2] + colour[3];
		b = colour[4] + colour[5];
    	} 
		else if (colour.length == 3) {  
			r = colour[0] + colour[0];
			g = colour[1] + colour[1];
			b = colour[2] + colour[2];
    		} 
			else {  
        		return false;  
    			}  
    r = parseInt(r, 16);  
    g = parseInt(g, 16);  
    b = parseInt(b, 16);  
    return {'red':r, 'green':g, 'blue':b};  
	}

/*----------------------------常用工具函数-----------------------------*/

//将两个数组合并为对象，其中一个数组元素作为对象键值，另一个数组元素作为对象键名
function array_combine(arr1,arr2){
    var obj = {};
    var len;
    if(arr1 instanceof Array && arr2 instanceof Array){//两个数组参数都必须为数组
        len = Math.min(arr1.length,arr2.length);
        for(var i =0;i<len;i++){
            obj[arr1[i]] = arr2[i];
        }
        return obj;
    }
    return null;
}

//判断数组中是否有重复元素
function array_repeat(arr){
    for(var i=0; i<arr.length; i++){
        for(var j=i+1; j<arr.length; j++){
            if(arr[i] && arr[j] && arr[i] == arr[j]) return true;//元素值需有效
        }
    }
    return false;
}

//字符串替换
/*
 * 支持多字符替换,基于替换映射表
 */
function str_replace(str, replace_base_table){
    var _return_str = "";
    for(var i= 0, tmp_str_arr = str.split(""); i<tmp_str_arr.length; i++){
        if(tmp_str_arr[i] in replace_base_table){
            _return_str += replace_base_table[tmp_str_arr[i]];
        }else{
            _return_str += tmp_str_arr[i];
        }
    }
    return _return_str;
}

/*----------------------------------------------------------------------------------------------------------------*/

/*
 * 数字系列拓展函数
 */

//函数有效化执行
/*
 * [number number]:数值
 * [number len]:小数点保留位数
 * [boolean round]:整数数值是否启用小数部分隐藏
 */
function number_fixed(number, len, round){
    if(typeof(number) == "number"){
        number = number.toFixed(len);
    }
    if(round && parseInt(number.split(".")[1])==0){//整数值不显示小数部分
        number = Math.round(number);
    }
    return number;
}

//随机生成指定位数数字
/*
 * [number n]: 位数
 */
function rand_number(n){
    var Num="";
    for(var i=0;i<n;i++){
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
}

//----------------------------字符串扩展函数-----------------------------

//字符串首字母小写
String.prototype.lower_c = function(){
    return this.replace(this[0], this[0].toLowerCase());
}


//字符串首字母大写
String.prototype.upper_c = function(){
    return this.replace(this[0], this[0].toUpperCase());
}


//反转字符串
String.prototype.reverse = function(){
    return this.split("").reverse().join("");
}


/*
 * 字符串左侧空白截除
 * [string slice]: 截取移除字符串
 */
String.prototype.ltrim = function(slice){
    var str = this.replace(/^\s+/, "");

    if(slice && str.search(slice.replace("[", "\\[").replace("$", "\\$").replace("(", "\\(")) == 0){
        var strlen = slice.length;
        str = str.substr(strlen);
    }
    return str;
}


//字符串右侧空白截除
String.prototype.rtrim = function(slice){
    var str = this.replace(/\s+$/, ""),
        rstr = str.reverse();

    if(slice && rstr.search(slice.reverse().replace("[", "\\[").replace(")", "\\)")) == 0){
        var strlen = slice.length;

        str = rstr.substr(strlen).reverse();
    }
    return str;
}


//字符串两侧空白截除
String.prototype.trim = function(slice){
    return (this.ltrim(slice)).rtrim(slice);
}


//字符串首字母大写
String.prototype.capitalize = function(){
    return this[0].toUpperCase() + this.substr(1);
}

//----------------------------数组扩展函数-----------------------------

//获取数组元素中的最大值
Array.prototype.max = function(){
    this.sort(function(a, b){
        return b - a
    });
    return this[0];
}


//获取数组元素中的最小值
Array.prototype.min = function(){
    this.sort(function(a, b){
        return a - b
    });
    return this[0];
}


//获取最后一个数组元素值
Array.prototype.end = function(){
    return this[this.length-1];
}


//判断数组是否包含指定数据
/*
* 【使用】：
* 1. 支持严格比较（数据类型匹配）
* */
Array.prototype.in_array = function(d, strict){
    var i;

    if(i = this.indexOf(d) != -1){
        return strict?( this[i] === d?true:false ):true;
    }else{
        return false;
    }
}

//----------------------------主执行-----------------------------

var e_lib = {//兼容性事件库
    "animation": window.Modernizr.prefixed("animation").lower_c(),
    "transition": window.Modernizr.prefixed("transition").lower_c(),
    "down": ("touchstart" in document? "touchstart": "mousedown"),
    "up": ("ontouchend" in document? "touchend": "mouseup"),
    "click":"click"
};

/*----------------------------工具函数-----------------------------*/

//获取视口高度
function view_height(){
    return document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
}


//居中视口
function center($dom){
    var view_h = this.view_height(),
        view_w = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
        dom = $dom[0];

    $dom.css({"top": (view_h - dom.clientHeight)*.5, "left": (view_w - dom.clientWidth)*.5});
    return $dom;
}


//报错抛出
function error(msg){
    throw new Error(msg);
}


//快速console.log
function c(str){ console.log(str) }


//快速console.dir
function dir(str){ console.dir(str) }


//适配h5兼容性事件
/*
 * String ev：事件名前缀
 * String name：事件名后缀
 */
function e(ev, name){
    if(arguments.length == 2){//含前缀判断
        if(!(ev+name in e_lib)) e_lib[ev+name] = e_lib[ev] + (e_lib[ev].search(ev) != 0?name.upper_c:name);
        return e_lib[ev+name];
    }else{//响应式事件判断（基于鼠标交互/触屏交互）
        return e_lib[ev];
    }
}


//字节转换
function to_bit(v){
    var d = v.match(/[\d\.]+/)[0],
        unit = v.split(d)[1],
        b = 1;

    switch(unit.toLowerCase()){
        case "kb": b = 1000;
            break;
        case "m": b = 1000000;
            break;
        case "g": b = 1000000000;
            break;
    }
    return d * b;
}


//函数有效化执行
/*
 * function fn: 自定义函数
 * mixed arg: 自定义函数传参,可为任意类型
 * object call: this指针绑定对象
 * int delay: 延迟时间,单位毫秒
 */
function exefn(fn, arg, call, delay){
    var exe = function(){ call?fn.call(call, arg || null):fn(arg || null) }
    if(fn instanceof Function){
        if(delay){
            var t = setTimeout(function(){
                clearTimeout(t);
                exe();
            }, delay);
        }else{
            exe();
        }
    }else{
        console.error("fn si not a function!");
    }
}

//判断对象是否为dom对象或jquery封装的dom对象
function is_dom(ele){
    return ele && ((ele.jquery && ele[0]) || ele.nodeType == 1)?true:false;
}

//获取手机屏方向
function viewport_orientation(){
    return viewport_height() > document.body.clientWidth?"v":"h";
}

//判断手机屏方向
function viewport_orientation_judge(dir){
    return dir == viewport_orientation()?true:false;
}

//获取路径目录
function basename(url){
    var tmp_arr = url.split("/");
    tmp_arr.pop();
    return tmp_arr.join("/")+"/";
}

/*css类处理*/

//模糊提取对象指定css类
/*
 * [mixed ele]: 操作对象或选择器
 * [class_str]: 见:regexp_class()
 * [pos]: 见:regexp_class()
 * [string return]
 */
function match_class(ele, class_str, pos){
    ele = _jquery(ele);
    if(ele){
        return (ele.tem_reg = regexp_class(class_str, pos).exec(ele.attr("class")))?ele.tem_reg[0]:"";
    }
}

//获取对象css类匹配正则
/*
 * [string class_str]: css类名片段
 * [string<"after", "before", null> pos]: 匹配位置
 * [Regexp return]
 */
function regexp_class(class_str, pos){
    if(pos == "after"){//尾匹配
        return RegExp("\\b"+class_str+"\\w+\\b");
    }else if(pos == "before"){//头匹配
        return RegExp("\\b\\w+"+class_str+"\\b");
    }else{//身匹配
        return RegExp("\\b\\w+"+class_str+"\\w+\\b");
    }
}

//取消图片缓存
/*
 * string img: 图片元素
 * string src: 图片src
 */
function cancel_img_cache(img, src){
    img = _jquery(img);
    img.attr("src", src+"?random="+Math.random()*1000);
    img.next().before(img);
}

//格式化时间
/*
 * [string format_str]: 时间格式
 * [number timestamp]: 时间戳
 * [string return]
 * 支持: php生成10位时间戳自动转换
 */
function date(format_str, timestamp){
    var fTime, fStr = 'ymdhis';
    if(!format_str) format_str = "y-m-d h:i:s";
    fTime = timestamp?new Date(timestamp.length == 10?timestamp*1000:timestamp):new Date();
    var format = function(v){//时间格式统一为2位,以保证格式整洁
        return v.length == 1?"0"+v:v;
    }
    var formatArr = [
        fTime.getFullYear().toString().substr(2),//年份显示后2位
        format((fTime.getMonth()+1).toString()),
        format(fTime.getDate().toString()),
        format(fTime.getHours().toString()),
        format(fTime.getMinutes().toString()),
        format(fTime.getSeconds().toString())
    ]
    for(var i=0; i<formatArr.length; i++){
        format_str = format_str.replace(fStr.charAt(i), formatArr[i]);
    }
    return format_str;
}




