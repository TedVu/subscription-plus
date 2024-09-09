<script setup lang="ts">
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../../firebase";
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
</script>

<template>
  <div class="text-h6 mb-12">Welcome to Subscription Plus Application</div>
  <v-btn color="primary" width="220">Sign in with email</v-btn>
  <div id="firebaseui-auth-container"></div>
  <div id="loader">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
</template>
