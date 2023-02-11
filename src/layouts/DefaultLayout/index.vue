<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { formatRoutes } from "@/utils/router";
import { useTitle } from "@/composables/useTitle";
import layoutRotes from "./routes";

const route = useRoute();

// 框架所有菜单路由 与 patch key格式的所有菜单路由
const routerPathKeyRouter = ref(formatRoutes(layoutRotes));

// 当前路由 item
const routeItem = computed(() => routerPathKeyRouter.value.pathKeyRouter[route.path]);

// 设置title
useTitle(routeItem);
</script>
<template>
	<router-view />
	<van-back-top :bottom="60" />
</template>
<style scoped lang="scss"></style>
