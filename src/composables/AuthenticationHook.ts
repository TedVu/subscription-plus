import { defineStore } from "pinia";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref } from "vue";

export const useAuthentication = defineStore(
  "authentication",
  () => {
    const isAuthenticated = ref(false);
    const userRef = ref<User>();
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
