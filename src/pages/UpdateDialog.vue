<template>
  <v-card title="Update Subscription">
    <v-text-field v-model="name" label="Subscription Name" :rules="nameRules" />
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text="Update" color="success" @click="emits('close')"></v-btn>
      <v-btn text="Close Dialog" @click="emits('close')"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emits = defineEmits(['close']);
const name = ref('');
</script>
