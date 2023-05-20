import { Dispatch } from "react";
import { Actions } from "./reducer";

export interface IInitialState {
  modal: IModal | null;
  registered_users: IUser[] | null;
  current_user_email: string | null;
}

export interface IUser {
  [key: string]: any;
  name: string;
  email: string;
  image: string;
  password: string;
}

export interface IContext {
  state: IInitialState;
  dispatch: Dispatch<Actions>;
  setModal: (payload: IModal | null) => void;
  findUser: (payload: string) => IUser | undefined;
  deleteUser: (payload: string) => void;
  registerUser: (payload: IUser) => void;
  findUserData: (payload: string) => any | undefined;
  changeUserData: (payload: ChangeUserData) => void;
  setCurrentUserEmail: (payload: string | null) => void;
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

export interface ChangeUserData {
  data: Partial<IUser>;
  email?: string;
}
