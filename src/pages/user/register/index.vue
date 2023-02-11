<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { useI18n } from "@/composables/useI18n";
import locales from "./locales";
const t = useI18n(locales);

const router = useRouter();

const formData = reactive({
	username: "",
	password: "",
	qrpassword: "",
	code: "",
});

const loading = ref(false);
const onSubmit = (values: any) => {
	console.log("submit", values);
	router.replace("/user/login");
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
				<router-link to="/user/login">{{ t("app.global.text.login") }}</router-link>
			</template>
		</van-nav-bar>
		<van-form @submit="onSubmit">
			<div class="user-title">{{ t("app.global.text.register") }}</div>
			<van-cell-group inset>
				<van-field
					v-model="formData.username"
					name="username"
					:placeholder="t('pages.user.register.form.username.placeholder')"
					:rules="[{ required: true, message: t('pages.user.register.form.username.placeholder') }]"
				/>
				<van-field
					v-model="formData.code"
					name="code"
					:placeholder="t('pages.user.register.form.code.placeholder')"
					:rules="[{ required: true, message: t('pages.user.register.form.code.placeholder') }]"
				>
					<template #button>
						<van-button size="small">{{ t("pages.user.register.form.code.btn.text") }}</van-button>
					</template>
				</van-field>
				<van-field
					v-model="formData.password"
					type="password"
					name="password"
					:placeholder="t('pages.user.register.form.password.placeholder')"
					:rules="[{ required: true, message: t('pages.user.register.form.password.placeholder') }]"
				/>
				<van-field
					v-model="formData.qrpassword"
					type="password"
					name="qrpassword"
					:placeholder="t('pages.user.register.form.qrpassword.placeholder')"
					:rules="[{ required: true, message: t('pages.user.register.form.qrpassword.placeholder') }]"
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
					{{ t("app.global.text.register") }}
				</van-button>
			</div>
		</van-form>
	</div>
</template>

<style scoped lang="scss"></style>
