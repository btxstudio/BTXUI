/*
 * author: btxstudio
 * 微信界面基本控制
 */

function WX(){
	}

WX.prototype = {
    //微信环境检测
    /*
     * [fn successfn]:微信环境判断“是”执行回调函数
     * [fn errorfn]:微信环境判断“否”执行回调函数
     */
    "is_wechat_browser":function(successfn, errorfn){
        var result = /micromessenger/i.test(navigator.userAgent)?true:false;
        result === true?(successfn || function(){})():(errorfn || function(){})();
        return result;
    },

    //微信环境禁用,外部浏览器使用提示
    "out_wechat_browser":function(){
        this.is_wechat_browser(function(){
            var notice_frame = $("<div id='wechat_browser_frame'><h2>请使用外部浏览器!</h2><p><small>Please Use Browser Outside</small></p><p>“ 点击右上角 ... ，可以在 Safari 或其它浏览器中打开该应用 ! ”</p></div>");
            this._notice_(notice_frame);
        });
    },

    //微信分享提示
    "share_notice":function(){
        var notice_frame = $("<div id='wechat_browser_frame'><h2>微信分享!</h2><p><small>Wechat Share Operation</small></p><p>“ 点击右上角 ... ，可以 '发送给朋友' 或 '分享到朋友圈' ! ”</p></div>");
        this._notice_(notice_frame);
    },

    /*-------------------------------------------------------------------------------------------------------*/

    /*私有方法*/

    "_notice_":function(notice_frame){
        var up_pointer = $("<span id='up_pointer' class='icon-point-up'></span>");
        notice_frame.prepend(up_pointer);
        $("body").prepend(notice_frame);
        btx_matte("#051c24", 1);
        center_ele(notice_frame);
    }
}




