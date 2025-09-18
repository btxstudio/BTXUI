<template>
    <section>
        <div>
            <h5><code>{{ name }}</code></h5>
            <template v-for="item of desc">
                <!--图片-->
                <div v-if="(item as Desc).cover">
                    <img :src="require(`@/assets/img/mechanism/${(item as Desc).cover}`)"
                         class="round-sm"/>
                    <div class="pcenter">
                        <span class="line-b thick-1 line-lgray pad-b-d5 fsize-d9">{{(item as Desc).title}}</span>
                    </div>
                </div>

                <!--文字-->
                <p v-else v-html="item"></p>
            </template>
            <p v-if="extend && extend.length">组件继承：<code v-for="ext of extend">{{ ext }}</code></p>
            <p v-if="dependent && dependent.length">组件依赖：<code v-for="dep of dependent">{{ dep }}</code></p>
            <p>组件初始化入参：</p>
            <table class="table">
                <thead>
                <tr>
                    <th>属性</th>
                    <th>类型</th>
                    <th>说明</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item of initData">
                    <td class="bold">
                        {{ item[0] }}
                    </td>
                    <td>
                        <code>{{ item[1] }}</code>
                    </td>
                    <td>
                        {{ item[2] }}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div v-if="api" class="mrg-t-2">
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
                        <code>{{ method.name }}</code>
                    </td>
                    <td>{{ method.ef }}</td>
                    <td v-html="method.params"></td>
                    <td>
                        <code v-if="method.return !== '-'">{{ method.return }}</code>
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
                        <code>{{ event.name }}</code>
                    </td>
                    <td>{{ event.ef }}</td>
                    <td>
                        <code v-if="event.name !== '-'">{{ event.params }}</code>
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

<script setup lang="ts">
    type Desc = {
        cover: string,
        title: string
    }

    defineProps<{
        // 组件名
        name: string,

        // 组件介绍
        desc: Array<string | Desc>,

        // 组件继承
        extend?: Array<string>,

        // 组件依赖
        dependent?: Array<string>,

        // API
        api?: {
            extend: string,
            props: Array<{
                name: string,
                ef: string
            }>,
            event: Array<{
                name: string,
                ef: string,
                params: string
            }>,
            methods: Array<{
                name: string,
                ef: string,
                params: string,
                return: string
            }>
        },

        // 组件初始化入参
        initData?: Array<Array<string>>,
    }>()
</script>