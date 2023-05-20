"use client";
import Link from "next/link";
import s from "./header.module.css";
import { signOut } from "next-auth/react";
import { ReactNode, Fragment, useRef } from "react";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/components/context/context";
import Logo from "./logo";
import ProfileIcon from "@/public/icons/profile";
import CreateNewIcon from "@/public/icons/create-new";
import AllEventsIcon from "@/public/icons/all-events";

interface INavTab {
  children: ReactNode;
  href: string;
}

export default function Header() {
  const pathname = usePathname();
  const is_active = (link: string) => (pathname === link ? s.active : "");

  const {
    state: { current_user_email },
  } = useGlobalContext();

  const navMap: INavTab[] = [
    {
      children: (
        <>
          <AllEventsIcon />
          <p>All events</p>
        </>
      ),
      href: "/all-events",
    },
    {
      children: (
        <>
          <CreateNewIcon />
          <p>Create event</p>
        </>
      ),
      href: "/create-event",
    },
    {
      children: (
        <>
          <ProfileIcon />
          <p>Profile</p>
        </>
      ),
      href: "/profile",
    },
  ];

  const headerRef = useRef<HTMLElement>(null);

  const toggleHeader = () => headerRef.current?.classList.toggle(s.small);

  if (!current_user_email) return <i />;

  return (
    <header className={s.header} ref={headerRef}>
      <Logo />
      {navMap.map(({ children, href }, index) => (
        <Link href={href} key={index}>
          <div className={`${s.link} ${is_active(href)}`}>{children}</div>
        </Link>
      ))}
      <button className={s.toggleHeader} onClick={toggleHeader} />
    </header>
  );
}
