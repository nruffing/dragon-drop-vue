import { type App, type Plugin } from 'vue'
import { addClasses, addEventHandler, removeEventHandler } from './htmlHelpers'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'
import constants from './constants'
import { onDragEnd, onDragEnter, onDragLeave, onDragOver, onDragStart, onDrop } from './eventHandlers'

export default {
  install: (app: App, options: DragonDropVueOptions) => {
    const opts = Object.assign({ ...constants.defaultOptions }, options)

    /*
     * v-drag
     */
    app.directive('drag', {
      beforeMount: (el, binding, vnode, prevVnode) => {
        if (binding.value === false) {
          return
        }

        const domEl = el as HTMLElement
        const dragOpts = (binding.value ?? {}) as DragonDropVueDragOptions

        // add css classes
        addClasses(domEl, [constants.dragClass, opts.dragClass])

        // add draggable attribute
        domEl.setAttribute('draggable', 'true')

        // wire drag events
        addEventHandler(domEl, 'dragstart', ev => onDragStart(ev, dragOpts, opts))
        addEventHandler(domEl, 'dragend', ev => onDragEnd(ev, dragOpts, opts))
      },
      beforeUnmount: (el, binding, vnode, prevVnode) => {
        const domEl = el as HTMLElement

        // remove drag events
        removeEventHandler(domEl, 'dragstart')
        removeEventHandler(domEl, 'dragend')
      },
    })

    /*
     * v-drop
     */
    app.directive('drop', {
      beforeMount: (el, binding, vnode, prevVnode) => {
        if (binding.value === false) {
          return
        }

        const domEl = el as HTMLElement
        const dragOpts = (binding.value ?? {}) as DragonDropVueDragOptions

        // add css classes
        addClasses(domEl, [constants.dropClass, opts.dropClass])

        // wire drag events
        addEventHandler(domEl, 'dragover', ev => onDragOver(ev, dragOpts, opts))
        addEventHandler(domEl, 'dragenter', ev => onDragEnter(ev, dragOpts, opts))
        addEventHandler(domEl, 'dragleave', ev => onDragLeave(ev, dragOpts, opts))
        addEventHandler(domEl, 'drop', ev => onDrop(ev, dragOpts, opts))
      },
      beforeUnmount: (el, binding, vnode, prevVnode) => {
        const domEl = el as HTMLElement

        // remove drag events
        removeEventHandler(domEl, 'dragover')
        removeEventHandler(domEl, 'dragenter')
        removeEventHandler(domEl, 'dragleave')
        removeEventHandler(domEl, 'drop')
      },
    })
  },
} as Plugin<DragonDropVueOptions>
