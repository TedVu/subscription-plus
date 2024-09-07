<script setup lang="ts">
import { useAuthentication } from "@composables";
import { useSubscriptionItemsStore } from "@store";

const { userRef } = useAuthentication();

const { subscriptionItems, getOverdueSubscriptionItems } =
  useSubscriptionItemsStore();

const overSubscriptions = await getOverdueSubscriptionItems();
</script>

<template>
  <div class="text-h5">
    Welcome to Subscription Plus Application, {{ userRef?.displayName }}!
  </div>
  <v-card class="mx-auto mt-8 pa-8" max-width="600" rounded="true">
    <v-avatar class="mb-3" color="grey" rounded="0" size="200">
      <v-img :src="userRef?.photoURL ?? ''" cover></v-img>
    </v-avatar>

    <div class="text-h6">
      Number of subscriptions: {{ subscriptionItems.length }}
    </div>
    <div class="text-h6">
      Overdued subscriptions: {{ overSubscriptions.length }}
    </div>
  </v-card>
</template>
