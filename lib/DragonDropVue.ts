import { type App } from 'vue'
import type { DragonDropVueOptions } from './options'
import constants from './constants'
import { NativeEventVue } from 'native-event-vue'
import { useDragDirective } from './drag'
import { useDropDirective } from './drop'

export default {
  install: (app: App, options: DragonDropVueOptions = {}) => {
    const opts = Object.assign({ ...constants.defaultOptions }, options)

    /**
     * setup native-event-vue
     */
    app.use(NativeEventVue, {
      debugLog: opts.debugLog,
      propNamePrefix: constants.eventPropNamePrefix,
    })

    /*
     * v-drag
     */
    app.directive(opts.dragDirectiveName!, useDragDirective(opts))

    /*
     * v-drop
     */
    app.directive(opts.dropDirectiveName!, useDropDirective(opts))
  },
}
