<script setup lang="ts"></script>

<template>
  <div class="icons-layout">
    <v-card class="mx-auto icons-item" max-width="400">
      <v-img
        class="align-end text-white"
        height="200"
        src="https://tedvublogimages.s3.us-west-1.amazonaws.com/profilepics.jpg"
        cover
      >
        <v-card-title>Top 10 Australian beaches</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4"> Number 10 </v-card-subtitle>

      <v-card-text>
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange"> Share </v-btn>

        <v-btn color="orange"> Explore </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto icons-item" max-width="400">
      <v-img
        class="align-end text-white"
        height="200"
        src="https://tedvublogimages.s3.us-west-1.amazonaws.com/profilepics.jpg"
        cover
      >
        <v-card-title>Top 10 Australian beaches</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4"> Number 10 </v-card-subtitle>

      <v-card-text>
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange"> Share </v-btn>

        <v-btn color="orange"> Explore </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style>
.icons-layout {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 150px);
  justify-content: space-around;
  vertical-align: middle;

  .icons-item {
    display: flex;
    padding-top: 20px;
    align-items: center;
    flex-direction: column;
    height: 330px;
  }
}
</style>
