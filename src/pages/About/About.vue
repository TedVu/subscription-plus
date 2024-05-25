<template>
  <div class="about-us">
    <h1>About Us</h1>
    <div class="about-content">
      <p>Welcome to subscription application!</p>
      <p>
        We are on a mission to help you manage your subscriptions as easy as
        pie. Have you ever registered for an application and tried the free
        trial only to finally realize you have forgotten to cancel the
        subscription ? This app can help you solve the problem.
      </p>
      <iframe
        style="margin-top: 10%; margin-bottom: 10%"
        width="640"
        height="360"
        src="https://www.loom.com/embed/558527a5ae3047e8ac47193a44cb14ad?sid=0f6473dd-c21b-4724-a0e6-d5a674e025b9"
        frameborder="0"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
      ></iframe>
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
    position: "Software Enginner",
    image: "https://tedvublogimages.s3.us-west-1.amazonaws.com/profilepics.jpg",
  },
  // Add more team members as needed
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
