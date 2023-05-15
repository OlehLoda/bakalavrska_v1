import { IUser, Actions, IInitialState, Action } from "./types";

//функція редюсер, яка менеджить весь наш контекст
export const GlobalReducer = (
  state: IInitialState,
  action: Actions
): IInitialState => {
  switch (action.type) {
    //функція SET_MODAL, яка менеджить модальні вікна
    case Action.SET_MODAL:
      return { ...state, modal: action.payload };

    //функція SET_DATA, яка записує всі дані з бази даних
    case Action.SET_DATA:
      return { ...action.payload };

    //функція REGISTER_USER, яка додає юзера в масив зареєстрованих
    case Action.REGISTER_USER:
      return {
        ...state,
        registered_users: state.registered_users
          ? [...state.registered_users, action.payload]
          : [action.payload],
      };

    //функція SET_CURRENT_USER_EMAIL, яка записує емаіл залогіненого юзера
    case Action.SET_CURRENT_USER_EMAIL:
      return { ...state, current_user_email: action.payload };

    //функція CHANGE_USER_DATA, яка змінює будь-яке поле юзера в масиві зареєстровних юзерів
    case Action.CHANGE_USER_DATA:
      const registered_users = (
        structuredClone(state.registered_users) as IUser[]
      ).map((user) => {
        if (user.email === state.current_user_email) {
          return { ...user, ...action.payload };
        } else return user;
      });

      return { ...state, registered_users };

    default:
      return state;
  }
};
