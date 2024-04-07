<script setup lang="ts">
import { ref, Ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { computedAsync } from "@vueuse/core";
import draggable from "vuedraggable";
import type { Subscription } from "../../types";
import { getSubscriptionImageUrl } from "../../firebase";
import { removeSubscription, useLoadingState } from "../../composables";
import { useSubscriptionItemsStore } from "../../store";
import UpdateDialog from "../UpdateDialog";
import { onMounted } from "vue";

const loading = useLoadingState();
const filterValue = ref("");
const delayFilterTimeout = ref(0);
const dialog = ref(false);
const snackbar = ref(false);
const snackbarMsg = ref("");
const snackbarColor = ref("");
const pagination = ref(1);

loading!.value = true;

const store = useSubscriptionItemsStore();
await store.getLatestData();

const computeItemsOrder = () => {
  const localStorageItems = JSON.parse(
    localStorage.getItem("items-order")!
  ) as Subscription[];
  if (localStorageItems) {
    const oldOrderedItems = [] as Subscription[];
    const newOrderItems = [] as Subscription[];
    localStorageItems.forEach((item) => {
      if (subscriptionItems.value.indexOf(item) !== -1) {
        oldOrderedItems.push(item);
      } else {
        newOrderItems.push(item);
      }
    });

    oldOrderedItems.push(...newOrderItems);
    subscriptionItems.value = oldOrderedItems;
  }
};

const displayItemsPagination = computed(() => {
  const paginatedItems: Subscription[] = [];
  subscriptionItems.value.forEach((item, index) => {
    const mx = pagination.value * 6;
    const mn = (pagination.value - 1) * 6;
    if (index < mx && index >= mn) {
      paginatedItems.push(item);
    }
  });

  return paginatedItems;
});

onMounted(() => {
  computeItemsOrder();
});
setTimeout(() => {
  loading!.value = false;
}, 1000);

const { subscriptionItems } = storeToRefs(store);

const paginationLength = computed(() => {
  return Math.ceil(subscriptionItems.value.length / 6);
});
const itemsMapComputed = computedAsync(async () => {
  const itemsMap = new Map<string, string | void>();

  for await (const item of subscriptionItems.value) {
    const imageUrl = await getSubscriptionImageUrl(`images/${item.imgName}`);
    itemsMap?.set(item.id, imageUrl);
  }
  return itemsMap;
}, new Map<string, string | void>());

const handleSubscriptionItemDelete = async (
  id: string,
  isActive: Ref<Boolean>
) => {
  await removeSubscription(id);
  localStorage.setItem("items-order", JSON.stringify(subscriptionItems.value));
  dialog.value = false;
  isActive.value = false;
  snackbar.value = true;
  snackbarMsg.value = "Deleting a subscription successful!";
  snackbarColor.value = "red-darken-2";
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

const handleUpdate = () => {
  localStorage.setItem("items-order", JSON.stringify(subscriptionItems.value));
};

const handleDragEnd = () => {
  localStorage.setItem("items-order", JSON.stringify(subscriptionItems.value));
};
</script>
<template>
  <template v-if="loading"
    ><v-progress-circular color="primary" indeterminate></v-progress-circular
  ></template>
  <template v-else>
    <v-text-field v-model="filterValue" v-if="subscriptionItems.length > 0">
      <template v-slot:append-inner>
        <v-icon> mdi-magnify </v-icon>
      </template>
    </v-text-field>
    <v-container>
      <template v-if="subscriptionItems.length > 0">
        <v-row no-gutters justify-cotent="center">
          <draggable
            v-model="displayItemsPagination"
            group="subscriptionItems"
            item-key="id"
            :animation="150"
            handle=".drag-handle"
            fallback-class="drag"
            ghost-class="ghost"
            :force-fallback="true"
            style="display: contents"
            @change="handleDragEnd"
          >
            <template #item="{ element: item }: { element: Subscription }">
              <v-col :key="item.id" cols="4">
                <v-card hover href="/reminder">
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
                    <div class="mr-2 font-weight-bold" style="font-size: 12px">
                      Subscription Date:
                    </div>
                    {{ item.date }}
                    <v-spacer />
                    <v-btn
                      size="small"
                      variant="text"
                      icon="mdi-drag"
                      style="cursor: grab"
                      class="drag-handle"
                    ></v-btn>
                    <v-dialog width="500" transition="dialog-top-transition">
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
                          @update="handleUpdate"
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
                                handleSubscriptionItemDelete(item.id, isActive)
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
        </v-row>
        <v-pagination
          v-if="paginationLength > 6"
          variant="elevated"
          :length="paginationLength"
          v-model="pagination"
        ></v-pagination>
      </template>
      <template v-else> No subscription items </template>
    </v-container>
  </template>
  <v-snackbar v-model="snackbar" :color="snackbarColor">
    {{ snackbarMsg }}
  </v-snackbar>
</template>

<style lang="scss" scoped>
@import "./HomePage.module.scss";
</style>
