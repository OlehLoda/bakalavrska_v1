import GoogleIcon from "../../public/icons/google";
import s from "./login.module.css";
import { FormEvent, useState } from "react";
import { useGlobalContext } from "../context/context";
import { signIn } from "next-auth/react";
import Link from "next/link";
import ArrowIcon from "@/public/icons/arrow";

interface IChangePasswordStep {
  step: number;
  email?: string;
}

// компонента LogIn, яка вертає компоненти для сторінки авторизації
export default function LogIn() {
  // витягаємо потрібні функції з глобального конексту
  const { findUser, changeUserData, setCurrentUserEmail } = useGlobalContext();

  // хук useState, який вертає стан зміни паролю і функцію для зміни стану
  const [resetPass, setResetPass] = useState<IChangePasswordStep | null>(null);

  // функція для увімкнення/вимкення вікна зміни паролю
  const handleResetPass = () => {
    resetPass ? setResetPass(null) : setResetPass({ step: 1 });
  };

  // універсальна функція для відправки форми логінації та зміни паролю
  const onSubmit = (
    e: FormEvent<HTMLFormElement>,
    resetPasswordStep: number | null = null,
    email?: string
  ) => {
    // запобігаємо перезавантаженню стрінки
    e.preventDefault();

    // збираємо елементи форми
    const elements = Array.from(e.currentTarget.elements);

    // ініціалізуємо пустий об'єкт
    const data: Record<string, string | number> = {};

    // перебираємо елементи форми та заповнюємо об'єкт data
    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    // перевіряємо, чи існує юзер з такою поштою
    const user_exist = findUser((data["email"] || email) as string);

    // перевіряємо, чи повторний пароль одинаковий з першим
    const is_password_correct =
      (data["password"] as string) === (data["password_repeat"] as string);

    if (!resetPasswordStep && user_exist) {
      // якщо юзер зареєстрований, перевіряємо правильність введеного паролю
      // та робимо або логін, або інформуємо користувача про неправильний пароль
      const is_password_correct =
        user_exist.password === (data["password"] as string);

      return is_password_correct
        ? setCurrentUserEmail(user_exist.email)
        : alert("Wrong password");
    } else if (resetPasswordStep === 1 && user_exist) {
      // якщо крок відновлення = 1 і юзер зареєстрований,
      // переключаємо на крок 2, та записуємо пошту для наступного кроку
      return setResetPass({ step: 2, email: data["email"] as string });
    } else if (resetPasswordStep === 2 && user_exist && is_password_correct) {
      // якщо крок відновлення = 2, юзер зареєстрований і пароль та повторний пароль одинакові,
      // змінюємо пароль, та інформуємо користувача про це
      changeUserData({
        password: data["password"] as string,
        password_repeat: data["password_repeat"] as string,
      });
      alert("Пароль змінено");
      // закінчуємо процес відновлення поролю
      return setResetPass(null);
    } else if (resetPasswordStep === 2 && !is_password_correct) {
      // якщо крок відновлення = 2, але пароль та повторний пароль відрізняються,
      // інформуємо користувача про це
      return alert("Паролі відрізняються");
    } else {
      // якщо користувач не знайдений, інформуємо користувача про це
      return alert("Користувач не знайдений. Перевірте введені дані");
    }
  };

  // функція для повертання на крок назад під час відновлення паролю
  const stepBack = () =>
    resetPass?.step && resetPass?.step > 1
      ? setResetPass({ step: resetPass?.step - 1 })
      : setResetPass(null);

  return (
    <div className={s.bg}>
      {/* якщо процес відновлення паролю не запущенно, показуємо форму для логінації */}
      {!resetPass && (
        <form className={s.form} onSubmit={onSubmit}>
          <h2>Вхід</h2>
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
              placeholder="Пароль"
              name="password"
              type="password"
              minLength={8}
              className={s.input}
            />
          </div>
          <div>
            <button type="submit" className={s.submit}>
              Увійти
            </button>
            <button type="button" onClick={() => signIn()} className={s.google}>
              Sign in with Google <GoogleIcon />
            </button>
          </div>
          <div className={s.links}>
            <Link href={"/register"}>Ще не зареєстровані?</Link>
            <p onClick={handleResetPass}>Забули пароль?</p>
          </div>
        </form>
      )}

      {/* якщо процес відновлення на кроці 1, показуємо форму для введення логіну */}
      {resetPass?.step === 1 && (
        <form
          className={s.form}
          onSubmit={(e) => onSubmit(e, 1)}
          onReset={stepBack}
        >
          <button type="reset" className={s.back}>
            <ArrowIcon />
          </button>

          <h2>Відновлення паролю</h2>
          <input
            autoFocus
            required
            placeholder="Email"
            name="email"
            type="email"
            className={s.input}
          />
          <button type="submit" className={s.submit}>
            Продовжити
          </button>
        </form>
      )}

      {/* якщо процес відновлення на кроці 2, показуємо форму для введення нового паролю */}
      {resetPass?.step === 2 && (
        <form
          className={s.form}
          onSubmit={(e) => onSubmit(e, 2, resetPass.email)}
          onReset={stepBack}
        >
          <button type="reset" className={s.back}>
            <ArrowIcon />
          </button>
          <h2>Відновлення паролю</h2>
          <input
            autoFocus
            minLength={8}
            required
            name="password"
            type="text"
            className={s.input}
            placeholder="Введіть новий пароль"
          />
          <input
            minLength={8}
            required
            name="password_repeat"
            type="text"
            className={s.input}
            placeholder="Повторіть пароль"
          />
          <button type="submit" className={s.submit}>
            Змінити пароль
          </button>
        </form>
      )}
    </div>
  );
}
