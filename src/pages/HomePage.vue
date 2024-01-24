<script setup lang="ts">
import { ref, onMounted } from 'vue';
const cards = ref([
  {
    title: 'Pre-fab homes',
    src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
  },
  {
    title: 'Favorite road trips',
    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
  },
  {
    title: 'Best airlines',
    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
  },
]);

onMounted(() => {});
</script>

<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="6">
        <v-card>
          <v-img
            :src="card.src"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
          >
            <v-card-title class="text-white" v-text="card.title"></v-card-title>
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
