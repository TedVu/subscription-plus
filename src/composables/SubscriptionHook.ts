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

const removeSubscription = async (id: string) => {
  const store = useSubscriptionItemsStore();
  store.removeSubscription(id);
  await deleteFirebaseRecord(id);
};
export { getSubscriptionItems, addSubscriptionItem, removeSubscription };
