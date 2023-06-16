import Link from "next/link";
import s from "./login.module.css";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import ArrowIcon from "@/public/icons/arrow";
import GoogleIcon from "../../public/icons/google";
import { useGlobalContext } from "../context/context";
import InputPass from "../global/input-pass/input-pass";

interface IChangePasswordStep {
  step: number;
  email?: string;
}

export default function LogIn() {
  const { findUser, editUserData, setCurrentUserEmail } = useGlobalContext();

  const [resetPass, setResetPass] = useState<IChangePasswordStep | null>(null);

  const toggleResetPass = () => {
    resetPass ? setResetPass(null) : setResetPass({ step: 1 });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = Array.from(e.currentTarget.elements) as HTMLInputElement[];

    const data: Record<string, string | number> = {};

    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach(({ name, value }) => (data[name] = value));

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
      editUserData({
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
    <div className="bg">
      {!resetPass && (
        <form className="form" onSubmit={onSubmit}>
          <h2>Login</h2>
          <div className="wrap">
            <input
              autoFocus
              required
              placeholder="Email"
              name="email"
              type="email"
              className="input"
            />
            <InputPass required name="password" />
          </div>
          <div className="wrap">
            <button type="submit">Увійти</button>
            <button type="button" onClick={() => signIn()} className={s.google}>
              Sign in with <GoogleIcon />
            </button>
          </div>
          <div className={s.registerForgot}>
            <Link href="/register">Don't have an account?</Link>
            <p onClick={toggleResetPass}>Forget password?</p>
          </div>
        </form>
      )}

      {resetPass?.step === 1 && (
        <form className="form" onSubmit={onSubmit} onReset={stepBack}>
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
        <form className="form" onSubmit={onSubmit} onReset={stepBack}>
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
