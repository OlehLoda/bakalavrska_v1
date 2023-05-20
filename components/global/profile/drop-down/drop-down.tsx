import { ReactNode, useState } from "react";
import s from "./drop-down.module.css";

interface Props {
  children: ReactNode;
  parent: JSX.Element;
}

export default function DropDown({ children, parent }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className={s.dropDownWrap}>
      <div className={s.parent} onClick={handleOpen}>
        {parent}
      </div>
      {open && <div className={s.children}>{children}</div>}
    </div>
  );
}
