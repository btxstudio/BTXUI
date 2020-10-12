// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'

//站点图标
document.querySelector("#FAVICON_ICO").href = require("./assets/img/favicon.gif");

//代码高亮
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
Vue.use(VueHighlightJS)

Vue.prototype.$axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
