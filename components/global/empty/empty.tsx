import s from "./empty.module.css";

export default function Empty({
  text = "First you need to authorize",
}: {
  text?: string;
}) {
  return <div className={s.empty}>{text}</div>;
}
