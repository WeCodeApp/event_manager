// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'
import vuetify from './plugins/vuetify' // Import Vuetify
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // Add Vuetify to the app

app.mount('#app')
