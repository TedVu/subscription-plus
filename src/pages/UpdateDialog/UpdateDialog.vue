<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { enAU } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";
import VueDatePicker from "@vuepic/vue-datepicker";

import { isAllDataCorrect, nameRules } from "../../validation";
import { updateSubscription } from "../../composables";
import { uploadFirebaseStaticFile } from "../../firebase";
import { useSubscriptionItemsStore } from "../../store";

const emits = defineEmits(["close", "update"]);

const props = defineProps({
  id: {
    type: String,
    default: undefined,
  },
});

const store = useSubscriptionItemsStore();
const { subscriptionItems } = storeToRefs(store);

const attachedSubscriptionItem = subscriptionItems.value
  .filter((subscriptionItem) => subscriptionItem.id === props.id)
  .at(0);

const parts = attachedSubscriptionItem!.date!.split("/");
const parsedDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
const name = ref(attachedSubscriptionItem!.name);
const date = ref(parsedDate.toDateString());
const loading = ref(false);
const snackbar = ref(false);
const snackbarMsg = ref("");
const snackbarColor = ref("");
const images = ref([]);
const subscriptionDateErrorMsg = ref<boolean | undefined>(undefined);

const submit = async () => {
  if (isAllDataCorrect(name.value, date.value, subscriptionDateErrorMsg)) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 2000);

    const updateImageName = images.value[0]
      ? `${uuidv4().replaceAll("-", "")}.${(images.value[0] as File)?.name
          .split(".")
          .pop()}`
      : undefined;

    const updatedSubscriptionItem = {
      id: props.id!,
      name: name.value,
      date: date.value ?? attachedSubscriptionItem?.date,
      imgName: updateImageName ?? attachedSubscriptionItem?.imgName,
    };

    if (images.value[0]) {
      await uploadFirebaseStaticFile(
        images.value[0],
        updatedSubscriptionItem.imgName!
      );
    }

    await updateSubscription(
      props.id!,
      updatedSubscriptionItem,
      !!images.value[0]
    );
    emits("update");
    snackbar.value = true;
    snackbarMsg.value = "Updating a new subscription successful!";
    snackbarColor.value = "success";
  } else {
    snackbar.value = true;
    snackbarMsg.value = "Updating a subscription failed!";
    snackbarColor.value = "red-darken-2";
  }
};
</script>
<template>
  <v-form validate-on="blur" @submit.prevent="submit">
    <v-card title="">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 text-medium-emphasis ps-2">Update Subscription</div>
        <v-btn icon="mdi-close" variant="text" @click="emits('close')"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Subscription Name"
          :rules="nameRules"
        />
        <VueDatePicker
          teleport-center
          :offset="50"
          v-model="date"
          :enable-time-picker="false"
          :format-locale="enAU"
          clearable
          placeholder="Subscription Date"
          text-input
          required
          format="dd/MM/yyyy"
          :state="subscriptionDateErrorMsg"
        >
        </VueDatePicker>
        <v-file-input
          v-model="images"
          accept="image/png, image/jpeg, image/gif"
          label="Subscription Image"
          class="mt-5"
          prepend-icon="mdi-camera"
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :loading="loading"
          color="green"
          variant="elevated"
          text="Update"
          type="submit"
        ></v-btn>
        <v-btn
          color="red"
          variant="elevated"
          text="Close Dialog"
          @click="emits('close')"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
  <v-snackbar v-model="snackbar" :color="snackbarColor">
    {{ snackbarMsg }}
  </v-snackbar>
</template>
