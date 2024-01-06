import type { Component } from 'vue'
import type { DropEffect } from './htmlHelpers'
import type { DebounceMode } from 'native-event-vue'

export interface DragonDropVueOptions {
  dragDirectiveName?: string
  dropDirectiveName?: string
  debugLog?: boolean
  dragClass?: string
  draggingClass?: string
  dropClass?: string
  dragOverClass?: string
  dragOverDebounceMs?: number
  dragOverDebounceMode?: DebounceMode
}

export interface DragonDropVueDragOptions<T = any> {
  dragData?: T
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
  dropEffect?: DropEffect
  dragImage?: DragonDropVueDragImageOptions
  dragOverDebounceMs?: number
  dragOverDebounceMode?: DebounceMode
}

export interface DragonDropVueDragImageOptions {
  image?: Element
  xOffset?: number
  yOffset?: number
  rootComponent?: Component
  rootComponentProps?: Record<string, unknown>
}
