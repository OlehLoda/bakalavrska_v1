"use client";

import { IUser, IEvent, IAllEvents, IInitialState } from "./types";
import { Action, GlobalReducer } from "./reducer";
import { GlobalContext, InitialState } from "./context";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ReactNode, useReducer, useEffect } from "react";

export default function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(GlobalReducer, InitialState);
  const router = useRouter();
  const pathname = usePathname();
  const query = useParams();

  const handleRedirectUnassignedUser = () => {
    setTimeout(() => {
      if (
        state.current_user_email === null &&
        pathname !== "/login" &&
        pathname !== "/register" &&
        !query?.["event_id"]
      ) {
        router.push("/login");
      }
    }, 500);
  };

  useEffect(() => handleRedirectUnassignedUser(), [state.current_user_email]);

  const saveDataToDB = () => {
    if (state.registered_users && state.registered_users?.length > 0) {
      return localStorage.setItem("state", JSON.stringify(state));
    }
  };

  useEffect(() => saveDataToDB(), [state]);

  const eventsDistribution = () => {
    const current_user = findUser(state.current_user_email || "");
    if (!current_user) return;

    const is_owner = ({ owner_id }: IEvent) =>
      owner_id === current_user?.id ? true : false;

    const my_events = state.all_events.filter(is_owner);

    const invited_to = state.all_events.filter(
      (e) => e.guests.includes(current_user.email) && !is_owner(e)
    );

    const events: IAllEvents = { my_events, invited_to };

    editUserData({ data: { events } });
  };

  useEffect(
    () => eventsDistribution(),
    [state.current_user_email, state.all_events]
  );

  const getDataFromDB = () => {
    const data: IInitialState = localStorage.getItem("state")
      ? JSON.parse(localStorage.getItem("state")!)
      : null;

    return data && setData(data);
  };

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

  const editUserData = (payload: { data: Partial<IUser>; email?: string }) => {
    return dispatch({ type: Action.EDIT_USER_DATA, payload });
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

  const deleteGuest = (payload: { event_id: string; guest: string }) => {
    return dispatch({ type: Action.DELETE_GUEST, payload });
  };

  const deleteEvent = (payload: string) => {
    return dispatch({ type: Action.DELETE_EVENT, payload });
  };

  const getEventById = (id: string) => {
    return state.all_events.find((e) => e.id === id);
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
        createEvent,
        deleteEvent,
        deleteGuest,
        registerUser,
        findUserData,
        getEventById,
        editUserData,
        addGuestToEvent,
        setCurrentUserEmail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
