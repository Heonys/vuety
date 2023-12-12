import { computed } from "vue";
import { useStore } from "vuex";
import { key } from "../store";
import { Message } from "../store/modules/toast";

export const useToast = () => {
  const store = useStore(key);

  const toasts = computed(() => store.state.toast.toasts);

  const trigerToast = (message: string, type: Message = "success") => {
    store.dispatch("toast/trigerToast", { message, type });
  };

  return { toasts, trigerToast };
};
