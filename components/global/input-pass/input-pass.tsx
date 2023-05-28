import EyeIcon from "@/public/icons/eye";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import s from "./input-pass.module.css";

export default function InputPass(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  const [passwordType, setPasswordType] = useState<boolean>(false);

  return (
    <div className={s.inputContainer}>
      <input
        minLength={8}
        type={passwordType ? "text" : "password"}
        className="input"
        placeholder="Password"
        {...props}
      />
      <EyeIcon
        className={s.eye}
        crossed={passwordType}
        onClick={() => setPasswordType((prev) => !prev)}
      />
    </div>
  );
}
