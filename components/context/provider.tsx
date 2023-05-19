"use client";

import { Action, GlobalReducer } from "./reducer";
import { IAlert, IInitialState, IModal, IUser } from "./types";
import { GlobalContext, InitialState } from "./context";
import { ReactNode, useReducer, useEffect } from "react";

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(GlobalReducer, InitialState);

  const setModal = (payload: IModal | null) => {
    return dispatch({ type: Action.SET_MODAL, payload });
  };

  const setAlert = (payload: IAlert | null) => {
    return dispatch({ type: Action.SET_ALERT, payload });
  };

  const setData = (payload: IInitialState) => {
    return dispatch({ type: Action.SET_DATA, payload });
  };

  const registerUser = (payload: IUser) => {
    return dispatch({ type: Action.REGISTER_USER, payload });
  };

  const setCurrentUserEmail = (payload: string | null) => {
    return dispatch({ type: Action.SET_CURRENT_USER_EMAIL, payload });
  };

  const changeUserData = (payload: Partial<IUser>) => {
    return dispatch({ type: Action.CHANGE_USER_DATA, payload });
  };

  const saveDataToDB = () => {
    localStorage.setItem("state", JSON.stringify(state));
  };

  const getDataFromDB = () => {
    const data: IInitialState = localStorage.getItem("state")
      ? JSON.parse(localStorage.getItem("state")!)
      : null;

    data && setData(data);
  };

  const findUser = (email: string) => {
    if (!state.registered_users) {
      return undefined;
    } else return state.registered_users.find((user) => user.email === email);
  };

  const findUserData = (field: string) =>
    state?.registered_users?.find(
      (user) => user.email === state.current_user_email
    )?.[field];

  useEffect(() => getDataFromDB(), []);

  useEffect(() => saveDataToDB(), [state]);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        setAlert,
        findUser,
        setModal,
        registerUser,
        changeUserData,
        findUserData,
        setCurrentUserEmail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
