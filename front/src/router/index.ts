import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Header from '@/components/layout/Header.vue'
import Menu from '@/components/layout/menu/Menu.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    components: {
      default: () => import(/* webpackChunkName: "users" */ '../views/Home.vue'),
      Header,
      Menu
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
