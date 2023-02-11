import { RouteRecordRaw } from "vue-router";

const DefaultLayoutRoutes: RouteRecordRaw[] = [
	{
		meta: {
			title: "首页",
		},
		path: "/",
		component: () => import("@/pages/home/index.vue"),
	},
	{
		meta: {
			title: "分类",
		},
		path: "/category",
		component: () => import("@/pages/category/index.vue"),
	},
	{
		meta: {
			title: "购物车",
		},
		path: "/cart",
		component: () => import("@/pages/cart/index.vue"),
	},
];

export default DefaultLayoutRoutes;
