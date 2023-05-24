"use client";

import { IContext, IInitialState } from "./types";
import { createContext, useContext } from "react";

export const InitialState: IInitialState = {
  registered_users: [],
  current_user_email: null,
  all_events: [],
};

export const context: IContext = {
  state: InitialState,
  dispatch: () => null,
  findUser: () => undefined,
  deleteUser: () => null,
  createEvent: () => null,
  registerUser: () => null,
  findUserData: () => null,
  getEventById: () => undefined,
  changeUserData: () => null,
  addGuestToEvent: () => null,
  setCurrentUserEmail: () => null,
};

export const GlobalContext = createContext(context);

export const useGlobalContext = () => useContext(GlobalContext);
