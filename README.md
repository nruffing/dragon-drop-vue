# dragon-drop-vue

Customizable native Vue3 drag-n-drop library with no dependencies. Includes Vue plugin that registers directives to configure draggable elements and drop zones.

This package is intended to just be a directive that wraps the browser's drag and drop API and combine it with Vue's reactive features. The actual HTML events are available in each of the event handler callbacks. It is recommended to still understand how the browser's API works to best decide how to wire-up the directives for your use case. MDN has a good primer on the browser API [here](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API).

<p align="center">
  <a href="https://github.com/nruffing/dragon-drop-vue/actions/workflows/ci_cd.yml">
    <img src="https://github.com/nruffing/dragon-drop-vue/actions/workflows/ci_cd.yml/badge.svg" />
  </a>
  <a href="https://www.npmjs.com/package/dragon-drop-vue" target="_blank" aria-label="npm">
    <img alt="npm" src="https://img.shields.io/npm/v/dragon-drop-vue?logo=npm" />
  </a>
  <a href="https://github.com/nruffing/dragon-drop-vue/blob/main/LICENSE" aria-label="MIT License">
    <img alt="GitHub" src="https://img.shields.io/github/license/nruffing/dragon-drop-vue" />
  </a>
</p>

## Install

```
npm i dragon-drop-vue
```

## Setup

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { DragonDropVue } from 'dragon-drop-vue'

const dragonDropOptions = {
  dragOverDebounceMs: 300,
  debugLog: true,
}

createApp(App).use(DragonDropVue, dragonDropOptions)
```

## Usage

```vue
<template>
  <main>
    <template v-for="column in columns">
      <div v-drop="{ dragData: column, onDragEnter: onDragEnter, onDrop: onDrop }"></div>
      <div v-drag="{ dragData: column, dragImage: dragImage, onDragStart: onDragStart }">{{ column }}</div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from 'dragon-drop-vue'

const columns = ref([0, 1, 2, 3, 4, 5, 6])
const dragging = ref<number | undefined>(undefined)

const image = new Image()
image.src = 'dragon.png'
const dragImage = {
  image,
  xOffset: 30,
  yOffset: 0,
}

function onDragStart(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<number>, options: DragonDropVueOptions) {
  dragging.value = dragOptions.dragData
}

function onDragEnter(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<number>, options: DragonDropVueOptions) {
  // do not allow a draggable element to be dropped on itself
  var dragIndex = this.dragging ?? 0
  var dropIndex = dragOptions.dragData ?? 0
  return dragIndex !== dropIndex
}

function onDrop(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<number>, options: DragonDropVueOptions) {
  // implement drop behavior
}
</script>
```

## Plugin Options (i.e. DragonDropVueOptions)

| Property | Type | Description |
| --- | --- | --- |
| `debugLog` | `boolean` or `undefined` | Print additional debugging information to the console. All drag and drop events are printed. This also enables the `Info` log level of [`native-event-vue`](https://www.npmjs.com/package/native-event-vue). |
| `dragDirectiveName` | `string` or `undefined` | Optionally specify what to register for the drag directive. By default this is `drag` and the directive would be `v-drag`. |
| `dropDirectiveName` | `string` or `undefined` | Optionally specify what to register for the drag directive. By default this is `drop` and the directive would be `v-drop`. |
| `dragClass` | `string` or `undefined` | Custom class that will be added to all elements with the drag directive. `ddv-draggable` is also always added. |
| `dropClass` | `string` or `undefined` | Custom class that will be added to all elements with the drop directive. `ddv-dropzone` is also always added. |
| `draggingClass` | `string` or `undefined` | Custom class that will be added to the element currently being dragged. `ddv-dragging` is also always added. |
| `dragOverClass` | `string` or `undefined` | Custom class that will added to the element currently being dragged over. `ddv-ddv-dragging-over` is also always added. |
| `dragOverDebounceMs` | `number` or `undefined` | Optionally override the debounce period for the `dragover` event. By default, this is set to `500ms`. Setting this to `0` will turn off debouncing of the `dragover` event. This can also be overridden by passing the same option to the object bound to the drop directive. The directive value will take precedence.  |
| `dragOverDebounceMode` | [`DebounceMode`](https://github.com/nruffing/native-event-vue?tab=readme-ov-file#debounce-mode) or `undefined` | Optionally override the [debounce mode](https://github.com/nruffing/native-event-vue?tab=readme-ov-file#debounce-mode) used to debounce the `dragover` event. By default, `MaximumFrequency` is used and this will debounce the event and only call the vent handler at most once during the debounce timeout. This can also be overridden by passing the same option to the object bound to the drop directive. The directive value will take precedence. |

## Directive Options (i.e. DragonDropVueDragOptions)

The same options interface is used for both the drag and drop directive but some event handlers on apply to one or the other.

The `DragonDropVueDragOptions` type has an optional type constraint for the type of the supplied drag data that will default to `any`.

All event handler properties are of the following type.
```ts
(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<T>, options: DragonDropVueOptions) => boolean | undefined
```

| Property | Type | Description |
| --- | --- | --- |
| `dragData` | Generic type constraint or `any` | Any piece of data to pass to each drag and drop event handler. |
| `dragImage` | `DragonDropVueDragImageOptions` | Optional drag image override. |
| `onDragStart` | Drag/drop event handler | `dragstart` event handler |
| `onDragEnd` | Drag/drop event handler | `dragend` event handler |
| `onDragOver` | Drag/drop event handler | `dragover` event handler |
| `onDragEnter` | Drag/drop event handler | `dragenter` event handler |
| `onDragLeave` | Drag/drop event handler | `dragleave` event handler |
| `onDrop` | Drag/drop event handler | `drop` event handler |
| `dragOverDebounceMs` | `number` or `undefined` | Optionally override the debounce period for the `dragover` event. By default, this is set to `500ms`. Setting this to `0` will turn off debouncing of the `dragover` event. This will take precedence over the same option on the plugin options. |
| `dragOverDebounceMode` | [`DebounceMode`](https://github.com/nruffing/native-event-vue?tab=readme-ov-file#debounce-mode) or `undefined` | Optionally override the [debounce mode](https://github.com/nruffing/native-event-vue?tab=readme-ov-file#debounce-mode) used to debounce the `dragover` event. By default, `MaximumFrequency` is used and this will debounce the event and only call the vent handler at most once during the debounce timeout. This will take precedence over the same option on the plugin options. |

## Drag Data

When drag data is specified to the drag directive it is set on the data transfer of the browser events as JSON. The drop directive will also retrieve the drag data from the date transfer object, deserialize it and set it as the drag data on the options passed to the `onDrop` callback.

## Vue Component as Drag Image

The drag directive contains the necessary boilerplate to take a Vue component definition and prop values to create an element to use as the drag image. It is also automatically removed from the DOM as part of `onDrop` handling.

```vue
<template>
  <main>
    <template v-for="column in columns">
      <div v-drop="{ dragData: column, onDragEnter: onDragEnter, onDrop: onDrop }"></div>
      <div v-drag="{ dragData: column, onDragStart: onDragStart }">{{ column }}</div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from 'dragon-drop-vue'
import CustomComponent from '@/components/CustomComponent.vue'

const columns = ref([0, 1, 2, 3, 4, 5, 6])
const dragging = ref<number | undefined>(undefined)

function onDragStart(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<number>, options: DragonDropVueOptions) {
  dragging.value = dragOptions.dragData

  dragOptions.dragImage = {
    rootComponent: CustomComponent,
    rootComponentProps: { column: dragOptions.dragData },
  }
}
</script>
```

---

## Release Notes

### v2.0.0
  * Migrate to [`native-event-vue`](https://www.npmjs.com/package/native-event-vue) to manage adding and removing HTML native events to DOM elements and leverage its debouncing capabilities on the `dragover` event.
  * The `dragover` event is now debounced by default and the attached handler will only run at most once every 500ms. The debounce time and debounce mode can be configured on the plugin options.
  * Additional source documentation.
  * Automated tests

### v1.2.0
  * Add additional debug logging to track when directive lifecycle hooks fire and DOM state after processing.
  * Add additional debug logging to track when HTML event handlers are added or removed.
  * Improve debug log formatting.

### v1.1.1
  * Update development dependencies.

### v1.1.0
  * Add ability to specify a Vue component and property values for the drag image.
  * Parse data transfer drag data from drop event and pass to `onDrop` via the drag options drag data if drag data does not already exist.

### v1.0.0
  * Plugin options can no longer be undefined. The default value is now an empty object.
  * Requires node v18 or greater

### v0.2.0
  * Documentation update

### v0.1.1
  * improve plugin and directive typing

### v0.1.0
  * allow directive names to be overridden via plugin options

### v0.0.4
  * export DropEffect
  * react to options changes that can turn draggable on/off

### v0.0.3
  * remove console.log

### v0.0.2
  * allow false to turn off drag and drop directives

### v0.0.1
  * Initial release