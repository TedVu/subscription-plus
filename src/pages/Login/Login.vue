<script setup lang="ts">
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../../firebase';

var ui = new firebaseui.auth.AuthUI(auth);
var uiConfig = {
  signInSuccessUrl: '/home',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInFlow: 'popup',
  callbacks: {
    uiShown: function () {
      document.getElementById('loader')!.style.display = 'none';
    },
  },
};
ui.start('#firebaseui-auth-container', uiConfig);
</script>

<template>
  <div class="text-h6 mb-12">Welcome to Subscription Plus Application</div>
  <div id="firebaseui-auth-container"></div>
  <div id="loader">
    <v-progress-circular color="primary" indeterminate></v-progress-circular>
  </div>
</template>
