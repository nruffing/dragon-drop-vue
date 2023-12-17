<template>
  <div
    class="drag-item"
    v-drag="{ dragData: { num }, onDragStart }"
  >
    Item {{ num }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
      dragOptions.dragImage = {
        rootComponent: DragImage,
        rootComponentProps: { num: this.num },
      }
    },
  },
})
</script>

<style scoped>
.drag-image {
  display: none;
}
</style>
