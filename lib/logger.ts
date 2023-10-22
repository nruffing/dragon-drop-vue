import type { DragonDropVueDragOptions, DragonDropVueOptions } from './options'

export interface LogEvent {
  eventName: string
  event: DragEvent
  domEl: HTMLElement
  dragOpts: DragonDropVueDragOptions
  opts: DragonDropVueOptions
}

export function log(data: LogEvent) {
  if (data.opts.debugLog) {
    console.log(`DragonDropVue [${data.eventName}]\n`, data)
  }
}
