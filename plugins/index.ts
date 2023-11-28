import btxui from "@/components/BTXUI/index.js"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(btxui);
})