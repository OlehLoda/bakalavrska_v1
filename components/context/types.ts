import { Dispatch } from "react";
import { Actions } from "./reducer";

export interface IInitialState {
  modal: IModal | null;
  alert: IAlert | null;
  registered_users: IUser[] | null;
  current_user_email: string | null;
}

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

export interface IContext {
  state: IInitialState;
  dispatch: Dispatch<Actions>;
  setModal: (payload: IModal | null) => void;
  findUser: (payload: string) => IUser | undefined;
  registerUser: (payload: IUser) => void;
  changeUserData: (payload: Partial<IUser>) => void;
  findUserData: (payload: string) => any | undefined;
  setCurrentUserEmail: (payload: string | null) => void;
  setAlert: (payload: IAlert | null) => void;
}

export interface IRequest {
  [key: string]: string | number;
  name: string;
  title: string;
  description: string;
  priority: number;
  price: number;
}

export interface ICallback {
  [key: string]: string;
  name: string;
  email: string;
  description: string;
}

export interface IVerification {
  [key: string]: string | File;
  email: string;
  role: string;
  certificate: File;
}

export enum ModalType {
  USER_CARD = "USER_CARD",
  CALL_BACK = "CALL_BACK",
  CREATE_REQUEST_FORM = "CREATE_REQUEST_FORM",
}

export interface IModal {
  type: ModalType;
  data?: any;
}

export interface IChangePasswordDTO {
  user: IUser;
  password: string;
}

export type AlertType = "warning" | "cancel" | "info" | "success";

export interface IAlert {
  type: AlertType;
  text?: string;
  data?: any;
}

export type IAlertInfo = {
  [key in AlertType]: {
    background: string;
    color: string;
    text: string;
    img: JSX.Element;
  };
};
