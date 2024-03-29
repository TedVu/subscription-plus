import { Subscription } from '../types';
import { useSubscriptionItemsStore } from '../store';
import {
  addFirebaseRecord,
  deleteFirebaseRecord,
  updateFirebaseRecord,
} from '../firebase';
const getSubscriptionItems = async () => {
  const store = useSubscriptionItemsStore();
  await store.getLatestData();
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

const updateSubscription = async (
  id: string,
  updatedSubscriptionItem: Subscription
) => {
  await updateFirebaseRecord(id, updatedSubscriptionItem);
  const store = useSubscriptionItemsStore();
  store.updateSubscription({
    ...updatedSubscriptionItem,
    date: new Date(updatedSubscriptionItem.date!).toLocaleDateString('en-AU'),
  });
};
export {
  getSubscriptionItems,
  addSubscriptionItem,
  removeSubscription,
  updateSubscription,
};
