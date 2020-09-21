<template>
    <div class="fixed bg-pos-2 z9 max flex-5 l-0 t-0"
        :style="{
            maxWidth: '100%',
            backgroundImage: `url(${require('@/components/pro/zk2861/bg.jpg')})`,
        }">
        <div class="container color-light pcenter fsize-1d2" sm>
            <img class="w-15" :src="require('@/components/pro/zk2861/logo.png')" />
            <div>
                <h2 class="mrg-v-3">区县社会感知大数据决策辅助系统</h2>
                <p class="fsize-1d2 alpha-d7">
                    <span class="color-red">200+</span> 指标，<span class="color-green">2000+</span> 页数据可视化展示，每月更新
                </p>
                <p class="alpha-d7">可视化包含：指标在全国/全省/全市范围排名和分布，指标历史变化趋势展示，多指标关联对比分析；每月区县指标报告一键生成。</p>
            </div>
            <p class="fsize-1d1 mrg-v-4">
                <b>支持 <span class="color-yellow">VIP</span> 客户在线浏览和数据下载</b>
            </p>
            <div class="w-30 color-dgray mrg-h-auto fsize-d9">
                <zk2861-msg-check-widget ref="msgChecker" />
            </div>
            <div class="color-blue mrg-t-4">
                <a href="javascript:;"
                   @click="$_login"
                   style="background-color: rgba(0,43,73,.8)"
                   class="line line-blue thick-1 round-md pad-h-4 pad-v-1 bold">
                    浏览 1/2861 数据
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Zk2861MsgCheckWidget from "@/components/pro/zk2861/zk2861-msg-check-widget"

    export default {
        name: "demo1",
        components: {
            Zk2861MsgCheckWidget
        },
        methods: {

            //登录验证
            $_login(){
                this.$refs.msgChecker.check_msg((phone_number)=>{
                    if(phone_number){
                        this.$router.replace("/") //？？？？路由跳转
                    }
                })
            },

        },
    }
</script>