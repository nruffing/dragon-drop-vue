import { type App, type Plugin } from 'vue'
import { addClasses } from './htmlHelpers'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'
import constants from './constants'
import { onDragEnd, onDragStart } from './eventHandlers'

export default {
  install: (app: App, options: DragonDropVueOptions) => {
    const opts = Object.assign({ ...constants.defaultOptions }, options)

    /*
     * v-drag
     */
    app.directive('drag', {
      beforeMount: (el, binding, vnode, prevVnode) => {
        const domEl = el as HTMLElement
        const dragOpts = binding.value as DragonDropVueDragOptions

        // add css classes
        addClasses(domEl, [constants.dragClass, opts.dragClass])

        // add draggable attribute
        domEl.setAttribute('draggable', 'true')

        // wire drag events
        domEl.addEventListener('dragstart', ev => onDragStart(ev, dragOpts, opts))
        domEl.addEventListener('dragend', ev => onDragEnd(ev, dragOpts, opts))
      },
      beforeUnmount: (el, binding, vnode, prevVnode) => {
        const domEl = el as HTMLElement
        const dragOpts = binding.value as DragonDropVueDragOptions

        // remove drag events
        domEl.removeEventListener('dragstart', ev => onDragStart(ev, dragOpts, opts))
        domEl.removeEventListener('dragend', ev => onDragEnd(ev, dragOpts, opts))
      },
    })

    /*
     * v-drop
     */
    app.directive('drop', {
      beforeMount: (el, binding, vnode, prevVnode) => {
        const domEl = el as HTMLElement
        const dragOpts = binding.value as DragonDropVueDragOptions

        // add css classes
        addClasses(domEl, [constants.dropClass, opts.dropClass])

        // wire drag events
      },
      beforeUnmount: (el, binding, vnode, prevVnode) => {
        const domEl = el as HTMLElement
        const dragOpts = binding.value as DragonDropVueDragOptions

        // wire drag events
      },
    })
  },
} as Plugin<DragonDropVueOptions>
