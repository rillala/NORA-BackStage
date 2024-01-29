import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
      meta: {
        title: "野良露營 NORA Camping",
      },
    },
    {
      path: "/admin",
      name: "admin",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AdminView.vue"),
      meta: {
        title: "管理員管理",
      },
    },
    {
      path: "/member",
      name: "member",
      component: () => import("../views/MemberView.vue"),
      meta: {
        title: "會員管理",
      },
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../views/NewsView.vue"),
      meta: {
        title: "最新消息管理",
      },
    },
    {
      path: "/site",
      name: "site",
      component: () => import("../views/SiteView.vue"),
      meta: {
        title: "營地管理",
      },
    },
    {
      path: "/reserve",
      name: "reserve",
      component: () => import("../views/ReserveView.vue"),
      meta: {
        title: "營位預約管理",
      },
    },

    {
      path: "/equipment",
      name: "equipment",
      component: () => import("../views/EquipmentView.vue"),
      meta: {
        title: "設備管理",
      },
    },
    {
      path: "/product",
      name: "product",
      component: () => import("../views/ProductView.vue"),
      meta: {
        title: "商品管理",
      },
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../views/OrderView.vue"),
      meta: {
        title: "商品訂單管理",
      },
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("../views/FaqView.vue"),
      meta: {
        title: "常見問題管理",
      },
    },
  ],
});

export default router;
