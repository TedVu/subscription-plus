<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import UpdateDialog from './UpdateDialog.vue';
import { getSubscriptionImageUrl } from '../firebase';
import { getSubscriptionItems, removeSubscription } from '../composables';
import { Subscription } from '../types/subscription';
import { useSubscriptionItemsStore } from '../store';

const store = useSubscriptionItemsStore();
await store.fetchLatestData();
const items = store.subscriptionItems;

const itemsMap = ref<Map<string, string | void>>();
const dialog = ref(false);
const snackbar = ref(false);
const snackbarMsg = ref('');
const snackbarColor = ref('');

const handleSubscriptionDelete = async (id: string, isActive: Ref<Boolean>) => {
  dialog.value = false;

  isActive.value = false;
  snackbar.value = true;
  snackbarMsg.value = 'Deleting a subscription successful!';
  snackbarColor.value = 'red-darken-2';
};
</script>

<template>
  <v-container fluid>
    <v-row dense>
      <template v-if="items.length > 0">
        <v-col v-for="item in items" :key="item.id" cols="6">
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
  <v-snackbar v-model="snackbar" :color="snackbarColor">
    {{ snackbarMsg }}
  </v-snackbar>
</template>

<style lang="scss">
@import './HomePage.module.scss';
</style>
