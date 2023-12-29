<template>
    <article>
        <p>BTX·UI 预置并优化了基础文本的常用样式，此外提供了响应式能力。</p>

        <!--文本对齐-->
        <section class="mrg-t-5">
            <h5>文本对齐</h5>
            <p>该样式类支持响应式后缀：<code>-s</code>（手机端）、<code>-m</code>（平板端）。</p>
            <table class="table mrg-b-3">
                <thead>
                <tr>
                    <th>样式类</th>
                    <th>效果</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><code>.pleft</code></td>
                    <td>文本左对齐</td>
                </tr>
                <tr>
                    <td><code>.pright</code></td>
                    <td>文本右对齐</td>
                </tr>
                <tr>
                    <td><code>.pcenter</code></td>
                    <td>文本居中对齐</td>
                </tr>
                <tr>
                    <td><code>.pjustify</code></td>
                    <td>文本两端对齐</td>
                </tr>
                </tbody>
            </table>
            <p>【示例】：</p>
            <div class="grid rw-100">
                <div class="col-3 pad-d5 col-6-s">
                    <div class="bg-color-lgray round-sm pad-2 pleft">
                        在重视劳动和尊重劳动者的基础上，我们有可能来创造自己的新的道德。劳动和科学是世界上最伟大的两种力量。
                    </div>
                    <div class="pcenter pad-t-d5">pleft</div>
                </div>
                <div class="col-3 pad-d5 col-6-s">
                    <div class="bg-color-lgray round-sm pad-2 pright">
                        在重视劳动和尊重劳动者的基础上，我们有可能来创造自己的新的道德。劳动和科学是世界上最伟大的两种力量。
                    </div>
                    <div class="pcenter pad-t-d5">pright</div>
                </div>
                <div class="col-3 pad-d5 col-6-s">
                    <div class="bg-color-lgray round-sm pad-2 pcenter">
                        在重视劳动和尊重劳动者的基础上，我们有可能来创造自己的新的道德。劳动和科学是世界上最伟大的两种力量。
                    </div>
                    <div class="pcenter pad-t-d5">pcenter</div>
                </div>
                <div class="col-3 pad-d5 col-6-s">
                    <div class="bg-color-lgray round-sm pad-2 pjustify">
                        在重视劳动和尊重劳动者的基础上，我们有可能来创造自己的新的道德。劳动和科学是世界上最伟大的两种力量。
                    </div>
                    <div class="pcenter pad-t-d5">pjustify</div>
                </div>
            </div>
        </section>

        <!--字号-->
        <section class="mrg-t-5">
            <h5>字号</h5>
            <p>通过 <code>.fsize-*</code> 可以设置元素内文本以及后代元素的文本字号，这里的字号为相对根元素的字号放缩比率 rem。</p>
            <p>预置的字号比率值：0 — 0.9、1 — 1.9、2、2.5、3、3.5、4、4.5、5、5.5，单位 em。数值 "." 使用 "d" 代替，"0" 使用 "" 空字符串代替。比如缩小为 0.9 倍，类名为 <code>.fsize-d9</code>。<code>.fsize-0</code> 可设置 0 号字。</p>
            <p>该样式类支持响应式后缀：<code>-s</code>（手机端）、<code>-m</code>（平板端）。</p>
            <p>【示例】：</p>
            <div class="grid pcenter rw-100">
                <div class="col-3 pad-d5 col-6-s">
                    <div class="bg-color-lgray round-sm flex-5 h-6">javascript</div>
                    <div class="pad-t-d5">初始文本大小</div>
                </div>
                <div class="col-3 pad-d5 col-6-s">
                    <div class="bg-color-lgray round-sm flex-5 h-6 fsize-d9">javascript</div>
                    <div class="pad-t-d5"><code>.fsize-d9</code> 缩小为 0.9 倍字号</div>
                </div>
                <div class="col-3 pad-d5 col-6-s">
                    <div class="bg-color-lgray round-sm flex-5 fsize-1d2 h-6">javascript</div>
                    <div class="pad-t-d5"><code>.fsize-1d2</code> 放大 1.2 倍字号</div>
                </div>
                <div class="col-3 pad-d5 col-6-s">
                    <div class="bg-color-lgray round-sm flex-5 fsize-2 h-6">javascript
                    </div>
                    <div class="pad-t-d5"><code>.fsize-2</code> 放大 2 倍字号</div>
                </div>
            </div>
        </section>

        <!--字符间距-->
        <section class="mrg-t-5">
            <h5>字符间距</h5>
            <p>通过 <code>.lspace-*</code> 可以设置文本内容的字符间距。默认的字符间距，框架已经进行了 1px 的初始化，预置的间距值：0 — 5，单位 px。</p>
            <p>该样式类支持响应式后缀：<code>-s</code>（手机端）、<code>-m</code>（平板端）。</p>
        </section>

        <!--标题-->
        <section class="mrg-t-5">
            <h5>标题</h5>
            <p>BTX·UI 重置了 <code>&lt;h1&gt;</code> - <code>&lt;h6&gt;</code> 的标题样式。使用相对单位 em，由 <code>&lt;h6&gt;</code>
                到 <code>&lt;h1&gt;</code> 字号逐渐放大至 2 倍。</p>
            <p>【示例】：</p>
            <div class="flex-4 rw-50">
                <h1 class="grow-1">h1</h1>
                <h2 class="grow-1">h2</h2>
                <h3 class="grow-1">h3</h3>
                <h4 class="grow-1">h4</h4>
                <h5 class="grow-1">h5</h5>
                <h6>h6</h6>
            </div>
        </section>

        <!--省略文本-->
        <section class="mrg-t-5">
            <h5>省略文本</h5>
            <p>通过 <code>.no-wrap</code> 可以设置文本禁止换行。而 <code>.ellipsis</code> 可以设置单行文本溢出省略。</p>
            <p>【示例】：</p>
            <p class="ellipsis w-15">
                <abbr title="javascript 和 php 谁是世界上最好的语言呢？">javascript 和 php 谁是世界上最好的语言呢？</abbr>
            </p>
        </section>

        <!--代码-->
        <section class="mrg-t-5">
            <h5>代码</h5>
            <p>BTX·UI 重置了 <code>&lt;code&gt;</code> 样式，以实现行级代码样式。</p>
            <p>【示例】：</p>
            <p>在编写 javascript 代码时，可以使用 <code>console.log("调试内容")</code> 函数进行调试。</p>
        </section>

        <!--文章格式-->
        <section class="mrg-t-5">
            <h5>文章格式</h5>
            <p>BTX·UI 重置了 <code>&lt;article&gt;</code> 样式，以优化文章阅读格式。在 <code>&lt;article&gt;</code>包裹的内容中：</p>
            <ol>
                <li>基于 1.2rem 的文本大小</li>
                <li>1.7 倍行高</li>
                <li>标题、列表，具有下边距</li>
                <li>拥有 "编辑模式" 样式优化</li>
                <li>图片宽度为 100%</li>
            </ol>
        </section>
    </article>
</template>