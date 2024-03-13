import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Subscription } from '../types';
import { getSubscriptionItems } from '../firebase';
export const useSubscriptionItemsStore = defineStore(
  'subscription-items',
  () => {
    const subscriptionItems = ref([] as Subscription[]);
    const serverSubscriptionItems = ref([] as Subscription[]);
    const fetchLatestData = async () => {
      subscriptionItems.value = await getSubscriptionItems();
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

    const filterSubscriptionItems = async (subscriptionItemName: string) => {
      if (subscriptionItemName) {
        subscriptionItems.value = serverSubscriptionItems.value.filter((item) =>
          item.name.toUpperCase().includes(subscriptionItemName.toUpperCase())
        );
      } else {
        await fetchLatestData();
      }
    };

    return {
      filterSubscriptionItems,
      subscriptionItems,
      fetchLatestData,
      addSubscription,
      removeSubscription,
      updateSubscription,
    };
  }
);
