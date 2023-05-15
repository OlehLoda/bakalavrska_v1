import s from "./list.module.css";
import clock from "../../../../public/photos/clock.png";
import document from "../../../../public/photos/document.png";
import man from "../../../../public/photos/man.png";
import money from "../../../../public/photos/money.png";
import Image from "next/image";

// інтерфейс об'єкту для масиву
interface IListItem {
  image: JSX.Element;
  text: string;
}

export default function List() {
  // масив даних для списку "Як це працює"
  const arr: IListItem[] = [
    {
      image: <Image src={document} alt="document icon" />,
      text: "Ви подаєте заявку иа залишаєту контакти",
    },
    {
      image: <Image src={man} alt="man icon" />,
      text: "Фахівець розглядає вашу проблему та допомагає з завданням",
    },
    {
      image: <Image src={clock} alt="clock icon" />,
      text: "Ви щасливі повертаєтесь до своєї роботи",
    },
    {
      image: <Image src={money} alt="money icon" />,
      text: "Фахівець отримує гроші за виконану роботу",
    },
  ];

  return (
    <ul className={s.list}>
      {/* рендер списку */}
      {arr.map(({ image, text }, index) => (
        <li key={index}>
          <h3>{index + 1}</h3>
          {image}
          <p>{text}</p>
        </li>
      ))}
    </ul>
  );
}
