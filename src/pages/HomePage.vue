<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getSubscriptionImageUrl, getSubscriptionItems } from '../firebase';
import { Subscription } from '../types/subscription';
const items = ref<Subscription[]>([]);

const itemsMap = ref<Map<string, string | void>>();

onMounted(async () => {
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
      <v-col v-for="item in items" :key="item.id" cols="6">
        <v-card class="card">
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
            Subscription Date: {{ item.date }}
            <v-spacer />
            <v-dialog width="500">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  size="small"
                  color="surface-variant"
                  variant="text"
                  icon="mdi-update"
                ></v-btn>
              </template>
              <template #default="{ isActive }">
                <v-card title="Dialog">
                  <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      text="Close Dialog"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
@import './HomePage.module.scss';
</style>
