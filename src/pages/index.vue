<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useId } from "radix-vue";
import axios from "axios";
import TodoList from "../components/TodoList.vue";

export interface Todo {
  id: string;
  subject: string;
  complated: boolean;
}

const todo = ref("");
const todos = ref<Todo[]>([]);
const searchText = ref("");
const totalTodos = ref(0);
const currentPage = ref(1);
const limit = 5;
let timeoutId: number;

const numberOfPages = computed(() => {
  return Math.ceil(totalTodos.value / limit);
});

watch(searchText, () => {
  window.clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    currentPage.value = 1;
    getTodos(1);
  }, 1000);
});

const getTodos = async (page: number = currentPage.value) => {
  try {
    const res = await axios<Todo[]>(
      `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
    );
    totalTodos.value = res.headers["x-total-count"];
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
    await axios.post("http://localhost:3000/todos", data);
    getTodos(1);
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
    getTodos(1);
  });
};

const handleKeyupEnter = () => {
  window.clearTimeout(timeoutId);
  getTodos(1);
};

onMounted(() => {
  getTodos();
});
</script>

<template>
  <v-text-field
    label="Search"
    variant="underlined"
    v-model="searchText"
    @keyup.enter="handleKeyupEnter"
  >
  </v-text-field>
  <form @submit.prevent="handleSubmit" class="form">
    <v-text-field label="new todo" variant="underlined" required v-model="todo"> </v-text-field>
    <v-btn variant="tonal" color="primary" type="submit">Add</v-btn>
  </form>
  <!-- <v-card v-if="!todos.length" text="this field cannot be empty" color="black"></v-card> -->
  <TodoList :todos="todos" @change="handleClickTodo" @delete="handleDelete" />
  <v-pagination :length="numberOfPages" v-model="currentPage" @click="getTodos"></v-pagination>
</template>

<style lang="css" scoped>
.form {
  display: flex;
}
</style>
