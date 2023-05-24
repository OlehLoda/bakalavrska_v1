import { ReactNode } from "react";
import s from "./modal-wrapper.module.css";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export default function ModalWrapper({ children, onClose }: Props) {
  return (
    <div className={s.bg} onClick={onClose}>
      <div className={s.body} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
