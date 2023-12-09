import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DragonDropVue from '../lib/DragonDropVue'

const dragonDropOptions = {
  debugLog: true,
  dragClass: 'custom-draggable',
  draggingClass: 'custom-dragging',
  dropClass: 'custom-drop',
  dragOverClass: 'custom-dragging-over',
}

createApp(App).use(router).use(DragonDropVue, dragonDropOptions).mount('#app')
