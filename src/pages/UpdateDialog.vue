<template>
  <v-card title="Dialog">
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text="Update" color="success" @click="emits('close')"></v-btn>
      <v-btn text="Close Dialog" @click="emits('close')"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
const emits = defineEmits(['close']);
</script>
