export interface DragonDropVueOptions {
  debugLog: boolean | undefined
  dragClass: string | undefined
  draggingClass: string | undefined
  dropClass: string | undefined
  dragOverClass: string | undefined
}

export interface DragonDropVueDragOptions<T = any> {
  dragData: T | undefined
  onDragStart?: (
    domEl: HTMLElement,
    dragEvent: DragEvent,
    dragOptions: DragonDropVueDragOptions<T>,
    options: DragonDropVueOptions,
  ) => boolean | undefined
  onDragEnd?: (
    domEl: HTMLElement,
    dragEvent: DragEvent,
    dragOptions: DragonDropVueDragOptions<T>,
    options: DragonDropVueOptions,
  ) => boolean | undefined
  onDragOver?: (
    domEl: HTMLElement,
    dragEvent: DragEvent,
    dragOptions: DragonDropVueDragOptions<T>,
    options: DragonDropVueOptions,
  ) => boolean | undefined
  onDragEnter?: (
    domEl: HTMLElement,
    dragEvent: DragEvent,
    dragOptions: DragonDropVueDragOptions<T>,
    options: DragonDropVueOptions,
  ) => boolean | undefined
  onDragLeave?: (
    domEl: HTMLElement,
    dragEvent: DragEvent,
    dragOptions: DragonDropVueDragOptions<T>,
    options: DragonDropVueOptions,
  ) => boolean | undefined
  onDrop?: (domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<T>, options: DragonDropVueOptions) => boolean | undefined
  // TODO: drag image
  // TODO: drop effect
}
