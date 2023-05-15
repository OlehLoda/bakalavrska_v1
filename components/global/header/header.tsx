"use client";
import Link from "next/link";
import s from "./header.module.css";
import { signOut } from "next-auth/react";
import { ReactNode, Fragment } from "react";
import { usePathname } from "next/navigation";
import UserCard from "../user-card/user-card";
import CallBack from "../call-back/call-back";
import ProfileIcon from "@/public/icons/profile";
import CallBackIcon from "@/public/icons/call-back";
import { ModalType } from "@/components/context/types";
import { useGlobalContext } from "@/components/context/context";

interface INavTab {
  children: ReactNode;
  href?: string;
}

// компонента Header з посиланнями на інші сторінки
export default function Header() {
  const pathname = usePathname();
  const is_active = (link: string) => (pathname === link ? s.active : "");

  // витягаємо потрібні дані і функції з глобального конексту
  const {
    state: { modal, current_user_email },
    setModal,
    setCurrentUserEmail,
  } = useGlobalContext();

  // функція для відкриття профілю юзера
  const toggleUserCard = () =>
    modal?.type !== ModalType.USER_CARD
      ? setModal({ type: ModalType.USER_CARD })
      : setModal(null);

  // функція для відкриття форми зворотнього зв'язку
  const toggleCallBack = () =>
    modal?.type !== ModalType.CALL_BACK
      ? setModal({ type: ModalType.CALL_BACK })
      : setModal(null);

  // функція для виходу з аккаунту
  const logOut = () => {
    signOut();
    setCurrentUserEmail(null);
  };

  // масив з усіма кнопками в хедері
  const navMap: INavTab[][] = [
    [
      {
        children: <>BuddyCode</>,
        href: "/",
      },
      {
        children: <>Заявки</>,
        href: "/requests",
      },
      {
        children: <>Отримати верифікацію</>,
        href: "/verification",
      },
    ],
    [
      {
        children: (
          <div onClick={toggleCallBack}>
            Зворотній зв’язок
            <CallBackIcon />
          </div>
        ),
      },
      {
        children: current_user_email ? (
          <div onClick={logOut}>Вихід</div>
        ) : (
          <>
            Вхід
            <ProfileIcon />
          </>
        ),
        href: current_user_email ? undefined : "/login",
      },
      {
        children: current_user_email ? (
          <ProfileIcon onClick={toggleUserCard} />
        ) : (
          <></>
        ),
      },
    ],
  ];

  // кнопка з логотипом
  const logo = navMap[0][0];

  return (
    <header className={s.header}>
      {/* відображаємо логотип окремо на мобільній версії для відкривання меню */}
      <Link
        href={logo.href!}
        className={is_active(logo.href!) + " " + s.mobileLogo}
      >
        {logo.children}
      </Link>

      {/* рендер всіх кнопок */}
      <div>
        {navMap.map((nav, index) => (
          <nav key={index}>
            {nav.map(({ children, href }, index) => {
              return href ? (
                <Link href={href} className={is_active(href)} key={index}>
                  {children}
                </Link>
              ) : (
                <Fragment key={index}>{children}</Fragment>
              );
            })}
          </nav>
        ))}
      </div>

      <UserCard />

      <CallBack />

      {/* кнопка для відкривання меню */}
      <label className={s.burger}>
        <input type="checkbox" />
      </label>
    </header>
  );
}
