"use client";
import { useGlobalContext } from "@/components/context/context";
import LogIn from "@/components/login/login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import man from "../../public/photos/man.png";

// сторінка для авторизації
export default function LoginPage() {
  // витягаємо потрібні дані і функції з глобального конексту
  const {
    state: { current_user_email },
    findUser,
    registerUser,
    setCurrentUserEmail,
  } = useGlobalContext();

  // записуємо дані з хука useRouter в змінну router
  const router = useRouter();
  // записуємо дані з хука useSession в змінну session
  const { data: session } = useSession();

  // хук useEffect, в якому виконується реєстрація нового юзера з Гугл автентифікацією
  // і редірект залогіненого юзера на головну сторінку
  useEffect(() => {
    if (current_user_email) {
      return router.push("/");
    } else if (session) {
      const { name, email, image } = session.user || {};

      const user_exist = findUser(email as string);

      if (user_exist) {
        setCurrentUserEmail(user_exist.email);
        return router.push("/");
      }

      const new_user = {
        email: email || "",
        password: "11111111",
        password_repeat: "11111111",
        name: name || "",
        image: image || man.src,
        balance: 0,
        requests: null,
        callbacks: null,
        verifications: null,
      };

      registerUser(new_user);
      setCurrentUserEmail(new_user.email);
      return router.push("/");
    } else return;
  }, [current_user_email, session]);

  // повертаємо компоненту LogIn для цієї сторінки
  return <LogIn />;
}
