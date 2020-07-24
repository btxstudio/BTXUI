<template>
    <article>
        <section>
            <h5><code>confirm-widget</code></h5>
            <p>该组件用于显示弹窗提示。</p>
            <p>组件继承：无</p>
            <p>组件依赖：<code>pannel-widget</code>、<code>btn-widget</code></p>
            <p>组件初始化入参：无</p>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>组件 API：</h5>
            <table class="table">
                <thead>
                <tr>
                    <th>事件</th>
                    <th>触发</th>
                    <th>参数</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <code>on_select</code>
                    </td>
                    <td>执行数据项点选</td>
                    <td>复选数据结构：</td>
                </tr>
                </tbody>
            </table>
            <table class="table">
                <thead>
                <tr>
                    <th>方法</th>
                    <th>参数</th>
                    <th>效果</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <code>clear_selected</code>
                    </td>
                    <td>-</td>
                    <td>清空所选数据</td>
                </tr>
                </tbody>
            </table>
            <hr>
            <p></p>
        </section>

        <section>
            <h5>基础使用</h5>
            <p>该组件通常在入口页进行全局实例化绑定，之后可通过相关 API 进行使用。</p>
            <span class="color-sub flex">
                <a href="javascript:;" class="pad-v-d5 pad-h-2 round-sm bg-color-dgray color-light" @click="$_show_pannel1">显示表单面板</a>
            </span>
            <hr>
            <p></p>
        </section>

    </article>
</template>

<script>
    export default {
        name: "confirm_widget_demo",
        methods: {

            //显示面板1
            $_show_pannel1(){
                this.$confirm.toast("hello javascript", 2000)
            }

        }
    }
</script>