<script setup lang="ts">
import { onMounted } from "vue";
import { useTheme } from "@/composables/useTheme";
import { setHtmlLang } from "@/utils/i18n";
import { useGlobalStore } from "@/store/global";
import { useI18nStore } from "@/store/i18n";
const globalStore = useGlobalStore();
const i18nStore = useI18nStore();
onMounted(() => {
	// 设置 html lang
	setHtmlLang(i18nStore.locale);
	// 设置 vant 语言
	i18nStore.setVantLocale();
});

// 主题,白天/黑夜
useTheme();
</script>

<template>
	<van-config-provider :theme="globalStore.theme">
		<router-view></router-view>
	</van-config-provider>
</template>

<style scoped></style>
