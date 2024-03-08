import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Subscription } from '../types';
import { getSubscriptionItems } from '../firebase';
export const useSubscriptionItemsStore = defineStore(
  'subscription-items',
  () => {
    const subscriptionItems = ref([] as Subscription[]);
    const fetchLatestData = async () => {
      subscriptionItems.value = await getSubscriptionItems();
    };

    const removeSubscription = (subscriptionItem: Subscription) => {
      subscriptionItems.value = subscriptionItems.value.filter(
        (item) => item.id !== subscriptionItem.id
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

    return {
      subscriptionItems,
      fetchLatestData,
      addSubscription,
      removeSubscription,
      updateSubscription,
    };
  }
);
