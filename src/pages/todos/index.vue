<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useId } from "radix-vue";
// import axios from "axios";
import customAxios from "../../service/customAxios";

import TodoList from "../../components/TodoList.vue";
import TodoForm from "../../components/TodoForm.vue";

export interface Todo {
  id: string;
  subject: string;
  complated: boolean;
}

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

const getTodos = async (page: number) => {
  try {
    const res = await customAxios<Todo[]>(
      `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
    );
    totalTodos.value = res.headers["x-total-count"];
    todos.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async (todo: string) => {
  if (todo === "") return;
  const generateId = useId(Date.now().toString());
  const data = {
    id: generateId,
    subject: todo,
    complated: false,
  };
  try {
    await customAxios.post("todos", data);
    getTodos(1);
  } catch (error) {
    console.log(error);
  }
};

const handleClickTodo = (index: number) => {
  const id = todos.value[index].id;
  customAxios
    .patch(`todos/${id}`, {
      complated: !todos.value[index].complated,
    })
    .then(() => {
      todos.value[index].complated = !todos.value[index].complated;
    });
};

const handleDelete = (index: number) => {
  const id = todos.value[index].id;
  customAxios.delete(`todos/${id}`).then(() => {
    todos.value.splice(index, 1);
    getTodos(1);
  });
};

const handleKeyupEnter = () => {
  window.clearTimeout(timeoutId);
  getTodos(1);
};

onMounted(() => {
  getTodos(1);
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

  <TodoForm @submit="handleSubmit" />
  <TodoList :todos="todos" @change="handleClickTodo" @delete="handleDelete" />
  <v-pagination
    :length="numberOfPages"
    v-model="currentPage"
    @click="getTodos(currentPage)"
  ></v-pagination>
</template>

<style lang="css" scoped>
.form {
  display: flex;
}
</style>
../../service/customAxios
