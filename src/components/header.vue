<template>
  <div class="menu-box">
    <RouterLink to="/" id="logo"></RouterLink>
    <Menu theme="light" active-name="1">
      <MenuGroup>
        <MenuItem :name="index" v-for="(link, index) in navList">
          <RouterLink :to="link.path">{{ link.name }}</RouterLink>
        </MenuItem>
      </MenuGroup>
    </Menu>
  </div>
</template>
<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  data() {
    return {
      navList: [
        {
          name: "管理員管理",
          path: "/admin",
        },
        {
          name: "會員管理",
          path: "/member",
        },
        {
          name: "最新消息管理",
          path: "/news",
        },
        {
          name: "營地管理",
          path: "/site",
        },
        {
          name: "營位預約管理",
          path: "/reserve",
        },
        {
          name: "設備管理",
          path: "/equipment",
        },
        {
          name: "商品管理",
          path: "/product",
        },
        {
          name: "商品訂單管理",
          path: "/order",
        },
        {
          name: "常見問題管理",
          path: "/faq",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/page/header.scss";
</style>
