import s from "./home.module.css";
import Logo from "../global/header/logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg">
      <div className="form">
        <h1 className={s.h1}>
          This is main page of <Logo /> app
        </h1>
        <p>
          You can create event by pressing{" "}
          <Link href="/create-event">"Create event"</Link> button in the
          left-side menu
        </p>
      </div>
    </div>
  );
}
