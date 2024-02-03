<script setup>
import { RouterLink, RouterView } from "vue-router";
import headerCom from "@/components/header.vue";
import loginPage from "@/views/LoginPageView.vue";

// 開發後台登入頁面用變數 isLogin, 一般切後台內頁請設置為 "true", 之後接登入 token
const isLogin = false;
</script>

<template>
  <main>
    <section v-if="!isLogin">
      <loginPage />
    </section>
    <section v-else id="app-wrap">
      <headerCom id="app-nav" />
      <div id="app-content">
        <RouterView id="app-main-view" />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

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
