import { RouteRecordRaw } from "vue-router";

const UserLayoutRoutes: RouteRecordRaw[] = [
	{
		path: "/user",
		redirect: "/user/login",
		children: [
			{
				meta: {
					title: "登录",
				},
				path: "login",
				component: () => import("@/pages/user/login/index.vue"),
			},
			{
				meta: {
					title: "注册",
				},
				path: "register",
				component: () => import("@/pages/user/register/index.vue"),
			},
		],
	},
];

export default UserLayoutRoutes;
