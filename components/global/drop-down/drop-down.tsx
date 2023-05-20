import { ReactNode } from "react";
import s from "./drop-down.module.css";

interface Props {
  children: ReactNode;
  parent: JSX.Element;
}

export default function DropDown({ children, parent }: Props) {
  return (
    <div className={s.dropDownWrap}>
      <div
        className={s.parent}
        onClick={({ currentTarget: { classList } }) =>
          classList.toggle(s.opened)
        }
      >
        {parent}
      </div>
      <div className={s.children}>{children}</div>
    </div>
  );
}
