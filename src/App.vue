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

  #app-content {
    height: 100svh;
    padding: 80px 100px 0;
    flex-grow: 1;
    #app-main-view {
      width: 100%;
    }
  }
}
</style>
