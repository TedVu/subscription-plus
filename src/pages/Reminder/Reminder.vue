<template>
  <VContainer>
    <VRow no-gutters>
      <VCol cols="12" sm="4">
        <div class="ma-4">
          <div class="text-subtitle-2">Cover</div>
          <VImg
            :aspect-ratio="1"
            class="bg-white"
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            width="300"
            cover
          ></VImg>
        </div>
      </VCol>
      <VCol cols="12" sm="8"> </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup></script>
