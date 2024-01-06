import type { Component } from 'vue'
import type { DropEffect } from './htmlHelpers'
import type { DebounceMode } from 'native-event-vue'

export interface DragonDropVueOptions {
  /**
   * Print additional debugging information to the console. All drag and drop events are printed.
   * This also enables the `Info` log level of [`native-event-vue`](https://www.npmjs.com/package/native-event-vue).
   */
  debugLog?: boolean
  /**
   * Optionally specify what to register for the drag directive. By default this is `drag` and the directive would be `v-drag`.
   */
  dragDirectiveName?: string
  /**
   * Optionally specify what to register for the drag directive. By default this is `drop` and the directive would be `v-drop`.
   */
  dropDirectiveName?: string
  /**
   * Custom class that will be added to all elements with the drag directive. `ddv-draggable` is also always added.
   */
  dragClass?: string
  /**
   * Custom class that will be added to all elements with the drop directive. `ddv-dropzone` is also always added.
   */
  dropClass?: string
  /**
   * Custom class that will be added to the element currently being dragged. `ddv-dragging` is also always added.
   */
  draggingClass?: string
  /**
   * Custom class that will added to the element currently being dragged over. `ddv-ddv-dragging-over` is also always added.
   */
  dragOverClass?: string
  /**
   * Optionally override the debounce period for the `dragover` event. By default, this is set to `500ms`. Setting this to `0`
   * will turn off debouncing of the `dragover` event. This can also be overridden by passing the same option to the object bound
   * to the drop directive. The directive value will take precedence.
   */
  dragOverDebounceMs?: number
  /**
   * Optionally override the [debounce mode](https://github.com/nruffing/native-event-vue?tab=readme-ov-file#debounce-mode) used
   * to debounce the `dragover` event. By default, `MaximumFrequency` is used and this will debounce the event and only call the
   * vent handler at most once during the debounce timeout. This can also be overridden by passing the same option to the object
   * bound to the drop directive. The directive value will take precedence.
   */
  dragOverDebounceMode?: DebounceMode
}

export interface DragonDropVueDragOptions<T = any> {
  /**
   * Any piece of data to pass to each drag and drop event handler.
   */
  dragData?: T
  /**
   * Optional drag image override.
   */
  dragImage?: DragonDropVueDragImageOptions
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
  /**
   * Optionally override the debounce period for the `dragover` event. By default, this is set to `500ms`. Setting this to `0` will turn off debouncing of
   * the `dragover` event. This will take precedence over the same option on the plugin options.
   */
  dragOverDebounceMs?: number
  /**
   * Optionally override the [debounce mode](https://github.com/nruffing/native-event-vue?tab=readme-ov-file#debounce-mode) used to debounce the `dragover`
   * event. By default, `MaximumFrequency` is used and this will debounce the event and only call the vent handler at most once during the debounce timeout.
   * This will take precedence over the same option on the plugin options.
   */
  dragOverDebounceMode?: DebounceMode
}

export interface DragonDropVueDragImageOptions {
  image?: Element
  xOffset?: number
  yOffset?: number
  rootComponent?: Component
  rootComponentProps?: Record<string, unknown>
}
