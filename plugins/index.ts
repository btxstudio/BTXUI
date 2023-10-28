import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark-reasonable.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueHighlightJS);
})