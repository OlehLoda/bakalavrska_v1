"use client";

import { GlobalReducer } from "./reducer";
import { Action, IInitialState, IModal, IUser } from "./types";
import { GlobalContext, InitialState } from "./context";
import { ReactNode, useReducer, useEffect } from "react";

// провайдер для глобального контексту додатку
export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // хук useReducer, який приймає в себе функцію редюсер і початковий стейт
  // та віддає змінений стейт і функцію dispatch, яка змінює цей стейт
  const [state, dispatch] = useReducer(GlobalReducer, InitialState);

  // функція setModal, яка менеджить стейт модального вікна
  const setModal = (payload: IModal | null) => {
    return dispatch({ type: Action.SET_MODAL, payload });
  };

  // функція setData, яка відправляє дані в редюсер
  const setData = (payload: IInitialState) => {
    return dispatch({ type: Action.SET_DATA, payload });
  };

  // функція registerUser, яка відправляє дані юзера в редюсер
  const registerUser = (payload: IUser) => {
    return dispatch({ type: Action.REGISTER_USER, payload });
  };

  // функція setCurrentUserEmail, яка відправляє емаіл юзера в редюсер
  const setCurrentUserEmail = (payload: string | null) => {
    return dispatch({ type: Action.SET_CURRENT_USER_EMAIL, payload });
  };

  // функція changeUserData, яка відправляє дані для зміни юзера в редюсер
  const changeUserData = (payload: Partial<IUser>) => {
    return dispatch({ type: Action.CHANGE_USER_DATA, payload });
  };

  // функція saveDataToDB, яка зберігає наш стейт в локал сторедж
  const saveDataToDB = () => {
    localStorage.setItem("state", JSON.stringify(state));
  };

  // функція getDataFromDB, яка бере дані з локал стореджа і потім викликає функцію setData
  const getDataFromDB = () => {
    const data: IInitialState = localStorage.getItem("state")
      ? JSON.parse(localStorage.getItem("state")!)
      : null;

    data && setData(data);
  };

  // функція findUser, яка шукає нашого юзера в масиві зареєстрованих
  const findUser = (email: string) => {
    if (!state.registered_users) {
      return undefined;
    } else return state.registered_users.find((user) => user.email === email);
  };

  // функція findUserData, яка шукає дані юзера в масиві зареєстрованих
  const findUserData = (field: string) =>
    state?.registered_users?.find(
      (user) => user.email === state.current_user_email
    )?.[field];

  // запускаємо функцію getDataFromDB на перший рендер додатку
  useEffect(() => getDataFromDB(), []);

  // запускаємо функцію saveDataToDB на кожну зміну стейту
  useEffect(() => saveDataToDB(), [state]);

  // вертаємо всі дочірні компоненти обгорнуті провайдером глобального контексту
  // і передаємо усі функці в контекст
  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
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
