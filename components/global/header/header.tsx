"use client";
import Link from "next/link";
import s from "./header.module.css";
import { signOut } from "next-auth/react";
import { ReactNode, Fragment } from "react";
import { usePathname } from "next/navigation";
import { ModalType } from "@/components/context/types";
import { useGlobalContext } from "@/components/context/context";

interface INavTab {
  children: ReactNode;
  href?: string;
}

export default function Header() {
  const pathname = usePathname();
  const is_active = (link: string) => (pathname === link ? s.active : "");

  const {
    state: { modal, current_user_email },
    setModal,
    setCurrentUserEmail,
  } = useGlobalContext();

  const toggleUserCard = () =>
    modal?.type !== ModalType.USER_CARD
      ? setModal({ type: ModalType.USER_CARD })
      : setModal(null);

  const toggleCallBack = () =>
    modal?.type !== ModalType.CALL_BACK
      ? setModal({ type: ModalType.CALL_BACK })
      : setModal(null);

  const logOut = () => {
    signOut();
    setCurrentUserEmail(null);
  };

  const navMap: INavTab[] = [
    {
      children: <>Easy Events</>,
      href: "/",
    },
    {
      children: <>Заявки</>,
      href: "/requests",
    },
    {
      children: <>Отримати верифікацію</>,
      href: "/",
    },
    {
      children: <>Зворотній зв’язок</>,
    },
    {
      children: current_user_email ? <>Вихід</> : <>Вхід</>,
      href: current_user_email ? undefined : "/login",
    },
  ];

  return (
    <header className={s.header}>
      <div>
        {navMap.map(({ children, href }, index) =>
          href ? (
            <Link href={href} className={is_active(href)} key={index}>
              {children}
            </Link>
          ) : (
            <Fragment key={index}>{children}</Fragment>
          )
        )}
      </div>
      <label className={s.burger}>
        <input type="checkbox" />
      </label>
    </header>
  );
}
