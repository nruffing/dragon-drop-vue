import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DragonDropVue from '../lib/DragonDropVue'

import '../lib/styles/DragonDropVue.css'

createApp(App).use(router).use(DragonDropVue, {}).mount('#app')
