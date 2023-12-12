<script setup lang="ts">
import { ref } from "vue";

const todo = ref("");
const emit = defineEmits(["submit"]);

const onSubmit = () => {
  emit("submit", todo.value);
  todo.value = "";
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="form">
    <v-text-field label="new todo" variant="underlined" v-model="todo" required />
    <!-- <input type="text" :value="props.todo" required @input="handleInput" /> -->
    <v-btn variant="tonal" color="primary" type="submit">Add</v-btn>
  </form>
</template>

<style lang="css" scoped></style>
