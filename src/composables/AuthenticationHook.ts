import { defineStore } from 'pinia';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref } from 'vue';

export const useAuthentication = defineStore(
  'auth',
  () => {
    const isAuthenticated = ref(false);
    const userRef = ref<User | undefined>(undefined);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`User object is ${JSON.stringify(user)}`);
        isAuthenticated.value = true;
        userRef.value = user;
      }
    });

    const logout = () => {
      auth.signOut();
      isAuthenticated.value = false;
      userRef.value = undefined;
    };

    return {
      isAuthenticated,
      logout,
      userRef,
    };
  },
  { persist: true }
);
