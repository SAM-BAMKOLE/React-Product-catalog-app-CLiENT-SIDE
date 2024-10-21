import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueTyped from 'vue3-typed-js'

import App from './App.vue'
import router from './router'

import { setupAxiosnterceptors } from './lib/axios'

import { useAuthStore } from '@/stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTyped)

const authStore = useAuthStore()

setupAxiosnterceptors(authStore)

app.mount('#app')
