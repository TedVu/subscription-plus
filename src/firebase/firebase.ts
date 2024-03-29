// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  Timestamp,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Subscription } from '../types/';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcalO2Ij8vqCh1rpi09PIzwikHWT2_QF8',
  authDomain: 'subscription-plus.firebaseapp.com',
  projectId: 'subscription-plus',
  storageBucket: 'subscription-plus.appspot.com',
  messagingSenderId: '953591136348',
  appId: '1:953591136348:web:8d5e5039904aaa63616699',
  measurementId: 'G-FSTQ57T420',
};

const addFirebaseRecord = async (record: Subscription) => {
  const db = getFirestore(app);
  await addDoc(collection(db, 'subscriptions'), record);
};

const updateFirebaseRecord = async (
  id: string,
  updatedRecord: Subscription
) => {
  const db = getFirestore(app);
  const colRef = collection(db, 'subscriptions');
  const docs = await getDocs(colRef);
  docs.forEach(async (doc) => {
    if (doc.id === id) {
      await updateDoc(doc.ref, updatedRecord);
    }
  });
};

const deleteFirebaseRecord = async (id: string) => {
  const db = getFirestore(app);
  const colRef = collection(db, 'subscriptions');
  const docs = await getDocs(colRef);
  docs.forEach(async (doc) => {
    if (doc.id === id) {
      await deleteDoc(doc.ref);
    }
  });
};

const uploadFirebaseStaticFile = async (file: File, fileName: string) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, `images/${fileName}`);
  await uploadBytes(storageRef, file);
};

const getSubscriptionItems = async () => {
  const db = getFirestore(app);
  const colRef = collection(db, 'subscriptions');

  const subscriptionItems = [] as Array<Subscription>;

  const docs = await getDocs(colRef);
  docs.forEach((doc) => {
    const date = new Timestamp(
      doc.data().date.seconds,
      doc.data().date.nanoseconds
    )
      .toDate()
      .toLocaleDateString('en-AU');

    const name = doc.data().name;
    const id = doc.id;
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {
  addFirebaseRecord,
  deleteFirebaseRecord,
  getSubscriptionImageUrl,
  getSubscriptionItems,
  updateFirebaseRecord,
  uploadFirebaseStaticFile,
};
