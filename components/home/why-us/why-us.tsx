import s from "./why-us.module.css";
import photo from "../../../public/photos/photo.jpg";
import Image from "next/image";

// компонента WhyUs, яка вертає заголовок та параграф з фото
export default function WhyUs() {
  return (
    <div className={s.wrap}>
      <h2>Все ще виникає питання чому ми ?</h2>
      <div>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio.{" "}
        </p>
        <Image src={photo} alt="photo" priority className={s.image} />
      </div>
    </div>
  );
}
