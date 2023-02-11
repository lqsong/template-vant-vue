<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "@/composables/useTheme";
import { useI18n } from "@/composables/useI18n";
import locales from "./locales";
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

const t = useI18n(locales);
const isDark = useTheme();

const actions = computed(() =>
	isDark.value
		? [{ name: t("components.ActionSheetThemeModel.text.light"), value: false }]
		: [{ name: t("components.ActionSheetThemeModel.text.dark"), value: true }],
);

const onSelect = (item: any) => {
	isDark.value = item.value;
	visible.value = false;
};
</script>
<template>
	<span v-if="isDark">{{ t("components.ActionSheetThemeModel.text.dark") }}</span>
	<span v-else>{{ t("components.ActionSheetThemeModel.text.light") }}</span>
	<van-action-sheet
		v-model:show="visible"
		:actions="actions"
		@select="onSelect"
		:cancel-text="t('app.global.text.cancel')"
		close-on-click-action
	/>
</template>
<style lang="scss" scoped></style>
