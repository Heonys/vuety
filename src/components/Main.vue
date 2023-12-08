<script setup lang="ts">
import { ref } from "vue";
import { useId } from "radix-vue";

interface Todo {
  id: string;
  subject: string;
}

const todo = ref("");
const todos = ref<Todo[]>([]);

const handleClick = () => {
  if (todo.value === "") return;
  const generateId = useId();
  todos.value.push({
    id: generateId,
    subject: todo.value,
  });
  todo.value = "";
};
</script>

<template>
  <div class="container">
    <h2>vue3 composition API</h2>
    <form @submit.prevent="handleClick" class="form">
      <v-text-field label="new todo" variant="underlined" v-model="todo"></v-text-field>
      <v-btn variant="tonal" color="primary" type="submit">Add</v-btn>
    </form>

    <v-card class="mt-4" v-for="todo in todos" :key="todo.id">
      <v-card-text>{{ todo.subject }}</v-card-text>
    </v-card>
  </div>
</template>

<style lang="css" scoped>
.container {
  width: 100%;
  margin: auto;
}
.form {
  display: flex;
}
</style>
