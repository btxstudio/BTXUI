// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover'},
                {name: 'format-detection', content: 'telephone=no'}
            ],
            title: 'BTX·UI',
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.gif'},
            ],
            style: [
                { 
                    children: `#__nuxt { width: 100%; height: 100%; }`
                }
            ],
            bodyAttrs: {
                class: 'max'
            }
        }
    }
})
