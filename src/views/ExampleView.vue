<template>
  <main>
    <div
      class="dropzone"
      v-drop="{}"
    ></div>

    <div class="item-list">
      <DragItem
        v-for="dragItem in dragItems"
        :num="dragItem"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DragItem from '../components/DragItem.vue'

export default defineComponent({
  name: 'ExampleView',
  components: {
    DragItem,
  },
  data() {
    return {
      dragItems: [0, 1, 2, 3, 4, 5, 6],
    }
  },
})
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  font-size: 2rem;
}

.dropzone {
  width: 500px;
  height: 300px;
  background-color: #ccc;
}

.dropzone.ddv-dragging-over {
  outline: 4px solid #ff0000dd;
  background-color: #ff000022;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
}
</style>
