import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(Notifications)

app.mount('#app')
