<template>
  <VBtn color="primary" @click="requestPermission">Request Permission</VBtn>
</template>

<script lang="ts" setup>
import { _getToken } from "../../firebase";
const requestPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      _getToken();
    } else {
    }
  });
};
</script>
