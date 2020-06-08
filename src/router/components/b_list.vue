<template>
    <article>
        <!-- b-list -->
        <h5>b-list</h5>
        <p>长内容通常使用 <code>b-list</code> 组件进行封装，可以通过 scroll 属性设置溢出滚动及隐藏效果，此外还具备滚动条定位监听及懒加载接口。</p>
        <p></p>

        <p>数据接口：</p>
        <table class="table">
            <thead>
            <tr>
                <th>数据接口</th>
                <th>类型</th>
                <th>必须</th>
                <th>值</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><code>scroll</code></td>
                <td>String</td>
                <td>false</td>
                <td><b>y</b>：垂直溢出滚动（默认）；<br><b>x</b>：水平溢出滚动；<br><b>hide</b>：溢出隐藏；</td>
            </tr>
            <tr>
                <td><code>watch-pos</code></td>
                <td>Boolean</td>
                <td>false</td>
                <td><b>false</b>：不监听（默认）；<br><b>true</b>：监听；</td>
            </tr>
            </tbody>
        </table>
        <p></p>

        <p>API：</p>
        <table class="table">
            <thead>
            <tr>
                <th>事件</th>
                <th>参数</th>
                <th>触发条件</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><code>on_to_top</code></td>
                <td>-</td>
                <td>watch-pos 设置为 true，滚动置顶时；</td>
            </tr>
            <tr>
                <td><code>on_to_bottom</code></td>
                <td>-</td>
                <td>watch-pos 设置为 true，滚动置底时；</td>
            </tr>
            </tbody>
        </table>

    </article>
</template>

<script>
    export default {
        name: "b_list"
    }
</script>