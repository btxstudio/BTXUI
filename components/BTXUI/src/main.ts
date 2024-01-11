import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import btxui from './components'

const app = createApp(App)

app.use(router).use(btxui)
app.mount('#app')
