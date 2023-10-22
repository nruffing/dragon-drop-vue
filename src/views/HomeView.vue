<template>
  <main>
    <template v-for="column in columns">
      <div v-drag>{{ column }}</div>
      <div v-drop></div>
    </template>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      columns: [1, 2, 3, 4, 5, 6],
    }
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
