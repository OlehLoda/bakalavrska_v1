import { FormEvent } from "react";
import s from "./register.module.css";
import { IUser } from "../context/types";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/context";

export default function Register() {
  const { findUser, registerUser } = useGlobalContext();

  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = Array.from(e.currentTarget.elements);

    const data = {} as IUser;

    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    const user_exist = findUser(data["email"]);

    const password_match = data["password"] === data["password_repeat"];

    const final_data = {
      ...data,
      image: "",
      balance: 0,
      requests: null,
      callbacks: null,
      verifications: null,
    };

    if (user_exist) {
      return alert("Цей користувач вже зареєстрований");
    } else if (!password_match) {
      return alert("Паролі не сходяться");
    } else {
      registerUser(final_data);
      return router.push("/login");
    }
  };

  return (
    <div className={s.bg}>
      <form className={s.form} onSubmit={onSubmit}>
        <h2>Реєстрація</h2>
        <div>
          <input
            autoFocus
            required
            placeholder="Email"
            name="email"
            type="email"
            className={s.input}
          />
          <input
            required
            placeholder="Ім'я"
            name="name"
            type="text"
            className={s.input}
          />
        </div>
        <div>
          <input
            required
            minLength={8}
            type="password"
            name="password"
            className={s.input}
            placeholder="Пароль"
          />
          <input
            required
            minLength={8}
            type="password"
            className={s.input}
            name="password_repeat"
            placeholder="Повторіть пароль"
          />
        </div>
        <button type="submit" className={s.submit}>
          Далі
        </button>
      </form>
    </div>
  );
}
