// 路由表

import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // 404頁面
  {
    path: '/:pathMatch(.*)*',
    // name: '',
    component: () => import('../views/NotFound.vue'),
  },
  // 對應app.vue router-link to="path名稱"
  // 前台主頁面Front路由
  {
    path: '/',
    // name: '',
    component: () => import('../views/Front.vue'),
    // 巢狀路由children
    children: [
      // 前台主視覺頁面路由 若path為空值 直接顯示在父層的router-view
      {
        path: '',
        // name: '',
        component: () => import('../views/Front/MasterVision.vue'),
      },
      // 前台產品列表頁面Products路由 若path為空值 直接顯示在父層的router-view
      {
        path: 'index',
        // name: '',
        component: () => import('../views/Front/Index.vue'),
      },
      // 前台產品列表頁面Products路由
      {
        path: 'products',
        // name: '',
        component: () => import('../views/Front/Products.vue'),
      },
      // 前台單一產品列表頁面Product動態路由
      {
        path: 'product/:id',
        // name: '',
        component: () => import('../views/Front/Product.vue'),
      },
      // 前台折價頁面discount路由
      {
        path: 'discount',
        // name: '',
        component: () => import('../views/Front/Discount.vue'),
      },
      // 前台商店頁面Shop路由
      {
        path: 'shop',
        // name: '',
        component: () => import('../views/Front/Shop.vue'),
      },
      // 前台登入頁面login路由
      {
        path: 'login',
        // name: '',
        component: () => import('../views/Front/Login.vue'),
      },
      // 前台購物車列表頁面cart路由
      {
        path: 'cart',
        // name: '',
        component: () => import('../views/Front/Cart.vue'),
        children: [
          {
            path: '',
            // name: '',
            component: () => import('../views/Front/CheckOrderProducts.vue'),
          },
          {
            path: '/check-orderer',
            // name: '',
            component: () => import('../views/Front/CheckOrderer.vue'),
          },
          {
            path: '/check-order-complete',
            // name: '',
            component: () => import('../views/Front/CheckOrderComplete.vue'),
          },
          {
            path: '/order-complete',
            // name: '',
            component: () => import('../views/Front/OrderComplete.vue'),
          },
        ],
      },
    ],
  },
  // --後台--
  // 後台Dashboard主頁面路由
  {
    path: '/Dashboard',
    // name: '',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        // 後台產品訂單頁面
        path: '/orders',
        // name: '',
        component: () => import('../views/admin/Orders.vue'),
      },
      {
        // 後台單一產品訂單頁面
        path: '/order/:id',
        // name: '',
        component: () => import('../views/admin/Order.vue'),
      },
      // 後台商品管理頁面
      {
        path: '/product-management',
        // name: '',
        component: () => import('../views/admin/ProductManagement.vue'),
      },
      // 後台折價卷設定頁面
      {
        path: '/coupon-set',
        // name: '',
        component: () => import('../views/admin/CouponSet.vue'),
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次轉換router-view 都移到畫面最上方
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
