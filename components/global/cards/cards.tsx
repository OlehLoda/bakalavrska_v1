import s from "./cards.module.css";
import cards from "../../../public/photos/cards.png";
import Image from "next/image";

// компонента Cards для відображення способів оплати під футером
export default function Cards() {
  return (
    <div className={s.bottom}>
      <div>
        <Image
          src={cards.src}
          alt="cards"
          width={cards.width}
          height={cards.height}
        />
      </div>
    </div>
  );
}
