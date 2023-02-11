import { MockMethod } from "vite-plugin-mock";

export default [
	{
		url: "/api/test",
		method: "get",
		response: ({ headers, body }) => {
			return {
				code: 0,
				data: "测试mock接口功能",
			};
		},
	},
	{
		url: "/api/500",
		method: "get",
		// statusCode: 401,
		response: ({ headers, body }) => {
			return {
				timestamp: 1513932555104,
				status: 500,
				error: "error",
				message: "error",
				path: "/500",
			};
		},
	},
] as MockMethod[];
