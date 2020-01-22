/*导航菜单组件*/

function NavMenu($dom, opt){
    this.menu = $dom.find("#Menu");                         //导航菜单面板
    this.$erweima = $dom.find(".erweima-widget img");       //二维码
    this.nav_selector = ".nav-l-anchor";                    //导航按钮选择器
    this.hover_selector = ".share-w-anchor";                //分享按钮选择器
}

NavMenu.prototype = {

    /*切换导航*/
    "toggle_menu": function($btn){
        this.click($btn, function(p){ $B.toggle(p.menu, true) })
    },

    /*导航跳转*/
    "nav_go": function($list){
        this.click($list, this.nav_selector, function(p){
            $B.scroll($(this).attr("href"), 700, function(){ $B.toggle(p.menu, true) });
        })
    },

    /*悬停显现*/
    "hover_show": function($list){
        var show_src, $erweima = this.$erweima;

        $list.find(this.hover_selector).hover(function(e){
            show_src = $(this).data("hover");
            if(show_src){
                $erweima.attr("src", RES + "footage/images/" + show_src + ".jpg");
                $B.toggle($erweima);
            }
        }, function(){
            if(show_src) $B.toggle($erweima);
        })
    }
}