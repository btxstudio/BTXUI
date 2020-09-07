<template>
    <section>
        <div>
            <h5><code>{{name}}</code></h5>
            <p v-for="text of desc" v-html="text"></p>
            <p v-if="extend.length">组件继承：<code v-for="ext of extend">{{ext}}</code></p>
            <p v-if="dependent.length">组件依赖：<code v-for="dep of dependent">{{dep}}</code></p>
            <p>组件初始化入参：</p>
            <pre v-highlightjs><code class="javascript" v-html="init_data"></code></pre>
            <hr>
        </div>

        <div v-if="api">
            <h5>组件 API：</h5>

            <!--属性-->
            <table v-if="api.props" class="table">
                <thead>
                <tr>
                    <th>属性</th>
                    <th>意义</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="prop of api.props">
                    <td>
                        <code>{{prop.name}}</code>
                    </td>
                    <td>{{prop.ef}}</td>
                </tr>
                </tbody>
            </table>

            <!--方法-->
            <table v-if="api.methods" class="table">
                <thead>
                <tr>
                    <th class="ellipsis">方法</th>
                    <th class="ellipsis">效果</th>
                    <th class="ellipsis">参数</th>
                    <th class="ellipsis">返回值</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="method of api.methods">
                    <td>
                        <code>{{method.name}}</code>
                    </td>
                    <td>{{method.ef}}</td>
                    <td v-html="method.params"></td>
                    <td>
                        <code v-if="method.return !== '-'">{{method.return}}</code>
                        <span v-else>-</span>
                    </td>
                </tr>
                </tbody>
            </table>

            <!--事件-->
            <table v-if="api.event" class="table">
                <thead>
                <tr>
                    <th>事件</th>
                    <th>触发</th>
                    <th>回调参数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="event of api.event">
                    <td>
                        <code>{{event.name}}</code>
                    </td>
                    <td>{{event.ef}}</td>
                    <td>
                        <code v-if="event.name !== '-'">{{event.params}}</code>
                        <span v-else>-</span>
                    </td>
                </tr>
                </tbody>
            </table>

            <!--继承文字-->
            <div v-if="api.extend">
                <p v-html="api.extend"></p>
                <hr>
            </div>

        </div>
        <p></p>
    </section>
</template>

<script>
    export default {
        name: "header-info",
        props: ["name", "desc", "extend", "dependent", "api", "init_data"]
    }
</script>