<template>
  <input v-model="message" @change="test" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const message = ref("");

    const test = () => {
      console.log("change");
    };

    return {
      test,
      message,
    };
  },
});
</script>

<style scoped></style>
