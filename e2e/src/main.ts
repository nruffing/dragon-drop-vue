import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { NativeEventVue } from 'native-event-vue'

createApp(App).use(router).use(NativeEventVue, { debugLog: true }).mount('#app')
