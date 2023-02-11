<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { removeToken } from "@/utils/localToken";
import ActionSheetI18n from "@/components/ActionSheetI18n/index.vue";
import ActionSheetThemeModel from "@/components/ActionSheetThemeModel/index.vue";
import { useUserStore } from "@/store/user";
import { useI18n } from "@/composables/useI18n";
import locales from "./locales";

const t = useI18n(locales);
const router = useRouter();
const userStore = useUserStore();

// 数据
const info = reactive({
	name: "张三",
	sex: "男",
	birthday: ["2022", "12", "01"],
	phone: "13413141314",
	email: "xxxxxx@xx.xx",
});

// 姓名编辑弹框
const nameDialog = reactive({
	show: false,
	value: "",
	onShow: () => {
		nameDialog.value = info.name;
		nameDialog.show = true;
	},
	beforeClose: async (action: string) => {
		if (action !== "confirm") {
			return true;
		}
		if (nameDialog.value === "") {
			showToast(t("pages.member.set.namefrom.placeholder"));
			return false;
		}
		info.name = nameDialog.value;
		return true;
	},
});

// 性别选择
const sexActionSheet = reactive({
	show: false,
	actions: [{ name: "男" }, { name: "女" }],
	onSelect: (item: any) => {
		info.sex = item.name;
		sexActionSheet.show = false;
	},
});

// 生日选择
const birthdayPopup = reactive({
	show: false,
	minDate: new Date(1946, 0, 1),
	onConfirm: ({ selectedValues }: any) => {
		info.birthday = selectedValues;
		birthdayPopup.show = false;
	},
});

// 语言下拉
const i18nActionSheetShow = ref(false);

// 主题下拉
const themeActionSheetShow = ref(false);

// 退出
const logout = () => {
	removeToken();
	userStore.reset();
	router.replace("/user/login");
};
</script>

<template>
	<van-nav-bar fixed placeholder :title="t('pages.member.set.title')">
		<template #left>
			<router-link to="/member">
				<van-icon name="arrow-left" />
			</router-link>
		</template>
	</van-nav-bar>

	<van-cell-group class="margin-b10">
		<van-cell is-link :title="t('pages.member.set.cell.title.name')" :value="info.name" @click="nameDialog.onShow()" />
		<van-cell
			is-link
			:title="t('pages.member.set.cell.title.sex')"
			:value="info.sex"
			@click="sexActionSheet.show = true"
		/>
		<van-cell
			is-link
			:title="t('pages.member.set.cell.title.birthday')"
			:value="info.birthday.join('.')"
			@click="birthdayPopup.show = true"
		/>
	</van-cell-group>

	<van-cell-group class="margin-b10">
		<van-cell is-link :title="t('pages.member.set.cell.title.phone')" :value="info.phone" />
		<van-cell is-link :title="t('pages.member.set.cell.title.email')" :value="info.email" />
	</van-cell-group>

	<van-cell-group class="margin-b10">
		<van-cell is-link :title="t('pages.member.set.cell.title.loginPassword')" :value="t('app.global.text.goSet')" />
		<van-cell is-link :title="t('pages.member.set.cell.title.paymentPassword')" :value="t('app.global.text.goSet')" />
	</van-cell-group>

	<van-cell-group class="margin-b10">
		<van-cell is-link :title="t('pages.member.set.cell.title.language')" @click.capture="i18nActionSheetShow = true">
			<template #value>
				<ActionSheetI18n v-model:show="i18nActionSheetShow" />
			</template>
		</van-cell>
		<van-cell is-link :title="t('pages.member.set.cell.title.theme')" @click.capture="themeActionSheetShow = true">
			<template #value>
				<ActionSheetThemeModel v-model:show="themeActionSheetShow" />
			</template>
		</van-cell>
	</van-cell-group>

	<div class="margin-b10">
		<van-button type="default" block class="btn" @click="logout">{{
			t("pages.member.set.cell.title.logout")
		}}</van-button>
	</div>

	<!-- 姓名编辑弹框 -->
	<van-dialog v-model:show="nameDialog.show" show-cancel-button :before-close="nameDialog.beforeClose">
		<van-field v-model.trim="nameDialog.value" :placeholder="t('pages.member.set.namefrom.placeholder')" />
	</van-dialog>

	<!-- 性别选择 -->
	<van-action-sheet
		v-model:show="sexActionSheet.show"
		:actions="sexActionSheet.actions"
		@select="sexActionSheet.onSelect"
		:cancel-text="t('app.global.text.cancel')"
	/>

	<!-- 生日选择下拉 -->
	<van-popup v-model:show="birthdayPopup.show" position="bottom">
		<van-date-picker
			:min-date="birthdayPopup.minDate"
			@cancel="birthdayPopup.show = false"
			@confirm="birthdayPopup.onConfirm"
		/>
	</van-popup>
</template>

<style scoped lang="scss">
.btn {
	border-color: var(--van-border-color);
	border-right: 0;
	border-left: 0;
	border-radius: 0;
}
</style>
