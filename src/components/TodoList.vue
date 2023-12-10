<script setup lang="ts">
import { Todo } from "./Main.vue";

interface Props {
  todos: Todo[];
}

const { todos } = defineProps<Props>();
const emit = defineEmits(["change", "delete"]);

const onClickTodo = (index: number) => {
  emit("change", index);
};
const onDeleteTodo = (index: number) => {
  emit("delete", index);
};
</script>

<template>
  <v-container>
    <v-card
      class="mt-4"
      v-for="(todo, index) in todos"
      :key="todo.id"
      @click="onClickTodo(index)"
      :color="todo.complated ? 'green' : 'white'"
    >
      <v-card-text class="card-text" :class="{ todo: todo.complated }">
        <div class="card-container">
          <span>{{ todo.subject }}</span>
          <v-btn variant="flat" @click.stop="onDeleteTodo(index)" color="primary" type="submit"
            >Delete</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style lang="css" scoped>
.card-text {
  color: black;
  font-size: 1.2rem;
}

.todo {
  text-decoration: line-through;
  color: white;
}
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
