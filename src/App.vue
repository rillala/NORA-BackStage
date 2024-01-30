<script setup>
import { RouterLink, RouterView } from "vue-router";
import headerCom from "@/components/header.vue";
</script>

<template>
  <main id="app-wrap">
    <headerCom id="app-nav" />
    <div id="app-content">
      <RouterView id="app-main-view" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
#app-wrap {
  display: flex;
  height: 100svh;

  #app-main-view {
    flex-grow: 1;
  }

  #app-content {
    padding: 100px 150px 0;
  }
}
</style>
