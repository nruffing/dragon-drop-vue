import { addClasses, removeClasses } from './htmlHelpers'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'
import constants from './constants'

export function onDragStart(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions) {
  const domEl = event.target as HTMLElement

  // add css classes
  addClasses(domEl, [constants.draggingClass, opts.draggingClass])

  // call consumer-defined handler
  if (dragOpts.onDragStart) {
    dragOpts.onDragStart(domEl, event, dragOpts, opts)
  }
}

export function onDragEnd(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions) {
  const domEl = event.target as HTMLElement

  // remove css classes
  removeClasses(domEl, [constants.draggingClass, opts.draggingClass])

  // call consumer-defined handler
  if (dragOpts.onDragEnd) {
    dragOpts.onDragEnd(domEl, event, dragOpts, opts)
  }
}

export function onDragOver(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions) {
  const domEl = event.target as HTMLElement

  // add css classes
  addClasses(domEl, [constants.dragOverClass, opts.dragOverClass])

  // call consumer-defined handler
  if (dragOpts.onDragOver) {
    dragOpts.onDragOver(domEl, event, dragOpts, opts)
  }
}

export function onDrop(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions) {
  const domEl = event.target as HTMLElement

  // call consumer-defined handler
  if (dragOpts.onDrop) {
    dragOpts.onDrop(domEl, event, dragOpts, opts)
  }
}
