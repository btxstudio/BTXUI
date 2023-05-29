<template>
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
            <tr>
                <td>
                    <code>.trans-no</code>
                </td>
                <td>无过度动画</td>
            </tr>
            </tbody>
        </table>
        <p></p>
        <p>
            通过
            <code>.trans-delay-*</code> 可以设置过渡动画延迟执行时间，预置的延时值：0.1 — 1、1.5、2、2.5、3、3.5、4、4.5、5、5.5，单位 s。数值 "." 使用 "d" 代替，"0" 使用 "" 空字符串代替。比如 0.5 s 延时，类名为
            <code>.trans-delay-d5</code>。
        </p>
        <p></p>

        <!-- 动画（animation） -->
        <h5>动画（animation）</h5>
        <p>
            框架预置了多种常用 animation 动画效果。通过
            <code>.ani-delay-*</code> 可以设置动画延迟执行时间，预置的延时值：0.1 — 0.9、1 — 10，单位 s。
        </p>
        <p>
            通过
            <code>.ani-mode-*</code> 可以设置动画 animation-fill-mode 样式，包括："forwards"、"backwards"、"both" 3 项值。
        </p>
        <p>
            此外
            <code>.ani-loop-*</code> 样式类可以设置动画迭代次数，预置的次数为：1 — 6。
            <code>.ani-loop</code> 为无限循环。
        </p>
        <table class="table">
            <thead>
            <tr>
                <th>预置样式类</th>
                <th>效果</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <code>.ani-fade-in</code>
                </td>
                <td>淡入动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-fade-out</code>
                </td>
                <td>淡出动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-scale-fade-in</code>
                </td>
                <td>缩放式淡入动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-scale-fade-out</code>
                </td>
                <td>放缩式淡出动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-v-stretch-h-in</code>
                </td>
                <td>先垂直后水平伸展式动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-h-stretch-v-in</code>
                </td>
                <td>先水平后垂直伸展式动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-left-to-right</code>
                </td>
                <td>由左向右滑动动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-right-to-left</code>
                </td>
                <td>由右向左滑动动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-top-to-bottom</code>
                </td>
                <td>由上向下滑动动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-bottom-to-top</code>
                </td>
                <td>由下向上滑动动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-rotate</code>
                </td>
                <td>旋转 360 度动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-rotate-half</code>
                </td>
                <td>旋转 180 度动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-rotate-90</code>
                </td>
                <td>旋转 90 度动画</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-rotate-45</code>
                </td>
                <td>旋转 45 度动画</td>
            </tr>
            </tbody>
        </table>
        <p></p>
        <p>animation 同过渡动画一样，具备相同的 3 项动画持续时间设置。框架预置的动画效果默认采用中速动画。</p>
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
                    <code>.ani</code>
                </td>
                <td>中速动画（.7s）</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-fast</code>
                </td>
                <td>快速动画（.4s）</td>
            </tr>
            <tr>
                <td>
                    <code>.ani-slow</code>
                </td>
                <td>慢速动画（1.4s）</td>
            </tr>
            </tbody>
        </table>

    </article>
</template>

<script>
export default {
    name: "animation"
};
</script>