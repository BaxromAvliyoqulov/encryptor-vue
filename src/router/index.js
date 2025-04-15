// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";

const routes = [
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Auth guard
router.beforeEach((to, from, next) => {
	const isAuth = localStorage.getItem("auth") === "true";
	if (to.meta.requiresAuth && !isAuth) {
		next("/");
	} else {
		next();
	}
});

export default router;
