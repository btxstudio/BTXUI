<!--19-06-18-->
<template>
    <div class="loading-widget transition" :state="state">
        <div class="vertical-middle">
            <div class="l-w-box">
                <div class="l-w-logo"></div>
                <div class="l-w-slogan">笔记成书 · 创题社交</div>
                <div class="l-w-copyright">
                    <small>© Copyright 75sea 2016-2019</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loading-widget",
        data(){
            return {

                /*显示状态*/
                state: "show"

            }
        },
        methods: {

            /*关闭页面*/
            close(){
                this.state = "";
            }

        }
    }
</script>

<style scoped>
    @import "../assets/css/loading-widget.css";
</style>