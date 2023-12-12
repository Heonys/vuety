<script setup lang="ts">
import customAxios from "../../../service/customAxios";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { Todo } from "../index.vue";
import _ from "lodash";
import { useToast } from "../../../hooks/toast";

const { trigerToast } = useToast();
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const originTodo = ref<Todo>();
const todo = ref<Todo>();
const todoId = route.params.id;

const getTodo = async () => {
  try {
    const res = await customAxios<Todo>(`todos/${todoId}`);
    todo.value = { ...res.data };
    originTodo.value = { ...res.data };
    loading.value = false;
  } catch (error) {
    trigerToast("Something went wrong", "error");
  }
};

const handleToggleStatus = () => {
  if (!todo.value) return;
  todo.value.complated = !todo.value.complated;
};

const handleClickGoback = () => {
  router.push({ name: "Todos" });
};

const handleSubmit = () => {
  if (!todo.value) return;
  customAxios
    .put(`todos/${todoId}`, {
      subject: todo.value.subject,
      complated: todo.value.complated,
    })
    .then((res) => {
      originTodo.value = { ...res.data };
      trigerToast("Successfully saved", "success");
    })
    .catch(() => {
      trigerToast("something went wrong", "error");
    });
};

const compareTodo = computed(() => {
  return _.isEqual(todo.value, originTodo.value);
});

onMounted(() => {
  getTodo();
});
</script>

<template>
  <v-container class="container">
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

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.toast {
  position: absolute;
  width: 50%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
../../../service/customAxios
