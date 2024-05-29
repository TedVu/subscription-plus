<script setup lang="ts">
import { Header } from "@components";
</script>

<template>
  <Suspense>
    <Header>
      <router-view></router-view>
    </Header>
  </Suspense>
</template>

<style scoped></style>
