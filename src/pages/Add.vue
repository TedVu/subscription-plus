<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { enAU } from 'date-fns/locale';
import { addFirebaseRecord } from '../firebase';

const name = ref('');
const date = ref(null);
const images = ref([]);
const loading = ref(false);
const subscriptionDateErrorMsg = ref<boolean | undefined>(undefined);
const snackbar = ref(false);
const snackbarMsg = ref('');
const snackbarColor = ref('');

const nameRules = [
  (name: string) => {
    if (name?.length >= 3) return true;
    return 'Subscription name must be at least 3 characters.';
  },
];

const isAllDataCorrect = () => {
  let isCorrect = true;

  // subscription name must be at least 3 characters
  if (name.value.length < 3) {
    isCorrect = false;
  }

  // subscription date must be filled
  if (date.value === null) {
    subscriptionDateErrorMsg.value = false;
    isCorrect = false;
  } else {
    subscriptionDateErrorMsg.value = undefined;
  }
  return isCorrect;
};

const submit = async () => {
  if (isAllDataCorrect()) {
    loading.value = true;

    loading.value = false;
    snackbar.value = true;
    snackbarMsg.value = 'Adding a new subscription successful!';
    snackbarColor.value = 'success';
    await addFirebaseRecord({ name: 'subscription' });
  } else {
    snackbar.value = true;
    snackbarMsg.value = 'Adding a new subscription failed!';
    snackbarColor.value = 'red-darken-2';
  }
};
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form validate-on="blur" @submit.prevent="submit">
      <v-text-field
        v-model="name"
        label="Subscription Name"
        :rules="nameRules"
      />
      <VueDatePicker
        v-model="date"
        :enable-time-picker="false"
        :format-locale="enAU"
        :clearable="true"
        placeholder="Subscription Date"
        text-input
        required
        format="dd/MM/yyyy"
        :state="subscriptionDateErrorMsg"
        v-on:update:model-value="isAllDataCorrect()"
      >
      </VueDatePicker>
      <span v-if="subscriptionDateErrorMsg === false" class="date-error">
        Subscription date is not in the correct format
      </span>
      <v-file-input
        v-model="images"
        accept="image/png, image/jpeg, image/gif"
        label="Subscription Image"
        class="mt-5"
        prepend-icon="mdi-camera"
      ></v-file-input>

      <v-btn :loading="loading" type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarMsg }}
    </v-snackbar>
  </v-sheet>
</template>

<style>
.date-error {
  font-size: 12px;
  color: #bb0020;
}
</style>
