<script lang="ts" setup></script>
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
        <v-list-item
          prepend-icon="mdi-home"
          to="home"
          title="Home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-plus"
          to="add-subscription"
          title="Add subscription"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-information"
          to="about"
          title="About"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main><slot /></v-main>
  </v-app>
</template>
