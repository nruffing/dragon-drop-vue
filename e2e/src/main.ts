import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DragonDropVue } from 'dragon-drop-vue'

export const options = {
  debugLog: true,
  dragClass: 'cy-dragClass',
  dropClass: 'cy-dropClass',
  draggingClass: 'cy-draggingClass',
  dragOverClass: 'cy-dragOverClass',
}

// todo: test directive name options with vitest?

createApp(App).use(router).use(DragonDropVue, options).mount('#app')
