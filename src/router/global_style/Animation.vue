<template>
  <div>
    <article>
      <p>BTX·UI 提供了多种常用 animation 及 transition 动画效果。</p>
      <p></p>

      <!-- 过渡动画（transition） -->
      <h5>过渡动画（transition）</h5>
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
                    <code>.trans</code>
                </td>
                <td>中速过度动画（.7s）</td>
            </tr>
            <tr>
                <td>
                    <code>.trans-fast</code>
                </td>
                <td>快速过度动画（.4s）</td>
            </tr>
            <tr>
                <td>
                    <code>.trans-slow</code>
                </td>
                <td>慢速过度动画（1.4s）</td>
            </tr>
        </tbody>
      </table>
      <p></p>
      <p>通过 <code>.trans-delay-*</code> 可以设置过渡动画延迟执行时间，预置的延时值：0.1 — 1、1.5、2、2.5、3、3.5、4、4.5、5、5.5，单位 s。数值 "." 使用 "d" 代替，"0" 使用 "" 空字符串代替。比如 0.5 s 延时，类名为<code>.trans-delay-d5</code>。</p>
      <p></p>

      <!-- 动画（animation） -->
      <h5>动画（animation）</h5>
      <p>框架预置了多种常用 animation 动画效果。</p>
      <p>【示例】：</p>

    </article>
  </div>
</template>

<script>
export default {
  name: "Animation"
};
</script>