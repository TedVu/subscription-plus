<template>
  <div class="about-us">
    <h1>About Us</h1>
    <div class="about-content">
      <p>Welcome to subscription application!</p>
      <p>
        We are on a mission to help you manage your subscriptions as easy as a
        pie. Have you ever registered for an application and tried the free
        trial only to finally realized you forgot to cancel the subscription ?
        This application can help you solve the problem.
      </p>
      <h2>Our Team</h2>
      <div class="team-members">
        <div v-for="member in team" :key="member.id" class="member">
          <img :src="member.image" :alt="member.name" />
          <h3>{{ member.name }}</h3>
          <p>{{ member.position }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const team = [
  {
    id: 1,
    name: "Ted Vu",
    position: "Software Architect",
    image:
      "https://storage.googleapis.com/subscription-plus.appspot.com/images/creator/6C9A5039.JPG",
  },
];
</script>

<style scoped>
.about-us {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.about-content {
  margin-top: 20px;
}

.team-members {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.member {
  width: 200px;
  margin: 10px;
}

.member img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
