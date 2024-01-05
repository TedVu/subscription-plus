// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

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

const addFirebaseRecord = async (record: any) => {
  const db = getFirestore(app);
  await addDoc(collection(db, 'subscriptions'), record);
};

const uploadFirebaseStaticFile = async (file: File, fileName: string) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, `images/${fileName}`);
  uploadBytes(storageRef, file);
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { addFirebaseRecord, uploadFirebaseStaticFile };
