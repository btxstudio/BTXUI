$(document).ready(function(){
    (function(){
        /*响应式处理*/
        var media = Init.media_query()["media"];
        if(media == "mobile"){//【app】手机端

            /*导航重构*/
            $("#Subnav ul").append($("#Logo")).prepend($("#Home"));
            $("#Stage").after($("#Mainnav"));

        }else{//【web】
            /*设置版权信息*/
            var now = new Date();
            $("#Curyear").text(now.getFullYear());
            $("#Cururl").text(location.host);

            if(media == "pad"){//平板端

            }else if(media == "pc"){//PC端

                /*加载js.css实现悬停特效*/
                $("head").append("<link type='text/css' rel='stylesheet' href='"+CDN_HOST+"pro/css/index.js.css' />");

            }
        }

        /*-----------------------------------------------------------------------------------------------------------*/

        /*common*/
        /*$("#Stage[class='banner_static']").on("click", function(e){
            alert(e.target)
        })*/
        /*stage_banner特效*/
        var percent_max = $(window).height(), percent_s = percent_max/4, percent_e = percent_s*3, p = 0, offset;
            _p = scroll_listen($(window).scrollTop(), true);//初始化

        /*stage_banner特效-滚动监听*/
        $(window).scroll(function(){
            p = $(window).scrollTop();
            if(percent_s < _p && _p < percent_e) scroll_listen(p);
            _p = p;
        })
        $("body").on("touchmove", function(){
            p = $(window).scrollTop();
            if(percent_s < _p && _p < percent_e) scroll_listen(p);
            _p = p;
        })

        function scroll_listen(p, init){
            if(p >= percent_s && p < percent_e){//开始变化
                offset = (p - percent_s)/(percent_e - percent_s);//之后需使用number_fixed加工数值以防止浮点数的误差
                $opa = number_fixed(offset, 2);
            }else if(p >= percent_e){//完全显现
                $opa = 1;
            }else{//完全隐藏
                $opa = 0;
            }
            //$(".header_bg").css("opacity", number_fixed(offset, 2));
            $("#Stage[class='banner_static']>[data-banner='btx_banner']>[data-banner-slider='yes']:first-child>figure").css("opacity", $opa);
            $("#Stage[class='banner_static']>[data-banner='btx_banner']>[data-banner-slider='yes']:first-child>.custom").css("opacity", 1-$opa);
            if(init === true) return p;
        }

        /*-----------------------------------------------------------------------------------------------------------*/

        init.external({
            //开启“关于我们”页面
            "sel_about_theme":function(btn){
                //window.open("?c=Index&a=about&id="+btn.self.parents(".list_block").attr("id"), "about");
            },

            //查看banner
            "banner_show":function(btn){
                var name = btn.self.attr("data-name");
                toggle($("#BannerPannel"+name), function(){
                    this.css({
                        "-webkit-transform": "translateY(0)",
                        "-moz-transform": "translateY(0)",
                        "-ms-transform": "translateY(0)",
                        "-o-transform": "translateY(0)"
                    });
                }, function(){
                    this.css({
                        "-webkit-transform": "translateY(-840px)",
                        "-moz-transform": "translateY(-840px)",
                        "-ms-transform": "translateY(-840px)",
                        "-o-transform": "translateY(-840px)"
                    });
                });
            },

            //塌陷/展开block块儿
            "list_collapse":function(ele){
                toggle(ele.self.parents(".list_block").children(":not(h2)"), function(){
                    ele.self.addClass("reverse");
                    this.hide(0);
                }, function(){
                    ele.self.removeClass("reverse");
                    this.show(0);
                })
            }
        })
    })()
})

