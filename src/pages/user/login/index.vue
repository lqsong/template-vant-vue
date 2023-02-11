<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { setToken } from "@/utils/localToken";
import { IResponseData } from "@/@types/utils.request";
import { LoginParamsType } from "./data";
import { accountLogin } from "./server";

import { useI18n } from "@/composables/useI18n";
import locales from "./locales";
const t = useI18n(locales);

const router = useRouter();

const formData = reactive<LoginParamsType>({
	username: "",
	password: "",
});

const loading = ref(false);
const onSubmit = async () => {
	if (loading.value === true) {
		return;
	}
	if (formData.username === "") {
		showToast(t("pages.user.login.form.username.placeholder"));
		return false;
	}
	if (formData.password === "") {
		showToast(t("pages.user.login.form.password.placeholder"));
		return false;
	}
	try {
		const response: IResponseData<any> = await accountLogin(formData);
		const data = response.data || {};
		setToken(data.token || "");
		showToast(t("pages.user.login.form.submit.success"));
		/* const { redirect, ...query } = router.currentRoute.value.query;
		router.replace({
			path: (redirect as string) || "/",
			query: {
				...query,
			},
		}); */
		router.replace("/member/index");
	} catch (error: any) {
		console.log(error);
		const message = error.message;
		if (message === "CustomError") {
			const response = error.response || {};
			const data = response.data || {};
			const msg = data.msg || "";
			showToast(msg);
		} else {
			showToast(message);
		}
	}
};
</script>

<template>
	<div class="user-layout">
		<van-nav-bar :border="false" fixed placeholder>
			<template #left>
				<router-link to="/">
					<van-icon name="cross" size="18" />
				</router-link>
			</template>
			<template #right>
				<router-link to="/user/register">{{ t("app.global.text.register") }}</router-link>
			</template>
		</van-nav-bar>
		<van-form @submit="onSubmit">
			<div class="user-title">{{ t("pages.user.login.title") }}</div>
			<van-cell-group inset>
				<van-field
					v-model="formData.username"
					name="username"
					:placeholder="`${t('pages.user.login.form.username.placeholder')} admin or user`"
					:rules="[{ required: true, message: t('pages.user.login.form.username.placeholder') }]"
				/>
				<van-field
					v-model="formData.password"
					type="password"
					name="password"
					:placeholder="`${t('pages.user.login.form.password.placeholder')} 123456`"
					:rules="[{ required: true, message: t('pages.user.login.form.password.placeholder') }]"
				/>
			</van-cell-group>
			<div class="user-btn">
				<van-button
					round
					block
					color="linear-gradient(to right, #ff6034, #ee0a24)"
					native-type="submit"
					:loading="loading"
					:disabled="loading"
				>
					{{ t("app.global.text.login") }}
				</van-button>
			</div>
		</van-form>
	</div>
</template>

<style scoped lang="scss"></style>
