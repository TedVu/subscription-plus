import { defineStore } from "pinia";
import { ref } from "vue";
import { Subscription } from "@types";
import { getSubscriptionItems } from "../firebase";
export const useSubscriptionItemsStore = defineStore(
  "subscription-items",
  () => {
    const subscriptionItems = ref([] as Subscription[]);
    const serverSubscriptionItems = ref([] as Subscription[]);
    const refreshDataSource = async () => {
      if (localStorage.getItem("items-order")) {
        subscriptionItems.value = JSON.parse(
          localStorage.getItem("items-order")!
        ) as Subscription[];
      } else {
        subscriptionItems.value = await getSubscriptionItems();
      }
      serverSubscriptionItems.value = subscriptionItems.value;
    };

    const removeSubscription = (id: string) => {
      subscriptionItems.value = subscriptionItems.value.filter(
        (item) => item.id !== id
      );
    };

    const addSubscription = (subscriptionItem: Subscription) => {
      subscriptionItems.value.push(subscriptionItem);
    };

    const updateSubscription = (subscriptionItem: Subscription) => {
      let newSubscriptionItems: Subscription[] = [];
      subscriptionItems.value.forEach((item) => {
        if (item.id === subscriptionItem.id) {
          newSubscriptionItems.push(subscriptionItem);
        } else {
          newSubscriptionItems.push(item);
        }
      });
      subscriptionItems.value = newSubscriptionItems;
    };

    const updateElementOrder = (newSubscriptionItems: Subscription[]) => {
      subscriptionItems.value = newSubscriptionItems;
    };

    const filterSubscriptionItems = async (
      subscriptionItemSearchKeyword: string
    ) => {
      if (subscriptionItemSearchKeyword) {
        subscriptionItems.value = serverSubscriptionItems.value.filter((item) =>
          item.name
            .toUpperCase()
            .includes(subscriptionItemSearchKeyword.toUpperCase())
        );
      } else {
        await refreshDataSource();
      }
    };

    const getOverdueSubscriptionItems = async () => {
      return subscriptionItems.value.filter(
        (item) => new Date(item.date!) < new Date()
      );
    };

    const filterSubscriptionItemsBasedOnDate = async (
      subscriptionItemCategory: string
    ) => {
      if (subscriptionItemCategory === "Show overdue") {
        await refreshDataSource();
        subscriptionItems.value = subscriptionItems.value.filter(
          (item) => new Date(item.date!) < new Date()
        );
      } else if (subscriptionItemCategory === "Show future subscription") {
        await refreshDataSource();
        subscriptionItems.value = subscriptionItems.value.filter(
          (item) => new Date(item.date!) >= new Date()
        );
      } else {
        await refreshDataSource();
      }
    };

    return {
      subscriptionItems,
      addSubscription,
      refreshDataSource,
      filterSubscriptionItems,
      filterSubscriptionItemsBasedOnDate,
      getOverdueSubscriptionItems,
      removeSubscription,
      updateElementOrder,
      updateSubscription,
    };
  }
);
