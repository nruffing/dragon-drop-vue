<template>
  <main>
    <div
      id="test-drag-item"
      v-drag="{ onDrag }"
    ></div>
  </main>
</template>

<script lang="ts" setup>
function onDrag() {}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

main > div {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
</style>
