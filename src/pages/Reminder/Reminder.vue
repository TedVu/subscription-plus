<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <div class="ma-4">
          <div class="text-subtitle-2">Cover</div>
          <v-img
            :aspect-ratio="1"
            class="bg-white"
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            width="300"
            cover
          ></v-img>
        </div>
      </v-col>
      <v-col cols="12" sm="8"> DETAILS</v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup></script>
