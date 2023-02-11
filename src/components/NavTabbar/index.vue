<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "@/composables/useI18n";
import locales from "./locales";

interface Props {
	modelValue?: number;
}
const props = withDefaults(defineProps<Props>(), {
	modelValue: -1,
});

const emit = defineEmits<{
	(e: "update:modelValue", val: number): void;
}>();

const active = computed<number>({
	get: () => props.modelValue,
	set: (val) => {
		emit("update:modelValue", val);
	},
});

const t = useI18n(locales);
</script>
<template>
	<van-tabbar v-model="active" placeholder>
		<van-tabbar-item to="/" icon="wap-home-o">{{ t("components.NavTabbar.text.home") }}</van-tabbar-item>
		<van-tabbar-item to="/category" icon="apps-o">{{ t("components.NavTabbar.text.category") }}</van-tabbar-item>
		<van-tabbar-item to="/cart" icon="cart-o">{{ t("components.NavTabbar.text.cart") }}</van-tabbar-item>
		<van-tabbar-item to="/member" icon="manager-o">{{ t("components.NavTabbar.text.my") }}</van-tabbar-item>
	</van-tabbar>
</template>
<style lang="scss"></style>
