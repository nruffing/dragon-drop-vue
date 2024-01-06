<template>
  <div class="drag-image">Item {{ num }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DragImage',
  props: {
    num: {
      type: Number,
      required: true,
    },
  },
})
</script>

<style scoped>
.drag-image {
  width: 100px;
  height: 100px;
  background-color: #00ff00bb;
}
</style>
