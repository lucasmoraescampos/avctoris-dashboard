import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import BaseLayout from '../views/BaseLayout.vue';
import HomeView from '../views/HomeView.vue';
import OrderListView from '../views/orders/OrderListView.vue';
import LoginView from '../views/login/LoginView.vue';
import AuthService from '@/services/AuthService';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'BaseLayout',
    component: BaseLayout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomeView
      },
      {
        path: 'orders',
        name: 'OrderList',
        component: OrderListView
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = AuthService.getToken();
  if (!token && to.name !== 'Login') {
    next({ name: 'Login' });
  }
  next();
})

export default router;