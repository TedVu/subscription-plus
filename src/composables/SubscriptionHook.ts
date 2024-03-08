import { Subscription } from '../types';
import { useSubscriptionItemsStore } from '../store';
import { addFirebaseRecord, deleteFirebaseRecord } from '../firebase';
const getSubscriptionItems = async () => {
  const store = useSubscriptionItemsStore();
  await store.fetchLatestData();
  return store.subscriptionItems;
};

const addSubscriptionItem = async (subscriptionItem: Subscription) => {
  const store = useSubscriptionItemsStore();
  store.addSubscription(subscriptionItem);
  await addFirebaseRecord(subscriptionItem);
};

const removeSubscription = async (subscriptionItem: Subscription) => {
  const store = useSubscriptionItemsStore();
  store.removeSubscription(subscriptionItem);
  await deleteFirebaseRecord(subscriptionItem.id);
};
export { getSubscriptionItems, addSubscriptionItem, removeSubscription };
