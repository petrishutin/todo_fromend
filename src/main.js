import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import '@/assets/style.css'
import componets from '@/components/UI'

const app = createApp(App)

componets.forEach(component => {
    app.component(component.name, component)
})

app.use(store).use(router).mount('#app')
