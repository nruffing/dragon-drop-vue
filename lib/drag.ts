import type { Directive, DirectiveBinding, VNode } from 'vue'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'
import { log } from './logger'
import { addClasses, addEventHandler, removeEventHandler } from './htmlHelpers'
import constants from './constants'
import { onDragEnd, onDragStart } from './eventHandlers'

export function useDragDirective(opts: DragonDropVueOptions) {
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
      setupDrag(el, binding.value, opts)
      log({ eventName: 'drag | beforeMount', domEl: el, dragOpts: binding.value, opts })
    },
    updated: (
      el: HTMLElement,
      binding: DirectiveBinding<DragonDropVueDragOptions | false>,
      vnode: VNode<any, HTMLElement>,
      prevVnode: VNode<any, HTMLElement> | null,
    ) => {
      const isSetup = el.getAttribute('draggable') === 'true'
      if (binding.value === false) {
        if (isSetup) {
          removeDrag(el, opts)
          log({ eventName: 'drag | updated', domEl: el, dragOpts: binding.value, opts })
        }
      } else if (!isSetup) {
        setupDrag(el, binding.value, opts)
        log({ eventName: 'drag | updated', domEl: el, dragOpts: binding.value, opts })
      }
    },
    beforeUnmount: (
      el: HTMLElement,
      binding: DirectiveBinding<DragonDropVueDragOptions | false>,
      vnode: VNode<any, HTMLElement>,
      prevVnode: VNode<any, HTMLElement> | null,
    ) => {
      removeDrag(el, opts)
      log({ eventName: 'drag | beforeUnmount', domEl: el, dragOpts: binding.value, opts })
    },
  } as Directive<HTMLElement, DragonDropVueDragOptions | false>
}

function setupDrag(el: HTMLElement, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions) {
  // add css classes
  addClasses(el, [constants.dragClass, opts.dragClass])

  // add draggable attribute
  el.setAttribute('draggable', 'true')

  // wire drag events
  addEventHandler(el, 'dragstart', ev => onDragStart(ev, dragOpts, opts), dragOpts, opts)
  addEventHandler(el, 'dragend', ev => onDragEnd(ev, dragOpts, opts), dragOpts, opts)
}

function removeDrag(el: HTMLElement, opts: DragonDropVueOptions) {
  // remove css classes
  addClasses(el, [constants.dragClass, opts.dragClass])

  // set draggable attribute to false
  el.setAttribute('draggable', 'false')

  // remove drag events
  removeEventHandler(el, 'dragstart', opts)
  removeEventHandler(el, 'dragend', opts)
}
