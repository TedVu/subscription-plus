import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  getDownloadURL,
  deleteObject,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Subscription } from "../types/";
import { useAuthentication } from "../composables";

// TO DO: Secure this in production, this should be pulled from the hosting server
const firebaseConfig = {
  apiKey: "AIzaSyBcalO2Ij8vqCh1rpi09PIzwikHWT2_QF8",
  authDomain: "subscription-plus.firebaseapp.com",
  projectId: "subscription-plus",
  storageBucket: "subscription-plus.appspot.com",
  messagingSenderId: "953591136348",
  appId: "1:953591136348:web:8d5e5039904aaa63616699",
  measurementId: "G-FSTQ57T420",
};

const addFirebaseRecord = async (record: Subscription, userId: string) => {
  const db = getFirestore(app);
  await addDoc(collection(db, userId), record);
};

const updateFirebaseRecord = async (
  id: string,
  updatedRecord: Subscription,
  isDeleteOldImage: boolean
) => {
  const { userRef } = useAuthentication();

  const db = getFirestore(app);
  const colRef = collection(db, userRef!.uid);
  const docs = await getDocs(colRef);
  docs.forEach(async (doc) => {
    if (doc.data().id === id) {
      if (isDeleteOldImage) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${doc.data().imgName}`);
        await deleteObject(storageRef);
      }
      await updateDoc(doc.ref, updatedRecord);
    }
  });
};

const deleteFirebaseRecord = async (id: string) => {
  const { userRef } = useAuthentication();
  const db = getFirestore(app);
  const colRef = collection(db, userRef!.uid);
  const docs = await getDocs(colRef);
  docs.forEach(async (doc) => {
    if (doc.data().id === id) {
      await deleteDoc(doc.ref);
      const storage = getStorage(app);
      const storageRef = ref(storage, `images/${doc.data().imgName}`);
      await deleteObject(storageRef);
    }
  });
};

const uploadFirebaseStaticFile = async (file: File, fileName: string) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, `images/${fileName}`);
  await uploadBytes(storageRef, file);
};

const getSubscriptionItemsAsync = async () => {
  const { userRef } = useAuthentication();
  const db = getFirestore(app);
  const colRef = collection(db, userRef!.uid);

  const subscriptionItems = [] as Array<Subscription>;

  const docs = await getDocs(colRef);
  docs.forEach((doc) => {
    const date = doc.data().date;
    const name = doc.data().name;
    const id = doc.data().id;
    const imgName = doc.data().imgName;

    subscriptionItems.push({
      name,
      id,
      date,
      imgName,
    });
  });

  return subscriptionItems;
};

const getSubscriptionImageUrl = async (
  storageLocation: string | undefined
): Promise<string | void> => {
  const storage = getStorage(app);
  const storageRef = ref(storage, storageLocation);

  try {
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (err) {
    // handle error
  }
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const messaging = getMessaging(app);

const VAPID_KEY =
  "BIQRMBhhAitZDfsNxRRkhPYy-NhR4SyZ1jMLy6VeLZgfS6uj4ZH1rd_h8mwqTUard-yh96WNwroP79e09mYnsSw";

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
});
const _getToken = () => {
  getToken(messaging, { vapidKey: VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log(`Current token: ${JSON.stringify(currentToken)}`);
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};

export {
  addFirebaseRecord,
  deleteFirebaseRecord,
  getSubscriptionImageUrl,
  getSubscriptionItemsAsync,
  _getToken,
  updateFirebaseRecord,
  uploadFirebaseStaticFile,
  auth,
};
