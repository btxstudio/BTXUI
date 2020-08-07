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
            <p></p>
        </div>

        <div v-if="api">
            <h5>组件 API：</h5>

            <!--事件-->
            <table v-if="api.event" class="table">
                <thead>
                <tr>
                    <th>事件</th>
                    <th>触发</th>
                    <th>参数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="event of api.event">
                    <td>
                        <code>{{event.name}}</code>
                    </td>
                    <td>{{event.ef}}</td>
                    <td>{{event.params}}</td>
                </tr>
                </tbody>
            </table>

            <p></p>
        </div>
    </section>
</template>

<script>
    export default {
        name: "header-info",
        props: ["name", "desc", "extend", "dependent", "api", "init_data"]
    }
</script>