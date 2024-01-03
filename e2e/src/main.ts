import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DragonDropVue } from 'dragon-drop-vue'

createApp(App).use(router).use(DragonDropVue, { debugLog: true }).mount('#app')
