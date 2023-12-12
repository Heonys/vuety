import { Module } from "vuex";
import { State } from "../../index";

export type Message = "success" | "error";

interface Toast {
  id: string;
  message: string;
  alertType: Message;
}

export interface Toasts {
  toasts: Toast[];
}

const toastModule: Module<Toasts, State> = {
  namespaced: true,
  state: {
    toasts: [],
  },
  mutations: {
    ADD_TOAST(state, payload) {
      state.toasts.push(payload);
    },
    REMOVE_TOAST(state) {
      state.toasts.shift();
    },
  },
  actions: {
    trigerToast({ commit }, payload: { message: string; type: Message }) {
      commit("ADD_TOAST", { id: Date.now(), ...payload });

      setTimeout(() => {
        commit("REMOVE_TOAST");
      }, 5000);
    },
  },
};

export default toastModule;
