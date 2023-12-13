<script lang="ts" setup>
import { ref } from 'vue';
const drawer = ref(false);
</script>

<template>
  <v-app>
    <v-app-bar color="info" density="comfortable">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      Subscription plus
    </v-app-bar>
    <v-main><slot /></v-main>
  </v-app>
</template>
