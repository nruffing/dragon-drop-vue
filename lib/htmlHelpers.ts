import { log } from './logger'
import type { DragonDropVueOptions } from './options'
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

export function addEventHandler(domEl: HTMLElement, eventName: string, listener: (ev: DragEvent) => any, opts: DragonDropVueOptions) {
  const debounceMs = eventName === 'dragover' ? opts.dragOverDebounceMs : undefined
  useNativeEvent(domEl, eventName, listener as (ev: Event) => any, undefined, debounceMs)
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
