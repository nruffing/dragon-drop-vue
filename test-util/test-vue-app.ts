import { createApp, defineComponent, h, resolveDirective, withDirectives } from 'vue'
import DragonDropVue from '../lib/DragonDropVue'
import { v4 as uuid } from 'uuid'

export interface TestVueApp {
  //rootElement: HTMLDivElement
  //appRoot: any
  app: any
  elementId: string
}

export function generateTestVueApp(): TestVueApp {
  const elementId = generateId()
  const rootComponent = defineComponent({
    render() {
      return withDirectives(h('div', { id: elementId }), [])
    },
    name: 'appRoot',
  })
  //const rootElement = document.createElement('div')
  const app = createApp(rootComponent)
  //app.use(DragonDropVue, { debugLog: true })
  //const appRoot = app.mount(rootElement)
  return { app, /* rootElement, appRoot, */ elementId }
}

export function mountApp(app: any): any {
  const rootElement = document.createElement('div')
  return app.mount(rootElement)
}

function generateId(): string {
  const raw = uuid()
  /**
   * Strip out the dashes and the leading numbers.
   * HTML ids cannot start with a number.
   */
  return raw.replace(/-/g, '').replace(/^\d*/g, '')
}
