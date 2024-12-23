<script setup lang="ts">
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { v4 as uuidv4 } from "uuid";
import "@vuepic/vue-datepicker/dist/main.css";
import { enAU } from "date-fns/locale";
import { addSubscriptionItem } from "@composables";
import { nameRules } from "@validation";
import { uploadFirebaseStaticFile } from "../../firebase";
import { useAuthentication } from "@composables";

const { userRef } = useAuthentication();
const name = ref("");
const date = ref("");
const image = ref();
const loading = ref(false);
const subscriptionDateErrorMsg = ref<boolean | undefined>(undefined);
const snackbar = ref(false);
const snackbarMsg = ref("");
const snackbarColor = ref("");

const isAllDataCorrect = () => {
  let isCorrect = true;

  if (name.value.length < 3) {
    isCorrect = false;
  }

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

    const imgName = `${uuidv4().replaceAll("-", "")}.${(
      image.value as unknown as File
    )?.name
      .split(".")
      .pop()}`;
    await addSubscriptionItem(
      {
        name: name.value,
        date: new Date(date.value).toLocaleDateString("en-AU"),
        imgName,
        id: uuidv4().replaceAll("-", ""),
      },
      userRef?.uid ?? ""
    );
    await uploadFirebaseStaticFile(image.value, imgName);
    setTimeout(() => {
      loading.value = false;
    }, 2000);
    snackbar.value = true;
    snackbarMsg.value = "Adding a new subscription successful!";
    snackbarColor.value = "success";
  } else {
    snackbar.value = true;
    snackbarMsg.value = "Adding a new subscription failed!";
    snackbarColor.value = "red-darken-2";
  }
};
</script>

<template>
  <VSheet width="300" class="mx-auto">
    <VForm validate-on="blur" @submit.prevent="submit">
      <VTextField v-model="name" label="Subscription Name" :rules="nameRules" />
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
      <VFileInput
        v-model="image"
        accept="image/png, image/jpeg, image/gif"
        label="Subscription Image"
        class="mt-5"
        prepend-icon="mdi-camera"
      ></VFileInput>

      <VBtn
        :loading="loading"
        type="submit"
        block
        class="mt-2"
        color="green"
        variant="elevated"
        >Submit</VBtn
      >
    </VForm>
    <VSnackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarMsg }}
    </VSnackbar>
  </VSheet>
</template>

<style>
.date-error {
  font-size: 12px;
  color: #bb0020;
}
</style>
