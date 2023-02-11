<script setup lang="ts">
import { computed, ref } from "vue";
import NavTabbar from "@/components/NavTabbar/index.vue";
const cateData = [
	{
		id: 1,
		name: "男鞋",
		children: [
			{
				id: 11,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "休闲鞋",
						imgsrc:
							"https://img12.360buyimg.com/focus/s140x140_jfs/t12970/248/784792784/3062/9cc4be84/5a13957cN60262247.jpg",
					},
					{
						id: 10002,
						name: "皮鞋",
						imgsrc:
							"https://img12.360buyimg.com/focus/s140x140_jfs/t11089/341/2234800375/3425/8950afe8/5a139577N054caadb.jpg",
					},
					{
						id: 10003,
						name: "男靴",
						imgsrc:
							"https://img14.360buyimg.com/focus/s140x140_jfs/t13225/243/786727983/5634/d19769f6/5a139554N4c666839.jpg",
					},
					{
						id: 10004,
						name: "帆布鞋",
						imgsrc:
							"//img30.360buyimg.com/focus/s140x140_jfs/t11992/144/2244194535/2627/3de251a9/5a139564Naee94e4a.jpg",
					},
					{
						id: 10004,
						name: "板鞋",
						imgsrc: "//img13.360buyimg.com/focus/s140x140_jfs/t13318/275/759603762/2622/2e47bbbf/5a139565N882a63c6.jpg",
					},
				],
			},
			{
				id: 12,
				name: "流行男鞋",
				children: [
					{
						id: 11001,
						name: "休闲鞋",
						imgsrc:
							"https://img12.360buyimg.com/focus/s140x140_jfs/t12970/248/784792784/3062/9cc4be84/5a13957cN60262247.jpg",
					},
					{
						id: 11002,
						name: "休闲户外鞋",
						imgsrc: "//img20.360buyimg.com/focus/s140x140_jfs/t12889/167/800455171/2803/81e2a0ef/5a139431Nb7ff4008.jpg",
					},
					{
						id: 11003,
						name: "凉鞋",
						imgsrc:
							"//img10.360buyimg.com/focus/s140x140_jfs/t11824/310/2093755858/3582/469cedf4/5a139411N2cd65a08.jpg",
					},
					{
						id: 11004,
						name: "休闲鞋2",
						imgsrc:
							"https://img12.360buyimg.com/focus/s140x140_jfs/t12970/248/784792784/3062/9cc4be84/5a13957cN60262247.jpg",
					},
					{
						id: 11005,
						name: "休闲户外鞋2",
						imgsrc: "//img20.360buyimg.com/focus/s140x140_jfs/t12889/167/800455171/2803/81e2a0ef/5a139431Nb7ff4008.jpg",
					},
					{
						id: 11006,
						name: "凉鞋2",
						imgsrc:
							"//img10.360buyimg.com/focus/s140x140_jfs/t11824/310/2093755858/3582/469cedf4/5a139411N2cd65a08.jpg",
					},
					{
						id: 11007,
						name: "休闲鞋3",
						imgsrc:
							"https://img12.360buyimg.com/focus/s140x140_jfs/t12970/248/784792784/3062/9cc4be84/5a13957cN60262247.jpg",
					},
					{
						id: 11008,
						name: "休闲户外鞋3",
						imgsrc: "//img20.360buyimg.com/focus/s140x140_jfs/t12889/167/800455171/2803/81e2a0ef/5a139431Nb7ff4008.jpg",
					},
					{
						id: 11009,
						name: "凉鞋3",
						imgsrc:
							"//img10.360buyimg.com/focus/s140x140_jfs/t11824/310/2093755858/3582/469cedf4/5a139411N2cd65a08.jpg",
					},
				],
			},
		],
	},
	{
		id: 2,
		name: "女鞋",
		children: [
			{
				id: 21,
				name: "热卖分类",
				children: [
					{
						id: 20001,
						name: "抢尖货",
						imgsrc: "//img12.360buyimg.com/focus/s140x140_jfs/t13804/331/788425953/5641/fb956619/5a13fd8fN4e9177a5.jpg",
					},
					{
						id: 20002,
						name: "商场同款",
						imgsrc:
							"//img14.360buyimg.com/focus/s140x140_jfs/t11452/357/2278950392/3301/19d9fa5f/5a13fd7dN8a2c5275.jpg",
					},
					{
						id: 20003,
						name: "原创设计",
						imgsrc: "//img12.360buyimg.com/focus/s140x140_jfs/t12493/39/806521510/4540/b9b0373a/5a13fd69N310fe3c7.jpg",
					},
				],
			},
			{
				id: 22,
				name: "时尚女鞋",
				children: [
					{
						id: 22001,
						name: "休闲鞋",
						imgsrc: "//img13.360buyimg.com/focus/s140x140_jfs/t16897/285/796666413/5829/5a7ad788/5aa640b5N0342a5e7.jpg",
					},
					{
						id: 22002,
						name: "中跟单鞋",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t16267/61/2407074997/4244/a7fa02d7/5aa640f8Nc9384a63.jpg",
					},
					{
						id: 22003,
						name: "大码女鞋",
						imgsrc: "//img12.360buyimg.com/focus/s140x140_jfs/t18526/341/795029040/5652/935ccfa0/5aa6410bNec7253f4.jpg",
					},
					{
						id: 22004,
						name: "休闲鞋1",
						imgsrc: "//img13.360buyimg.com/focus/s140x140_jfs/t16897/285/796666413/5829/5a7ad788/5aa640b5N0342a5e7.jpg",
					},
					{
						id: 22005,
						name: "中跟单鞋1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t16267/61/2407074997/4244/a7fa02d7/5aa640f8Nc9384a63.jpg",
					},
					{
						id: 22006,
						name: "大码女鞋1",
						imgsrc: "//img12.360buyimg.com/focus/s140x140_jfs/t18526/341/795029040/5652/935ccfa0/5aa6410bNec7253f4.jpg",
					},
				],
			},
			{
				id: 23,
				name: "国货名品",
				children: [
					{
						id: 23001,
						name: "骆驼",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t13804/234/819235995/6372/3b3ca5bf/5a13ec8cNe3630054.jpg",
					},
					{
						id: 23002,
						name: "大东",
						imgsrc:
							"//img12.360buyimg.com/focus/s140x140_jfs/t11674/330/2222324696/3147/67c4aa57/5a13ec94N757af15a.jpg",
					},
					{
						id: 23003,
						name: "红蜻蜓",
						imgsrc: "//img20.360buyimg.com/focus/s140x140_jfs/t12745/181/795313684/5615/879d8dee/5a13ec7eN0abd8994.jpg",
					},
					{
						id: 23004,
						name: "意尔康",
						imgsrc: "//img20.360buyimg.com/focus/s140x140_jfs/t11143/227/2263524998/2017/2859a8a/5a13ec84N653a7c8e.jpg",
					},
					{
						id: 23005,
						name: "卓诗尼",
						imgsrc:
							"//img13.360buyimg.com/focus/s140x140_jfs/t11929/106/2272671563/11665/d6c5303e/5a13ec68N01438a88.jpg",
					},
					{
						id: 23006,
						name: "富贵鸟",
						imgsrc: "//img20.360buyimg.com/focus/s140x140_jfs/t11320/349/2187253209/6960/e8c5eee/5a13ec77Nb89b7b5f.jpg",
					},
				],
			},
		],
	},
	{
		id: 3,
		name: "男装",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 4,
		name: "女装",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 5,
		name: "家具家装",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 6,
		name: "家居厨具",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 7,
		name: "电脑办公",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 8,
		name: "手机数码",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 9,
		name: "家用电器",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 10,
		name: "玩具乐器",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 11,
		name: "美妆护肤",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 12,
		name: "酒水饮料",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 13,
		name: "运动户外",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
	{
		id: 14,
		name: "汽车生活",
		children: [
			{
				id: 0,
				name: "热卖分类",
				children: [
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
					{
						id: 10001,
						name: "热卖1",
						imgsrc: "//img11.360buyimg.com/focus/s140x140_jfs/t19732/6/697088077/2894/2788a72/5a9fbfd2Ncc01c1b5.jpg",
					},
				],
			},
		],
	},
];
const active = ref(0);
const cateDataChild = computed(() => {
	return cateData[active.value]["children"] || [];
});
</script>
<template>
	<van-nav-bar fixed placeholder title="全部分类" />
	<div class="category-nav">
		<van-sidebar v-model="active">
			<van-sidebar-item v-for="item in cateData" :key="item.id" :title="item.name" />
		</van-sidebar>
	</div>
	<div v-for="(item, index) in cateDataChild" :key="index" class="category-box">
		<div class="category-title">{{ item.name }}</div>
		<van-grid :column-num="3" :border="false">
			<van-grid-item v-for="item2 in item.children" :key="item2.id" :text="item2.name">
				<template #icon>
					<img :src="item2.imgsrc" width="70" height="70" />
				</template>
			</van-grid-item>
		</van-grid>
	</div>
	<NavTabbar :model-value="1" />
</template>
<style lang="scss">
:root {
	--ft-category-box-bg: var(--ft-color-white);
}
html.dark {
	--ft-category-box-bg: var(--ft-color-black-1);
}
</style>
<style scoped lang="scss">
.category-nav {
	position: fixed;
	top: 46px;
	bottom: 50px;
	left: 0;
	overflow-x: auto;
}
.category-box {
	padding-left: 80px;
	background-color: var(--ft-category-box-bg);
	.category-title {
		padding: 0 10px;
		line-height: 30px;
	}
}
</style>
