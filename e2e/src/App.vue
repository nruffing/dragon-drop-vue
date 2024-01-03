<template>
  <nav>
    <router-link
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
    >
      {{ route.name }}
    </router-link>
  </nav>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routes } from './router'

export default defineComponent({
  name: 'App',
  data() {
    return {
      routes,
    }
  },
})
</script>

<style scoped>
nav {
  width: 100vw;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
