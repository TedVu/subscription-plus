<script lang="ts" setup></script>
<template>
  <v-app>
    <v-app-bar color="info" density="comfortable">
      Subscription plus
    </v-app-bar>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item title="Ted Vu" subtitle="tedvu184@gmail.com"></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          link
          title="Profile"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-home" link title="Home"></v-list-item>
        <v-list-item
          prepend-icon="mdi-information"
          link
          title="About"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main><slot /></v-main>
  </v-app>
</template>
