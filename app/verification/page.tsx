"use client";

import { useGlobalContext } from "@/components/context/context";
import Empty from "@/components/global/empty/empty";
import Verification from "@/components/verification/verification";

export default function VerificationPage() {
  // витягаємо потрібні дані з глобального конексту
  const {
    state: { current_user_email },
  } = useGlobalContext();

  // відносно того, чи юзер залогінений вертаємо або сторінку для верифікації, або пусту
  return current_user_email ? <Verification /> : <Empty />;
}
