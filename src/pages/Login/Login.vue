<script setup lang="ts">
import { ref } from 'vue';
const name = ref('');
const password = ref('');
const loading = ref(false);
const snackbar = ref(false);
const snackbarMsg = ref('');
const snackbarColor = ref('');
const submit = async () => {};
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form validate-on="blur" @submit.prevent="submit">
      <v-text-field v-model="name" label="Username" />
      <v-text-field v-model="password" label="Password" />

      <v-btn
        :loading="loading"
        type="submit"
        block
        class="mt-2"
        color="success"
        variant="elevated"
        >Login</v-btn
      >
      <v-btn
        :loading="loading"
        type="submit"
        block
        class="mt-2"
        color="primary"
        variant="elevated"
        >Register</v-btn
      >
    </v-form>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarMsg }}
    </v-snackbar>
  </v-sheet>
</template>
