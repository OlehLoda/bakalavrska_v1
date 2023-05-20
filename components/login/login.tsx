import GoogleIcon from "../../public/icons/google";
import s from "./login.module.css";
import { FormEvent, useState } from "react";
import { useGlobalContext } from "../context/context";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import ArrowIcon from "@/public/icons/arrow";

interface IChangePasswordStep {
  step: number;
  email?: string;
}

export default function LogIn() {
  const { findUser, changeUserData, setCurrentUserEmail } = useGlobalContext();

  const [resetPass, setResetPass] = useState<IChangePasswordStep | null>(null);

  const handleResetPass = () => {
    resetPass ? setResetPass(null) : setResetPass({ step: 1 });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = Array.from(e.currentTarget.elements);

    const data: Record<string, string | number> = {};

    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    const user_exist = findUser((data["email"] || resetPass?.email) as string);

    const is_password_correct =
      (data["password"] as string) === (data["password_repeat"] as string);

    if (!resetPass?.step && user_exist) {
      const is_password_correct =
        user_exist.password === (data["password"] as string);

      return is_password_correct
        ? setCurrentUserEmail(user_exist.email)
        : alert("Wrong password");
    } else if (resetPass?.step === 1 && user_exist) {
      return setResetPass({ step: 2, email: data["email"] as string });
    } else if (resetPass?.step === 2 && user_exist && is_password_correct) {
      changeUserData({
        data: { password: data["password"] as string },
        email: resetPass?.email,
      });
      alert("Password has been changed");
      return setResetPass(null);
    } else if (resetPass?.step === 2 && !is_password_correct) {
      return alert("Passwords don't match");
    } else {
      return alert("User not found. Check if the email is correct");
    }
  };

  const stepBack = () =>
    resetPass?.step && resetPass?.step > 1
      ? setResetPass({ step: resetPass?.step - 1 })
      : setResetPass(null);

  return (
    <div className={s.bg}>
      {!resetPass && (
        <form className={s.form} onSubmit={onSubmit}>
          <h2>Login</h2>
          <div>
            <input
              autoFocus
              required
              placeholder="Email"
              name="email"
              type="email"
              className="input"
            />
            <input
              minLength={8}
              required
              placeholder="Password"
              name="password"
              type="password"
              className="input"
            />
          </div>
          <div>
            <button type="submit">Увійти</button>
            <button type="button" onClick={() => signIn()} className={s.google}>
              Sign in with Google <GoogleIcon />
            </button>
          </div>
          <div className={s.registerForgot}>
            <Link href="/register">Don't have an account?</Link>
            <p onClick={handleResetPass}>Forget password?</p>
          </div>
        </form>
      )}

      {resetPass?.step === 1 && (
        <form className={s.form} onSubmit={onSubmit} onReset={stepBack}>
          <button type="reset" className={s.back}>
            <ArrowIcon />
          </button>

          <h2>Reset password</h2>
          <input
            autoFocus
            required
            placeholder="Email"
            name="email"
            type="email"
            className="input"
          />
          <button type="submit" className={s.submit}>
            Continue
          </button>
        </form>
      )}

      {resetPass?.step === 2 && (
        <form className={s.form} onSubmit={onSubmit} onReset={stepBack}>
          <button type="reset" className={s.back}>
            <ArrowIcon />
          </button>
          <h2>Reset password</h2>
          <input
            autoFocus
            minLength={8}
            required
            name="password"
            type="password"
            className="input"
            placeholder="Введіть новий пароль"
          />
          <input
            minLength={8}
            required
            name="password_repeat"
            type="password"
            className="input"
            placeholder="Повторіть пароль"
          />
          <button type="submit" className={s.submit}>
            Change password
          </button>
        </form>
      )}
    </div>
  );
}
