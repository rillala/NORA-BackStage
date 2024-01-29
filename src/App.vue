<script setup>
import { RouterLink, RouterView } from "vue-router";
import headerCom from "@/components/header.vue";
</script>

<template>
  <main id="app-wrap">
    <headerCom id="app-nav" />
    <RouterView id="app-main-view" />
  </main>
</template>

<style lang="scss" scoped>
#app-wrap {
  display: flex;
  height: 100svh;

  #app-main-view {
    flex-grow: 1;
  }
}
</style>
