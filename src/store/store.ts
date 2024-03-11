import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Subscription } from '../types';
import { getSubscriptionItems, getSubscriptionImageUrl } from '../firebase';
export const useSubscriptionItemsStore = defineStore(
  'subscription-items',
  () => {
    const subscriptionItems = ref([] as Subscription[]);
    const fetchLatestData = async () => {
      subscriptionItems.value = await getSubscriptionItems();
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
      alert('Update subscription');
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
