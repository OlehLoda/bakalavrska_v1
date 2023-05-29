import { SVGProps } from "react";
import s from "./icons.module.css";

interface Props {
  className: string;
  showed: boolean;
  onClick: () => void;
}

export default function EyeIcon({ className, showed, onClick }: Props) {
  return (
    <svg
      fill="none"
      strokeWidth="2"
      stroke="#000000"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ""}
      onClick={onClick}
    >
      <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z" />
      <circle cx="12" cy="12" r="3" />
      <path
        d="M3 21L20 4"
        className={`${s.eyeCrosser} ${showed ? s.crossed : ""}`}
      />
    </svg>
  );
}
