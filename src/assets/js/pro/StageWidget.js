//基础后台管理组件
function StageWid($dom, opt){
    this["operate_lib"] = {};

    /*组件*/
    this.$wid = $dom;
    this.$tbody = this.$wid.find(".mod-table-list>tbody");
    this.$thead = this.$wid.find(".mod-table-list>thead>tr");
    this.$utils_list = this.$wid.find(".utils-list");                                    //三级工具菜单
    this.$msg_info_wid = this.$wid.find(".msg_info_wid");
    this.$msg_info_wid_title = this.$msg_info_wid.find("h3>small");
    this.$msg_info_wid_cover = this.$msg_info_wid.find(".msg-info-w-cover img");
    this.$cur_tr;
    this.cur_id;

    /*第三方插件-UEditor*/
    if(opt.fck_id && $("#" + opt.fck_id).size()>0){
        UE.delEditor(opt.fck_id);
        this.editer = UE.getEditor(opt.fck_id, {
                "autoHeightEnabled": false,
                "initialFrameHeight": 427
            }
        )
    }else{ this.editer = null }

    this._init_msg_info_wid_(opt.width);
}
StageWid.prototype = {

    //正常状态(Edit点击)
    "normal_state": function($btn){
        this.click($btn, function(p){
            p.$tbody.removeAttr("state");
            p.$utils_list.removeAttr("state");
        })
    },

    //选择状态(Edit点击)
    "select_state": function($btn){
        this.click($btn, function(p){
            if(p.$tbody.children("tr").eq(0).attr("id")){//无数据不可设置
                p.$tbody.attr("state", "edit");
                p.$utils_list.attr("state", "edit");
            }
        })
    },

    //新增数据编辑
    "append_edit": function($btn){
        this.click($btn, function(p){
            p._info_wid_("新增信息", null, "add");
        })
    },

    //新增文章数据编辑
    "append_article_edit": function($btn){
        this.click($btn, function(p){
            p._info_wid_("新增信息", null, "add");
        })
    },

    //修改数据编辑
    "mod_edit":function(){
        this.click(this.$tbody, "tr", function(p){
            p._info_wid_("修改信息", $(this), "mod");
        })
    },

    //修改状态数据编辑
    "mod_state_edit":function(){
        this.click(this.$tbody, "tr", function(p){
            p._info_wid_("修改信息", $(this), "mod");
            p._change_state_();
        })
    },

    //修改文章数据编辑
    "mod_article_edit": function(){
        this.click(this.$tbody, "tr", function(p){
            p._info_wid_("修改信息", $(this), "mod");
            if(p.$tbody.attr("state") === "edit") p._init_ueditor_();
        })
    },

    //执行删除确认
    "operate_confirm_delete": function($btn){
        this.operate_delete($btn, true);
    },

    //执行删除
    "operate_delete": function($btn, config){
        this.click($btn, function(p){
            var exe_del = function(){
                p._operate_delete_($B.get_form_data(p.$msg_info_wid))
            }

            if(config === true){
                $B.confirm("确认删除?", function(){ exe_del(); });
            }else{ exe_del() }
        });
    },

    //执行新增
    "operate_append": function($btn){
        this.click($btn, function(p){ p._operate_append_($B.get_form_data(p.$msg_info_wid)) });
    },

    //执行文章新增
    "operate_article_append": function($btn){
        this.click($btn, function(p){
            p._operate_append_($B.get_form_data(p.$msg_info_wid), function(data){
                p._append_article_(data["article_id"], data["type"]);
            });
        });
    },

    //执行修改
    "operate_mod": function($btn){
        this.click($btn, function(p){ p._operate_mod_($B.get_form_data(p.$msg_info_wid)) });
    },

    //执行文章修改
    "operate_article_mod": function($btn){
        this.click($btn, function(p){
            p._operate_mod_($B.get_form_data(p.$msg_info_wid), function(data){
                p._append_article_(data["article_id"], data["type"]);
            });
        });
    },

    //-------------------------------------内部方法----------------------------------------

    //初始化模态化窗口控件
    "_init_msg_info_wid_": function(width){
        var x, y, offset_x, offset_y,enable = false, miw = this.$msg_info_wid,
            drag_move = function(e){
                e.preventDefault();
                if(enable === true){
                    offset_x = e.clientX - x;
                    offset_y = e.clientY - y;
                    miw.css("transform", "translate(" + offset_x + "px, " + offset_y + "px)");
                }
            },
            drag_over = function(){
                enable = false;
                miw.css({"left": miw[0].offsetLeft + offset_x, "top": miw[0].offsetTop + offset_y, "transform":"translate(0,0)"});
                $(document).off("mousemove", drag_move);
                $(document).off("mouseup", drag_over);
            };

        /*拖拽效果*/
        miw.css("width", width || 640).find("h3").on("mousedown", function(e){
            x = e.clientX;
            y = e.clientY;
            offset_x = offset_y = 0;
            enable = true;
            $(document).on("mousemove", drag_move);
            $(document).on("mouseup", drag_over);
        })

    },

    //回填tr数据
    "_pad_data_to_tr_": function($tr, datas){
        for(var pro in datas){
            if(pro.search("_id") > 0){
                var _id = datas[pro];
                break;
            }
        }
        if(_id){
            $tr.attr("id", _id);
            this.$thead.children("[data-role]").each(function(){
                var name = $(this).data("role"), $rd = $tr.children("td").eq($(this).index()), img_data = name.split("-"), img_src = datas[img_data[1]];

                if(img_data[0] === "img" && img_src){//图片数据
                    $rd.children("img").attr("src", RES + img_src);
                }else{
                    $rd.text(datas[name]);
                }
            })
        }else{
            error("res_data without id!");
        }
    },

    //开启msg_info_wid面板
    "_info_wid_": function(msg, $tr, state){
        var sw = false, id;

        /*初始化操作数据项id*/
        if($tr && (id = $tr.attr("id"))){
            this.$cur_tr = $tr;
            this.cur_id = id;
        }
        msg && this.$msg_info_wid_title.text(msg);//控件标题
        this.$msg_info_wid.attr("state", state);

        /*控件数据初始化*/
        if(state === "mod" && this.$tbody.attr("state") === "edit"){//修改数据
            var datas = {};

            this.$thead.children("[data-role]").each(function(){
                var name = $(this).data("role"), $rd = $tr.children("td").eq($(this).index());

                if(name.search("img-") === 0){//图片数据
                    datas[name.substr(4)] = $rd.children("img").attr("src");
                }else{
                    datas[name] = $rd.text();
                }
            })
            for(var name in datas){
                var $inp = this.$msg_info_wid.find("[data-name='"+ name +"']");//优先获取data-name="name"表单元素

                if($inp.length === 0) $inp = this.$msg_info_wid.find("[name='"+ name +"']");//其次获取name="name"表单元素
                if($inp.size() > 0){
                    if($inp.parents(".mi-w-cont-p").hasClass("mi-w-only-add")) $inp.attr("disabled", true);//禁用“仅加”项

                    /*预览图-file数据*/
                    if($inp[0].nodeName.toLowerCase() === "img"){
                        $inp[0].onerror = function(){ this.src = CDN + "res/upload.png" }//未上传图片使用默认“上传图示”
                        $inp.attr("src", datas[name]);
                        $B.reset_upload($inp);
                    }

                    /*下拉列表数据*/
                    else if($inp[0].nodeName.toLowerCase() === "select"){
                        $B.reset_select($inp, datas[name]);
                    }

                    /*表单数据*/
                    else{
                        $inp.val(datas[name]);
                    }

                }
            }
            sw = true;
        }else if(state === "add"){//新增数据
            /*复位模态窗组件数据*/
            var $cover_img = this.$msg_info_wid_cover;

            $cover_img && $cover_img.attr("src", CDN + "res/upload.png");//上传封面

            /*复位可填表单项*/
            this.$msg_info_wid.find("input, textarea").not("[type='hidden']").val("").each(function(i, inp){
                var $inp = $(inp);

                $inp.attr("disabled", $inp.parents(".mi-w-cont-p").hasClass("mi-w-only-mod")? true: false);//禁用“仅改”项及“禁用”项
            })

            if(this.editer) this.editer.setContent("");//复位超文本编辑器
            sw = true
        }
        if(sw === true) $B.toggle(this.$msg_info_wid, true, {"view_center":true});

    },

    //构造ueditor数据
    /*
     * 数据接口：?Cms/get_article
     */
    "_init_ueditor_": function(){
        var editer = this.editer, post_data = $B.get_form_data(this.$msg_info_wid);

        post_data["article_id"] = this.cur_id;
        $B.request("?Cms/get_article", post_data, function(art){
            art = art.replace(/\{\$RES\}/g, RES);
            editer.setContent(art);
        });
    },

    //执行数据新增
    "_operate_append_": function(post_data, success){
        var _this = this;

        $B.request(post_data, function(data){
            $B.toggle(_this.$msg_info_wid, true, {"callback": function(){
                var tr = '<tr data-btn>', $tr, role;

                /*配置新增模版*/
                _this.$thead.children("td").each(function(i, td){
                    role = $(td).data("role");
                    tr += "<td" + ($(td).hasClass("hide")? ' class="hide">': '>');
                    tr += (role && role.indexOf("img-") === 0? "<img />": "" ) + "</td>";
                })
                tr += "</tr>";
                $tr = $(tr);

                _this._pad_data_to_tr_($tr, data);//填充数据
                _this.$tbody.prepend($tr);
                $tr.ani("show", {"callback": function(){
                    success && success(data);//成功回调
                    $B.toast("添加成功!", "success");
                }});
            }});
        });
    },

    //新增（更新）文章文件
    /*
     * 数据接口：?Cms/add_article
     */
    "_append_article_": function(article_id, type){
        var cont = this.editer.getContent(),
            res_str = RES.replace(/\./g, "\\.?");

        res_str = 'src="[\\w\\/]*' + res_str.replace(/\//g, "\\/");
        $B.request("?Cms/add_article", {
            "article_id": article_id,
            "type": type,
            "article": cont.replace(new RegExp(res_str, "g"), 'src="{$RES}')
        });
    },

    //执行数据删除
    "_operate_delete_": function(post_data){
        var _this = this, $cur_tr = this.$cur_tr;

        post_data["id"] = this.cur_id;
        $B.request(post_data, function(){
            $B.toggle(_this.$msg_info_wid, true, {"callback": function(){
                $cur_tr && $cur_tr.ani("hide", {"callback":function(){
                    $cur_tr.detach();
                    $B.toast("删除成功!", "success");
                }});
            }});
        })
    },

    //执行数据修改
    "_operate_mod_": function(post_data, success){
        var _this = this, $tr = this.$cur_tr;

        post_data["_id"] = this.cur_id;
        $B.request(post_data, function(data){
            success && success(data);
            $B.toggle(_this.$msg_info_wid, true, {"callback": function(){
                _this._pad_data_to_tr_($tr, data);
                $B.toast("修改成功!", "success");
            }});
        });
    },

    //更改数据状态
    /*
    * 数据接口：?Cms/read_data
    */
    "_change_state_": function(){
        var $self = this;

        $B.request("?Cms/read_data", {"id": this.cur_id}, function(){
            $self.$cur_tr.find("td.mod-table-l-state-red").removeClass("mod-table-l-state-red").addClass("mod-table-l-state-green");
        })
    }
}