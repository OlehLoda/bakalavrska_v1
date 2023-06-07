"use client";

import { IContext, IInitialState } from "./types";
import { createContext, useContext } from "react";

export const InitialState: IInitialState = {
  registered_users: [],
  current_user_email: null,
  all_events: [],
  loading: true,
};

export const context: IContext = {
  state: InitialState,
  dispatch: () => null,
  findUser: () => undefined,
  editEvent: () => null,
  deleteUser: () => null,
  setLoading: () => null,
  deleteGuest: () => null,
  createEvent: () => null,
  deleteEvent: () => null,
  registerUser: () => null,
  findUserData: () => null,
  getEventById: () => undefined,
  changeUserData: () => null,
  addGuestToEvent: () => null,
  setCurrentUserEmail: () => null,
};

export const GlobalContext = createContext(context);

export const useGlobalContext = () => useContext(GlobalContext);
