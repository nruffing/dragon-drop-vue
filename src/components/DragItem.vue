<template>
  <div
    class="drag-item"
    v-drag="{ dragData: { num }, onDragStart }"
  >
    Item {{ num }}
  </div>
</template>

<script lang="ts">
import { defineComponent, createApp } from 'vue'
import DragImage from './DragImage.vue'
import { type DragonDropVueDragOptions, type DragonDropVueOptions } from '../../lib/options'

export interface DragDataType {
  num: number
}

export default defineComponent({
  name: 'DragItem',
  props: {
    num: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onDragStart(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<DragDataType>, options: DragonDropVueOptions) {
      const div = document.createElement('div')
      div.style.position = 'absolute'
      div.style.top = '-1000px'
      document.body.appendChild(div)
      createApp(DragImage, { num: this.num }).mount(div)
      dragOptions.dragImage = {
        image: div,
        xOffset: 0,
        yOffset: 0,
      }
    },
    onDragEnd(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<DragDataType>, options: DragonDropVueOptions) {
      document.body.removeChild(dragOptions.dragImage!.image)
    },
  },
})
</script>

<style scoped>
.drag-image {
  display: none;
}
</style>
