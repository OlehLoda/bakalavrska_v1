"use client";

import {
  IUser,
  IEvent,
  IAllEvents,
  IInitialState,
  ChangeUserData,
} from "./types";
import { Action, GlobalReducer } from "./reducer";
import { GlobalContext, InitialState } from "./context";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useReducer, useEffect } from "react";

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(GlobalReducer, InitialState);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    saveDataToDB();
    if (state.loading) return setLoading(false);
    if (
      state.current_user_email === null &&
      pathname !== "/login" &&
      pathname !== "/register"
    )
      return router.push("/login");
  }, [pathname, state, state.loading]);

  useEffect(() => {
    const current_user = findUser(state.current_user_email || "");
    if (!current_user) return;

    const is_owner = ({ owner_id }: IEvent) =>
      owner_id === current_user?.id ? true : false;

    const my_events = state.all_events.filter(is_owner);

    const invited_to = state.all_events.filter(
      (e) => e.guests.includes(current_user.email) && !is_owner(e)
    );

    const events: IAllEvents = { my_events, invited_to };

    changeUserData({ data: { events } });
  }, [state.current_user_email, state.all_events]);

  useEffect(() => getDataFromDB(), []);

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

  const createEvent = (payload: IEvent) => {
    return dispatch({ type: Action.CREATE_EVENT, payload });
  };

  const editEvent = (payload: Partial<IEvent>) => {
    return dispatch({ type: Action.EDIT_EVENT, payload });
  };

  const addGuestToEvent = (payload: { event_id: string; guest: string }) => {
    return dispatch({ type: Action.ADD_GUEST_TO_EVENT, payload });
  };

  const deleteGuestFromEvent = (payload: {
    event_id: string;
    guest: string;
  }) => {
    return dispatch({ type: Action.DELETE_GUEST_FROM_EVENT, payload });
  };

  const deleteEvent = (payload: string) => {
    return dispatch({ type: Action.DELETE_EVENT, payload });
  };

  const setLoading = (payload: boolean) => {
    return dispatch({ type: Action.SET_LOADING, payload });
  };

  const getEventById = (id: string) => {
    return state.all_events.find((e) => e.id === id);
  };

  const saveDataToDB = () => {
    return localStorage.setItem("state", JSON.stringify(state));
  };

  const getDataFromDB = () => {
    const data: IInitialState = localStorage.getItem("state")
      ? JSON.parse(localStorage.getItem("state")!)
      : null;

    return data && setData(data);
  };

  const findUser = (email: string) => {
    if (!state.registered_users) return;
    return state.registered_users.find((user) => user.email === email);
  };

  const findUserData = (field: string) => {
    return state?.registered_users?.find(
      (user) => user.email === state.current_user_email
    )?.[field];
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        findUser,
        editEvent,
        deleteUser,
        setLoading,
        createEvent,
        deleteEvent,
        registerUser,
        findUserData,
        getEventById,
        changeUserData,
        addGuestToEvent,
        setCurrentUserEmail,
        deleteGuestFromEvent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
