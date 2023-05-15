import s from "./empty.module.css";

// компонента Empty для відображення пустої сторінки з текстом
export default function Empty({
  text = "Щоб переглянути цю сторінку, вам потрібно авторизуватися",
}: {
  text?: string;
}) {
  return <div className={s.empty}>{text}</div>;
}
