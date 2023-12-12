<script setup lang="ts"></script>

<template>
  <v-tabs color="deep-purple-accent-4" align-tabs="center">
    <router-link :to="{ name: 'Todos' }">
      <v-tab :value="1">Todos</v-tab>
    </router-link>
    <router-link :to="{ name: 'Home' }">
      <v-tab disabled :value="2">About</v-tab>
    </router-link>
  </v-tabs>
</template>

<style lang="scss" scoped></style>
