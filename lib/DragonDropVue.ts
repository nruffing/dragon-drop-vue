import { type App, type Plugin } from 'vue'
import { addClasses, removeClasses } from './htmlHelpers'

const dragClass = 'ddv-draggable'
const draggingClass = 'ddv-dragging'

const defaultOptions = {
    dragClass: '',
    draggingClass: '',
} as DragonDropVueOptions

export default {
  install: (app: App, options: DragonDropVueOptions) => {
    const opts = Object.assign({...defaultOptions}, options)

    app.directive('drag', {
        beforeMount: (el, binding, vnode, prevVnode) => {
            const domEl = el as HTMLElement
            const dragOpts = binding.value as DragonDropVueDragOptions
            
            // add css classes
            addClasses(domEl, [dragClass, opts.dragClass])

            // add draggable attribute
            domEl.setAttribute('draggable', 'true')

            // wire drag events
            domEl.addEventListener('dragstart', (ev) => onDragStart(ev, dragOpts, opts))
            domEl.addEventListener('dragend', (ev) => onDragEnd(ev, dragOpts, opts))
            
        },
        beforeUnmount: (el, binding, vnode, prevVnode) => {
          const domEl = el as HTMLElement
          const dragOpts = binding.value as DragonDropVueDragOptions

          // remove drag events
          domEl.removeEventListener('dragstart', (ev) => onDragStart(ev, dragOpts, opts))
          domEl.removeEventListener('dragend', (ev) => onDragEnd(ev, dragOpts, opts))
        },
    })
  },
} as Plugin<DragonDropVueOptions>

export interface DragonDropVueOptions {
    dragClass: string | undefined,
    draggingClass: string | undefined,
}

export interface DragonDropVueDragOptions<T = any> {
  dragData: T | undefined,
  onDragStart?: (domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<T>, options: DragonDropVueOptions) => void,
  onDragEnd?: (domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<T>, options: DragonDropVueOptions) => void,
}


/*
  DRAG HANDLERS
*/
function onDragStart(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions) {
  const domEl = event.target as HTMLElement

  // add css classes
  addClasses(domEl, [draggingClass, opts.draggingClass])

  // call consumer-defined handler
  if (dragOpts.onDragStart) {
    dragOpts.onDragStart(domEl, event, dragOpts, opts)
  }
}

function onDragEnd(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions) {
  const domEl = event.target as HTMLElement

  // add css classes
  removeClasses(domEl, [draggingClass, opts.draggingClass])

  // call consumer-defined handler
  if (dragOpts.onDragEnd) {
    dragOpts.onDragEnd(domEl, event, dragOpts, opts)
  }
}