<template>
  <div>
    <article>
      <p>BTX·UI 预置了基于 Level 的色彩主题。</p>
      <p></p>

      <!-- 主题色 -->
      <h5>主题色（theme color）</h5>
      <p>主题色包括标准色、辅助色、灰阶、常用彩色、中性色 5 部分。</p>
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
                    <code>.main-color</code>
                </td>
                <td>标准文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.main-bg</code>
                </td>
                <td>标准背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.sub-color</code>
                </td>
                <td>辅助文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.sub-bg</code>
                </td>
                <td>辅助背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.light</code>
                </td>
                <td>纯白文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.light-bg</code>
                </td>
                <td>纯白背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.light-gray</code>
                </td>
                <td>浅灰文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.light-gray-bg</code>
                </td>
                <td>浅灰背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.middle-gray</code>
                </td>
                <td>中灰文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.middle-gray-bg</code>
                </td>
                <td>中灰背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.deep-gray</code>
                </td>
                <td>深灰文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.deep-gray-bg</code>
                </td>
                <td>深灰背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.dark</code>
                </td>
                <td>纯黑文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.dark-bg</code>
                </td>
                <td>纯黑背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.blue</code>
                </td>
                <td>湛蓝文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.blue-bg</code>
                </td>
                <td>湛蓝背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.green</code>
                </td>
                <td>青绿文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.green-bg</code>
                </td>
                <td>青绿背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.yellow</code>
                </td>
                <td>橙黄文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.yellow-bg</code>
                </td>
                <td>橙黄背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.red</code>
                </td>
                <td>玫红文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.red-bg</code>
                </td>
                <td>玫红背景色</td>
            </tr>
            <tr>
                <td>
                    <code>.neutral</code>
                </td>
                <td>中性文字色</td>
            </tr>
            <tr>
                <td>
                    <code>.neutral-bg</code>
                </td>
                <td>中性背景色</td>
            </tr>
        </tbody>
      </table>
      <p></p>
      <p>标准色及辅助色：</p>
      <div class="flex pcenter">
          <div class="flex-layout-5 flex-column mrg-r-5">
              <div class="w-4 h-4 round main-bg"></div>
              <p>邃蓝<br><b class="fsize-d9">#051c24</b></p>
          </div>
          <div class="flex-layout-5 flex-column">
              <div class="w-4 h-4 round sub-bg"></div>
              <p>锡金<br><b class="fsize-d9">#b4967a</b></p>
          </div>
      </div>
      <p>灰阶色：</p>
      <div class="flex pcenter">
          <div class="mrg-r-7 flex-layout-5 flex-column relative l7">
              <div class="w-4 h-4 round light-bg light-gray line"></div>
              <p>纯白<br><b class="fsize-d9">#fff</b></p>
          </div>
          <div class="mrg-r-6 flex-layout-5 flex-column">
              <div class="w-4 h-4 round light-gray-bg"></div>
              <p>浅灰<br><b class="fsize-d9">#eee</b></p>
          </div>
          <div class="mrg-r-6 flex-layout-5 flex-column">
              <div class="w-4 h-4 round middle-gray-bg"></div>
              <p>中灰<br><b class="fsize-d9">#a7a7a7</b></p>
          </div>
          <div class="mrg-r-6 flex-layout-5 flex-column">
              <div class="w-4 h-4 round deep-gray-bg"></div>
              <p>深灰<br><b class="fsize-d9">#373737</b></p>
          </div>
          <div class="flex-layout-5 flex-column">
              <div class="w-4 h-4 round dark-bg"></div>
              <p>纯黑<br><b class="fsize-d9">#111</b></p>
          </div>
      </div>
      <p>常用彩色：</p>
      <div class="flex pcenter">
          <div class="mrg-r-5 flex-layout-5 flex-column">
              <div class="w-4 h-4 round blue-bg"></div>
              <p>湛蓝<br><b class="fsize-d9">#4085f3</b></p>
          </div>
          <div class="mrg-r-5 flex-layout-5 flex-column">
              <div class="w-4 h-4 round green-bg"></div>
              <p>青绿<br><b class="fsize-d9">#02b9a1</b></p>
          </div>
          <div class="mrg-r-6 flex-layout-5 flex-column relative l4">
              <div class="w-4 h-4 round yellow-bg"></div>
              <p>橙黄<br><b class="fsize-d9">#fdba00</b></p>
          </div>
          <div class="flex-layout-5 flex-column relative l6">
              <div class="w-4 h-4 round red-bg"></div>
              <p>玫红<br><b class="fsize-d9">#ec4334</b></p>
          </div>
      </div>
      <p>中性色：</p>
      <p>中性色是基于 <code>rgba(134,134,134,.17)</code> 色彩模式的半透明灰色，可同时适用于深色及浅色背景，在框架中用于设置了分割线 <code>&lt;hr&gt;</code> 的颜色。</p>
      <p></p>

      <!-- 不透明度 -->
      <h5>不透明度</h5>
      <p>使用 <code>.alpha-*</code> 可以设置元素的不透明度，范围是 0 - 9、9.1 - 9.9，逐级不透明，0 为全透明，且 visibility 为 hidden，隐藏显示。数值 "." 使用 "d" 代替。比如 9.5，类名为<code>.alpha-9d5</code>。</p>
      <p>【示例】：</p>
      <div class="grid pcenter">
        <div class="col-4 pad-r-d5 pad-b-d5">
            <div class="middle-gray-bg alpha-9 round" sm>alpha-9</div>
        </div>
        <div class="col-4 pad-r-d5 pad-b-d5">
            <div class="middle-gray-bg alpha-8 round" sm>alpha-8</div>
        </div>
        <div class="col-4 pad-r-d5 pad-b-d5">
            <div class="middle-gray-bg alpha-7 round" sm>alpha-7</div>
        </div>
        <div class="col-4 pad-r-d5 pad-b-d5">
            <div class="middle-gray-bg alpha-6 round" sm>alpha-6</div>
        </div>
        <div class="col-4 pad-r-d5 pad-b-d5">
            <div class="middle-gray-bg alpha-5 round" sm>alpha-5</div>
        </div>
        <div class="col-4 pad-r-d5 pad-b-d5">
            <div class="middle-gray-bg alpha-4 round" sm>alpha-4</div>
        </div>
        <div class="col-4 pad-r-d5 pad-b-d5">
            <div class="middle-gray-bg alpha-3 round" sm>alpha-3</div>
        </div>
        <div class="col-4 pad-r-d5 pad-b-d5">
            <div class="middle-gray-bg alpha-2 round" sm>alpha-2</div>
        </div>
        <div class="col-4 pad-r-d5 pad-b-d5">
            <div class="middle-gray-bg alpha-1 round" sm>alpha-1</div>
        </div>
      </div>

    </article>
  </div>
</template>

<script>
export default {
  name: "Color"
};
</script>