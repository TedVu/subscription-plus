import { defineStore } from "pinia";
import { ref } from "vue";
import { Subscription } from "@types";
import { getSubscriptionItemsAsync } from "../firebase";
import { isDateInFuture } from "../utility";
export const useSubscriptionItemsStore = defineStore(
  "subscription-items",
  () => {
    const subscriptionItems = ref([] as Subscription[]);
    const serverSubscriptionItems = ref([] as Subscription[]);
    const getLatestDataSourceAsync = async () => {
      if (localStorage.getItem("items-order")) {
        subscriptionItems.value = JSON.parse(
          localStorage.getItem("items-order")!
        ) as Subscription[];
      } else {
        subscriptionItems.value = await getSubscriptionItemsAsync();
      }
      serverSubscriptionItems.value = subscriptionItems.value;
    };

    const removeSubscriptionItemAsync = (id: string) => {
      subscriptionItems.value = subscriptionItems.value.filter(
        (item) => item.id !== id
      );
    };

    const addSubscription = (subscriptionItem: Subscription) => {
      subscriptionItems.value.push(subscriptionItem);
    };

    const updateSubscriptionItemAsync = (subscriptionItem: Subscription) => {
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
        await getLatestDataSourceAsync();
      }
    };

    const getOverdueSubscriptionItemsAsync = async () => {
      return subscriptionItems.value.filter(
        (item) => new Date(item.date!) < new Date()
      );
    };

    const filterSubscriptionItemsByDateAsync = async (
      subscriptionItemCategory: string
    ) => {
      if (subscriptionItemCategory === "Show overdue") {
        await getLatestDataSourceAsync();
        subscriptionItems.value = subscriptionItems.value.filter(
          (item) => new Date(item.date!) < new Date()
        );
      } else if (subscriptionItemCategory === "Show future subscription") {
        await getLatestDataSourceAsync();
        subscriptionItems.value = subscriptionItems.value.filter((item) =>
          isDateInFuture(item.date!)
        );
      } else {
        await getLatestDataSourceAsync();
      }
    };

    return {
      subscriptionItems,
      addSubscription,
      getLatestDataSourceAsync,
      filterSubscriptionItems,
      filterSubscriptionItemsByDateAsync,
      getOverdueSubscriptionItemsAsync,
      removeSubscriptionItemAsync,
      updateElementOrder,
      updateSubscriptionItemAsync,
    };
  }
);
