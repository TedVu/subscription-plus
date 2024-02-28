<template>
  <v-form validate-on="blur">
    <v-card title="Update Subscription">
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
          v-on:update:model-value="
            isAllDataCorrect(name, date, subscriptionDateErrorMsg)
          "
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
          color="green"
          variant="elevated"
          text="Update"
          @click="emits('close')"
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { enAU } from 'date-fns/locale';
import { nameRules, isAllDataCorrect } from '../validation';
import VueDatePicker from '@vuepic/vue-datepicker';
const emits = defineEmits(['close']);

const name = ref('');
const date = ref('');
const images = ref([]);

const subscriptionDateErrorMsg = ref<boolean | undefined>(undefined);
</script>
