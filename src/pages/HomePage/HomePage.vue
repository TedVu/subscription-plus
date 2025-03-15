<script setup lang="ts">
import { computedAsync } from "@vueuse/core";
import { getSubscriptionImageUrl } from "../../firebase";
import { ref, Ref, watch, computed, onMounted } from "vue";
import { removeSubscriptionItemAsync, useLoadingState } from "@composables";
import { storeToRefs } from "pinia";
import { UpdateDialog } from "@pages";
import { useSubscriptionItemsStore } from "@store";
import draggable from "vuedraggable";
import router, { RoutesEnum } from "@routes";
import type { Subscription } from "@types";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { onBeforeMount } from "vue";

const MAX_ITEM_IN_PAGE = 6;

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

const store = useSubscriptionItemsStore();

onBeforeMount(async () => {
  loading.value = true;
  await store.getLatestDataSourceAsync();
  loading.value = false;
});

const computeItemsOrder = () => {
  const localItemsOrder = localStorage.getItem("items-order");
  const localStorageItems = localItemsOrder
    ? (JSON.parse(localItemsOrder) as Subscription[])
    : [];
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
    const maxPage = pagination.value * MAX_ITEM_IN_PAGE;
    const minPage = (pagination.value - 1) * MAX_ITEM_IN_PAGE;
    if (index < maxPage && index >= minPage) {
      paginatedItems.push(item);
    }
  });

  return paginatedItems;
});

const { mdAndUp } = useDisplay();

onMounted(() => {
  computeItemsOrder();
});

const { subscriptionItems } = storeToRefs(store);

const paginationLength = computed(() => {
  return Math.ceil(subscriptionItems.value.length / MAX_ITEM_IN_PAGE);
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
  await removeSubscriptionItemAsync(id);
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
    await store.filterSubscriptionItemsByDateAsync(newCurrentFilterCategory);
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
    ><VProgressCircular color="primary" indeterminate></VProgressCircular
  ></template>
  <template v-else>
    <VTextField v-model="filterValue">
      <template v-slot:append-inner>
        <v-icon> mdi-magnify </v-icon>
      </template>
    </VTextField>
    <VContainer style="display: flex; align-items: baseline">
      <VMenu>
        <template v-slot:activator="{ props }">
          <VBtn color="primary" v-bind="props" append-icon="mdi-arrow-down">
            {{ currentFilterCategory }}
          </VBtn>
        </template>
        <VList>
          <VListItem
            v-for="(item, index) in filterCategory"
            :key="index"
            :value="index"
            @click="onFilterCategoryClick(item)"
          >
            <VListItem-title>{{ item.title }}</VListItem-title>
          </VListItem>
        </VList>
      </VMenu>
    </VContainer>
    <VContainer>
      <template v-if="subscriptionItems.length > 0">
        <VRow no-gutters justify-cotent="center">
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
              <VCol :key="item.id" cols="12" md="4" v-if="isCardVisible(item)">
                <VCard hover @click="handleCardClick" min-width="120">
                  <VImg
                    :src="itemsMapComputed.get(item.id) ?? undefined"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    cover
                  >
                    <VCardTitle
                      class="text-white"
                      v-text="item.name"
                    ></VCardTitle>
                  </VImg>

                  <VCardActions style="flex-wrap: wrap">
                    <div
                      v-if="mdAndUp"
                      class="mr-2 font-weight-bold"
                      style="font-size: 10px"
                    >
                      Subscription Date:
                    </div>
                    {{ item.date }}
                    <VSpacer v-if="mdAndUp" />
                    <VBtn
                      size="small"
                      variant="text"
                      icon="mdi-drag"
                      style="cursor: grab"
                      class="drag-handle"
                      @click="($event: Event) => $event.stopPropagation()"
                    ></VBtn>
                    <VDialog width="500" transition="dialog-top-transition">
                      <template #activator="{ props }">
                        <VBtn
                          v-bind="props"
                          size="small"
                          color="surface-variant"
                          variant="text"
                          icon="mdi-update"
                        ></VBtn>
                      </template>
                      <template #default="{ isActive }">
                        <update-dialog
                          @close="isActive.value = false"
                          @update="handleUpdate"
                          :id="item.id"
                        />
                      </template>
                    </VDialog>
                    <VDialog width="500">
                      <template #activator="{ props }">
                        <VBtn
                          v-bind="props"
                          size="small"
                          color="surface-variant"
                          variant="text"
                          icon="mdi-delete"
                        ></VBtn>
                      </template>
                      <template #default="{ isActive }">
                        <VCard title="Delete subscription?">
                          <template v-slot:actions>
                            <VSpacer></VSpacer>

                            <VBtn
                              @click="
                                handleSubscriptionItemDelete(item.id, isActive)
                              "
                              color="red"
                              variant="elevated"
                            >
                              Yes
                            </VBtn>

                            <VBtn
                              @click="isActive.value = false"
                              color="green"
                              variant="elevated"
                            >
                              No
                            </VBtn>
                          </template>
                        </VCard>
                      </template>
                    </VDialog>
                  </VCardActions>
                </VCard>
              </VCol>
            </template>
          </draggable>
        </VRow>
        <VPagination
          v-if="paginationLength > 1"
          variant="elevated"
          :length="paginationLength"
          v-model="pagination"
        ></VPagination>
      </template>
      <template v-else> No subscription items </template>
    </VContainer>
  </template>
  <VSnackbar v-model="snackbar" :color="snackbarColor">
    {{ snackbarMsg }}
  </VSnackbar>
</template>

<style lang="scss" scoped>
@import "./HomePage.module.scss";
</style>
