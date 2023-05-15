"use client";

import { IContext, IInitialState } from "./types";
import { createContext, useContext } from "react";

// створюємо початковий стейт
export const InitialState: IInitialState = {
  modal: null,
  registered_users: [],
  current_user_email: null,
};

// створюємо початковий контекст
export const context: IContext = {
  state: InitialState,
  dispatch: () => null,
  setModal: () => null,
  findUser: () => undefined,
  registerUser: () => null,
  findUserData: () => null,
  changeUserData: () => null,
  setCurrentUserEmail: () => null,
};

// ініціалізуємо обє'кт як контекст за допомогою createContext
export const GlobalContext = createContext(context);

// створюємо власний хук для зручності виклику контексту
export const useGlobalContext = () => useContext(GlobalContext);
