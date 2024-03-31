import { defineStore } from 'pinia';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';

export const useAuthentication = defineStore('auth', () => {
  const isAuthenticated = ref(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true;
    }
  });

  return {
    isAuthenticated,
  };
});
