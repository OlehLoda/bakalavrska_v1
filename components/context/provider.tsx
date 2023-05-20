"use client";

import { Action, GlobalReducer } from "./reducer";
import { GlobalContext, InitialState } from "./context";
import { ReactNode, useReducer, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeUserData, IInitialState, IModal, IUser } from "./types";

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(GlobalReducer, InitialState);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!state.current_user_email && pathname !== "/register")
      router.push("/login");
  }, []);

  const setModal = (payload: IModal | null) => {
    return dispatch({ type: Action.SET_MODAL, payload });
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

  const changeUserData = (payload: ChangeUserData) => {
    return dispatch({ type: Action.CHANGE_USER_DATA, payload });
  };

  const deleteUser = (payload: string) => {
    return dispatch({ type: Action.DELETE_USER, payload });
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
        findUser,
        setModal,
        deleteUser,
        registerUser,
        findUserData,
        changeUserData,
        setCurrentUserEmail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
