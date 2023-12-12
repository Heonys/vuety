<script setup lang="ts">
import { useRouter } from "vue-router";
import { Todo } from "../pages/todos/index.vue";
import Modal from "../components/ModalContainer.vue";

interface Props {
  todos: Todo[];
}

const { todos } = defineProps<Props>();
const emit = defineEmits(["change", "delete"]);
const router = useRouter();

const onClickTodo = (index: number) => {
  emit("change", index);
};
const onDeleteTodo = (index: number) => {
  emit("delete", index);
};

const handleTodoInfo = (id: string) => {
  router.push(`/todos/${id}`);
};
</script>

<template>
  <Modal :onDeleteTodo="onDeleteTodo">
    <template #body="{ openDialog }">
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
              <div class="btn-container">
                <v-btn
                  variant="elevated"
                  @click.stop="handleTodoInfo(todo.id)"
                  color="orange"
                  type="submit"
                >
                  info
                </v-btn>
                <v-btn variant="flat" @click.stop="openDialog(index)" color="primary" type="submit">
                  Delete
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </template>
  </Modal>
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
.btn-container button {
  margin-left: 0.5rem;
}
</style>
