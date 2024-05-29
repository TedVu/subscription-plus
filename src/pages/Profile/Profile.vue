<script setup lang="ts">
import { useAuthentication } from "@composables";

const { userRef } = useAuthentication();
</script>

<template>
  <div class="text-h5">
    Welcome to Subscription Plus Application, {{ userRef?.displayName }}!
  </div>
</template>
