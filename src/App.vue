<script setup lang="ts">
import Toast from "./components/Toast.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <router-view />
  <Toast />
</template>

<style scoped></style>
