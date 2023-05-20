"use client";
import Logo from "./logo";
import Link from "next/link";
import s from "./header.module.css";
import { ReactNode, useRef } from "react";
import { usePathname } from "next/navigation";
import ProfileIcon from "@/public/icons/profile";
import CreateNewIcon from "@/public/icons/create-new";
import AllEventsIcon from "@/public/icons/all-events";
import { useGlobalContext } from "@/components/context/context";

interface INavTab {
  children: ReactNode;
  href: string;
}

export default function Header() {
  const {
    state: { current_user_email },
  } = useGlobalContext();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  if (!current_user_email) return <i />;

  const is_active = (link: string) => (pathname === link ? s.active : "");

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

  const toggleHeader = () => headerRef.current?.classList.toggle(s.small);

  return (
    <header className={s.header} ref={headerRef}>
      <Link href="/">
        <Logo />
      </Link>
      {navMap.map(({ children, href }, index) => (
        <Link href={href} key={index}>
          <div className={`${s.link} ${is_active(href)}`}>{children}</div>
        </Link>
      ))}
      <button className={s.toggleHeader} onClick={toggleHeader} />
    </header>
  );
}
