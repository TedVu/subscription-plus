<script setup lang="ts">
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { RoutesEnum } from "@routes";

var ui = new firebaseui.auth.AuthUI(auth);
var uiConfig = {
  signInSuccessUrl: RoutesEnum.HOME,
  signInOptions: [
    {
      provider: "google.com",
      providerName: "Google",
      buttonColor: "primary",
    },
  ],
  signInFlow: "popup",
  callbacks: {
    uiShown: function () {
      document.getElementById("loader")!.style.display = "none";
    },
  },
  tosUrl: "https://policies.google.com/terms",
  privacyPolicyUrl: "https://policies.google.com/privacy",
};
ui.start("#firebaseui-auth-container", uiConfig);

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "https://localhost:8008/profile",
  // This must be true.
  handleCodeInApp: true,
};
const handleSignInWithEmail = () => {
  sendSignInLinkToEmail(auth, "tedvu184@gmail.com", actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem("emailForSignIn", "tedvu184@gmail.com");
      // ...
    })
    .catch((error) => {
      alert("Error " + error);
      // ...
    });
};
</script>

<template>
  <div class="text-h6 mb-12">Welcome to Subscription Plus Application</div>
  <VBtn color="primary" width="220" @click="handleSignInWithEmail"
    >Sign in with email</VBtn
  >
  <div id="firebaseui-auth-container"></div>
  <div id="loader">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
</template>
