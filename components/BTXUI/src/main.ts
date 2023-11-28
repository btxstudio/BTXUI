import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import btxui from './components'
import store from '@/store'

const app = createApp(App)

app.use(router).use(store).use(btxui)
app.mount('#app')
