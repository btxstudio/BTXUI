import { resolve } from 'path'

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
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.gif'},
            ]
        }
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "./sass/btx.scss";',
                }
            }
        },
        resolve: {
            alias: {
                "@": resolve(__dirname, "./")
            }
        }
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    css: ["highlight.js/styles/monokai-sublime.css"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
})
