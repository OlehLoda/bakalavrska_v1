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
  editEvent: (payload: Partial<IEvent>) => void;
  deleteUser: (payload: string) => void;
  deleteGuest: (payload: { event_id: string; guest: string }) => void;
  deleteEvent: (payload: string) => void;
  createEvent: (payload: IEvent) => void;
  registerUser: (payload: IUser) => void;
  findUserData: (payload: string) => any | undefined;
  getEventById: (payload: string) => IEvent | undefined;
  editUserData: (payload: { data: Partial<IUser>; email?: string }) => void;
  addGuestToEvent: (payload: { event_id: string; guest: string }) => void;
  setCurrentUserEmail: (payload: string | null) => void;
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
