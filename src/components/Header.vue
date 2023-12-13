<script lang="ts" setup>
import { ref } from 'vue';
const drawer = ref(false);
</script>

<template>
  <v-layout>
    <v-app-bar color="info" density="comfortable">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title>Subscription Management Application</v-app-bar-title>
    </v-app-bar>
  </v-layout>
</template>
