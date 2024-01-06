import { type App } from 'vue'
import type { DragonDropVueOptions } from './options'
import constants from './constants'
import { NativeEventVue, DebugLogLevel } from 'native-event-vue'
import { useDragDirective } from './drag'
import { useDropDirective } from './drop'

export default {
  install: (app: App, options: DragonDropVueOptions = {}) => {
    const opts = Object.assign({ ...constants.defaultOptions }, options)

    /**
     * setup native-event-vue
     */
    app.use(NativeEventVue, {
      debugLogLevel: opts.debugLog ? DebugLogLevel.Info : DebugLogLevel.Error,
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
