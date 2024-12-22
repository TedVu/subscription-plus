<script setup lang="ts">
import { ref, Ref, watch, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { computedAsync } from "@vueuse/core";
import draggable from "vuedraggable";
import type { Subscription } from "@types";
import { getSubscriptionImageUrl } from "../../firebase";
import { removeSubscription, useLoadingState } from "@composables";
import { useSubscriptionItemsStore } from "@store";
import { UpdateDialog } from "@pages";
import router, { RoutesEnum } from "@routes";

const filterCategory = [
  { title: "Show all" },
  { title: "Show overdue" },
  { title: "Show future subscription" },
];

const currentFilterCategory = ref("Show all");

const onFilterCategoryClick = (item: any) => {
  currentFilterCategory.value = item.title;
};
const loading = useLoadingState();
const delayFilterTimeout = ref(0);
const dialog = ref(false);
const filterValue = ref("");
const pagination = ref(1);
const snackbar = ref(false);
const snackbarColor = ref("");
const snackbarMsg = ref("");

loading.value = true;
const store = useSubscriptionItemsStore();
await store.refreshDataSource();
loading.value = false;

const computeItemsOrder = () => {
  const localStorageItems = JSON.parse(
    localStorage.getItem("items-order") ?? ""
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
    const maxPage = pagination.value * 3;
    const minPage = (pagination.value - 1) * 3;
    if (index < maxPage && index >= minPage) {
      paginatedItems.push(item);
    }
  });

  return paginatedItems;
});

onMounted(() => {
  computeItemsOrder();
});

const { subscriptionItems } = storeToRefs(store);

const paginationLength = computed(() => {
  return Math.ceil(subscriptionItems.value.length / 3);
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

watch(
  () => currentFilterCategory.value,
  async (newCurrentFilterCategory) => {
    await store.filterSubscriptionItemsBasedOnDate(newCurrentFilterCategory);
  }
);

const handleUpdate = () => {
  localStorage.setItem("items-order", JSON.stringify(subscriptionItems.value));
};

const handleDragEnd = () => {
  localStorage.setItem("items-order", JSON.stringify(subscriptionItems.value));
};

const handleCardClick = () => {
  router.push(RoutesEnum.REMINDER);
};

const isCardVisible = (item: Subscription) => {
  return displayItemsPagination.value.includes(item);
};
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
    <v-container style="display: flex; align-items: baseline">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" append-icon="mdi-arrow-down">
            {{ currentFilterCategory }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in filterCategory"
            :key="index"
            :value="index"
            @click="onFilterCategoryClick(item)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
    <v-container>
      <template v-if="subscriptionItems.length > 0">
        <v-row no-gutters justify-cotent="center">
          <draggable
            v-model="subscriptionItems"
            item-key="id"
            :animation="150"
            handle=".drag-handle"
            fallback-class="draggable__dragged"
            ghost-class="draggable__ghost"
            :force-fallback="true"
            style="display: contents"
            @change="handleDragEnd"
          >
            <template #item="{ element: item }: { element: Subscription }">
              <v-col :key="item.id" cols="4" v-if="isCardVisible(item)">
                <v-card hover @click="handleCardClick">
                  <v-img
                    :src="itemsMapComputed.get(item.id) ?? undefined"
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
                    <div class="mr-2 font-weight-bold" style="font-size: 10px">
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
                      @click="($event: Event) => $event.stopPropagation()"
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
          v-if="paginationLength > 1"
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
