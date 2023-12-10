<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useId } from "radix-vue";
import axios from "axios";
import TodoList from "./TodoList.vue";

export interface Todo {
  id: string;
  subject: string;
  complated: boolean;
}

const todo = ref("");
const todos = ref<Todo[]>([]);
const searchText = ref("");

const filteredTodo = computed(() => {
  if (searchText.value) {
    return todos.value.filter((todo) => todo.subject.includes(searchText.value));
  }
  return todos.value;
});

const getTodos = async () => {
  try {
    const res = await axios<Todo[]>("http://localhost:3000/todos");
    todos.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async () => {
  if (todo.value === "") return;
  const generateId = useId(Date.now().toString());
  const data = {
    id: generateId,
    subject: todo.value,
    complated: false,
  };
  try {
    const res = await axios.post("http://localhost:3000/todos", data);
    todos.value.push(res.data);
  } catch (error) {
    console.log(error);
  }

  todo.value = "";
};

const handleClickTodo = (index: number) => {
  const id = todos.value[index].id;
  axios
    .patch(`http://localhost:3000/todos/${id}`, {
      complated: !todos.value[index].complated,
    })
    .then(() => {
      todos.value[index].complated = !todos.value[index].complated;
    });
};

const handleDelete = (index: number) => {
  const id = todos.value[index].id;
  axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
    todos.value.splice(index, 1);
  });
};

onMounted(() => {
  getTodos();
});
</script>

<template>
  <h2>vue3 composition API</h2>
  <v-text-field label="Search" variant="underlined" v-model="searchText"> </v-text-field>
  <form @submit.prevent="handleSubmit" class="form">
    <v-text-field label="new todo" variant="underlined" required v-model="todo"> </v-text-field>
    <v-btn variant="tonal" color="primary" type="submit">Add</v-btn>
  </form>
  <v-card v-if="!todos.length" text="this field cannot be empty" color="black"></v-card>
  <TodoList :todos="filteredTodo" @change="handleClickTodo" @delete="handleDelete" />
</template>

<style lang="css" scoped>
.form {
  display: flex;
}
</style>
