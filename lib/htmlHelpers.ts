import constants from './constants'
import { log } from './logger'
import type { DragonDropVueOptions } from './options'

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
  ;(domEl as any)[`${constants.eventPropNamePrefix}${eventName}`] = listener
  domEl.addEventListener(eventName, listener as (ev: Event) => any)
  log({ eventName: `addEventHandler | ${eventName}`, domEl, opts })
}

export function removeEventHandler(domEl: HTMLElement, eventName: string, opts: DragonDropVueOptions) {
  const listener = (domEl as any)[`${constants.eventPropNamePrefix}${eventName}`] as ((ev: Event) => any) | undefined
  if (listener) {
    ;(domEl as any)[`${constants.eventPropNamePrefix}${eventName}`] = undefined
    domEl.removeEventListener(eventName, listener)
    log({ eventName: `removeEventHandler | ${eventName}`, domEl, opts })
  }
}

export enum DropEffect {
  none = 'none',
  copy = 'copy',
  link = 'link',
  move = 'move',
}
