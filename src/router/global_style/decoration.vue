<template>
  <article>
    <p>BTX·UI 提供了一些装饰类以实现常见的特殊样式处理。</p>
    <p></p>

    <!-- 圆角 -->
    <h5>圆角</h5>
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
            <code>.round</code>
          </td>
          <td>-</td>
          <td>50% 圆角，可用于制作正圆形或椭圆形</td>
        </tr>
        <tr>
          <td>
            <code>.round</code>
          </td>
          <td>
            <code>lg</code>
          </td>
          <td>24px 大圆角</td>
        </tr>
        <tr>
          <td>
            <code>.round</code>
          </td>
          <td>
            <code>md</code>
          </td>
          <td>10px 中等圆角</td>
        </tr>
        <tr>
          <td>
            <code>.round</code>
          </td>
          <td>
            <code>sm</code>
          </td>
          <td>4px 小型圆角</td>
        </tr>
      </tbody>
    </table>
    <p></p>

    <!-- 圆角示例 -->
    <p>使用圆角样式可用于头像之类的图像制作。</p>
    <p>【示例】：</p>
    <div class="flex-layout-spread pcenter">
        <div><img width="110" src="/static/img/head.jpg" /><br>方形头像</div>
        <div><img width="110" class="round" sm src="/static/img/head.jpg" /><br>小圆角头像</div>
        <div><img width="110" class="round" md src="/static/img/head.jpg" /><br>中等圆角头像</div>
        <div><img width="110" class="round" lg src="/static/img/head.jpg" /><br>大圆角头像</div>
        <div><img width="110" class="round" src="/static/img/head.jpg" /><br>正圆头像</div>
    </div>
    <p></p>

    <!-- 描边 -->
    <h5>描边</h5>
    <p>框架提供了实线及虚线两种描边样式，通过 <code>.line</code> 类可以设置 1px 实线描边样式，同时添加 <code>dashed</code> 属性可以更改为虚线描边。线条颜色可基于框架预置色彩进行设置，线条粗细可基于 <code>.thick-*</code> 类进行额外设置，预置值：2、4、6、8、10，单位 px。此外还可以设置水平、垂直或是指定方向上的描边效果。</p>
    <table class="table" md>
      <thead>
        <tr>
          <th>实线类</th>
          <th>效果</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>.line</code>
          </td>
          <td>设置四周描边</td>
        </tr>
        <tr>
          <td>
            <code>.line-v</code>
          </td>
          <td>设置上下描边</td>
        </tr>
        <tr>
          <td>
            <code>.line-h</code>
          </td>
          <td>设置左右描边</td>
        </tr>
        <tr>
          <td>
            <code>.line-l</code>
          </td>
          <td>设置左侧描边</td>
        </tr>
        <tr>
          <td>
            <code>.line-r</code>
          </td>
          <td>设置右侧描边</td>
        </tr>
        <tr>
          <td>
            <code>.line-t</code>
          </td>
          <td>设置上侧描边</td>
        </tr>
        <tr>
          <td>
            <code>.line-b</code>
          </td>
          <td>设置下侧描边</td>
        </tr>
      </tbody>
    </table>
    <p></p>

    <!-- 分割线 -->
    <h5>分割线</h5>
    <p>BTX·UI 重置了 <code>&lt;hr&gt;</code> 分割线样式，同时适用于深、浅背景。</p>
    <p>【示例】：</p>
    <div class="grid pcenter">
      <div class="col-6 pad-h-2">
        <div class="deep-gray-bg pad-d5 round" sm><hr/></div>
        <div class="pad-t-d5">深色背景效果</div>
      </div>
      <div class="col-6 pad-h-2">
        <div class="light-gray line pad-d5 round" sm><hr/></div>
        <div class="pad-t-d5">浅色背景效果</div>
      </div>
    </div>

  </article>
</template>

<script>
export default {
  name: "decoration"
};
</script>