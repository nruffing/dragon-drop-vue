<template>
  <main>
    <div
      id="test-drop-item"
      v-drop="{ onDrop }"
    ></div>
  </main>
</template>

<script lang="ts" setup>
function onDrop() {}
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
