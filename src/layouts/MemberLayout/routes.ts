import { RouteRecordRaw } from "vue-router";

const MemberLayoutRoutes: RouteRecordRaw[] = [
	{
		path: "/member",
		redirect: "/member/index",
		children: [
			{
				meta: {
					title: "用户中心",
				},
				path: "index",
				component: () => import("@/pages/member/index/index.vue"),
			},
			{
				meta: {
					title: "设置",
				},
				path: "set",
				component: () => import("@/pages/member/set/index.vue"),
			},
		],
	},
];

export default MemberLayoutRoutes;
