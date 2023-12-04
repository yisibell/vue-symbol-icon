import { createApp } from 'vue'
import App from './App.vue'
import { installIcons } from '@/icons'

const app = createApp(App)

installIcons(app)

app.mount('#app')
