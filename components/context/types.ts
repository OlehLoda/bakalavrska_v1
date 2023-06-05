import { Dispatch } from "react";
import { Actions } from "./reducer";

export interface IInitialState {
  registered_users: IUser[] | null;
  current_user_email: string | null;
  all_events: IEvent[];
  loading: boolean;
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
  editEvent: (payload: Partial<IEvent>) => void;
  deleteUser: (payload: string) => void;
  setLoading: (payload: boolean) => void;
  deleteEvent: (payload: string) => void;
  createEvent: (payload: IEvent) => void;
  registerUser: (payload: IUser) => void;
  findUserData: (payload: string) => any | undefined;
  getEventById: (payload: string) => IEvent | undefined;
  changeUserData: (payload: ChangeUserData) => void;
  addGuestToEvent: (payload: { event_id: string; guest: string }) => void;
  setCurrentUserEmail: (payload: string | null) => void;
  deleteGuestFromEvent: (payload: { event_id: string; guest: string }) => void;
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

export interface ChangeUserData {
  data: Partial<IUser>;
  email?: string;
}

export interface IEvent {
  [key: string]: string | string[] | undefined;
  name: string;
  time: string;
  location: string;
  description: string;
  id: string;
  owner_id: string;
  guests: string[];
}
