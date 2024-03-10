<script lang="ts" setup>
import { computed } from 'vue';
import { setLoadingState } from '../composables';
const loading = setLoadingState(false);

const computedVMainStyle = computed(() => ({
  'progress-center': loading.value,
  'content-container': !loading.value,
}));
</script>
<template>
  <v-app>
    <v-app-bar color="info" density="comfortable">
      <v-app-bar-title> Subscription plus </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          title="Ted Vu"
          prepend-avatar="https://tedvublogimages.s3.us-west-1.amazonaws.com/profilepics.jpg"
          subtitle="tedvu184@gmail.com"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          to="profile"
          title="Profile"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-home" to="/" title="Home"></v-list-item>
        <v-list-item
          prepend-icon="mdi-plus"
          to="add"
          title="Add subscription"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-information"
          to="about"
          title="About"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main :class="computedVMainStyle"><slot /></v-main>
  </v-app>
</template>

<style lang="scss">
.progress-center {
  padding-top: 40vh !important;
}

.content-container {
  padding-top: 15vh !important;
}
</style>
