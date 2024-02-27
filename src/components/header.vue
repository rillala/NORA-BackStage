<script>
import { RouterLink, RouterView } from "vue-router";
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';

export default {
  data() {
    return {
      adminName: "",
      isLogin: true,
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
  mounted() {
    this.getAdminName();
  },
  methods: {
    ...mapActions(userStore, ['updateToken', 'checkUserData', 'updateAdminId', 'updateAdminName']),
    //登出
    logOut() {
      this.updateToken('');
      //清除token
      this.updateAdminId('');
      this.updateAdminName('');
      this.$router.push('/');
    },
    //取得登入者名稱
    getAdminName() {
      this.adminName = localStorage.getItem('adminName');
    },
  },
};
</script>

<template>
  <div class="menu-box">
    <RouterLink to="/" id="logo"></RouterLink>
    <div class="box">
      <p class="white01">管理員 {{ adminName }} 您好</p>
      <Button class="white01 logout" type="text" @click="logOut">登出</Button>
    </div>

    <Menu theme="light" active-name="1">
      <MenuItem :name="index" v-for="(link, index) in navList">
      <RouterLink :to="link.path">{{ link.name }}</RouterLink>
      </MenuItem>
    </Menu>
  </div>
</template>

<style lang="scss" scoped>
.menu-box {
  height: 100%;
  background: $blue-3;
  padding: 20px 0;
}

.box {
  margin: 20px auto 15px;
  text-align: center;

  p {
    @include font-style(20px, 700, 10%, 125%);
  }

  .logout {
    margin: 5px auto 0;
    @include font-style(20px, 700, 10%, 125%);

    &:hover {
      background: transparent;
      color: $blue-4;
    }
  }
}

.ivu-menu {
  background: $blue-3;
  @include font-style(24px, 700, 10%, 125%);

  a {
    display: block;
    width: 100%;
    text-align: start;
    padding-left: 23px;
    color: $white01;
  }
}

.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: $dark;
}

.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: $dark;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item:hover {
  background: $blue-4;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background-color: $blue-3;
  color: $dark;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  display: none;
}

#logo {
  display: block;
  height: 150px;
  margin-top: 20px;
  text-decoration: none;
  background-image: url(@/assets/image/header/back-logo.png);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
