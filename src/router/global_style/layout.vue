<template>
  <article>
    <!-- 盒子模型模型 -->
    <h5>盒子模型</h5>
    <p>BTX·UI 框架对全部元素进行了 "怪异盒模型" 初始化，即 <code>box-sizing: border-box</code>，可通过 <code>.box-normal</code> 类恢复标准盒模型。</p>
    <p></p>

    <!-- 版心容器 -->
    <h5>版心容器</h5>
    <p>
      可以为页面内容和栅格系统包裹一个
      <code>.container</code> 容器，作为版心布局。
    </p>
    <table class="table" md>
      <thead>
        <tr>
          <th>样式类</th>
          <th>属性</th>
          <th>效果</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.container</code>
          </td>
          <td>-</td>
          <td>1200px 宽度，默认版心容器</td>
        </tr>
        <tr>
          <td>
            <code>.container</code>
          </td>
          <td>
            <code>md</code>
          </td>
          <td>960px 宽度，中等版心容器</td>
        </tr>
        <tr>
          <td>
            <code>.container</code>
          </td>
          <td>
            <code>sm</code>
          </td>
          <td>600px 宽度，小型版心容器</td>
        </tr>
      </tbody>
    </table>
    <p></p>

    <!-- 栅格系统 -->
    <h5>栅格系统</h5>
    <p>通过基础的 12 分栏，迅速简便地创建布局。</p>
    <p>【示例】等分布局：</p>
    <div class="pcenter fsize-d8">
      <div class="grid pad-b-1">
        <div class="col-12 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-12</span></div>
      </div>
      <div class="grid pad-b-1">
        <div class="col-6 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-6</span></div>
        <div class="col-6 light-bg middle-gray line round" sm><span class="deep-gray">col-6</span></div>
      </div>
      <div class="grid pad-b-1">
        <div class="col-4 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-4</span></div>
        <div class="col-4 light-bg middle-gray line round" sm><span class="deep-gray">col-4</span></div>
        <div class="col-4 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-4</span></div>
      </div>
      <div class="grid pad-b-1">
        <div class="col-3 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-3</span></div>
        <div class="col-3 light-bg middle-gray line round" sm><span class="deep-gray">col-3</span></div>
        <div class="col-3 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-3</span></div>
        <div class="col-3 light-bg middle-gray line round" sm><span class="deep-gray">col-3</span></div>
      </div>
      <div class="grid pad-b-1">
        <div class="col-2 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-2</span></div>
        <div class="col-2 light-bg middle-gray line round" sm><span class="deep-gray">col-2</span></div>
        <div class="col-2 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-2</span></div>
        <div class="col-2 light-bg middle-gray line round" sm><span class="deep-gray">col-2</span></div>
        <div class="col-2 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-2</span></div>
        <div class="col-2 light-bg middle-gray line round" sm><span class="deep-gray">col-2</span></div>
      </div>
      <div class="grid">
        <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
      </div>
    </div>
    <p></p>

    <p>【示例】非等分布局：</p>
    <div class="pcenter fsize-d8">
      <div class="grid pad-b-1">
        <div class="col-6 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-6</span></div>
        <div class="col-4 light-bg middle-gray line round" sm><span class="deep-gray">col-4</span></div>
        <div class="col-2 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-2</span></div>
      </div>
      <div class="grid pad-b-1">
        <div class="col-11 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-11</span></div>
        <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
      </div>
      <div class="grid">
        <div class="col-2 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-2</span></div>
        <div class="col-7 light-bg middle-gray line round" sm><span class="deep-gray">col-7</span></div>
        <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">col-1</span></div>
        <div class="col-2 light-bg middle-gray line round" sm><span class="deep-gray">col-2</span></div>
      </div>
    </div>
    <p></p>

    <p>栅格布局可以通过嵌套来实现更为精细的分段。</p>
    <p>【示例】栅格嵌套布局，实现 24 等分：</p>
    <div class="pcenter fsize-d8">
      <div class="grid pad-b-1">
        <div class="col-6 grid">
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">1</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">2</span></div>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">3</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">4</span></div>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">5</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">6</span></div>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">7</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">8</span></div>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">9</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">10</span></div>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">11</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">12</span></div>
        </div>
        <div class="col-6 grid" sm>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">13</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">14</span></div>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">15</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">16</span></div>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">17</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">18</span></div>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">19</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">20</span></div>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">21</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">22</span></div>
          <div class="col-1 light-gray-bg middle-gray line round" sm><span class="deep-gray">23</span></div>
          <div class="col-1 light-bg middle-gray line round" sm><span class="deep-gray">24</span></div>
        </div>
      </div>
    </div>
    <p></p>

    <!-- 内边距 -->
    <h5>内边距</h5>
    <p>通过<code>pad-*</code> 可以使用预置的内边距方案。</p>
    <p>预置的内边距值：0.5、1、1.5、2、2.5、3、3.5、4、5、6、7、8、9、10，单位 rem。数值 "." 使用 "d" 代替，"0" 使用 "" 空字符串代替。比如 0.5 rem 内边距，类名为<code>.pad-d5</code>。</p>
    <table class="table" md>
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

    <!-- 外边距 -->
    <h5>外边距</h5>
    <p>通过<code>mrg*</code> 可以使用预置的外边距方案。其值域范围等同于内边距。</p>
    <table class="table" md>
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

    <!-- 尺寸 -->
    <h5>尺寸</h5>
    <table class="table" md>
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
    <p>
      也可以设置具体的宽高尺寸，框架预置了一些宽度
      <code>w-*</code> 和高度
      <code>h-*</code> 的规格。其值域为：0、0.5、1 — 10、15、20、25、30、35、40、45、50、55、60、65、70、75、80、85、90、95、100，单位 rem。数值 "." 使用 "d" 代替，"0" 使用 "" 空字符串代替。比如 0.5 rem 宽度，类名为
      <code>.w-d5</code>。
    </p>
    <p>BTX·UI 未预置百分比尺寸，推荐使用 flex 完全取代相关使用场景。</p>
    <p>【示例】1 rem 至 10 rem 方形：</p>
    <div class="flex-layout-spread flex-layout-middle">
      <div class="w-1 h-1 light-gray-bg round fsize-d8 flex-layout-center flex-layout-middle" sm>1</div>
      <div class="w-2 h-2 light-gray-bg round fsize-d8 flex-layout-center flex-layout-middle" sm>2</div>
      <div class="w-3 h-3 light-gray-bg round fsize-d8 flex-layout-center flex-layout-middle" sm>3</div>
      <div class="w-4 h-4 light-gray-bg round fsize-d8 flex-layout-center flex-layout-middle" sm>4</div>
      <div class="w-5 h-5 light-gray-bg round fsize-d8 flex-layout-center flex-layout-middle" sm>5</div>
    </div>
    <div class="flex-layout-spread flex-layout-middle">
      <div
        class="w-10 h-10 light-gray-bg round fsize-d8 flex-layout-center flex-layout-middle"
        sm
      >10</div>
      <div class="w-9 h-9 light-gray-bg round fsize-d8 flex-layout-center flex-layout-middle" sm>9</div>
      <div class="w-8 h-8 light-gray-bg round fsize-d8 flex-layout-center flex-layout-middle" sm>8</div>
      <div class="w-7 h-7 light-gray-bg round fsize-d8 flex-layout-center flex-layout-middle" sm>7</div>
      <div class="w-6 h-6 light-gray-bg round fsize-d8 flex-layout-center flex-layout-middle" sm>6</div>
    </div>
    <p></p>
    <p>【示例】配合自生长实现弹性布局：</p>
    <div class="flex">
      <div class="w-15 h-2 sub-bg"></div>
      <div class="w-d5 h-2 deep-gray-bg"></div>
      <div class="flex-grow light-gray-bg fsize-d8 pcenter">flex-grow</div>
    </div>
    <p></p>

    <!-- 定位 -->
    <h5>定位</h5>
    <table class="table" md>
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
            <code>.relative</code>
          </td>
          <td>相对定位</td>
        </tr>
        <tr>
          <td>
            <code>.absolute</code>
          </td>
          <td>绝对定位</td>
        </tr>
      </tbody>
    </table>
    <p></p>

    <!-- z 轴层级 -->
    <h5>z 轴层级</h5>
    <p>
      框架预置了 -1 — 10 的 z-index 层级样式，通过
      <code>z*</code> 样式类实现。如：-1 为
      <code>z-1</code>、10 为
      <code>z10</code>。
    </p>
    <p></p>

    <!-- 微调 -->
    <h5>微调</h5>
    <p>BTX·UI 提供了位移及放缩的微调样式，位移微调需基于绝对（absolute）、相对（relative）或固定式（fixed）定位。放缩微调则是基于 transform 二维变形实现的。</p>
    <table class="table" md>
      <thead>
        <tr>
          <th>样式类</th>
          <th>效果</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.l*</code>
          </td>
          <td>基于左侧水平位移</td>
        </tr>
        <tr>
          <td>
            <code>.r*</code>
          </td>
          <td>基于右侧水平位移</td>
        </tr>
        <tr>
          <td>
            <code>.t*</code>
          </td>
          <td>基于上侧垂直位移</td>
        </tr>
        <tr>
          <td>
            <code>.b*</code>
          </td>
          <td>基于下侧垂直位移</td>
        </tr>
        <tr>
          <td>
            <code>.lx*</code>
          </td>
          <td>基于左侧成倍水平位移</td>
        </tr>
        <tr>
          <td>
            <code>.rx*</code>
          </td>
          <td>基于右侧成倍水平位移</td>
        </tr>
        <tr>
          <td>
            <code>.tx*</code>
          </td>
          <td>基于上侧成倍垂直位移</td>
        </tr>
        <tr>
          <td>
            <code>.bx*</code>
          </td>
          <td>基于下侧成倍垂直位移</td>
        </tr>
        <tr>
          <td>
            <code>.lp*</code>
          </td>
          <td>基于左侧成倍于自身宽度水平位移</td>
        </tr>
        <tr>
          <td>
            <code>.rp*</code>
          </td>
          <td>基于右侧成倍于自身宽度水平位移</td>
        </tr>
        <tr>
          <td>
            <code>.tp*</code>
          </td>
          <td>基于上侧成倍于自身高度垂直位移</td>
        </tr>
        <tr>
          <td>
            <code>.bp*</code>
          </td>
          <td>基于下侧成倍于自身高度垂直位移</td>
        </tr>
        <tr>
          <td>
            <code>.scale-*</code>
          </td>
          <td>放缩</td>
        </tr>
      </tbody>
    </table>
    <p></p>
    <p>由于框架标准字号是基于 12px 的（手机端为 10px），因此预置的微调位移值：-11 — -1、0 — 11，单位 px。比如向下位移 5 像素，类名为 <code>.t5</code>。</p>
    <p>如果要位移基于 12px 或 10px 的成倍距离，可以在位移类 "方向字符" 后追加 <code>x</code> 字符。预置的位移倍率值：-10 — -1、1 — 10，单位 rem。此外还可以基于自身宽高进行成倍位移（基于 transform 二维变形位移）。可以在位移类 "方向字符" 后追加 <code>p</code> 字符。预置的位移百分比值：-200、-100 — -10、10 — 100、200，单位 %。</p>
    <p>预置的微调放缩值：0 — 0.9（缩小）；1.1 — 1.9、2 — 10（放大）。比如缩小为 0.5 倍，类名为 <code>.scale-d5</code>。数值 "." 使用 "d" 代替，"0" 使用 "" 空字符串代替。</p>
    <p>【示例】基础位移：</p>
    <div class="grid fsize-d8">
        <div class="col-3">
            <div class="middle-gray-bg round w-10" sm>
                <div class="relative l6 w-10 h-7 light-gray-bg flex-center flex-column round alpha-9" sm>向右位移 6px<br><code>.l6</code></div>
            </div>
        </div>
        <div class="col-3">
            <div class="middle-gray-bg round w-10" sm>
                <div class="relative lx1 w-10 h-7 light-gray-bg flex-center flex-column round alpha-9" sm>向右位移 1 倍<br><code>.lx1</code></div>
            </div>
        </div>
        <div class="col-3">
            <div class="middle-gray-bg round w-10" sm>
                <div class="relative lx2 w-10 h-7 light-gray-bg flex-center flex-column round alpha-9" sm>向右位移 2 倍<br><code>.lx2</code></div>
            </div>
        </div>
        <div class="col-3">
            <div class="middle-gray-bg round w-10" sm>
                <div class="relative lx-1 w-10 h-7 light-gray-bg flex-center flex-column round alpha-9" sm>向左位移 1 倍<br><code>.lx-1</code></div>
            </div>
        </div>
    </div>
    <p></p>
    <p>【示例】基于自身宽高位移：</p>
    <div class="flex-layout-spread fsize-d8">
        <div class="middle-gray-bg round w-10" sm>
            <div class="relative lp100 w-10 h-8 light-gray-bg flex-center flex-column round alpha-9" sm>向右位移自身宽度<b>100%</b><code>.lp100</code></div>
        </div>
        <div class="middle-gray-bg round w-10" sm>
            <div class="relative tp-10 w-10 h-8 light-gray-bg flex-center flex-column round alpha-9" sm>向上位移自身高度<b>10%</b><code>.tp-10</code></div>
        </div>
        <div class="middle-gray-bg round w-10" sm>
            <div class="relative lp-50 w-10 h-8 light-gray-bg flex-center flex-column round alpha-9" sm>向左位移自身宽度<b>50%</b><code>.lp-50</code></div>
        </div>
    </div>
    <p></p>

    <!-- 内容溢出 -->
    <h5>内容溢出</h5>
    <p>框架重置了默认滚动条样式，其风格更靠近 IOS，<code>.auto-scroll</code> 样式类可设置垂直溢出滚动；<code>.auto-h-scroll</code> 可设置水平溢出滚动；<code>.no-scroll</code> 可设置溢出隐藏。</p>

  </article>
</template>

<script>
export default {
  name: "layout"
};
</script>