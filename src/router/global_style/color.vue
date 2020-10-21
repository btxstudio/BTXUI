<template>
  <article>
      <p>BTX·UI 预置了基于 Level 的色彩主题。</p>
      <p></p>

      <!-- 主题色 -->
      <section>
          <h5>主题色（theme color）</h5>
          <p>主题色包括标准色、辅助色、灰阶、常用彩色、中性色 5 部分。此外还有特殊值 none 可用于设置全透明颜色。</p>
          <table class="table">
              <thead>
              <tr>
                  <th>样式类</th>
                  <th>效果</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td><code>.bg-color-*</code></td>
                  <td>背景色</td>
              </tr>
              <tr>
                  <td><code>.color-*</code></td>
                  <td>文字色</td>
              </tr>
              <tr>
                  <td><code>.line-*</code></td>
                  <td>描边色</td>
              </tr>
              </tbody>
          </table>
          <p></p>
          <p>标准色及辅助色：</p>
          <div class="flex pcenter">
              <div class="flex-5 flex-column mrg-r-5">
                  <div class="w-4 h-4 round bg-color-main"></div>
                  <p>邃蓝<br><span class="color-mgray fsize-d9">main</span><br><b class="fsize-d9">#051c24</b></p>
              </div>
              <div class="flex-5 flex-column">
                  <div class="w-4 h-4 round bg-color-sub"></div>
                  <p>锡金<br><span class="color-mgray fsize-d9">sub</span><br><b class="fsize-d9">#b4967a</b></p>
              </div>
          </div>
          <p>灰阶色：</p>
          <div class="flex pcenter">
              <div class="mrg-r-7 flex-5 flex-column">
                  <div class="w-4 h-4 round bg-color-light line-lgray thick-2 line"></div>
                  <p>纯白<br><span class="color-mgray fsize-d9">light</span><br><b class="fsize-d9">#fff</b></p>
              </div>
              <div class="mrg-r-6 flex-5 flex-column">
                  <div class="w-4 h-4 round bg-color-lgray"></div>
                  <p>浅灰<br><span class="color-mgray fsize-d9">lgray</span><br><b class="fsize-d9">#eee</b></p>
              </div>
              <div class="mrg-r-6 flex-5 flex-column">
                  <div class="w-4 h-4 round bg-color-mgray"></div>
                  <p>中灰<br><span class="color-mgray fsize-d9">mgray</span><br><b class="fsize-d9">#a7a7a7</b></p>
              </div>
              <div class="mrg-r-6 flex-5 flex-column">
                  <div class="w-4 h-4 round bg-color-dgray"></div>
                  <p>深灰<br><span class="color-mgray fsize-d9">dgray</span><br><b class="fsize-d9">#373737</b></p>
              </div>
              <div class="flex-5 flex-column">
                  <div class="w-4 h-4 round bg-color-dark"></div>
                  <p>纯黑<br><span class="color-mgray fsize-d9">dark</span><br><b class="fsize-d9">#111</b></p>
              </div>
          </div>
          <p>常用彩色：</p>
          <div class="flex pcenter">
              <div class="mrg-r-5 flex-5 flex-column">
                  <div class="w-4 h-4 round bg-color-blue"></div>
                  <p>湛蓝<br><span class="color-mgray fsize-d9">blue</span><br><b class="fsize-d9">#4085f3</b></p>
              </div>
              <div class="mrg-r-5 flex-5 flex-column">
                  <div class="w-4 h-4 round bg-color-green"></div>
                  <p>青绿<br><span class="color-mgray fsize-d9">green</span><br><b class="fsize-d9">#02b9a1</b></p>
              </div>
              <div class="mrg-r-6 flex-5 flex-column rel l-4px">
                  <div class="w-4 h-4 round bg-color-yellow"></div>
                  <p>橙黄<br><span class="color-mgray fsize-d9">yellow</span><br><b class="fsize-d9">#fdba00</b></p>
              </div>
              <div class="flex-5 flex-column rel l-5px">
                  <div class="w-4 h-4 round bg-color-red"></div>
                  <p>玫红<br><span class="color-mgray fsize-d9">red</span><br><b class="fsize-d9">#ec4334</b></p>
              </div>
          </div>
          <p>中性色：</p>
          <p>中性色 neutral 是基于 <code>rgba(134,134,134,.17)</code> 色彩模式的半透明灰色，可同时适用于深色及浅色背景，在框架中用于设置了分割线 <code>&lt;hr&gt;</code> 的颜色。</p>
          <p></p>
      </section>

      <!-- 不透明度 -->
      <section>
          <h5>不透明度</h5>
          <p>使用 <code>.alpha-*</code> 可以设置元素的不透明度，范围是 0 - 1 逐级不透明，1 为完全不透明，0 为全透明。全透明时其 visibility 属性为 hidden。数值 "." 使用 "d" 代替。比如 0.5，类名为<code>.alpha-d5</code>。</p>
          <p>【示例】：</p>
          <div class="grid pcenter">
              <div class="col-4 pad-r-d5 pad-b-d5">
                  <div class="bg-color-mgray alpha-d9 round-sm">alpha-d9</div>
              </div>
              <div class="col-4 pad-r-d5 pad-b-d5">
                  <div class="bg-color-mgray alpha-d8 round-sm">alpha-d8</div>
              </div>
              <div class="col-4 pad-r-d5 pad-b-d5">
                  <div class="bg-color-mgray alpha-d7 round-sm">alpha-d7</div>
              </div>
              <div class="col-4 pad-r-d5 pad-b-d5">
                  <div class="bg-color-mgray alpha-d6 round-sm">alpha-d6</div>
              </div>
              <div class="col-4 pad-r-d5 pad-b-d5">
                  <div class="bg-color-mgray alpha-d5 round-sm">alpha-d5</div>
              </div>
              <div class="col-4 pad-r-d5 pad-b-d5">
                  <div class="bg-color-mgray alpha-d4 round-sm">alpha-d4</div>
              </div>
              <div class="col-4 pad-r-d5 pad-b-d5">
                  <div class="bg-color-mgray alpha-d3 round-sm">alpha-d3</div>
              </div>
              <div class="col-4 pad-r-d5 pad-b-d5">
                  <div class="bg-color-mgray alpha-d2 round-sm">alpha-d2</div>
              </div>
              <div class="col-4 pad-r-d5 pad-b-d5">
                  <div class="bg-color-mgray alpha-d1 round-sm">alpha-d1</div>
              </div>
          </div>
      </section>

    </article>
</template>

<script>
export default {
  name: "color"
};
</script>