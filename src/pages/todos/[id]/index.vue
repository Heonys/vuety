<script setup lang="ts">
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { Todo } from "../../index.vue";
import _ from "lodash";

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const originTodo = ref<Todo>();
const todo = ref<Todo>();
const todoId = route.params.id;

const getTodo = async () => {
  const res = await axios<Todo>(`http://localhost:3000/todos/${todoId}`);
  todo.value = { ...res.data };
  originTodo.value = { ...res.data };
  loading.value = false;
};

const handleToggleStatus = () => {
  if (!todo.value) return;
  todo.value.complated = !todo.value.complated;
};

const handleClickGoback = () => {
  router.push({ name: "Home" });
};

const handleSubmit = () => {
  if (!todo.value) return;
  axios
    .put(`http://localhost:3000/todos/${todoId}`, {
      subject: todo.value.subject,
      complated: todo.value.complated,
    })
    .then((res) => (originTodo.value = { ...res.data }));
};

const compareTodo = computed(() => {
  return _.isEqual(todo.value, originTodo.value);
});

onMounted(() => {
  getTodo();
});
</script>

<template>
  <v-container>
    <div v-if="loading">loading...</div>
    <v-form v-else fast-fail @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="10" md="6">
          <v-text-field v-model="todo!.subject" label="subject"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn
            size="large"
            :color="todo!.complated ? 'green' : 'red'"
            @click="handleToggleStatus"
          >
            {{ todo!.complated ? "Complated" : "Incomplate" }}
          </v-btn>
        </v-col>
      </v-row>
      <v-btn type="submit" :disabled="compareTodo" color="primary" class="mr-2">Save</v-btn>
      <v-btn class="mx-2" @click="handleClickGoback">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<style lang="scss" scoped></style>
