import { type App, type Plugin } from 'vue'

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
            
            // add css classes
            addClasses(domEl, [dragClass, opts.dragClass])

            // add draggable attribute
            domEl.setAttribute('draggable', 'true')

            // wire drag events
            domEl.addEventListener('dragstart', (ev) => onDragStart(ev, opts))
            domEl.addEventListener('dragend', (ev) => onDragEnd(ev, opts))
            
        },
        beforeUnmount: (el, binding, vnode, prevVnode) => {
          const domEl = el as HTMLElement

          // remove drag events
          domEl.removeEventListener('dragstart', (ev) => onDragStart(ev, opts))
          domEl.removeEventListener('dragend', (ev) => onDragEnd(ev, opts))
        },
    })
  },
} as Plugin<DragonDropVueOptions>

export interface DragonDropVueOptions {
    dragClass: string | undefined,
    draggingClass: string | undefined,
}

function onDragStart(event: DragEvent, opts: DragonDropVueOptions) {
  const domEl = event.target as HTMLElement

  // add css classes
  addClasses(domEl, [draggingClass, opts.draggingClass])
}

function onDragEnd(event: DragEvent, opts: DragonDropVueOptions) {
  const domEl = event.target as HTMLElement

  // add css classes
  removeClasses(domEl, [draggingClass, opts.draggingClass])
}

function addClasses(domEl: HTMLElement, classes: (string | undefined)[]) {
  for (const className of classes) {
    if (className) domEl.classList.add(className)
  }
}

function removeClasses(domEl: HTMLElement, classes: (string | undefined)[]) {
  for (const className of classes) {
    if (className) domEl.classList.remove(className)
  }
}