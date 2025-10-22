export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("showName", (): string => "neo");
})