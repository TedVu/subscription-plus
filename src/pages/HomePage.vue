<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getSubscriptionImageUrl, getSubscriptionItems } from '../firebase';
import { Subscription } from '../types/subscription';
const items = ref<Subscription[]>([]);

const itemsMap = ref<Map<string, string | void>>();

onMounted(async () => {
  // fetch from firebase

  items.value = await getSubscriptionItems();

  itemsMap.value = new Map<string, string | void>();

  items.value.forEach(async (item: Subscription) => {
    const imageUrl = await getSubscriptionImageUrl(item.imgName);
    itemsMap.value?.set(item.id, imageUrl);
  });
});
</script>

<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in items" :key="item.id" :cols="6">
        <v-card>
          <v-img
            :src="itemsMap?.get(item.id)!"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
          >
            <v-card-title class="text-white" v-text="item.name"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-bookmark"
            ></v-btn>

            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-share-variant"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
