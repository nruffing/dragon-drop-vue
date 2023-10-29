import { type App, type Directive, type DirectiveBinding, type Plugin, type VNode } from 'vue'
import { addClasses, addEventHandler, removeEventHandler } from './htmlHelpers'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'
import constants from './constants'
import { onDragEnd, onDragEnter, onDragLeave, onDragOver, onDragStart, onDrop } from './eventHandlers'

export default {
  install: (app: App, options: DragonDropVueOptions | undefined = undefined) => {
    const opts = Object.assign({ ...constants.defaultOptions }, options ?? {})

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
      },
      beforeUnmount: (
        el: HTMLElement,
        binding: DirectiveBinding<DragonDropVueDragOptions | false>,
        vnode: VNode<any, HTMLElement>,
        prevVnode: VNode<any, HTMLElement> | null,
      ) => {
        // remove drag events
        removeEventHandler(el, 'dragstart')
        removeEventHandler(el, 'dragend')
      },
    } as Directive<HTMLElement, DragonDropVueDragOptions | false>)

    function setupDrag(el: HTMLElement, dragOpts: DragonDropVueDragOptions) {
      // add css classes
      addClasses(el, [constants.dragClass, opts.dragClass])

      // add draggable attribute
      el.setAttribute('draggable', 'true')

      // wire drag events
      addEventHandler(el, 'dragstart', ev => onDragStart(ev, dragOpts, opts))
      addEventHandler(el, 'dragend', ev => onDragEnd(ev, dragOpts, opts))
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
      },
      beforeUnmount: (
        el: HTMLElement,
        binding: DirectiveBinding<DragonDropVueDragOptions | false>,
        vnode: VNode<any, HTMLElement>,
        prevVnode: VNode<any, HTMLElement> | null,
      ) => {
        // remove drag events
        removeEventHandler(el, 'dragover')
        removeEventHandler(el, 'dragenter')
        removeEventHandler(el, 'dragleave')
        removeEventHandler(el, 'drop')
      },
    } as Directive<HTMLElement, DragonDropVueDragOptions | false>)

    function setupDrop(el: HTMLElement, dragOpts: DragonDropVueDragOptions) {
      // add css classes
      addClasses(el, [constants.dropClass, opts.dropClass])

      // wire drag events
      addEventHandler(el, 'dragover', ev => onDragOver(ev, dragOpts, opts))
      addEventHandler(el, 'dragenter', ev => onDragEnter(ev, dragOpts, opts))
      addEventHandler(el, 'dragleave', ev => onDragLeave(ev, dragOpts, opts))
      addEventHandler(el, 'drop', ev => onDrop(ev, dragOpts, opts))
    }
  },
} as Plugin<DragonDropVueOptions | undefined>
