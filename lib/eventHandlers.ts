import { addClasses, removeClasses } from './htmlHelpers'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'
import constants from './constants'
import { log } from './logger'
import { createApp } from 'vue'

export function onDragStart(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions): boolean | undefined {
  const domEl = event.target as HTMLElement

  log({ eventName: 'onDragStart', event, domEl, dragOpts, opts })

  // call consumer-defined handler
  if (dragOpts.onDragStart) {
    var dontTerminate = dragOpts.onDragStart(domEl, event, dragOpts, opts)
    if (dontTerminate === false) {
      log({ eventName: 'onDragStart | terminated', event, domEl, dragOpts, opts })
      return false
    }
  }

  // add css classes
  addClasses(domEl, [constants.draggingClass, opts.draggingClass])

  if (event.dataTransfer) {
    if (dragOpts.dragData) {
      event.dataTransfer.setData('application/json', JSON.stringify(dragOpts.dragData))
    }

    if (dragOpts.dropEffect) {
      event.dataTransfer.effectAllowed = dragOpts.dropEffect
    }

    if (dragOpts.dragImage) {
      if (!dragOpts.dragImage.image && dragOpts.dragImage.rootComponent) {
        const div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.top = '-1000px'
        document.body.appendChild(div)
        createApp(dragOpts.dragImage.rootComponent, dragOpts.dragImage.rootComponentProps ?? {}).mount(div)
        dragOpts.dragImage.image = div
      }

      if (dragOpts.dragImage.image) {
        event.dataTransfer.setDragImage(dragOpts.dragImage.image, dragOpts.dragImage.xOffset ?? 0, dragOpts.dragImage.yOffset ?? 0)
      }
    }
  }
}

export function onDragEnd(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions): boolean | undefined {
  const domEl = event.target as HTMLElement

  log({ eventName: 'onDragEnd', event, domEl, dragOpts, opts })

  // remove drag image from dom, browser will do this automatically for images since it created the image element
  if (dragOpts.dragImage?.image && !(dragOpts.dragImage.image instanceof Image)) {
    document.body.removeChild(dragOpts.dragImage.image)
  }

  // call consumer-defined handler
  if (dragOpts.onDragEnd) {
    var dontTerminate = dragOpts.onDragEnd(domEl, event, dragOpts, opts)
    if (dontTerminate === false) {
      log({ eventName: 'onDragEnd | terminated', event, domEl, dragOpts, opts })
      return false
    }
  }

  // remove css classes
  removeClasses(domEl, [constants.draggingClass, opts.draggingClass])
}

export function onDragOver(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions): boolean | undefined {
  const domEl = event.target as HTMLElement

  log({ eventName: 'onDragOver', event, domEl, dragOpts, opts })

  // call consumer-defined handler
  if (dragOpts.onDragOver) {
    var dontTerminate = dragOpts.onDragOver(domEl, event, dragOpts, opts)
    if (dontTerminate === false) {
      log({ eventName: 'onDragOver | terminated', event, domEl, dragOpts, opts })
      return false
    }
  }

  if (dragOpts.dropEffect && event.dataTransfer) {
    event.dataTransfer.dropEffect = dragOpts.dropEffect
  }
}

export function onDragEnter(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions): boolean | undefined {
  const domEl = event.target as HTMLElement

  log({ eventName: 'onDragEnter', event, domEl, dragOpts, opts })

  // call consumer-defined handler
  if (dragOpts.onDragEnter) {
    var dontTerminate = dragOpts.onDragEnter(domEl, event, dragOpts, opts)
    if (dontTerminate === false) {
      log({ eventName: 'onDragEnter | terminated', event, domEl, dragOpts, opts })
      return false
    }
  }

  if (dragOpts.dropEffect && event.dataTransfer) {
    event.dataTransfer.dropEffect = dragOpts.dropEffect
  }

  // add css classes
  addClasses(domEl, [constants.dragOverClass, opts.dragOverClass])
}

export function onDragLeave(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions): boolean | undefined {
  const domEl = event.target as HTMLElement

  log({ eventName: 'onDragLeave', event, domEl, dragOpts, opts })

  // call consumer-defined handler
  if (dragOpts.onDragLeave) {
    var dontTerminate = dragOpts.onDragLeave(domEl, event, dragOpts, opts)
    if (dontTerminate === false) {
      log({ eventName: 'onDragLeave | terminated', event, domEl, dragOpts, opts })
      return false
    }
  }

  // remove css classes
  removeClasses(domEl, [constants.dragOverClass, opts.dragOverClass])
}

export function onDrop(event: DragEvent, dragOpts: DragonDropVueDragOptions, opts: DragonDropVueOptions): boolean | undefined {
  const domEl = event.target as HTMLElement

  const dragOptions = dragOpts ? { ...dragOpts } : ({} as DragonDropVueDragOptions)
  if (dragOptions.dragData === undefined && event.dataTransfer) {
    const data = event.dataTransfer.getData('application/json')
    if (data) {
      dragOptions.dragData = JSON.parse(data)
    }
  }

  log({ eventName: 'onDrop', event, domEl, dragOpts: dragOptions, opts })

  // call consumer-defined handler
  if (dragOpts.onDrop) {
    var dontTerminate = dragOpts.onDrop(domEl, event, dragOptions, opts)
    if (dontTerminate === false) {
      log({ eventName: 'onDrop | terminated', event, domEl, dragOpts: dragOptions, opts })
      return false
    }
  }

  // remove css classes
  removeClasses(domEl, [constants.dragOverClass, opts.dragOverClass])
}
