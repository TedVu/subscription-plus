<script setup lang="ts">
import { ref, Ref, onMounted, inject } from 'vue';
import { storeToRefs } from 'pinia';
import UpdateDialog from './UpdateDialog.vue';
import { getSubscriptionImageUrl } from '../firebase';
import { Subscription } from '../types/subscription';
import { removeSubscription } from '../composables';
import { useSubscriptionItemsStore } from '../store';
import { loadingSymbol } from '../composables';

const loading = inject<Ref<Boolean>>(loadingSymbol);
loading!.value = true;
const store = useSubscriptionItemsStore();
await store.fetchLatestData();

setTimeout(() => {
  loading!.value = false;
}, 2000);

const { subscriptionItems } = storeToRefs(store);

const itemsMap = ref<Map<string, string | void>>();

onMounted(async () => {
  itemsMap.value = new Map<string, string | void>();
  subscriptionItems.value.forEach(async (item: Subscription) => {
    const imageUrl = await getSubscriptionImageUrl(item.imgName);
    itemsMap.value?.set(item.id, imageUrl);
  });
});
const dialog = ref(false);
const snackbar = ref(false);
const snackbarMsg = ref('');
const snackbarColor = ref('');

const handleSubscriptionDelete = async (id: string, isActive: Ref<Boolean>) => {
  await removeSubscription(id);
  dialog.value = false;
  isActive.value = false;
  snackbar.value = true;
  snackbarMsg.value = 'Deleting a subscription successful!';
  snackbarColor.value = 'red-darken-2';
};
</script>

<template>
  <template v-if="loading"
    ><v-progress-circular color="primary" indeterminate></v-progress-circular
  ></template>
  <template v-else>
    <v-container fluid>
      <v-row dense>
        <template v-if="subscriptionItems.length > 0">
          <v-col v-for="item in subscriptionItems" :key="item.id" cols="6">
            <v-card class="card">
              <v-img
                :src="itemsMap?.get(item.id)!"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
              >
                <v-card-title
                  class="text-white"
                  v-text="item.name"
                ></v-card-title>
              </v-img>

              <v-card-actions>
                Subscription Date: {{ item.date }}
                <v-spacer />
                <v-dialog width="500">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      size="small"
                      color="surface-variant"
                      variant="text"
                      icon="mdi-update"
                    ></v-btn>
                  </template>
                  <template #default="{ isActive }">
                    <update-dialog
                      @close="isActive.value = false"
                      :id="item.id"
                    />
                  </template>
                </v-dialog>
                <v-dialog width="500">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      size="small"
                      color="surface-variant"
                      variant="text"
                      icon="mdi-delete"
                    ></v-btn>
                  </template>
                  <template #default="{ isActive }">
                    <v-card title="Delete subscription?">
                      <template v-slot:actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          @click="handleSubscriptionDelete(item.id, isActive)"
                        >
                          Yes
                        </v-btn>

                        <v-btn @click="isActive.value = false"> No </v-btn>
                      </template>
                    </v-card>
                  </template>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
        <template v-else> No subscription items </template>
      </v-row>
    </v-container>
  </template>
  <v-snackbar v-model="snackbar" :color="snackbarColor">
    {{ snackbarMsg }}
  </v-snackbar>
</template>

<style lang="scss">
@import './HomePage.module.scss';
</style>
