import { defineStore } from 'pinia';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';

export const useAuthentication = defineStore(
  'auth',
  () => {
    const isAuthenticated = ref(false);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`User object is ${JSON.stringify(user)}`);
        isAuthenticated.value = true;
      }
    });

    const logout = () => {
      auth.signOut();
      isAuthenticated.value = false;
    };

    return {
      isAuthenticated,
      logout,
    };
  },
  { persist: true }
);
