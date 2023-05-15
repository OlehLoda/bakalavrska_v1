import { FormEvent } from "react";
import s from "./register.module.css";
import { IUser } from "../context/types";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/context";
import placeholder from "../../public/photos/man.png";

export default function Register() {
  // витягаємо потрібні функції з глобального конексту
  const { findUser, registerUser } = useGlobalContext();

  // записуємо дані з хука useRouter в змінну router
  const router = useRouter();

  // функція onSubmit для керування даними форми
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // запобігаємо перезавантаженню сторінки
    e.preventDefault();

    // збираємо елементи форми
    const elements = Array.from(e.currentTarget.elements);

    // ініціалізуємо пустий об'єкт
    const data = {} as IUser;

    // перебираємо елементи форми та заповнюємо об'єкт data
    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    // перевіряємо, чи існує юзер з такою поштою
    const user_exist = findUser(data["email"]);

    // перевіряємо, чи повторний пароль одинаковий з першим
    const password_match = data["password"] === data["password_repeat"];

    // створюємо початковий об'єкт юзера з даними з форми,
    // та з обов'язковими початковими даними
    const final_data = {
      ...data,
      image: placeholder.src,
      balance: 0,
      requests: null,
      callbacks: null,
      verifications: null,
    };

    if (user_exist) {
      // якшо користувач вже зареєстрований, повідомляємо про це
      return alert("Цей користувач вже зареєстрований");
    } else if (!password_match) {
      // якшо паролі не сходяться, повідомляємо про це
      return alert("Паролі не сходяться");
    } else {
      // якшо юзер ще не зареєстрований та паролі сходяться,
      // реєструємо користувача та відправляємо на головну сторінку
      registerUser(final_data);
      return router.push("/login");
    }
  };

  // форма реєстрації
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
