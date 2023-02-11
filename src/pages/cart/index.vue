<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { useCartStore } from "@/store/cart";
import { useI18n } from "@/composables/useI18n";
import { yuanToPoints } from "@/utils/price";
const t = useI18n();
const router = useRouter();

const userStore = useUserStore();
// 获取用户信息
onMounted(() => {
	userStore.getInfo();
});

// cart store
const cartStore = useCartStore();
// 获取购物车信息
onMounted(() => {
	cartStore.getData();
});

// 底部工具栏点击提交按钮
const barSubmit = () => {
	if (cartStore.isManagement === true) {
		// 批量删除产品
		cartStore.delBatchPro();
	} else {
		// 跳转到确认订单页面
		router.push("/member/order/confirm");
	}
};

// 滑块关闭后回调
const swipeCellBeforeClose = (position: string, row: any, index: number, sIndex: number) => {
	switch (position) {
		case "left":
		case "cell":
		case "outside":
			return true;
		case "right":
			// 删除产品
			cartStore.delPro(row, index, sIndex);
			return false;
	}
};

// 导航 - 右侧
const navRightText = computed(() => {
	if (cartStore.isHavePro) {
		return cartStore.isManagement ? "完成" : "管理";
	}
	return "";
});
const onClickNavRight = () => {
	cartStore.isManagement = !cartStore.isManagement;
};

// 导航 - 点击左侧
const onClickNavLeft = () => {
	router.back();
};

// 推荐商品列表
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
	<van-nav-bar
		fixed
		placeholder
		left-arrow
		title="购物车"
		:right-text="navRightText"
		@click-left="onClickNavLeft"
		@click-right="onClickNavRight"
	/>
	<van-cell v-if="!userStore.isLogin" title="登录后可同步购物车中商品">
		<template #value>
			<router-link to="/user/login">
				<van-button class="login-btn" type="danger" size="mini" round block> 登录 </van-button>
			</router-link>
		</template>
	</van-cell>

	<template v-if="cartStore.isHavePro">
		<van-cell-group v-for="(item, index) in cartStore.shopId" :key="item" class="margin-b10">
			<div class="cart-pro-shop">
				<div class="checkbox">
					<van-checkbox
						v-model="cartStore.shopIdInfo[item].checked"
						@click="() => cartStore.shopCheckChange(item)"
					></van-checkbox>
				</div>
				<router-link class="right" to="/">
					<van-icon name="shop-o" size="14" />
					<div>{{ cartStore.shopIdInfo[item]["name"] }}</div>
					<van-icon name="arrow" size="14" />
				</router-link>
			</div>

			<van-swipe-cell
				v-for="(item2, index2) in cartStore.shopIdPro[item]"
				:key="item2.id"
				:before-close="({ position }) => swipeCellBeforeClose(position, item2, index2, index)"
			>
				<van-card class="cart-pro-item" :price="item2.price" :title="item2.name">
					<template #thumb>
						<div class="checkbox">
							<van-checkbox v-model="item2.checked" @click="() => cartStore.shopProCheckChange(item2)"></van-checkbox>
						</div>
						<div class="thumb">
							<router-link to="/">
								<van-image width="88" height="88" :src="item2.thumb" />
							</router-link>
						</div>
					</template>
					<template #tags>
						<div class="cart-pro-attr">
							<div class="cart-pro-attr-box">
								<div class="text van-ellipsis">
									{{ item2.attr }}
								</div>
								<div class="icon">
									<van-icon name="arrow-down" />
								</div>
							</div>
						</div>
					</template>
					<template #num>
						<van-stepper v-model="item2.quantity" integer button-size="18" />
					</template>
				</van-card>
				<template #right>
					<van-button square text="删除" type="danger" class="delete-button" />
				</template>
			</van-swipe-cell>
		</van-cell-group>
	</template>
	<van-empty v-else description="购物车是空的" image-size="50">
		<template #image>
			<van-icon name="shopping-cart-o" size="50" />
		</template>
	</van-empty>

	<van-divider>{{ t("app.global.text.recommended") }}</van-divider>

	<van-list v-model:loading="loading" :finished="finished" :finished-text="t('app.global.text.noMore')" @load="onLoad">
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

	<van-submit-bar
		:class="{ 'space-between': cartStore.isManagement }"
		placeholder
		:price="cartStore.isManagement ? undefined : yuanToPoints(cartStore.total.checkPrice)"
		:disabled="cartStore.total.checkQuantity < 1"
		:button-text="cartStore.isManagement ? '删除商品' : '去结算'"
		@submit="barSubmit"
	>
		<van-checkbox
			:disabled="cartStore.total.quantity < 1"
			v-model="cartStore.checkAllVal"
			@click="cartStore.checkAll()"
		>
			全选
		</van-checkbox>
	</van-submit-bar>
</template>

<style scoped lang="scss">
.login-btn {
	float: right;
	width: 60px;
}
.delete-button {
	height: 100%;
}
.cart-pro-shop {
	display: flex;
	padding: 15px 16px 5px;
	background-color: var(--van-card-background);
	.checkbox {
		display: flex;
		align-items: center;
		width: 20px;
		padding-right: 10px;
	}
	.right {
		display: flex;
		align-items: center;
	}
}
.cart-pro-item {
	/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
	::v-deep(.van-card__thumb) {
		display: flex;
		width: 118px;
	}
	.checkbox {
		display: flex;
		align-items: center;
		width: 20px;
		padding-right: 10px;
	}
	.cart-pro-attr {
		display: flex;
		margin-top: 5px;
		color: var(--ft-color-black-rgb-3);
		cursor: pointer;
		.cart-pro-attr-box {
			display: flex;
			align-items: center;
			padding: 0 4px;
			overflow: hidden;
			background-color: var(--ft-color-white-1);
			border-radius: 10px;
			.text {
				flex: 0 1 auto;
			}
			.icon {
				flex: 1 0 auto;
				padding-left: 5px;
			}
		}
	}
}
.space-between {
	/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
	::v-deep(.van-submit-bar__bar) {
		justify-content: space-between;
	}
}
</style>
