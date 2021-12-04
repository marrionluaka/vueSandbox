import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.css'
import server from './features/api/backend'

server()

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
