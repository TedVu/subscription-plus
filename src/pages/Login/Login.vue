<script setup lang="ts">
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../../firebase";

var ui = new firebaseui.auth.AuthUI(auth);
var uiConfig = {
  signInSuccessUrl: "/home",
  signInOptions: [
    {
      provider: "google.com",
      providerName: "Google",
      // To override the full label of the button.
      // fullLabel: 'Login with Google',
      buttonColor: "primary",
    },
  ],
  signInFlow: "popup",
  callbacks: {
    uiShown: function () {
      document.getElementById("loader")!.style.display = "none";
    },
  },
  // Terms of service url.
  tosUrl: "https://policies.google.com/terms",
  // Privacy policy url.
  privacyPolicyUrl: "https://policies.google.com/privacy",
};
ui.start("#firebaseui-auth-container", uiConfig);
</script>

<template>
  <div class="text-h6 mb-12">Welcome to Subscription Plus Application</div>
  <div id="firebaseui-auth-container"></div>
  <div id="loader">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
</template>
