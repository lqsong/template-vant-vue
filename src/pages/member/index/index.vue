<script setup lang="ts">
import { ref } from "vue";
import NavTabbar from "@/components/NavTabbar/index.vue";
import { useI18n } from "@/composables/useI18n";
import locales from "./locales";

const t = useI18n(locales);

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
	<div class="memeber-header">
		<div class="face">
			<van-image round width="50" height="50" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
		</div>
		<div class="info">
			<div class="name">张三</div>
			<div>
				<van-tag>会员中心</van-tag>
			</div>
		</div>
		<div class="set">
			<router-link to="/member/set">
				<van-icon name="setting-o" size="20" />
			</router-link>
		</div>
	</div>
	<van-cell-group inset class="margin-b10">
		<div class="group-card-title">
			<div class="text">{{ t("pages.member.index.card1.title") }}</div>
			<div class="more">
				<router-link to="/">{{ t("app.global.text.all") }}<van-icon name="arrow" /></router-link>
			</div>
		</div>
		<van-grid :column-num="5" :border="false">
			<van-grid-item text="待付款">
				<template #icon>
					<van-badge :content="0" :show-zero="false">
						<van-icon name="gold-coin-o" size="24" />
					</van-badge>
				</template>
			</van-grid-item>
			<van-grid-item text="待发货">
				<template #icon>
					<van-badge :content="1" :show-zero="false">
						<van-icon name="free-postage" size="24" />
					</van-badge>
				</template>
			</van-grid-item>
			<van-grid-item text="待收货">
				<template #icon>
					<van-badge :content="3" :show-zero="false">
						<van-icon name="logistics" size="24" />
					</van-badge>
				</template>
			</van-grid-item>
			<van-grid-item text="待评价">
				<template #icon>
					<van-badge :content="10" :show-zero="false">
						<van-icon name="comment-o" size="24" />
					</van-badge>
				</template>
			</van-grid-item>
			<van-grid-item text="退款/售后">
				<template #icon>
					<van-badge :content="0" :show-zero="false">
						<van-icon name="after-sale" size="24" />
					</van-badge>
				</template>
			</van-grid-item>
		</van-grid>
	</van-cell-group>
	<van-cell-group inset class="margin-b10">
		<div class="group-card-title">
			<div class="text">{{ t("pages.member.index.card2.title") }}</div>
		</div>
		<van-grid :border="false">
			<van-grid-item text="红包">
				<template #icon>
					<span class="font-weight600 font-size18">5</span>
				</template>
			</van-grid-item>
			<van-grid-item text="优惠劵">
				<template #icon>
					<span class="font-weight600 font-size18">1</span>
				</template>
			</van-grid-item>
			<van-grid-item text="金币">
				<template #icon>
					<span class="font-weight600 font-size18">200</span>
				</template>
			</van-grid-item>
			<van-grid-item text="积分">
				<template #icon>
					<span class="font-weight600 font-size18">1001</span>
				</template>
			</van-grid-item>
		</van-grid>
	</van-cell-group>
	<van-cell-group inset>
		<van-grid :column-num="4" :border="false">
			<van-grid-item text="我的拼团">
				<template #icon>
					<van-icon name="friends-o" size="24" />
				</template>
			</van-grid-item>
			<van-grid-item text="我的秒杀">
				<template #icon>
					<van-icon name="underway-o" size="24" />
				</template>
			</van-grid-item>
			<van-grid-item text="我的收藏">
				<template #icon>
					<van-icon name="star-o" size="24" />
				</template>
			</van-grid-item>
			<van-grid-item text="收货地址">
				<template #icon>
					<van-icon name="location-o" size="24" />
				</template>
			</van-grid-item>
			<van-grid-item text="消息">
				<template #icon>
					<van-icon name="chat-o" size="24" />
				</template>
			</van-grid-item>
			<van-grid-item text="客服">
				<template #icon>
					<van-icon name="service-o" size="24" />
				</template>
			</van-grid-item>
			<van-grid-item text="关于我们">
				<template #icon>
					<van-icon name="info-o" size="24" />
				</template>
			</van-grid-item>
		</van-grid>
	</van-cell-group>

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

	<NavTabbar :model-value="3" />
</template>
<style lang="scss" scoped>
.memeber-header {
	display: flex;
	padding: 20px;
	.face {
		width: 60px;
	}
	.set {
		width: 30px;
		text-align: right;
	}
	.info {
		flex: 1;
		.name {
			font-size: 18px;
		}
	}
}
</style>
