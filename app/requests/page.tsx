"use client";
import { useGlobalContext } from "@/components/context/context";
import Empty from "@/components/global/empty/empty";
import Requests from "@/components/requests/requests";

export default function RequestsPage() {
  // витягаємо потрібні дані і функції з глобального конексту
  const {
    state: { current_user_email },
  } = useGlobalContext();

  // відносно того, чи юзер залогінений вертаємо або сторінку з заявками, або пусту
  return current_user_email ? <Requests /> : <Empty />;
}
