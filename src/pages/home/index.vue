<script setup lang="ts">
import { ref } from "vue";
import NavTabbar from "@/components/NavTabbar/index.vue";

// import { useI18n } from "@/composables/useI18n";
// import locales from "./locales";
// const t = useI18n(locales);

// banner
const swiperData = [
	"https://m15.360buyimg.com/mobilecms/jfs/t1/222611/38/15881/71213/63816b41E1baf5cd9/dfc68839bf496375.jpg!cr_1125x449_0_166!q70.jpg",
	"https://m15.360buyimg.com/mobilecms/jfs/t1/174733/36/32140/95162/637fb5bfE23545f8d/292a8a1300c7c15e.jpg!cr_1125x449_0_166!q70.jpg",
	"https://m15.360buyimg.com/mobilecms/jfs/t1/75338/12/22722/73651/637c29aaE6c8e163e/2e9f118f90b1706e.jpg!cr_1053x420_4_0!q70.jpg",
	"https://m15.360buyimg.com/mobilecms/jfs/t1/8037/35/16361/183757/626e3799Ee0941589/9d83bafe1dc9555d.jpg!cr_1125x449_0_166!q70.jpg",
];

// 商品列表
const list = ref<any>([]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
	// 异步更新数据
	// setTimeout 仅做示例，真实场景中一般为 ajax 请求
	setTimeout(() => {
		for (let i = 0; i < 10; i++) {
			list.value.push(list.value.length + 1);
		}

		// 加载状态结束
		loading.value = false;

		// 数据全部加载完成
		if (list.value.length >= 100) {
			finished.value = true;
		}
	}, 1000);
};
</script>
<template>
	<div class="home-top">
		<router-link to="/category" class="left">
			<van-icon name="wap-nav" />
		</router-link>
		<router-link to="/search" class="center">
			<div class="icon">
				<van-icon name="search" />
			</div>
			<div class="text"><div class="van-ellipsis">联想笔记本</div></div>
		</router-link>
		<router-link to="/member" class="right">登录</router-link>
	</div>
	<div class="home-swiper">
		<div class="home-swiper-bg"></div>
		<van-swipe class="my-swipe" :autoplay="3000" lazy-render>
			<van-swipe-item v-for="item in swiperData" :key="item">
				<img :src="item" />
			</van-swipe-item>
		</van-swipe>
	</div>

	<van-swipe class="home-grid" lazy-render>
		<van-swipe-item>
			<van-grid :column-num="5" :border="false">
				<van-grid-item text="超市">
					<template #icon>
						<img src="../../assets/images/grid-cart.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="数码电器">
					<template #icon>
						<img src="../../assets/images/grid-3c.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="新百货">
					<template #icon>
						<img src="../../assets/images/grid-j.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="生鲜">
					<template #icon>
						<img src="../../assets/images/grid-lanzi.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="1小时达">
					<template #icon>
						<img src="../../assets/images/grid-dj.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="充值缴费">
					<template #icon>
						<img src="../../assets/images/grid-cz.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="附近好店">
					<template #icon>
						<img src="../../assets/images/grid-shop.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="领劵">
					<template #icon>
						<img src="../../assets/images/grid-juan.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="PLUS会员">
					<template #icon>
						<img src="../../assets/images/grid-plus.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="国际进口">
					<template #icon>
						<img src="../../assets/images/grid-jk.png" width="40" height="40" />
					</template>
				</van-grid-item>
			</van-grid>
		</van-swipe-item>
		<van-swipe-item>
			<van-grid :column-num="5" :border="false">
				<van-grid-item text="拍卖">
					<template #icon>
						<img src="../../assets/images/grid-pm.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="3C">
					<template #icon>
						<img src="../../assets/images/grid-sale.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="沃爱马">
					<template #icon>
						<img src="../../assets/images/grid-wam.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="美妆">
					<template #icon>
						<img src="../../assets/images/grid-mzg.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="旅行">
					<template #icon>
						<img src="../../assets/images/grid-lx.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="二手">
					<template #icon>
						<img src="../../assets/images/grid-es.png" width="40" height="40" />
					</template>
				</van-grid-item>
				<van-grid-item text="全部">
					<template #icon>
						<img src="../../assets/images/grid-all.png" width="40" height="40" />
					</template>
				</van-grid-item>
			</van-grid>
		</van-swipe-item>
	</van-swipe>

	<van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		<van-grid :column-num="2" :border="false">
			<van-grid-item v-for="item in list" :key="item">
				<router-link :to="`/product/detail?id=${item}`" class="pro-item">
					<div class="img">
						<img
							src="https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/90360/23/31969/135998/636485dcEd3e41a71/8c4c71d097a3c943.jpg!q70.dpg.webp"
						/>
					</div>
					<div class="title van-multi-ellipsis--l2">{{ item }}这是一段最多显示两行的文字，多余的内容会被省略</div>
					<div class="price">￥<span>6498</span>.00</div>
				</router-link>
			</van-grid-item>
		</van-grid>
	</van-list>

	<NavTabbar :model-value="0" />
</template>
<style scoped lang="scss">
.home-top {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 44px;
	background-color: #c82519;
	.left,
	.right {
		width: 44px;
		color: var(--ft-color-white);
		text-align: center;
	}
	.left {
		font-size: 20px;
	}
	.center {
		display: flex;
		flex: 1;
		align-items: center;
		height: 30px;
		background-color: var(--ft-color-white);
		border-radius: 15px;
		.icon {
			width: 40px;
			font-size: 20px;
			color: var(--ft-color-black-2);
			text-align: center;
		}
		.text {
			flex: 1;
			overflow: hidden;
			font-size: 12px;
			color: var(--ft-color-black-rgb-3);
		}
	}
}
.home-swiper {
	position: relative;
	height: 143px;
	padding-top: 44px;
	overflow: hidden;
	.home-swiper-bg {
		position: absolute;
		top: 0;
		left: -25%;
		width: 150%;
		height: 145px;
		background-image: -webkit-gradient(linear, left bottom, left top, from(#f1503b), color-stop(50%, #c82519));
		background-image: -webkit-linear-gradient(bottom, #f1503b, #c82519 50%);
		background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
		border-bottom-right-radius: 100%;
		border-bottom-left-radius: 100%;
	}
	.my-swipe {
		width: 94%;
		margin: 0 auto;
		border-radius: 6px;
		.van-swipe-item {
			height: 140px;
			border-radius: 6px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.home-grid {
	padding-bottom: 15px;
}
</style>
