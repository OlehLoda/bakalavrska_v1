import { Dispatch } from "react";
import { Actions } from "./reducer";

export interface IInitialState {
  registered_users: IUser[] | null;
  current_user_email: string | null;
  all_events: IEvent[];
}

export type IAllEvents = {
  [key in Category]: IEvent[];
} & {
  my_events?: IEvent[];
  invited_to?: IEvent[];
};

export enum Category {
  MY_EVENTS = "my_events",
  INVITED_TO = "invited_to",
}

export interface IUser {
  [key: string]: any;
  id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  events: IAllEvents;
}

export interface IContext {
  state: IInitialState;
  dispatch: Dispatch<Actions>;
  findUser: (payload: string) => IUser | undefined;
  deleteUser: (payload: string) => void;
  createEvent: (payload: IEvent) => void;
  registerUser: (payload: IUser) => void;
  findUserData: (payload: string) => any | undefined;
  getEventById: (payload: string) => IEvent | undefined;
  changeUserData: (payload: ChangeUserData) => void;
  addGuestToEvent: (payload: { event_id: string; guest_email: string }) => void;
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

export interface IEvent {
  [key: string]: string | Date | string[];
  name: string;
  time: Date;
  location: string;
  description: string;
  id: string;
  owner_id: string;
  guests: string[];
}
