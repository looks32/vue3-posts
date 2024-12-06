import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
	{
	  path: '/',
	  // 이름 지정 가능
	  name: 'home',
	  component: HomeView,
	},
	{
	  path: '/about',
	  name: 'about',
	  component: AboutView,
	},
  ];

const router = createRouter({
	history : createWebHistory('/'),
	routes,
})

export default router;