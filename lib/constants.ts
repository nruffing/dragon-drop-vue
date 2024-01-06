import { DebounceMode } from 'native-event-vue'
import type { DragonDropVueOptions } from './options'

export default {
  dragClass: 'ddv-draggable',
  draggingClass: 'ddv-dragging',
  dropClass: 'ddv-dropzone',
  dragOverClass: 'ddv-dragging-over',
  eventPropNamePrefix: 'ddv-event-',
  defaultOptions: {
    dragDirectiveName: 'drag',
    dropDirectiveName: 'drop',
    dragOverDebounceMs: 500,
    dragOverDebounceMode: DebounceMode.MaximumFrequency,
  } as DragonDropVueOptions,
}
