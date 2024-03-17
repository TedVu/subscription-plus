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

    const orderElementDragOver = (
      oldElementId: string,
      shiftedElementId: string
    ) => {
      const oldElement = subscriptionItems.value.find(
        (item) => item.id === oldElementId
      );
      const oldElementIndex = subscriptionItems.value.findIndex(
        (item) => item.id === oldElementId
      );

      const oldShiftedElementIndex = subscriptionItems.value.findIndex(
        (item) => item.id === shiftedElementId
      );
      subscriptionItems.value.splice(oldElementIndex, 1);

      const shiftedElementIndex = subscriptionItems.value.findIndex(
        (item) => item.id === shiftedElementId
      );
      // console.log(`Debug ${JSON.stringify(subscriptionItems.value)}`);
      // console.log(`New element index: ${newElementIndex}`);
      // console.log(`New element index: ${newElementIndex}`);

      subscriptionItems.value.splice(
        oldShiftedElementIndex > oldElementIndex
          ? shiftedElementIndex + 1
          : shiftedElementIndex,
        0,
        oldElement!
      );

      console.log(`Debug ${JSON.stringify(subscriptionItems.value)}`);
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
      orderElementDragOver,
      filterSubscriptionItems,
      subscriptionItems,
      fetchLatestData,
      addSubscription,
      removeSubscription,
      updateSubscription,
    };
  }
);
