<!--19-09-26-->
class Btx{
    constructor(){
        document.body.addEventListener('touchstart', function(){});//保证ios下:active效果

        /*数组去重追加*/
        Array.prototype.unique_push = (ele)=>{
            if(this.indexOf(ele) === -1) this.push(ele);
        }

    }

    /*-------------------------------dom 操作-------------------------------*/

    //获取 dom 元素
    $(selector, all){
        return document["querySelector" + (all? "all": "")](selector);
    }

    //移除 dom 元素
    remove($dom){
        $dom.parentNode.removeChild($dom);
    }

    /*数据转换（通常用于前后端分离数据获取及转换）*/
    data_convert(data, convert){
        let return_arr = [];
        data.forEach( (el, index) => {
            let _convert = {};
            for(let k in convert){
                let v = convert[k];
                if(typeof v == "function"){//函数处理
                    _convert[k] = v(el);
                }else if(v == ""){//空值
                    _convert[k] = "";
                }else{//直接量
                    _convert[k] = el[v == "1"?k:v];
                }
            }
            return_arr[index] = _convert;
        })
        return return_arr;
    }

    /*按钮选中*/
    select(select, $btn, cb){
        if(this.has_class($btn, select)){
            let $before_act = $btn.parentNode.querySelector(".act");

            if($before_act) $before_act.className = $before_act.className.replace("act", "");
            $btn.className = ($btn.className += " act");//依赖.act样式
            cb && cb();//执行回调
        }
    }

    /*集成插件*/
    plugin(plugin_name, dom){
        let plugin;
        //import "./plugin/Slider.js";
        eval("plugin = new " + plugin_name + "()")
        console.log(plugin);
        return plugin;
    }

    /*-------------------------------工具方法-------------------------------*/

    //json 数据转换
    /*
    支持：
    * 属性替换;
    * 属性值重置;
    * 属性值清空;
    * 属性值回调函数操作;
        （注：对象层级无法被修改，但可移除）
    * 递归修改;
    * 属性移除;
    * 属性追加（在指定属性内或根节点，追加一个或多个属性）;
        （注：属性追加执行于属性修改之后）
    */
    json_convert(inp, mod_rule, append_rule, scope){
        let new_data = {},
        new_pro,
        cur_val,
        _pro,
        _val,
        skip;
        for(let pro in inp){
            new_pro = mod_rule[pro];
            cur_val = inp[pro]; 

            //修改属性名及属性值
            if(new_pro){//有修改
                if(
                    !new_pro._scope_ || //全层级修改
                    new_pro._scope_._ROOT_ && !scope || //根节点层级修改
                    new_pro._scope_[scope] //指定节点层级修改
                ){
                    if(new_pro._scope_) new_pro = new_pro._scope_[scope] || new_pro._scope_._ROOT_;
                    skip = new_pro.skip || false;
                    if(skip === false){

                        //设置新属性名
                        if(new_pro.pro_name instanceof Function){
                            _pro = new_pro.pro_name(inp) || pro;
                        }else{
                            _pro = new_pro.pro_name || pro;
                        }

                        //设置新属性值
                        if(new_pro.pro_val == "" || new_pro.pro_val == 0){
                            _val = new_pro.pro_val;
                        }else if(new_pro.pro_val instanceof Function){
                            _val = new_pro.pro_val(cur_val, inp) || "";
                        }else{
                            _val = new_pro.pro_val || cur_val;
                        }

                    }
                }else{//无修改
                    skip = false;
                    _pro = pro;
                    _val = cur_val;
                }
            }else{ //无修改
                skip = false;
                _pro = pro;
                _val = cur_val;                
            }
            
            if(skip === false){
                if(Array.isArray(_val)){//数组元素递归操作
                    _val.forEach(function(val, i){
                        if(typeof(val) === "object"){
                            cur_val[i] = mod_json_data_format(val, mod_rule, append_rule, _pro);
                        }
                    })
                    new_data[_pro] = _val;
                }else if(typeof(cur_val) === "object"){//对象层级递归操作
                    new_data[_pro] = mod_json_data_format(cur_val, mod_rule, append_rule, _pro);
                }else{
                    new_data[_pro] = _val;  
                }               
            } 
        }
        
        //属性追加
        if(append_rule){
            if(append_rule instanceof Function){//基于节点自定义追加
                let append_data = append_rule(inp) || {};
                new_data = {...new_data, ...append_data}
            }else if(!scope){//根节点属性追加
                new_data = {...new_data, ...append_rule};
            }
        }

        return new_data;
    }

    /*按顺序遍历对象*/
    for_in(obj, callback, order){
        let ordered = [];
        order = order || ["0","1","2","3","4","5","6","7","8","9",
            "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
            "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        for(let word of order){
            if(obj[word]) ordered.push(obj[word]);
        }
        for(let data of ordered){
            callback(data);
        }
    }

    /*中文转码unicode*/
    zh_convert_to_unicode(str){
        let res = [];
        for ( var i=0; i<str.length; i++ ) {
            res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
        }
        return "\\u" + res.join("\\u");
    }

    /*判断dom对象是否具有class类*/
    has_class($dom, class_name){
        return $dom.className.split(" ").indexOf(class_name) === -1?false:true;
    }

    /*转换html为普通text*/
    convert_html_to_text(html){
        let $doc = document.createElement("div");
        $doc.innerHTML = html;
        return $doc.innerText || $doc.textContent;
    }

}

window.Btx = Btx;