<template>
  <article>
      <p>BTX·UI 还预置了一些特殊样式。</p>
      <table class="table">
          <thead>
          <tr>
              <th>样式类</th>
              <th>效果</th>
          </tr>
          </thead>
          <tbody>
          <tr>
              <td><code>.bg-none</code></td>
              <td>背景点透效果</td>
          </tr>
          <tr>
              <td><code>.bg-use</code></td>
              <td>背景常规效果（非点透）</td>
          </tr>
          <tr>
              <td><code>.touch-none</code></td>
              <td>元素触控禁止</td>
          </tr>
          <tr>
              <td><code>.select-none</code></td>
              <td>元素长按选中禁止</td>
          </tr>
          </tbody>
      </table>
    </article>
</template>

<script>
export default {
  name: "special"
};
</script>