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
    <v-navigation-drawer v-if="drawer">
      <v-list>
        <v-list-item title="Profile"></v-list-item>
        <v-list-item title="Home"></v-list-item>
        <v-list-item title="About"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main><slot /></v-main>
  </v-app>
</template>
