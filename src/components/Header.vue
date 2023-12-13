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
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list-item
        prepend-avatar="https://tedvublogimages.s3.us-west-1.amazonaws.com/profilepics.jpg"
        title="Ted Vu"
      />

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Home"
          value="home"
        />
        <v-list-item prepend-icon="mdi-forum" title="About" value="about" />
        <v-list-item
          prepend-icon="mdi-account"
          title="New Subscription"
          value="New Subscription"
        />
        <v-list-item
          prepend-icon="mdi-account"
          title="Notifications"
          value="Notifications"
        />
        <v-list-item prepend-icon="mdi-logout" title="Logout" value="Logout" />
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
