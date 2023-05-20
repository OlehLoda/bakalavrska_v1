import Link from "next/link";
import s from "./header.module.css";
import { CSSProperties } from "react";

export default function Logo() {
  const letters = ["E", "a", "s", "y", "E", "v", "e", "n", "t", "s"];
  return (
    <div className={s.logo}>
      {letters.map((letter, index) => (
        <span key={index} style={{ "--i": index } as CSSProperties}>
          {letter}
        </span>
      ))}
    </div>
  );
}
