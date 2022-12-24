// import './polyfil'
import 'virtual:windi.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App'
import router from './router'
import './styles/index.css'

createApp(App).use(createPinia()).use(router).mount('#app')
