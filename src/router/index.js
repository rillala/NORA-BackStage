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
        requiresAuth: true,
      },
    },
    {
      path: "/member",
      name: "member",
      component: () => import("../views/MemberView.vue"),
      meta: {
        title: "會員管理",
        requiresAuth: true,
      },
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../views/NewsView.vue"),
      meta: {
        title: "最新消息管理",
        requiresAuth: true,
      },
    },
    {
      path: "/site",
      name: "site",
      component: () => import("../views/SiteView.vue"),
      meta: {
        title: "營地管理",
        requiresAuth: true,
      },
    },
    {
      path: "/reserve",
      name: "reserve",
      component: () => import("../views/ReserveView.vue"),
      meta: {
        title: "營位預約管理",
        requiresAuth: true,
      },
    },

    {
      path: "/equipment",
      name: "equipment",
      component: () => import("../views/EquipmentView.vue"),
      meta: {
        title: "設備管理",
        requiresAuth: true,
      },
    },
    {
      path: "/product",
      name: "product",
      component: () => import("../views/ProductView.vue"),
      meta: {
        title: "商品管理",
        requiresAuth: true,
      },
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../views/OrderView.vue"),
      meta: {
        title: "商品訂單管理",
        requiresAuth: true,
      },
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("../views/FaqView.vue"),
      meta: {
        title: "常見問題管理",
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 檢查即將進入的路由是否需要驗證
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 這裡添加您的驗證邏輯，例如檢查登入狀態
    const isLogin = localStorage.getItem('userToken')? true:false;

    if (!isLogin) {
      // 如果用戶未驗證，可以重定向到登入頁面或是進行其他操作
      next({ name: "Home" }); // 重定向到首頁或登入頁
    } else {
      next(); // 如果驗證通過，則正常進入目標路由
    }
  } else {
    next(); // 如果不需要驗證，則直接進入
  }
});

export default router;
