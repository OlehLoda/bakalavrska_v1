import { Dispatch } from "react";

//опис типів функцій
export enum Action {
  SET_DATA = "SET_DATA",
  SET_MODAL = "SET_MODAL",
  REGISTER_USER = "REGISTER_USER",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  CHANGE_USER_DATA = "CHANGE_USER_DATA",
  SET_CURRENT_USER_EMAIL = "SET_CURRENT_USER_EMAIL",
}

//опис типів аргументів
export interface Payload {
  [Action.SET_DATA]: IInitialState;
  [Action.SET_MODAL]: IModal | null;
  [Action.REGISTER_USER]: IUser;
  [Action.CHANGE_PASSWORD]: IChangePasswordDTO;
  [Action.CHANGE_USER_DATA]: Partial<IUser>;
  [Action.SET_CURRENT_USER_EMAIL]: string | null;
}

// тип, щоб описати, будь-який аргумент функції dispatch
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

// об`єднаний тип функцій з аргументами
export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

// інтерфейс початкового стейту
export interface IInitialState {
  modal: IModal | null;
  registered_users: IUser[] | null;
  current_user_email: string | null;
}

// інтерфейс юзера
export interface IUser {
  [key: string]: any;
  email: string;
  password: string;
  password_repeat?: string;
  name: string;
  image: string;
  balance: number;
  requests: IRequest[] | null;
  verifications: IVerification[] | null;
  callbacks: ICallback[] | null;
}

// інтерфейс початкового контексту додатку з описом початкового стейту і всіх функцій
export interface IContext {
  state: IInitialState;
  dispatch: Dispatch<Actions>;
  setModal: (payload: IModal | null) => void;
  findUser: (payload: string) => IUser | undefined;
  registerUser: (payload: IUser) => void;
  changeUserData: (payload: Partial<IUser>) => void;
  findUserData: (payload: string) => any | undefined;
  setCurrentUserEmail: (payload: string | null) => void;
}

// інтерфейс заявки для виконання
export interface IRequest {
  [key: string]: string | number;
  name: string;
  title: string;
  description: string;
  priority: number;
  price: number;
}

// інтерфейс зворотнього зв`язку
export interface ICallback {
  [key: string]: string;
  name: string;
  email: string;
  description: string;
}

// інтерфейс заявки на верифікацію
export interface IVerification {
  [key: string]: string | File;
  email: string;
  role: string;
  certificate: File;
}

// опис типів модальних вікон
export enum ModalType {
  USER_CARD = "USER_CARD",
  CALL_BACK = "CALL_BACK",
  CREATE_REQUEST_FORM = "CREATE_REQUEST_FORM",
}

// інтерфейс модального вікна
export interface IModal {
  type: ModalType;
  data?: any;
}

// інтерфейс зміни паролю
export interface IChangePasswordDTO {
  user: IUser;
  password: string;
}
