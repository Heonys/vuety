import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: { name: "Todos" },
    },
    {
      path: "/todos",
      name: "Todos",
      component: () => import("../pages/todos/index.vue"),
    },
    {
      path: "/todos/:id",
      name: "Todo",
      component: () => import("../pages/todos/[id]/index.vue"),
    },
  ],
});
