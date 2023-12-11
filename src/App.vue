<script setup lang="ts"></script>

<template>
  <v-tabs color="deep-purple-accent-4" align-tabs="center">
    <router-link :to="{ name: 'Home' }">
      <v-tab :value="1">Home</v-tab>
    </router-link>
    <router-link to="/todos">
      <v-tab :value="2">Create</v-tab>
    </router-link>
    <v-tab :value="3">Abstract</v-tab>
  </v-tabs>
  <router-view />
</template>

<style scoped></style>
