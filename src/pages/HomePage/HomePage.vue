<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import UpdateDialog from '../UpdateDialog';
import { getSubscriptionImageUrl } from '../../firebase';
import { removeSubscription, useLoadingState } from '../../composables';
import { useSubscriptionItemsStore } from '../../store';
import { computedAsync } from '@vueuse/core';
import draggable from 'vuedraggable';
import type { Subscription } from '../../types';

const loading = useLoadingState();
const filterValue = ref('');
const delayFilterTimeout = ref(0);
loading!.value = true;

const store = useSubscriptionItemsStore();
await store.fetchLatestData();

loading!.value = false;

const { subscriptionItems } = storeToRefs(store);

const itemsMapComputed = computedAsync(async () => {
  const itemsMap = new Map<string, string | void>();

  for await (const item of subscriptionItems.value) {
    const imageUrl = await getSubscriptionImageUrl(`images/${item.imgName}`);
    itemsMap?.set(item.id, imageUrl);
  }
  return itemsMap;
}, new Map<string, string | void>());

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

watch(
  () => filterValue.value,
  async (newfilterValue) => {
    if (delayFilterTimeout.value) {
      window.clearTimeout(delayFilterTimeout.value);
    }
    delayFilterTimeout.value = window.setTimeout(async () => {
      await store.filterSubscriptionItems(newfilterValue);
      window.clearTimeout(delayFilterTimeout.value);
    }, 300);
  }
);
</script>
<template>
  <template v-if="loading"
    ><v-progress-circular color="primary" indeterminate></v-progress-circular
  ></template>
  <template v-else>
    <v-text-field v-model="filterValue">
      <template v-slot:append-inner>
        <v-icon> mdi-magnify </v-icon>
      </template>
    </v-text-field>
    <v-container fluid>
      <v-row dense>
        <template v-if="subscriptionItems.length > 0">
          <draggable
            v-model="subscriptionItems"
            group="subscriptionItems"
            item-key="id"
            :animation="150"
            handle=".drag-handle"
            style="display: flex"
            fallback-class="drag"
            :force-fallback="true"
          >
            <template #item="{ element: item }: { element: Subscription }">
              <v-col :key="item.id" cols="6">
                <v-card class="card">
                  <v-img
                    :src="itemsMapComputed.get(item.id)!"
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
                    <div class="mr-2 font-weight-bold">Subscription Date:</div>
                    {{ item.date }}
                    <v-spacer />
                    <v-btn
                      size="small"
                      variant="text"
                      icon="mdi-drag"
                      style="cursor: grab"
                      class="drag-handle"
                    ></v-btn>
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
                              @click="
                                handleSubscriptionDelete(item.id, isActive)
                              "
                              color="red"
                              variant="elevated"
                            >
                              Yes
                            </v-btn>

                            <v-btn
                              @click="isActive.value = false"
                              color="green"
                              variant="elevated"
                            >
                              No
                            </v-btn>
                          </template>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-card-actions>
                </v-card>
              </v-col>
            </template>
          </draggable>
        </template>
        <template v-else> No subscription items </template>
      </v-row>
    </v-container>
  </template>
  <v-snackbar v-model="snackbar" :color="snackbarColor">
    {{ snackbarMsg }}
  </v-snackbar>
</template>

<style lang="scss" scoped>
@import './HomePage.module.scss';
</style>
