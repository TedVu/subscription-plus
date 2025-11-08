<script setup lang="ts">
import { Header } from "@components";
import { onMounted } from "vue";
import { useTheme } from "vuetify/lib/framework.mjs";

onMounted(() => {
  const theme = useTheme();

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    theme.global.name.value = savedTheme;
    document.body.style.background =
      theme.global.current.value.colors.background;
  }
});
</script>

<template>
  <Suspense>
    <Header>
      <router-view></router-view>
    </Header>
  </Suspense>
</template>

<style scoped></style>
