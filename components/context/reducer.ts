import { IUser, IEvent, IInitialState, ChangeUserData } from "./types";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Action {
  SET_DATA = "SET_DATA",
  EDIT_EVENT = "EDIT_EVENT",
  SET_LOADING = "SET_LOADING",
  DELETE_USER = "DELETE_USER",
  CREATE_EVENT = "CREATE_EVENT",
  DELETE_EVENT = "DELETE_EVENT",
  DELETE_GUEST = "DELETE_GUEST",
  REGISTER_USER = "REGISTER_USER",
  CHANGE_USER_DATA = "CHANGE_USER_DATA",
  ADD_GUEST_TO_EVENT = "ADD_GUEST_TO_EVENT",
  SET_CURRENT_USER_EMAIL = "SET_CURRENT_USER_EMAIL",
}

export interface Payload {
  [Action.SET_DATA]: IInitialState;
  [Action.EDIT_EVENT]: Partial<IEvent>;
  [Action.DELETE_USER]: string;
  [Action.SET_LOADING]: boolean;
  [Action.CREATE_EVENT]: IEvent;
  [Action.DELETE_EVENT]: string;
  [Action.DELETE_GUEST]: { event_id: string; guest: string };
  [Action.REGISTER_USER]: IUser;
  [Action.CHANGE_USER_DATA]: ChangeUserData;
  [Action.ADD_GUEST_TO_EVENT]: { event_id: string; guest: string };
  [Action.SET_CURRENT_USER_EMAIL]: string | null;
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export const GlobalReducer = (
  state: IInitialState,
  action: Actions
): IInitialState => {
  switch (action.type) {
    case Action.SET_DATA:
      return { ...action.payload };

    case Action.REGISTER_USER:
      return {
        ...state,
        registered_users: state.registered_users
          ? [...state.registered_users, action.payload]
          : [action.payload],
      };

    case Action.SET_CURRENT_USER_EMAIL:
      return { ...state, current_user_email: action.payload };

    case Action.CHANGE_USER_DATA:
      const registered_users = (
        structuredClone(state.registered_users) as IUser[]
      ).map((user) => {
        if (
          user.email === state.current_user_email ||
          user.email === action.payload.email
        ) {
          return { ...user, ...action.payload.data };
        } else return user;
      });

      return { ...state, registered_users };

    case Action.DELETE_USER:
      if (state.registered_users) {
        return {
          ...state,
          registered_users: state.registered_users.filter(
            (user) => user.email !== action.payload
          ),
        };
      } else {
        return state;
      }

    case Action.CREATE_EVENT:
      return {
        ...state,
        all_events: [...(state.all_events || []), action.payload],
      };

    case Action.ADD_GUEST_TO_EVENT:
      return {
        ...state,
        all_events: state.all_events.map((event) => {
          if (event.id === action.payload.event_id) {
            return {
              ...event,
              guests: [...(event.guests || []), action.payload.guest],
            };
          } else return event;
        }),
      };

    case Action.DELETE_GUEST:
      return {
        ...state,
        all_events: state.all_events.map((event) => {
          if (event.id === action.payload.event_id) {
            return {
              ...event,
              guests: event.guests.filter((g) => g !== action.payload.guest),
            };
          } else return event;
        }),
      };

    case Action.EDIT_EVENT:
      return {
        ...state,
        all_events: state.all_events.map((event) => {
          if (action.payload.id === event.id) {
            return {
              ...event,
              ...action.payload,
            };
          } else return event;
        }),
      };

    case Action.DELETE_EVENT:
      return {
        ...state,
        all_events: state.all_events.filter(
          (event) => event.id !== action.payload
        ),
      };

    case Action.SET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
