import {
  IUser,
  IAlert,
  IModal,
  IInitialState,
  IChangePasswordDTO,
} from "./types";

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
  SET_ALERT = "SET_ALERT",
  SET_MODAL = "SET_MODAL",
  DELETE_USER = "DELETE_USER",
  REGISTER_USER = "REGISTER_USER",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  CHANGE_USER_DATA = "CHANGE_USER_DATA",
  SET_CURRENT_USER_EMAIL = "SET_CURRENT_USER_EMAIL",
}

export interface Payload {
  [Action.SET_DATA]: IInitialState;
  [Action.SET_ALERT]: IAlert | null;
  [Action.SET_MODAL]: IModal | null;
  [Action.DELETE_USER]: string;
  [Action.REGISTER_USER]: IUser;
  [Action.CHANGE_PASSWORD]: IChangePasswordDTO;
  [Action.CHANGE_USER_DATA]: Partial<IUser>;
  [Action.SET_CURRENT_USER_EMAIL]: string | null;
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

export const GlobalReducer = (
  state: IInitialState,
  action: Actions
): IInitialState => {
  switch (action.type) {
    case Action.SET_MODAL:
      return { ...state, modal: action.payload };

    case Action.SET_ALERT:
      return { ...state, alert: action.payload };

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
        if (user.email === state.current_user_email) {
          return { ...user, ...action.payload };
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

    default:
      return state;
  }
};
