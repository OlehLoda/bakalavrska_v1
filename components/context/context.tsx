"use client";

import { IContext, IInitialState } from "./types";
import { createContext, useContext } from "react";

export const InitialState: IInitialState = {
  modal: null,
  alert: null,
  registered_users: [],
  current_user_email: null,
};

export const context: IContext = {
  state: InitialState,
  dispatch: () => null,
  setModal: () => null,
  setAlert: () => null,
  findUser: () => undefined,
  registerUser: () => null,
  findUserData: () => null,
  changeUserData: () => null,
  setCurrentUserEmail: () => null,
};

export const GlobalContext = createContext(context);

export const useGlobalContext = () => useContext(GlobalContext);
