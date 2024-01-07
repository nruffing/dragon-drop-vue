import type { Directive, DirectiveBinding, VNode } from 'vue'
import constants from './constants'
import { onDragEnter, onDragLeave, onDragOver, onDrop } from './eventHandlers'
import { addClasses, addEventHandler, removeClasses, removeEventHandler } from './htmlHelpers'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'
import { log } from './logger'

export function useDropDirective(opts: DragonDropVueOptions) {
  return {
    beforeMount: (
      el: HTMLElement,
      binding: DirectiveBinding<DragonDropVueDragOptions | false>,
      vnode: VNode<any, HTMLElement>,
      prevVnode: VNode<any, HTMLElement> | null,
    ) => {
      if (binding.value === false) {
        return
      }

      setupDrop(el, binding.value, opts)
      log({ eventName: 'drop | beforeMount', domEl: el, dragOpts: binding.value, opts })
    },
    updated: (
      el: HTMLElement,
      binding: DirectiveBinding<DragonDropVueDragOptions | false>,
      vnode: VNode<any, HTMLElement>,
      prevVnode: VNode<any, HTMLElement> | null,
    ) => {
      const domEl = el as HTMLElement
      if (binding.value === false) {
        if (domEl.classList.contains(constants.dropClass)) {
          removeDrop(el, opts)
          log({ eventName: 'drop | updated', domEl: el, dragOpts: binding.value, opts })
        }
        return
      }

      if (!domEl.classList.contains(constants.dropClass)) {
        setupDrop(el, binding.value, opts)
        log({ eventName: 'drop | updated', domEl: el, dragOpts: binding.value, opts })
      }
    },
    beforeUnmount: (
      el: HTMLElement,
      binding: DirectiveBinding<DragonDropVueDragOptions | false>,
      vnode: VNode<any, HTMLElement>,
      prevVnode: VNode<any, HTMLElement> | null,
    ) => {
      removeDrop(el, opts)
      log({ eventName: 'drop | beforeUnmount', domEl: el, dragOpts: binding.value, opts })
    },
  } as Directive<HTMLElement, DragonDropVueDragOptions | false>
}

function setupDrop(el: HTMLElement, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions) {
  // add css classes
  addClasses(el, [constants.dropClass, opts.dropClass])

  // wire drag events
  addEventHandler(el, 'dragover', ev => onDragOver(ev, dragOpts, opts), dragOpts, opts)
  addEventHandler(el, 'dragenter', ev => onDragEnter(ev, dragOpts, opts), dragOpts, opts)
  addEventHandler(el, 'dragleave', ev => onDragLeave(ev, dragOpts, opts), dragOpts, opts)
  addEventHandler(el, 'drop', ev => onDrop(ev, dragOpts, opts), dragOpts, opts)
}

function removeDrop(el: HTMLElement, opts: DragonDropVueOptions) {
  // remove css classes
  removeClasses(el, [constants.dropClass, opts.dropClass])

  // remove drag events
  removeEventHandler(el, 'dragover', opts)
  removeEventHandler(el, 'dragenter', opts)
  removeEventHandler(el, 'dragleave', opts)
  removeEventHandler(el, 'drop', opts)
}
