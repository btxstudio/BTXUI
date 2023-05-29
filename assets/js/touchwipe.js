/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */

(function ($) {
    $.fn.touchwipe = function (settings) {

        //【OK】配置参数
        var config = {

            /*阈值设置*/
            min_move_x: 20,
            min_move_y: 20,

            /*横向活动回调函数*/

            wipeLeft: function () {
            },
            wipeRight: function () {
            },

            /*纵向活动回调函数*/
            wipeUp: function () {
            },
            wipeDown: function () {
            },

            preventDefaultEvents: true//阻止默认
        };

        if (settings) $.extend(config, settings);//配置扩展

        this.each(function () {
            var startX;
            var startY;
            var isMoving = false;

            //【OK】取消触控
            function cancelTouch() {
                this.removeEventListener('touchmove', onTouchMove);//解绑事件

                /*复位触控起始点*/
                startX = null;
                startY = null;

                isMoving = false;//解除滑动状态
            }

            //【OK】触控移动
            function onTouchMove(e) {
                if (config.preventDefaultEvents) {//阻止默认行为：exp：仅支持水平切换，垂直方向切换无效果
                    e.preventDefault();
                }
                if (isMoving) {//记录滑动状态时执行

                    /*触控位移计算*/
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
                    var dx = startX - x;
                    var dy = startY - y;

                    if (Math.abs(dx) >= config.min_move_x) {//水平方向滑动
                        cancelTouch();
                        if (dx > 0) {
                            config.wipeLeft();
                        }
                        else {
                            config.wipeRight();
                        }
                    }
                    else if (Math.abs(dy) >= config.min_move_y) {//垂直方向滑动
                        cancelTouch();
                        if (dy > 0) {
                            config.wipeDown();
                        }
                        else {
                            config.wipeUp();
                        }
                    }
                }
            }

            //【OK】触控开始
            function onTouchStart(e) {
                if (e.touches.length == 1) {//仅支持单点滑动

                    /*记录触控起始点*/
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;

                    isMoving = true;//记录滑动状态
                    this.addEventListener('touchmove', onTouchMove, false);//绑定触控滑动事件
                }
            }

            //【OK】主程序：在支持触屏交互的环境下执行
            if ('ontouchstart' in document.documentElement) {
                this.addEventListener('touchstart', onTouchStart, false);
            }
        });

        return this;
    };

})(jQuery);
