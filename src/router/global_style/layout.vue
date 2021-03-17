  <template>
    <article>
        <!--盒子模型-->
        <section>
            <h5>盒子模型</h5>
            <p>BTX·UI 框架对全部元素进行了 "怪异盒模型" 初始化，即 <b>box-sizing: border-box</b>，可通过
                <code>.box-normal</code> 类恢复标准盒模型。</p>
            <p></p>
        </section>

        <!--显示及隐藏-->
        <section>
            <h5>显示及隐藏</h5>
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
                        <code>.show</code>
                    </td>
                    <td>强制元素显示（display: block）</td>
                </tr>
                <tr>
                    <td>
                        <code>.hide</code>
                    </td>
                    <td>强制元素隐藏（display: none）</td>
                </tr>
                </tbody>
            </table>
            <p></p>
        </section>

        <!--版心容器-->
        <section>
            <h5>版心容器</h5>
            <p>
                可以为页面内容和栅格系统包裹一个
                <code>.container</code> 容器，作为版心布局。
            </p>
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
                        <code>.container</code>
                    </td>
                    <td>1200px 宽度，默认版心容器</td>
                </tr>
                <tr>
                    <td>
                        <code>.container-md</code>
                    </td>
                    <td>960px 宽度，中等版心容器</td>
                </tr>
                <tr>
                    <td>
                        <code>.container-sm</code>
                    </td>
                    <td>736px 宽度，小型版心容器</td>
                </tr>
                </tbody>
            </table>
            <p></p>
        </section>

        <!--flex 弹性布局-->
        <section>
            <h5>flex 弹性布局</h5>
            <p>BTX·UI 框架的布局核心是基于 flex 的，<code>.flex</code> 及 <code>.flex-*</code> 样式类，可以对容器内的元素进行九宫格式对齐定位。<code>.flex-between</code> 及 <code>.flex-around</code> 样式类可以设置元素均分排列。而 <code>.flex-column</code> 可以设置纵向生长弹性布局容器。此外框架还提供了 <code>.grow-*</code> 样式类，值域为 0 - 9，共 10 档，用于设置元素的自生长比率。</p>
            <p>通过 <code>.order-*</code> 可以设置弹性布局的项目排序。预置的排序值：0、1、2、3、4、5。</p>
            <p>【示例】：横向生长九宫格对齐定位</p>
            <div class="grid fsize-d9 pcenter">
                <div class="col-4 pad-1">
                    <div class="flex-1 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">1</div>
                    </div>
                    <div><code>.flex-1</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-2 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">2</div>
                    </div>
                    <div><code>.flex-2</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-3 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">3</div>
                    </div>
                    <div><code>.flex-3</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-4 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">4</div>
                    </div>
                    <div><code>.flex-4</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-5 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">5</div>
                    </div>
                    <div><code>.flex-5</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-6 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">6</div>
                    </div>
                    <div><code>.flex-6</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-7 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">7</div>
                    </div>
                    <div><code>.flex-7</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-8 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">8</div>
                    </div>
                    <div><code>.flex-8</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-9 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">9</div>
                    </div>
                    <div><code>.flex-9</code></div>
                </div>
            </div>
            <p></p>
            <p>【示例】：竖向生长九宫格对齐定位</p>
            <div class="grid fsize-d9 pcenter">
                <div class="col-4 pad-1">
                    <div class="flex-column flex-1 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">1</div>
                    </div>
                    <div><code>.flex-1</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-column flex-2 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">2</div>
                    </div>
                    <div><code>.flex-2</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-column flex-3 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">3</div>
                    </div>
                    <div><code>.flex-3</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-column flex-4 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">4</div>
                    </div>
                    <div><code>.flex-4</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-column flex-5 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">5</div>
                    </div>
                    <div><code>.flex-5</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-column flex-6 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">6</div>
                    </div>
                    <div><code>.flex-6</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-column flex-7 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">7</div>
                    </div>
                    <div><code>.flex-7</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-column flex-8 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">8</div>
                    </div>
                    <div><code>.flex-8</code></div>
                </div>
                <div class="col-4 pad-1">
                    <div class="flex-column flex-9 h-5 round-sm bg-color-lgray mrg-b-d5">
                        <div class="w-2 h-2 round-sm bg-color-sub">9</div>
                    </div>
                    <div><code>.flex-9</code></div>
                </div>
            </div>
            <p></p>
        </section>

        <!--栅格系统-->
        <section>
            <h5>栅格系统</h5>
            <p>通过基础的 12 分栏，迅速简便地创建布局。</p>
            <p>【示例】等分布局：</p>
            <div class="pcenter fsize-d8">
                <div class="grid pad-b-1">
                    <div class="col-12 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-12</span>
                    </div>
                </div>
                <div class="grid pad-b-1">
                    <div class="col-6 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-6</span>
                    </div>
                    <div class="col-6 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-6</span>
                    </div>
                </div>
                <div class="grid pad-b-1">
                    <div class="col-4 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-4</span>
                    </div>
                    <div class="col-4 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-4</span>
                    </div>
                    <div class="col-4 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-4</span>
                    </div>
                </div>
                <div class="grid pad-b-1">
                    <div class="col-3 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-3</span>
                    </div>
                    <div class="col-3 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-3</span>
                    </div>
                    <div class="col-3 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-3</span>
                    </div>
                    <div class="col-3 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-3</span>
                    </div>
                </div>
                <div class="grid pad-b-1">
                    <div class="col-2 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-2</span>
                    </div>
                    <div class="col-2 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-2</span>
                    </div>
                    <div class="col-2 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-2</span>
                    </div>
                    <div class="col-2 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-2</span>
                    </div>
                    <div class="col-2 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-2</span>
                    </div>
                    <div class="col-2 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-2</span>
                    </div>
                </div>
                <div class="grid">
                    <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                </div>
            </div>
            <p></p>
            <p>【示例】非等分布局：</p>
            <div class="pcenter fsize-d8">
                <div class="grid pad-b-1">
                    <div class="col-6 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-6</span>
                    </div>
                    <div class="col-4 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-4</span>
                    </div>
                    <div class="col-2 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-2</span>
                    </div>
                </div>
                <div class="grid pad-b-1">
                    <div class="col-11 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-11</span>
                    </div>
                    <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                </div>
                <div class="grid">
                    <div class="col-2 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-2</span>
                    </div>
                    <div class="col-7 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-7</span>
                    </div>
                    <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">col-1</span>
                    </div>
                    <div class="col-2 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">col-2</span>
                    </div>
                </div>
            </div>
            <p></p>
            <p>栅格布局可以通过嵌套来实现更为精细的分段。</p>
            <p>【示例】栅格嵌套布局，实现 24 等分：</p>
            <div class="pcenter fsize-d8">
                <div class="grid pad-b-1">
                    <div class="col-6 grid">
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">1</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">2</span>
                        </div>
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">3</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">4</span>
                        </div>
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">5</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">6</span>
                        </div>
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">7</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">8</span>
                        </div>
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">9</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">10</span>
                        </div>
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">11</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">12</span>
                        </div>
                    </div>
                    <div class="col-6 grid">
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">13</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">14</span>
                        </div>
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">15</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">16</span>
                        </div>
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">17</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">18</span>
                        </div>
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">19</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">20</span>
                        </div>
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">21</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">22</span>
                        </div>
                        <div class="col-1 bg-color-lgray color-mgray line thick-1 round-sm"><span class="color-dgray">23</span>
                        </div>
                        <div class="col-1 bg-color-light color-mgray line thick-1 round-sm"><span class="color-dgray">24</span>
                        </div>
                    </div>
                </div>
            </div>
            <p></p>
        </section>

        <!--多列布局-->
        <section>
            <h5>多列布局</h5>
            <p>通过<code>.column-*</code> 可以使用预置的多列布局方案，常用于实现瀑布流布局。</p>
            <p>预置的列值：1、2、3、4、5。</p>
            <p>【示例】瀑布流布局：</p>
            <div class="column-4">
                <div class="pad-d5 item">
                    <div class="flex-5 h-5 line line-mgray thick-1 round-sm bg-color-lgray ">A</div>
                </div>
                <div class="pad-d5 item">
                    <div class="flex-5 h-8 line line-mgray thick-1 round-sm bg-color-lgray ">B</div>
                </div>
                <div class="pad-d5 item">
                    <div class="flex-5 h-5 line line-mgray thick-1 round-sm bg-color-lgray ">C</div>
                </div>
                <div class="pad-d5 item">
                    <div class="flex-5 h-3 line line-mgray thick-1 round-sm bg-color-lgray ">D</div>
                </div>
                <div class="pad-d5 item">
                    <div class="flex-5 h-10 line line-mgray thick-1 round-sm bg-color-lgray ">E</div>
                </div>
                <div class="pad-d5 item">
                    <div class="flex-5 h-15 line line-mgray thick-1 round-sm bg-color-lgray ">F</div>
                </div>
            </div>
            <p></p>
        </section>

        <!--内边距-->
        <section>
            <h5>内边距</h5>
            <p>通过<code>.pad-*</code> 可以使用预置的内边距方案。</p>
            <p>预置的内边距值：0、0.5、1、1.5、2、2.5、3、3.5、4、5、6、7、8、9、10，单位 rem。数值 "." 使用 "d" 代替，"0" 使用 "" 空字符串代替。比如 0.5 rem 内边距，类名为<code>.pad-d5</code>。</p>
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
                        <code>.pad-*</code>
                    </td>
                    <td>设置 4 个方向的内边距值</td>
                </tr>
                <tr>
                    <td>
                        <code>.pad-v-*</code>
                    </td>
                    <td>设置垂直方向内边距</td>
                </tr>
                <tr>
                    <td>
                        <code>.pad-h-*</code>
                    </td>
                    <td>设置水平方向内边距</td>
                </tr>
                <tr>
                    <td>
                        <code>.pad-l-*</code>
                    </td>
                    <td>设置左侧内边距</td>
                </tr>
                <tr>
                    <td>
                        <code>.pad-r-*</code>
                    </td>
                    <td>设置右侧内边距</td>
                </tr>
                <tr>
                    <td>
                        <code>.pad-t-*</code>
                    </td>
                    <td>设置上侧内边距</td>
                </tr>
                <tr>
                    <td>
                        <code>.pad-b-*</code>
                    </td>
                    <td>设置下侧内边距</td>
                </tr>
                </tbody>
            </table>
            <p></p>
        </section>

        <!--外边距-->
        <section>
            <h5>外边距</h5>
            <p>通过<code>mrg*</code> 可以使用预置的外边距方案。其值域范围等同于内边距，此外可设置 auto 值，但不支持负值。</p>
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
                        <code>.mrg-*</code>
                    </td>
                    <td>设置 4 个方向的外边距值</td>
                </tr>
                <tr>
                    <td>
                        <code>.mrg-v-*</code>
                    </td>
                    <td>设置垂直方向外边距</td>
                </tr>
                <tr>
                    <td>
                        <code>.mrg-h-*</code>
                    </td>
                    <td>设置水平方向外边距</td>
                </tr>
                <tr>
                    <td>
                        <code>.mrg-l-*</code>
                    </td>
                    <td>设置左侧外边距</td>
                </tr>
                <tr>
                    <td>
                        <code>.mrg-r-*</code>
                    </td>
                    <td>设置右侧外边距</td>
                </tr>
                <tr>
                    <td>
                        <code>.mrg-t-*</code>
                    </td>
                    <td>设置上侧外边距</td>
                </tr>
                <tr>
                    <td>
                        <code>.mrg-b-*</code>
                    </td>
                    <td>设置下侧外边距</td>
                </tr>
                </tbody>
            </table>
            <p></p>
        </section>

        <!--尺寸-->
        <section>
            <h5>尺寸</h5>
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
                        <code>.max-h</code>
                    </td>
                    <td>高度撑满容器</td>
                </tr>
                <tr>
                    <td>
                        <code>.max-w</code>
                    </td>
                    <td>宽度撑满容器</td>
                </tr>
                <tr>
                    <td>
                        <code>.max</code>
                    </td>
                    <td>宽度及高度撑满容器</td>
                </tr>
                <tr>
                    <td>
                        <code>.max-screen</code>
                    </td>
                    <td>全屏且溢出隐藏</td>
                </tr>
                </tbody>
            </table>
            <p></p>
            <p>也可以设置具体的宽高尺寸，框架预置了一些宽度 <code>w-*</code> 和高度 <code>h-*</code> 的规格。其值域为：auto、0、0.5、1 — 10、15、20、25、30、35、40、45、50、55、60、65、70、75、80、85、90、95、100，单位 rem。数值 "." 使用 "d" 代替，"0" 使用 "" 空字符串代替。比如 0.5 rem 宽度，类名为 <code>.w-d5</code>。</p>
            <p>【示例】1 rem 至 10 rem 方形：</p>
            <div class="flex-4 flex-between">
                <div class="w-1 h-1 bg-color-lgray round-sm fsize-d8 flex-5">1</div>
                <div class="w-2 h-2 bg-color-lgray round-sm fsize-d8 flex-5">2</div>
                <div class="w-3 h-3 bg-color-lgray round-sm fsize-d8 flex-5">3</div>
                <div class="w-4 h-4 bg-color-lgray round-sm fsize-d8 flex-5">4</div>
                <div class="w-5 h-5 bg-color-lgray round-sm fsize-d8 flex-5">5</div>
            </div>
            <div class="flex-4 flex-between">
                <div class="w-10 h-10 bg-color-lgray round-sm fsize-d8 flex-5">10</div>
                <div class="w-9 h-9 bg-color-lgray round-sm fsize-d8 flex-5">9</div>
                <div class="w-8 h-8 bg-color-lgray round-sm fsize-d8 flex-5">8</div>
                <div class="w-7 h-7 bg-color-lgray round-sm fsize-d8 flex-5">7</div>
                <div class="w-6 h-6 bg-color-lgray round-sm fsize-d8 flex-5">6</div>
            </div>
            <p></p>
            <p>【示例】配合自生长实现弹性布局：</p>
            <div class="flex">
                <div class="w-15 h-2 bg-color-sub"></div>
                <div class="w-d5 h-2 bg-color-dgray"></div>
                <div class="grow-1 bg-color-lgray fsize-d8 pcenter">grow-1</div>
            </div>
            <p></p>
            <p>还可以设置宽高尺寸的最大、最小值进行范围限制，框架预置的宽度限制为 <code>lw-*</code>（最小宽）、<code>rw-*</code>（最大宽）。其值域为：10p、20p、30p、40p、50p、60p、70p、80p、90p，单位 %；高度限制为 <code>th-*</code>（最大高）、<code>bh-*</code>（最小高）。其值域为：10、20、30、40、50、60、70、80、90、100，单位 rem。</p>
            <p></p>
        </section>

        <!--定位方式-->
        <section>
            <h5>定位方式</h5>
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
                        <code>.fixed</code>
                    </td>
                    <td>固定式定位</td>
                </tr>
                <tr>
                    <td>
                        <code>.rel</code>
                    </td>
                    <td>相对定位</td>
                </tr>
                <tr>
                    <td>
                        <code>.abs</code>
                    </td>
                    <td>绝对定位</td>
                </tr>
                </tbody>
            </table>
            <p></p>
        </section>

        <!--z 轴层级-->
        <section>
            <h5>z 轴层级</h5>
            <p>
                框架预置了 -1 — 10 的 z-index 层级样式，通过
                <code>z*</code> 样式类实现。如：-1 为
                <code>z-1</code>、10 为
                <code>z10</code>。
            </p>
            <p></p>
        </section>

        <!--微调-->
        <section>
            <h5>微调</h5>
            <p>BTX·UI 提供了位移及放缩的微调样式，位移微调需基于绝对（absolute）、相对（relative）或固定式（fixed）定位。放缩、旋转微调则是基于 transform 二维变形实现的。</p>
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
                        <code>.l-*-rem|px|p</code>
                    </td>
                    <td>基于左侧水平位移</td>
                </tr>
                <tr>
                    <td>
                        <code>.r-*-rem|px|p</code>
                    </td>
                    <td>基于右侧水平位移</td>
                </tr>
                <tr>
                    <td>
                        <code>.t-*-rem|px|p</code>
                    </td>
                    <td>基于上侧垂直位移</td>
                </tr>
                <tr>
                    <td>
                        <code>.b-*-rem|px|p</code>
                    </td>
                    <td>基于下侧垂直位移</td>
                </tr>
                <tr>
                    <td>
                        <code>.translateX-*</code>
                    </td>
                    <td>基于自身宽度百分比水平位移</td>
                </tr>
                <tr>
                    <td>
                        <code>.translateY-*</code>
                    </td>
                    <td>基于自身高度百分比垂直位移</td>
                </tr>
                <tr>
                    <td>
                        <code>.scale-*</code>
                    </td>
                    <td>放缩</td>
                </tr>
                <tr>
                    <td>
                        <code>.rotate-*</code>
                    </td>
                    <td>旋转</td>
                </tr>
                </tbody>
            </table>
            <p></p>
            <p>位移：</p>
            <p>位移微调的单位支持 px 和 rem，由于框架标准字号是基于 12px 的（手机端为 10px），因此预置的微调位移值值域范围都是 0 — 11，比如基于上侧向下位移 5 像素，类名为 <code>.t-5px</code>。</p>
            <p>如果要进行反向移动，可以通过 "f" 设置负值，比如基于左侧向左位移 2rem，类名为 <code>.t-f2rem</code>。</p>
            <p>可以相对父容器尺寸进行百分比位移，使用单位 "p"。预置的比率值：10%、20%、30%、40%、50%、60%、70%、80%、90%、100%、200%。</p>
            <p>还可以相对自身尺寸进行百分比位移，使用单位 "p"。预置的比率值：10%、25%、50%、100%、200%、500%。</p>
            <p>最后也支持 auto 值设置：<code>.t-auto</code>、<code>.b-auto</code>、<code>.l-auto</code>、<code>.r-auto</code>。</p>
            <p>【示例】基础位移：</p>
            <div class="grid fsize-d8">
                <div class="col-3">
                    <div class="bg-color-mgray round-sm w-10">
                        <div class="rel l-6px h-7 bg-color-lgray flex-5 flex-column round-sm alpha-d9">
                            向右位移 6px<br><code>.l-6px</code></div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="bg-color-mgray round-sm w-10">
                        <div class="rel l-1rem h-7 bg-color-lgray flex-5 flex-column round-sm alpha-d9">
                            向右位移 1rem<br><code>.l-1rem</code></div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="bg-color-mgray round-sm w-10">
                        <div class="rel l-2rem h-7 bg-color-lgray flex-5 flex-column round-sm alpha-d9">
                            向右位移 2rem<br><code>.l-2rem</code></div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="bg-color-mgray round-sm w-10">
                        <div class="rel l-f1rem h-7 bg-color-lgray flex-5 flex-column round-sm alpha-d9">
                            向左位移 1rem<br><code>.l-f1rem</code></div>
                    </div>
                </div>
            </div>
            <p>【示例】基于容器宽高百分比位移：</p>
            <div class="flex-between fsize-d8">
                <div class="bg-color-mgray round-sm w-10">
                    <div class="rel l-100p w-10 h-8 bg-color-lgray flex-5 flex-column round-sm alpha-d9">向右位移容器宽度<b>100%</b><code>.l-100p</code></div>
                </div>
                <div class="bg-color-mgray round-sm w-10 h-8">
                    <div class="rel t-f10p w-10 h-8 bg-color-lgray flex-5 flex-column round-sm alpha-d9">向上位移容器高度<b>10%</b><code>.t-f10p</code></div>
                </div>
                <div class="bg-color-mgray round-sm w-10">
                    <div class="rel l-f50p w-10 h-8 bg-color-lgray flex-5 flex-column round-sm alpha-d9">向左位移容器宽度<b>50%</b><code>.l-f50p</code></div>
                </div>
            </div>
            <p>【示例】基于自身宽高百分比位移：</p>
            <div class="flex-between fsize-d8">
                <div class="bg-color-mgray round-sm w-10">
                    <div class="translateX-50 w-15 h-8 bg-color-lgray flex-5 flex-column round-sm alpha-d9">
                        向右位移自身宽度<b>50%</b><code>translateX-50</code>
                    </div>
                </div>
                <div class="bg-color-mgray round-sm w-10">
                    <div class="translateY-f10 w-15 h-8 bg-color-lgray flex-5 flex-column round-sm alpha-d9">
                        向上位移自身高度<b>10%</b><code>translateY-f10</code>
                    </div>
                </div>
                <div class="bg-color-mgray round-sm w-10">
                    <div class="translateX-f25 w-15 h-8 bg-color-lgray flex-5 flex-column round-sm alpha-d9">
                        向左位移自身宽度<b>25%</b><code>translateX-f25</code>
                    </div>
                </div>
            </div>
            <p></p>
            <p>放缩：</p>
            <p>预置的微调放缩值：0 — 0.9（缩小）；1.1 — 1.9、2 — 10（放大）。比如缩小为 0.5 倍，类名为 <code>.scale-d5</code>。数值 "."
                使用 "d" 代替，"0" 使用 "" 空字符串代替。</p>
            <p>【示例】基于容器宽高百分比位移：</p>
            <div class="flex fsize-d8">
                <div class="flex-column flex-5 pcenter mrg-r-8">
                    <div class="bg-color-dgray w-3 h-3 round">
                        <div class="scale-d5 w-3 h-3 bg-color-mgray round alpha-d7"></div>
                    </div>
                    <div class="mrg-t-1d5">缩小一半<br><code>.scale-d5</code></div>
                </div>
                <div class="flex-column flex-5 pcenter mrg-r-8">
                    <div class="bg-color-dgray w-3 h-3 round">
                        <div class="scale-1d2 w-3 h-3 bg-color-mgray round alpha-d7"></div>
                    </div>
                    <div class="mrg-t-1d5">放大 1.2 倍<br><code>.scale-1d2</code></div>
                </div>
                <div class="flex-column flex-5 pcenter">
                    <div class="bg-color-dgray w-3 h-3 round">
                        <div class="scale-2 w-3 h-3 bg-color-mgray round alpha-d7"></div>
                    </div>
                    <div class="mrg-t-1d5">放大 2 倍<br><code>.scale-2</code></div>
                </div>
            </div>
            <p></p>
            <p>旋转：</p>
            <p>预置的微调旋转角度值：0、15、30、45、90、180、360 度。</p>
            <p>【示例】：</p>
            <div class="flex fsize-d8">
                <div class="flex-column flex-5 pcenter mrg-r-7">
                    <div class="bg-color-dgray w-4 h-4">
                        <div class="flex-5 rotate-15 w-4 h-4 bg-color-mgray alpha-d9 fsize-1d4 color-light">15</div>
                    </div>
                    <div class="mrg-t-1d5">旋转 15 度<br><code>.rotate-15</code></div>
                </div>
                <div class="flex-column flex-5 pcenter mrg-r-7">
                    <div class="bg-color-dgray w-4 h-4">
                        <div class="flex-5 rotate-45 w-4 h-4 bg-color-mgray alpha-d9 fsize-1d4 color-light">45</div>
                    </div>
                    <div class="mrg-t-1d5">旋转 45 度<br><code>.rotate-45</code></div>
                </div>
                <div class="flex-column flex-5 pcenter">
                    <div class="bg-color-dgray w-4 h-4">
                        <div class="flex-5 rotate-180 w-4 h-4 bg-color-mgray alpha-d9 fsize-1d4 color-light">180</div>
                    </div>
                    <div class="mrg-t-1d5">旋转 180 度<br><code>.rotate-180</code></div>
                </div>
            </div>
            <p></p>
            <p>变形中心点：</p>
            <p>通过 <code>origin-*</code> 九宫格形式设置变形中心点，其值域范围：1 — 9。</p>
            <p>
                <img class="" :src="require('@/assets/img/transform_origin.png')">
            </p>
            <p></p>
        </section>

        <!--内容溢出-->
        <section>
            <h5>内容溢出</h5>
            <p>框架重置了默认滚动条样式，其风格更靠近 IOS。</p>
            <table class="table">
                <thead>
                <tr>
                    <th>样式类</th>
                    <th>效果</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><code>.auto-scroll | .over-scroll</code></td>
                    <td>内容垂直方向溢出滚动</td>
                </tr>
                <tr>
                    <td><code>.wide-auto-scroll</code></td>
                    <td>内容垂直方向溢出滚动（宽滚动条）</td>
                </tr>
                <tr>
                    <td><code>.no-scroll | .over-hide</code></td>
                    <td>内容溢出隐藏</td>
                </tr>
                <tr>
                    <td><code>.auto-h-scroll</code></td>
                    <td>内容水平方向溢出滚动</td>
                </tr>
                <tr>
                    <td><code>.over-show</code></td>
                    <td>内容溢出显示</td>
                </tr>
                </tbody>
            </table>
        </section>

    </article>
</template>

<script>
    export default {
        name: "layout"
    };
</script>