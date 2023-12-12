import { Module } from "vuex";
import { State } from "../../index";

export type Message = "success" | "error";

export interface ToastState {
  toasts: Omit<ToastState, "toasts">[];
  message: string;
  alertType: Message;
  show: boolean;
}

const toastModule: Module<ToastState, State> = {
  namespaced: true,
  state: {
    toasts: [],
    message: "",
    alertType: "success",
    show: false,
  },
  mutations: {
    UPDATE_TOAST_MESSAGE(state, payload: string) {
      state.message = payload;
    },
    UPDATE_TOAST_ALERT_TYPE(state, payload: Message) {
      state.alertType = payload;
    },
    UPDATE_TOAST_STATUS(state, payload: boolean) {
      state.show = payload;
    },
    ADD_TOAST(state, payload) {},
    REMOVE_TOAST(state, payload) {},
  },
  actions: {
    trigerToast({ commit }, { message, type }: { message: string; type: Message }) {
      commit("UPDATE_TOAST_MESSAGE", message);
      commit("UPDATE_TOAST_ALERT_TYPE", type);
      commit("UPDATE_TOAST_STATUS", true);

      setTimeout(() => {
        commit("UPDATE_TOAST_MESSAGE", "");
        commit("UPDATE_TOAST_ALERT_TYPE", "success");
        commit("UPDATE_TOAST_STATUS", false);
      }, 2000);
    },
  },
  getters: {
    toastMessageWithSmile(state) {
      return state.message + " :)";
    },
  },
};

export default toastModule;
