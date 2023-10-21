
export interface DragonDropVueOptions {
  dragClass: string | undefined,
  draggingClass: string | undefined,
}

export interface DragonDropVueDragOptions<T = any> {
dragData: T | undefined,
onDragStart?: (domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<T>, options: DragonDropVueOptions) => void,
onDragEnd?: (domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<T>, options: DragonDropVueOptions) => void,
// TODO: drag image
// TODO: drop effect
}
