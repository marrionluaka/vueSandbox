import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import store from './store'
import router from './router'
import server from './features/api/backend'

server()

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
