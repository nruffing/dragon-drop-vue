<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link>
  </nav>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
:root {
  --base-900: #222222;
  --base-800: #333333;
  --base-700: #444444;
  --base-600: #555555;
  --base-500: #666666;
  --base-300: #aaaaaa;
  --base-200: #bbbbbb;
  --base-100: #dddddd;
  --base-000: #ffffff;

  --primary-600: #ff3300;
  --primary-400: #ff7b00;
  --primary-200: #ff9d41;

  font-size: 10px;
}

body,
html {
  margin: 0;
  background-color: var(--base-700);
  color: var(--base-100);
}

body,
html,
main,
#app {
  height: 100vh;
  min-height: 0;
  overflow: hidden;
}

#app {
  display: grid;
  grid-template-columns: auto 1fr;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: var(--base-800);
  padding: 0.5rem;
  font-size: 1.5rem;
  align-items: center;
  border-right: var(--base-900) solid 1px;
  box-shadow: -3px 0px 20px 0 rgba(255, 255, 255, 0.2);
}

main {
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px;
  height: calc(100% - 40px);
}

.custom-filter {
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;
}

a,
a:visited {
  color: var(--base-100);
}

input[type='checkbox'],
label:has(input[type='checkbox']) {
  cursor: pointer;
}
</style>
