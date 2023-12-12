import { InjectionKey } from "vue";
import { Store, createStore } from "vuex";

import { toastModule } from "./modules/index";
import { Toasts } from "./modules/toast";

export interface State {
  toast: Toasts;
}
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore({
  modules: {
    toast: toastModule,
  },
});
