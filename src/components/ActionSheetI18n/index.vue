<script setup lang="ts">
import { computed } from "vue";
import { setLocale } from "@/utils/i18n";
import { useI18n } from "@/composables/useI18n";
import { useI18nStore } from "@/store/i18n";

interface Props {
	show?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	show: false,
});

const emit = defineEmits<{
	(e: "update:show", val: boolean): void;
}>();

const visible = computed<boolean>({
	get: () => props.show,
	set: (val) => {
		emit("update:show", val);
	},
});

const i18nStore = useI18nStore();
const t = useI18n();

const locales: string[] = ["zh-CN", "zh-TW", "en-US"];
const languageLabels: { [key: string]: string } = {
	"zh-CN": "简体中文",
	"zh-TW": "繁体中文",
	"en-US": "English",
};

const actions = computed(() => {
	const arr: any = [];
	locales.forEach((item) => {
		if (item !== i18nStore.locale) {
			arr.push({ name: languageLabels[item], value: item });
		}
	});

	return arr;
});

const onSelect = (item: any) => {
	i18nStore.locale = item.value;
	// 设置 html lang
	setLocale(i18nStore.locale);
	// 设置 vant 语言
	i18nStore.setVantLocale();
	visible.value = false;
};
</script>
<template>
	<span>{{ languageLabels[i18nStore.locale] }}</span>
	<van-action-sheet
		v-model:show="visible"
		:actions="actions"
		@select="onSelect"
		:cancel-text="t('app.global.text.cancel')"
		close-on-click-action
	/>
</template>
<style lang="scss" scoped></style>
