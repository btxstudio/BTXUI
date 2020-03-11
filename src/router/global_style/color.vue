<template>
  <div>
    <article>
      <p>BTX·UI 预置的色彩主题是基于 Level 的，分为深、浅两套色系。</p>
      <p></p>

      <!-- 主题色 -->
      <h5>主题色（theme color）</h5>
      <p>主题色包括标准色、辅助色、灰阶 3 部分。</p>
      <table class="pcenter">
          <tr>
            <td class="middle-gray-bg alpha-10 round" sm>alpha-10</td>
            <td class="middle-gray-bg alpha-9 round" sm>alpha-9</td>
            <td class="middle-gray-bg alpha-8 round" sm>alpha-8</td>
            <td class="middle-gray-bg alpha-7 round" sm>alpha-7</td>
            <td class="middle-gray-bg alpha-6 round" sm>alpha-6</td>
          </tr>
          <tr>
            <td class="middle-gray-bg alpha-5 round" sm>alpha-5</td>
            <td class="middle-gray-bg alpha-4 round" sm>alpha-4</td>
            <td class="middle-gray-bg alpha-3 round" sm>alpha-3</td>
            <td class="middle-gray-bg alpha-2 round" sm>alpha-2</td>
            <td class="middle-gray-bg alpha-1 round" sm>alpha-1</td>
          </tr>
      </table>
      <p></p>

      <!-- 不透明度 -->
      <h5>不透明度</h5>
      <p>使用 <code>.alpha-*</code> 可以设置元素的不透明度，范围是 0 - 10，逐级不透明，0 为全透明。</p>
      <p>【示例】：</p>
      <table class="pcenter">
          <tr>
            <td class="middle-gray-bg alpha-10 round" sm>alpha-10</td>
            <td class="middle-gray-bg alpha-9 round" sm>alpha-9</td>
            <td class="middle-gray-bg alpha-8 round" sm>alpha-8</td>
            <td class="middle-gray-bg alpha-7 round" sm>alpha-7</td>
            <td class="middle-gray-bg alpha-6 round" sm>alpha-6</td>
          </tr>
          <tr>
            <td class="middle-gray-bg alpha-5 round" sm>alpha-5</td>
            <td class="middle-gray-bg alpha-4 round" sm>alpha-4</td>
            <td class="middle-gray-bg alpha-3 round" sm>alpha-3</td>
            <td class="middle-gray-bg alpha-2 round" sm>alpha-2</td>
            <td class="middle-gray-bg alpha-1 round" sm>alpha-1</td>
          </tr>
      </table>

    </article>
  </div>
</template>

<script>
export default {
  name: "color"
};
</script>