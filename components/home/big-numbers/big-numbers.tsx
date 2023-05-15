import s from "./big-numbers.module.css";

// компонента BigNumbers зі списком наших досягнень
export default function BigNumbers() {
  return (
    <ul className={s.ul}>
      <li>
        <p className={s.number}>3</p>
        <p className={s.description}>
          РОКИ
          <br />
          ДОСВІДУ
        </p>
      </li>
      <li>
        <p className={s.number}>300+</p>
        <p className={s.description}>
          ЗАДОВОЛЕНИХ
          <br />
          КЛІЄНТІВ
        </p>
      </li>
      <li>
        <p className={s.number}>20</p>
        <p className={s.description}>
          ПРОФЕСІОНАЛІВ
          <br />
          ГОТОВИХ
          <br />
          ДОПОМОГТИ
        </p>
      </li>
    </ul>
  );
}
