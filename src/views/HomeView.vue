<template>
  <main>
    <label>
      <input
        type="checkbox"
        v-model="canDrag"
      />
      Can Drag
    </label>
    <template v-for="column in columns">
      <div v-drop="canDrag ? { dragData: column, onDragEnter: onDragEnter, onDrop: onDrop } : false"></div>
      <div v-drag="canDrag ? { dragData: column, dragImage: dragImage, onDragStart: onDragStart } : false">{{ column }}</div>
    </template>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { DragonDropVueDragImageOptions, DragonDropVueDragOptions, DragonDropVueOptions } from '../../lib/main'

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      columns: [0, 1, 2, 3, 4, 5, 6],
      dragging: undefined as number | undefined,
      canDrag: true,
    }
  },
  computed: {
    dragImage(): DragonDropVueDragImageOptions {
      const image = new Image()
      image.src = 'dragon.png'
      return {
        image,
        xOffset: 30,
        yOffset: 0,
      }
    },
  },
  methods: {
    onDragStart(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<number>, options: DragonDropVueOptions) {
      this.dragging = dragOptions.dragData
    },
    onDragEnter(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<number>, options: DragonDropVueOptions) {
      var dragIndex = this.dragging ?? 0
      var dropIndex = dragOptions.dragData ?? 0
      return dragIndex !== dropIndex
    },
    onDrop(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<number>, options: DragonDropVueOptions) {
      var dragIndex = this.dragging ?? 0
      var dropIndex = dragOptions.dragData ?? 0

      if (dropIndex > this.columns.length - 1) {
        return
      }

      const [column] = this.columns.splice(dragIndex, 1)
      this.columns.splice(dropIndex, 0, column)
    },
  },
})
</script>

<style scoped>
main {
  gap: 0;

  --height: 20rem;
}

.custom-draggable {
  height: var(--height);
  width: var(--height);
  background: var(--base-600);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
}

.custom-dragging {
  background: var(--primary-200);
}

.custom-drop {
  height: var(--height);
  width: 0.5rem;
}

.custom-dragging-over {
  background: var(--base-100);
}
</style>
