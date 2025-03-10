import { Subscription } from "../types";
import { useSubscriptionItemsStore } from "@store";
import {
  addFirebaseRecord,
  deleteFirebaseRecord,
  updateFirebaseRecord,
} from "../firebase";

const getSubscriptionItemsAsync = async () => {
  const store = useSubscriptionItemsStore();
  await store.getLatestDataSourceAsync();
  return store.subscriptionItems;
};

const addSubscriptionItemAsync = async (
  subscriptionItem: Subscription,
  userId: string
) => {
  const store = useSubscriptionItemsStore();
  store.addSubscription(subscriptionItem);
  localStorage.setItem("items-order", JSON.stringify(store.subscriptionItems));
  await addFirebaseRecord(subscriptionItem, userId);
};

const removeSubscriptionItemAsync = async (id: string) => {
  const store = useSubscriptionItemsStore();
  store.removeSubscriptionItemAsync(id);
  await deleteFirebaseRecord(id);
};

const updateSubscriptionItemAsync = async (
  id: string,
  updatedSubscriptionItem: Subscription,
  isDeleteOldImage: boolean
) => {
  await updateFirebaseRecord(id, updatedSubscriptionItem, isDeleteOldImage);
  const store = useSubscriptionItemsStore();
  store.updateSubscriptionItemAsync({
    ...updatedSubscriptionItem,
    date: new Date(updatedSubscriptionItem.date!).toLocaleDateString("en-AU"),
  });
};
export {
  getSubscriptionItemsAsync,
  addSubscriptionItemAsync,
  removeSubscriptionItemAsync,
  updateSubscriptionItemAsync,
};
