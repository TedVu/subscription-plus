import { Subscription } from "../types";
import { useSubscriptionItemsStore } from "@store";
import {
  addFirebaseRecord,
  deleteFirebaseRecord,
  updateFirebaseRecord,
} from "../firebase";

const getSubscriptionItems = async () => {
  const store = useSubscriptionItemsStore();
  await store.refreshDataSource();
  return store.subscriptionItems;
};

const addSubscriptionItem = async (
  subscriptionItem: Subscription,
  userId: string
) => {
  const store = useSubscriptionItemsStore();
  store.addSubscription(subscriptionItem);
  localStorage.setItem("items-order", JSON.stringify(store.subscriptionItems));
  await addFirebaseRecord(subscriptionItem, userId);
};

const removeSubscription = async (id: string) => {
  const store = useSubscriptionItemsStore();
  store.removeSubscription(id);
  await deleteFirebaseRecord(id);
};

const updateSubscription = async (
  id: string,
  updatedSubscriptionItem: Subscription,
  isDeleteOldImage: boolean
) => {
  await updateFirebaseRecord(id, updatedSubscriptionItem, isDeleteOldImage);
  const store = useSubscriptionItemsStore();
  store.updateSubscription({
    ...updatedSubscriptionItem,
    date: new Date(updatedSubscriptionItem.date!).toLocaleDateString("en-AU"),
  });
};
export {
  getSubscriptionItems,
  addSubscriptionItem,
  removeSubscription,
  updateSubscription,
};
