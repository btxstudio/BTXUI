<template>
    <div class="fixed z9 max flex-5 l-0 t-0"
        :style="{
            maxWidth: '100%',
            backgroundImage: `url(${require('@/components/pro/zk2861/bg.jpg')})`,
        }">
        <div class="container pcenter fsize-1d2" md>
            <h2>清华 Da<span class="color-red">a</span>S 地理网格大数据平台</h2>
            <h3>全国覆盖 实时更新</h3>
            <p class="text-line mrg-t-4">全国陆地面积被等分为980余万个网格，每个网格面积为1平方公里（1km*1km）。DaaS通过上千种量化指标实时对网格画像，指标涵盖人口、交通、消费、业态、房产、口碑、生活、环境等方面的评测，反映在微观尺度下各个地区的人口特征、交通态势、商业分布、房产价值、口碑议论、民生事件、环境质量等重要信息。</p>
            <p class="fsize-1d1 mrg-b-4"><b>支持 VIP 客户在线浏览和数据下载</b></p>
            <div class="w-30 mrg-h-auto fsize-d9">
                <zk2861-msg-check-widget ref="msgChecker" />
            </div>
            <div class="color-blue mrg-t-4">
                <a href="javascript:;"
                   @click="$_login"
                   style="background-color: rgba(44,133,243,.1)"
                   class="line color-blue thick-1 round-md pad-h-4 pad-v-1">
                    <b>浏览网格数据</b>
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