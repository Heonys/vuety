<script setup lang="ts">
import { ref } from "vue";

type Props = {
  onDeleteTodo: (...args: any) => any;
};

const props = defineProps<Props>();

const isActive = ref(false);
const deleteTodoIndex = ref(0);

const openDialog = (index: number) => {
  deleteTodoIndex.value = index;
  isActive.value = true;
};

const closeDialog = () => {
  isActive.value = false;
};

const handleDelete = () => {
  closeDialog();
  props.onDeleteTodo(deleteTodoIndex.value);
};
</script>

<template>
  <div>
    <slot name="body" :openDialog="openDialog" :closeDialog="closeDialog"></slot>
    <v-dialog v-model="isActive" width="500">
      <template #default="{ isActive }">
        <v-card title="Delete todo">
          <v-card-text> Are you sure you want to delete the todo </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="닫기" variant="elevated" color="primary" @click="closeDialog"></v-btn>
            <v-btn text="삭제" variant="elevated" color="red" @click="handleDelete"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<style lang="css" scoped></style>
