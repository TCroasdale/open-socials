import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import authStore from './store'

import 'tailwindcss/tailwind.css'

createApp(App).use(router).use(authStore).mount('#app')
