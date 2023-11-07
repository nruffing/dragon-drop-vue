# dragon-drop-vue

Customizable native Vue3 drag-n-drop library with no dependencies. Includes Vue plugin that registers directives to configure draggable elements and drop zones.

## Install

```
npm i dragon-drop-vue
```

## Setup

```ts
import { createApp } from 'vue'
import App from './App.vue'
import DragonDropVue from 'dragon-drop-vue'

const dragonDropOptions = {
  dragClass: 'custom-draggable',
  draggingClass: 'custom-dragging',
  dropClass: 'custom-drop',
  dragOverClass: 'custom-dragging-over',
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
import type { DragonDropVueDragOptions, DragonDropVueOptions } from '../../lib/main'

const columns = ref([0, 1, 2, 3, 4, 5, 6])
const dragging = ref<number | undefined>(undefined)

const image = new Image()
image.src = 'dragen.png'
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
| `debugLog` | `boolean` or `undefined` | Print additional debugging information to the console. All drag and drop events are printed. |
| `dragDirectiveName` | `string` or `undefined` | Optionally specify what to register for the drag directive. By default this is `drag` and the directive would be `v-drag`. |
| `dropDirectiveName` | `string` or `undefined` | Optionally specify what to register for the drag directive. By default this is `drop` and the directive would be `v-drop`. |
| `dragClass` | `string` or `undefined` | Custom class that will be added to all elements with the drag directive. |
| `dropClass` | `string` or `undefined` | Custom class that will be added to all elements with the drop directive. |
| `draggingClass` | `string` or `undefined` | Custom class that will be added to the element currently being dragged. |
| `dragOverClass` | `string` or `undefined` | Custom class that will added to the element currently being dragged over. |

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

---

## Release Notes

* v0.0.1
    * Initial release
* v0.0.2
    * allow false to turn off drag and drop directives
* v0.0.3
    * remove console.log
* v0.0.4
    * export DropEffect
    * react to options changes that can turn draggable on/off
* v0.1.0
    * allow directive names to be overridden via plugin options
* v0.1.1
    * improve plugin and directive typing
* v0.2.0
    * Documentation update

