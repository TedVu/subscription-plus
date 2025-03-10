<script setup lang="ts">
import { useAuthentication } from "@composables";
import { useSubscriptionItemsStore } from "@store";

const { userRef } = useAuthentication();

const { subscriptionItems, getOverdueSubscriptionItemsAsync } =
  useSubscriptionItemsStore();

const overdueSubscriptionItems = await getOverdueSubscriptionItemsAsync();
</script>

<template>
  <div class="text-h5">
    Welcome to Subscription Plus Application, {{ userRef?.displayName }}!
  </div>
  <VCard class="mx-auto mt-8 pa-8" max-width="600" rounded="true">
    <v-avatar class="mb-3" color="grey" rounded="0" size="200">
      <VImg :src="userRef?.photoURL ?? ''" cover></VImg>
    </v-avatar>

    <div class="text-h6">
      Number of subscriptions: {{ subscriptionItems.length }}
    </div>
    <div class="text-h6">
      Overdued subscriptions: {{ overdueSubscriptionItems.length }}
    </div>
  </VCard>
</template>
