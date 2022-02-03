<template>
  <div id="sidebar-container">
    <div></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Sidebar',
};
</script>

<style scoped>
#sidebar-container {
  width: 30%;
  height: 100vh;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: grey;
  overflow-x: hidden;
}
</style>
