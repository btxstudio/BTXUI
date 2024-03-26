<template>
    <article>
        <p>BTX·UI 提供了一些装饰类以实现常见的特殊样式处理及细节设置。</p>

        <!--背景-->
        <section class="mrg-t-5">
            <h5>背景</h5>
            <p>框架封装了 background 基础样式，包括定位、尺寸及重复（框架预置为不重复）。</p>
            <table class="table mrg-b-3">
                <thead>
                <tr>
                    <th>样式类</th>
                    <th>效果</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <code>.bg-fixed</code>
                    </td>
                    <td>背景图固定式定位（手机端无效）</td>
                </tr>
                <tr>
                    <td>
                        <code>.brepeat</code>
                    </td>
                    <td>背景图水平及垂直平铺</td>
                </tr>
                <tr>
                    <td>
                        <code>.brepeat-x</code>
                    </td>
                    <td>背景图水平平铺</td>
                </tr>
                <tr>
                    <td>
                        <code>.brepeat-y</code>
                    </td>
                    <td>背景图垂直平铺</td>
                </tr>
                <tr>
                    <td>
                        <code>.bsize-cover</code>
                    </td>
                    <td>背景图尺寸覆盖容器</td>
                </tr>
                <tr>
                    <td>
                        <code>.bsize-contain</code>
                    </td>
                    <td>背景图尺寸适应容器</td>
                </tr>
                <tr>
                    <td>
                        <code>.bsize-max</code>
                    </td>
                    <td>背景图尺寸撑满容器</td>
                </tr>
                <tr>
                    <td>
                        <code>.bsize-max-h</code>
                    </td>
                    <td>背景图高度尺寸撑满容器</td>
                </tr>
                <tr>
                    <td>
                        <code>.bsize-max-w</code>
                    </td>
                    <td>背景图宽度尺寸撑满容器</td>
                </tr>
                </tbody>
            </table>
            <p>通过 <code>.bpos-*</code> 样式类，值域为：1 — 9。可以对背景图进行九宫格式对齐定位。</p>
            <p>【示例】：</p>
            <div class="flex pcenter rw-100">
                <div class="col-4 pad-d5">
                    <div class="bpos-1 h-5 round-sm bg-color-lgray mrg-b-d5"
                         style="background-image: url('/img/f.png')"></div>
                    <div><code>.bpos-1</code></div>
                </div>
                <div class="col-4 pad-d5">
                    <div class="bpos-2 h-5 round-sm bg-color-lgray mrg-b-d5"
                        style="background-image: url('/img/f.png')"></div>
                    <div><code>.bpos-2</code></div>
                </div>
                <div class="col-4 pad-d5">
                    <div class="bpos-3 h-5 round-sm bg-color-lgray mrg-b-d5"
                        style="background-image: url('/img/f.png')"></div>
                    <div><code>.bpos-3</code></div>
                </div>
                <div class="col-4 pad-d5">
                    <div class="bpos-4 h-5 round-sm bg-color-lgray mrg-b-d5"
                        style="background-image: url('/img/f.png')"></div>
                    <div><code>.bpos-4</code></div>
                </div>
                <div class="col-4 pad-d5">
                    <div class="bpos-5 h-5 round-sm bg-color-lgray mrg-b-d5"
                        style="background-image: url('/img/f.png')"></div>
                    <div><code>.bpos-5</code></div>
                </div>
                <div class="col-4 pad-d5">
                    <div class="bpos-6 h-5 round-sm bg-color-lgray mrg-b-d5"
                        style="background-image: url('/img/f.png')"></div>
                    <div><code>.bpos-6</code></div>
                </div>
                <div class="col-4 pad-d5">
                    <div class="bpos-7 h-5 round-sm bg-color-lgray mrg-b-d5"
                        style="background-image: url('/img/f.png')"></div>
                    <div><code>.bpos-7</code></div>
                </div>
                <div class="col-4 pad-d5">
                    <div class="bpos-8 h-5 round-sm bg-color-lgray mrg-b-d5"
                        style="background-image: url('/img/f.png')"></div>
                    <div><code>.bpos-8</code></div>
                </div>
                <div class="col-4 pad-d5">
                    <div class="bpos-9 h-5 round-sm bg-color-lgray mrg-b-d5"
                        style="background-image: url('/img/f.png')"></div>
                    <div><code>.bpos-9</code></div>
                </div>
            </div>
        </section>

        <!--圆角-->
        <section class="mrg-t-5">
            <h5>圆角</h5>
            <table class="table mrg-b-3" response>
                <thead>
                <tr>
                    <th>样式类</th>
                    <th>效果</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <code>.round</code>
                    </td>
                    <td>50% 圆角，可用于制作正圆形或椭圆形</td>
                </tr>
                <tr>
                    <td>
                        <code>.round-lg</code>
                    </td>
                    <td>24px 大圆角</td>
                </tr>
                <tr>
                    <td>
                        <code>.round-md</code>
                    </td>
                    <td>10px 中等圆角</td>
                </tr>
                <tr>
                    <td>
                        <code>.round-sm</code>
                    </td>
                    <td>4px 小型圆角</td>
                </tr>
                <tr>
                    <td>
                        <code>.round-t</code>
                    </td>
                    <td>上侧圆角</td>
                </tr>
                <tr>
                    <td>
                        <code>.round-b</code>
                    </td>
                    <td>下侧圆角</td>
                </tr>
                <tr>
                    <td>
                        <code>.round-l</code>
                    </td>
                    <td>左侧圆角</td>
                </tr>
                <tr>
                    <td>
                        <code>.round-r</code>
                    </td>
                    <td>右侧圆角</td>
                </tr>
                </tbody>
            </table>
            <p>使用圆角样式可用于头像之类的图像制作。</p>
            <p>【示例】：</p>
            <div class="flex pcenter">
                <div class="pad-d5"><img class="w-9 w-7-s" src="/img/head.jpg"/><br>方形头像</div>
                <div class="pad-d5 mrg-l-2"><img class="round-sm w-9 w-7-s" src="/img/head.jpg"/><br>小圆角头像</div>
                <div class="pad-d5 mrg-l-2"><img class="round-md w-9 w-7-s" src="/img/head.jpg"/><br>中等圆角头像</div>
                <div class="pad-d5 mrg-l-2"><img class="round-lg w-9 w-7-s" src="/img/head.jpg"/><br>大圆角头像</div>
                <div class="pad-d5 mrg-l-2"><img class="round w-9 w-7-s" src="/img/head.jpg"/><br>正圆头像</div>
            </div>
        </section>

        <!--描边-->
        <section class="mrg-t-5">
            <h5>描边</h5>
            <p>通过 <code>.solid</code> 可以设置实线描边，<code>.dashed</code> 设置虚线描边 。通过 <code>.line-*</code> 可设置线条颜色，而线条粗细可基于 <code>.thick-*</code> 进行设置，预置值：1、2、4、6、8、10，单位 px。</p>
            <table class="table mrg-b-3">
                <thead>
                <tr>
                    <th>描边类</th>
                    <th>效果</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <code>.solid</code>
                    </td>
                    <td>设置四周实线描边</td>
                </tr>
                <tr>
                    <td>
                        <code>.solid-l</code>
                    </td>
                    <td>设置左侧实线描边</td>
                </tr>
                <tr>
                    <td>
                        <code>.solid-r</code>
                    </td>
                    <td>设置右侧实线描边</td>
                </tr>
                <tr>
                    <td>
                        <code>.solid-t</code>
                    </td>
                    <td>设置上侧实线描边</td>
                </tr>
                <tr>
                    <td>
                        <code>.solid-b</code>
                    </td>
                    <td>设置下侧实线描边</td>
                </tr>
                <tr>
                    <td>
                        <code>.dashed</code>
                    </td>
                    <td>设置四周虚线描边</td>
                </tr>
                <tr>
                    <td>
                        <code>.dashed-l</code>
                    </td>
                    <td>设置左侧虚线描边</td>
                </tr>
                <tr>
                    <td>
                        <code>.dashed-r</code>
                    </td>
                    <td>设置右侧虚线描边</td>
                </tr>
                <tr>
                    <td>
                        <code>.dashed-t</code>
                    </td>
                    <td>设置上侧虚线描边</td>
                </tr>
                <tr>
                    <td>
                        <code>.dashed-b</code>
                    </td>
                    <td>设置下侧虚线描边</td>
                </tr>
                </tbody>
            </table>
            <p>设置描边效果（描边色需为半透明色）时，可通过 <code>.line-outside</code> 样式类设置其 "应用范围" 为外侧。</p>
            <p>【示例】：</p>
            <div class="flex">
                <div class="mrg-r-2d5">
                    <div class="rel">
                        <img class="round-md flex w-9" src="/img/head2.jpg"/>
                        <div class="abs max flex-5 t-0">
                            <div class=" round w-5 h-5 bg-color-dgray solid line-neutral thick-10"></div>
                        </div>
                    </div>
                    <div class="pcenter mrg-t-1">默认效果</div>
                </div>
                <div class="rel">
                    <div class="rel">
                        <img class="round-md flex w-9" src="/img/head2.jpg"/>
                        <div class="abs max flex-5 t-0">
                            <div class="round w-5 h-5 bg-color-dgray solid line-neutral thick-10 line-outside"></div>
                        </div>
                    </div>
                    <div class="pcenter mrg-t-1">外侧描边范围</div>
                </div>
            </div>
        </section>

        <!--文字描边-->
        <section class="mrg-t-5">
            <h5>文字描边</h5>
            <p>使用 <code>.text-line</code> 样式类可以设置文字的描边效果，描边颜色为中性半透明灰色。</p>
            <div class="flex rw-100">
                <div class="grow-1 h-4 flex-5 bg-color-mgray round-sm text-line fsize-1d2">Hello World
                </div>
                <div class="grow-1 h-4 flex-5 solid thick-1 color-lgray round-sm text-line fsize-1d2 mrg-l-2">
                    <span class="color-dgray">Hello World</span>
                </div>
            </div>
        </section>

        <!--阴影-->
        <section class="mrg-t-5">
            <h5>阴影</h5>
            <p>框架预置了几种常用的盒子阴影样式，阴影的颜色可以通过颜色类进行设置。</p>
            <div class="flex pcenter rw-100">
                <div class="col-2d4 pad-d5 col-6-s">
                    <div class="solid thick-1 color-lgray max-w h-7 round-sm shadow-no color-dgray flex-5">
                        <div>
                            <div><code>.shadow-no</code></div>
                            <div class="mrg-t-1 color-dgray">无阴影</div>
                        </div>
                    </div>
                </div>
                <div class="col-2d4 pad-d5 col-6-s">
                    <div class="solid thick-1 color-lgray max-w h-7 round-sm shadow color-dgray flex-5">
                        <div>
                            <div><code>.shadow</code></div>
                            <div class="mrg-t-1 color-dgray">普通尺寸阴影</div>
                        </div>
                    </div>
                </div>
                <div class="col-2d4 pad-d5 col-6-s">
                    <div class="solid thick-1 color-lgray max-w h-7 round-sm shadow-sm color-dgray flex-5">
                        <div>
                            <div><code>.shadow-sm</code></div>
                            <div class="mrg-t-1 color-dgray">小尺寸阴影</div>
                        </div>
                    </div>
                </div>
                <div class="col-2d4 pad-d5 col-6-s">
                    <div class="solid thick-1 color-lgray max-w h-7 round-sm shadow-lg color-dgray flex-5">
                        <div>
                            <div><code>.shadow-lg</code></div>
                            <div class="mrg-t-1 color-dgray">大尺寸阴影</div>
                        </div>
                    </div>
                </div>
                <div class="col-2d4 pad-d5 col-12-s">
                    <div class="solid thick-1 color-lgray max-w h-7 round-sm bg-color-mgray flex-5">
                        <div class="shadow-relief round-sm bg-color-dgray pad-h-1">
                            <div><code>.shadow-relief</code></div>
                            <div class="mrg-t-1 color-mgray">浮雕阴影效果</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!--分割线-->
        <section class="mrg-t-5">
            <h5>分割线</h5>
            <p>BTX·UI 重置了 <code>&lt;hr&gt;</code> 分割线样式，同时适用于深、浅背景。</p>
            <p>【示例】：</p>
            <div class="flex pcenter rw-100">
                <div class="grow-1 mrg-r-2">
                    <div class="bg-color-dgray pad-d5 round-sm">
                        <hr/>
                    </div>
                    <div class="pad-t-d5">深色背景效果</div>
                </div>
                <div class="grow-1">
                    <div class="line-lgray solid thick-1 pad-d5 round-sm">
                        <hr/>
                    </div>
                    <div class="pad-t-d5">浅色背景效果</div>
                </div>
            </div>
        </section>

        <!--三角形-->
        <section class="mrg-t-5">
            <h5>三角形</h5>
            <p>可以使用框架预置的三角形（基于 border 样式实现，默认粗细 4px）。</p>
            <table class="table">
                <thead>
                <tr>
                    <th>样式类</th>
                    <th>效果</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <code>.triangle-l</code>
                    </td>
                    <td>左侧三角形</td>
                </tr>
                <tr>
                    <td>
                        <code>.triangle-r</code>
                    </td>
                    <td>左侧三角形</td>
                </tr>
                <tr>
                    <td>
                        <code>.triangle-t</code>
                    </td>
                    <td>上侧三角形</td>
                </tr>
                <tr>
                    <td>
                        <code>.triangle-b</code>
                    </td>
                    <td>下侧三角形</td>
                </tr>
                </tbody>
            </table>
        </section>

        <!--滤镜-->
        <section class="mrg-t-5">
            <h5>滤镜</h5>
            <p>可以使用 css3 filter 滤镜效果，包括：blur（模糊）、dark（暗色）、gray（低饱和）。需要注意的是由于都是控制的 filter 样式属性，因此叠加使用会出现覆盖的情况，可以通过嵌套 dom 结构的方式进行样式混合。</p>
            <table class="table mrg-b-3">
                <thead>
                <tr>
                    <th>样式类</th>
                    <th>效果</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <code>.blur-no</code>
                    </td>
                    <td>无模糊效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.blur-sm</code>
                    </td>
                    <td>轻度模糊效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.blur-md</code>
                    </td>
                    <td>中度模糊效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.blur-lg</code>
                    </td>
                    <td>重度模糊效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.dark-no</code>
                    </td>
                    <td>原始明度效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.dark-sm</code>
                    </td>
                    <td>轻度低明度效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.dark-md</code>
                    </td>
                    <td>中度低明度效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.dark-lg</code>
                    </td>
                    <td>重度低明度效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.gray-no</code>
                    </td>
                    <td>原始纯度效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.gray-sm</code>
                    </td>
                    <td>轻度低纯度效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.gray-md</code>
                    </td>
                    <td>中度低纯度效果</td>
                </tr>
                <tr>
                    <td>
                        <code>.gray-lg</code>
                    </td>
                    <td>重度低纯度效果</td>
                </tr>
                </tbody>
            </table>
            <div>
                <p>【示例】模糊效果：</p>
                <div class="flex pcenter">
                    <div class="mrg-r-2d5"><img class="round-md w-9 blur-no" src="/img/head.jpg"/><br>无模糊</div>
                    <div class="mrg-r-2d5"><img class="round-md w-9 blur-sm" src="/img/head.jpg"/><br>轻度模糊</div>
                    <div class="mrg-r-2d5"><img class="round-md w-9 blur-md" src="/img/head.jpg"/><br>中度模糊</div>
                    <div><img class="round-md w-9 blur-lg" src="/img/head.jpg"/><br>重度模糊</div>
                </div>
                <p>【示例】明度效果：</p>
                <div class="flex pcenter">
                    <div class="mrg-r-2d5"><img class="round-md w-9 dark-no" src="/img/head.jpg"/><br>原始明度</div>
                    <div class="mrg-r-2d5"><img class="round-md w-9 dark-sm" src="/img/head.jpg"/><br>轻度低明度</div>
                    <div class="mrg-r-2d5"><img class="round-md w-9 dark-md" src="/img/head.jpg"/><br>中度低明度</div>
                    <div class="mrg-r-2d5"><img class="round-md w-9 dark-lg" src="/img/head.jpg"/><br>重度低明度</div>
                </div>
                <p>【示例】纯度效果：</p>
                <div class="flex pcenter">
                    <div class="mrg-r-2d5"><img class="round-md w-9 gray-no" src="/img/head.jpg"/><br>原始纯度</div>
                    <div class="mrg-r-2d5"><img class="round-md w-9 gray-sm" src="/img/head.jpg"/><br>轻度低纯度</div>
                    <div class="mrg-r-2d5"><img class="round-md w-9 gray-md" src="/img/head.jpg"/><br>中度低纯度</div>
                    <div><img class="round-md w-9 gray-lg" src="/img/head.jpg"/><br>重度低纯度</div>
                </div>
            </div>
        </section>
    </article>
</template>