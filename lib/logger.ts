import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'

export interface LogEvent {
  eventName: string
  event?: DragEvent
  domEl: HTMLElement
  dragOpts?: DragonDropVueDragOptions | false
  opts: DragonDropVueOptions
  classes?: string[]
}

export function log(data: LogEvent) {
  if (data.opts.debugLog) {
    console.groupCollapsed(`🐲%c dragon-drop-vue | ${data.eventName}`, 'color: green; font-weight: bold;')
    console.log(data)
    console.groupEnd()
  }
}
