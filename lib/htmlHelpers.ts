import { log } from './logger'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'
import { useNativeEvent, resolveEventPropNamePrefix } from 'native-event-vue'

export function addClasses(domEl: HTMLElement, classes: (string | undefined)[]) {
  for (const className of classes) {
    if (className) domEl.classList.add(className)
  }
}

export function removeClasses(domEl: HTMLElement, classes: (string | undefined)[]) {
  for (const className of classes) {
    if (className) domEl.classList.remove(className)
  }
}

export function addEventHandler(
  domEl: HTMLElement,
  eventName: string,
  listener: (ev: DragEvent) => any,
  dragOpts: DragonDropVueDragOptions,
  opts: DragonDropVueOptions,
) {
  const debounceMs = eventName === 'dragover' ? dragOpts.dragOverDebounceMs ?? opts.dragOverDebounceMs : undefined
  const debounceMode = eventName === 'dragover' ? dragOpts.dragOverDebounceMode ?? opts.dragOverDebounceMode : undefined
  useNativeEvent(domEl, eventName, listener as (ev: Event) => any, undefined, debounceMs, debounceMode)
  log({ eventName: `addEventHandler | ${eventName}`, domEl, opts })
}

export function removeEventHandler(domEl: HTMLElement, eventName: string, opts: DragonDropVueOptions) {
  const propName = resolveEventPropNamePrefix(eventName)
  const nativeEvent = domEl[propName]
  if (nativeEvent?.destroy) {
    nativeEvent.destroy()
    log({ eventName: `removeEventHandler | ${eventName}`, domEl, opts })
  }
}

export enum DropEffect {
  none = 'none',
  copy = 'copy',
  link = 'link',
  move = 'move',
}
