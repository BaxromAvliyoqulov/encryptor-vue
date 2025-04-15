// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Encrypt from "../pages/Encrypt.vue";
import Decrypt from "../pages/Decrypt.vue";

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
	{
		path: "/encrypt",
		name: "Encrypt",
		component: Encrypt,
	},
	{
		path: "/decrypt",
		name: "Decrypt",
		component: Decrypt,
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
