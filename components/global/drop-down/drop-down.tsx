import { ReactNode } from "react";
import s from "./drop-down.module.css";

interface Props {
  children: ReactNode;
  parent: JSX.Element;
  active?: boolean;
  setActive?: () => void;
}

export default function DropDown({
  active,
  parent,
  children,
  setActive,
}: Props) {
  return (
    <div className={s.dropDownWrap}>
      <div
        className={`${s.parent} ${active ? s.opened : ""}`}
        onClick={({ currentTarget: { classList } }) =>
          !!setActive ? setActive() : classList.toggle(s.opened)
        }
      >
        {parent}
      </div>
      <div className={s.children}>{children}</div>
    </div>
  );
}
