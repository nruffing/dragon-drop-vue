import { type App, type Directive, type DirectiveBinding, type Plugin, type VNode } from 'vue'
import { addClasses, addEventHandler, removeEventHandler } from './htmlHelpers'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'
import constants from './constants'
import { onDragEnd, onDragEnter, onDragLeave, onDragOver, onDragStart, onDrop } from './eventHandlers'
import { log } from './logger'
import { NativeEventVue } from 'native-event-vue'

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
    app.directive(opts.dragDirectiveName!, {
      beforeMount: (
        el: HTMLElement,
        binding: DirectiveBinding<DragonDropVueDragOptions | false>,
        vnode: VNode<any, HTMLElement>,
        prevVnode: VNode<any, HTMLElement> | null,
      ) => {
        if (binding.value === false) {
          return
        }
        setupDrag(el, binding.value)
        log({ eventName: 'drag | beforeMount', domEl: el, dragOpts: binding.value, opts })
      },
      updated: (
        el: HTMLElement,
        binding: DirectiveBinding<DragonDropVueDragOptions | false>,
        vnode: VNode<any, HTMLElement>,
        prevVnode: VNode<any, HTMLElement> | null,
      ) => {
        if (binding.value === false) {
          el.setAttribute('draggable', 'false')
        } else if (el.getAttribute('draggable') !== 'true') {
          setupDrag(el, binding.value)
        }
        log({ eventName: 'drag | updated', domEl: el, dragOpts: binding.value, opts })
      },
      beforeUnmount: (
        el: HTMLElement,
        binding: DirectiveBinding<DragonDropVueDragOptions | false>,
        vnode: VNode<any, HTMLElement>,
        prevVnode: VNode<any, HTMLElement> | null,
      ) => {
        // remove drag events
        removeEventHandler(el, 'dragstart', opts)
        removeEventHandler(el, 'dragend', opts)
        log({ eventName: 'drag | beforeUnmount', domEl: el, dragOpts: binding.value, opts })
      },
    } as Directive<HTMLElement, DragonDropVueDragOptions | false>)

    function setupDrag(el: HTMLElement, dragOpts: DragonDropVueDragOptions) {
      // add css classes
      addClasses(el, [constants.dragClass, opts.dragClass])

      // add draggable attribute
      el.setAttribute('draggable', 'true')

      // wire drag events
      addEventHandler(el, 'dragstart', ev => onDragStart(ev, dragOpts, opts), opts)
      addEventHandler(el, 'dragend', ev => onDragEnd(ev, dragOpts, opts), opts)
    }

    /*
     * v-drop
     */
    app.directive(opts.dropDirectiveName!, {
      beforeMount: (
        el: HTMLElement,
        binding: DirectiveBinding<DragonDropVueDragOptions | false>,
        vnode: VNode<any, HTMLElement>,
        prevVnode: VNode<any, HTMLElement> | null,
      ) => {
        if (binding.value === false) {
          return
        }

        setupDrop(el, binding.value)
        log({ eventName: 'drop | beforeMount', domEl: el, dragOpts: binding.value, opts })
      },
      updated: (
        el: HTMLElement,
        binding: DirectiveBinding<DragonDropVueDragOptions | false>,
        vnode: VNode<any, HTMLElement>,
        prevVnode: VNode<any, HTMLElement> | null,
      ) => {
        if (binding.value === false) {
          return
        }

        const domEl = el as HTMLElement
        if (!domEl.classList.contains(constants.dropClass)) {
          setupDrop(el, binding.value)
        }
        log({ eventName: 'drop | updated', domEl: el, dragOpts: binding.value, opts })
      },
      beforeUnmount: (
        el: HTMLElement,
        binding: DirectiveBinding<DragonDropVueDragOptions | false>,
        vnode: VNode<any, HTMLElement>,
        prevVnode: VNode<any, HTMLElement> | null,
      ) => {
        // remove drag events
        removeEventHandler(el, 'dragover', opts)
        removeEventHandler(el, 'dragenter', opts)
        removeEventHandler(el, 'dragleave', opts)
        removeEventHandler(el, 'drop', opts)
        log({ eventName: 'drop | beforeUnmount', domEl: el, dragOpts: binding.value, opts })
      },
    } as Directive<HTMLElement, DragonDropVueDragOptions | false>)

    function setupDrop(el: HTMLElement, dragOpts: DragonDropVueDragOptions) {
      // add css classes
      addClasses(el, [constants.dropClass, opts.dropClass])

      // wire drag events
      addEventHandler(el, 'dragover', ev => onDragOver(ev, dragOpts, opts), opts)
      addEventHandler(el, 'dragenter', ev => onDragEnter(ev, dragOpts, opts), opts)
      addEventHandler(el, 'dragleave', ev => onDragLeave(ev, dragOpts, opts), opts)
      addEventHandler(el, 'drop', ev => onDrop(ev, dragOpts, opts), opts)
    }
  },
}
