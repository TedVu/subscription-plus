<script setup lang="ts">
import { useAuthentication } from "@composables";
import { useSubscriptionItemsStore } from "@store";

const { userRef } = useAuthentication();

const { subscriptionItems } = useSubscriptionItemsStore();
</script>

<template>
  <div class="text-h5">
    Welcome to Subscription Plus Application, {{ userRef?.displayName }}!
  </div>
  <v-card class="mx-auto mt-8" max-width="434" rounded="0">
    <v-avatar color="grey" rounded="0" size="150">
      <v-img :src="userRef?.photoURL ?? ''" cover></v-img>
    </v-avatar>

    <div>Number of subscription: {{ subscriptionItems.length }}</div>
  </v-card>
</template>
