<script setup lang="ts">
import { useToast } from "../hooks/toast";

const { toasts } = useToast();
</script>

<template>
  <v-container class="toast">
    <transition-group name="fade">
      <v-alert
        v-for="toast in toasts"
        :key="toast.id"
        class="alert"
        variant="elevated"
        density="compact"
        elevation="2"
        prominent
        type="info"
        :text="toast.message"
      />
    </transition-group>
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
  transform: translateY(30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.toast {
  position: absolute;
  width: 50%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.alert {
  padding: 0.5rem;
  margin: 1rem;
}
</style>
