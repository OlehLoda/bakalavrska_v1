"use client";

import { useGlobalContext } from "@/components/context/context";
import Register from "@/components/register/register";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  // витягаємо потрібні дані і функції з глобального конексту
  const {
    state: { current_user_email },
  } = useGlobalContext();

  // записуємо дані з хука useRouter в змінну router
  const router = useRouter();

  // хук useEffect, в якому виконується редірект залогіненого юзера на головну сторінку
  useEffect(() => {
    if (current_user_email) router.push("/");
  }, [current_user_email]);

  // повертаємо компоненту Register для цієї сторінки
  return <Register />;
}
