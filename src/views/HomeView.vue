<template>
  <main>
    <div v-drag></div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
})
</script>

<style scoped>
.ddv-draggable {
  height: 200px;
  width: 200px;
  background: var(--base-600);
}
</style>
