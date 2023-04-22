import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import Booking from "../views/Booking.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/book",
    name: "Booking",
    component: Booking,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
