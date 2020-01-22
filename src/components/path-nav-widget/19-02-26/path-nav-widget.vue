<!--19-02-26-->
<template>
    <div class="path-nav-widget">
        <div class="pn-w-arrow"><i class=""></i></div>
        <ul class="pn-w-list" v-if="navs">
            <li class="pn-w-item" v-for="nav of navs">
                <router-link :to="nav.link" >{{nav.text}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "path-nav-widget",
        props: ["init-data"],
        data(){
            return {

                /*路径导航*/
                navs: null,

            }
        },
        methods: {

        },
        mounted(){
            this.navs = this.initData.navs;
        }
    }
</script>

<style scoped>
    @import "../../assets/css/path-nav-widget.css";
</style>