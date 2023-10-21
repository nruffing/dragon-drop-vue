import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DragonDropVue from '../lib/DragonDropVue'
import { type DragonDropVueOptions } from '../lib/options'

const dragonDropOptions = {

} as DragonDropVueOptions

createApp(App).use(router).use(DragonDropVue, dragonDropOptions).mount('#app')
