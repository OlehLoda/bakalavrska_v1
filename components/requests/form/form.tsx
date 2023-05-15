import s from "./form.module.css";
import { FormEvent, useState } from "react";
import { useGlobalContext } from "@/components/context/context";
import { IRequest, ModalType } from "@/components/context/types";

// компонента Form, повертає вфкно з формою створення заявки
export default function Form() {
  // витягаємо потрібні дані і функції з глобального конексту
  const {
    state: { modal },
    setModal,
    changeUserData,
    findUserData,
  } = useGlobalContext();

  // стейт для запису приоритетності заявки
  const [priority, setPriority] = useState(0);

  // генеруємо масив для створення крапочок приоритетності
  const dots = Array.from({ length: 10 }, (_, index) => index + 1);

  // функція onSubmit для керування даними форми
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // запобігаємо перезавантаженню сторінки
    e.preventDefault();
    // запобігаємо закриванню вікна форми, під час кліку на фон
    e.stopPropagation();

    // збираємо елементи форми
    const elements = Array.from(e.currentTarget.elements);

    // ініціалізуємо пустий об'єкт
    const data: Record<string, string | number> = {};

    // перебираємо елементи форми та заповнюємо об'єкт data
    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    // вираховуємо ціну заявки
    const price = Math.max(priority * 50, 50);

    // створюємо об'єкт заявки з даними з форми
    const final_data = {
      ...data,
      priority,
      price,
    } as IRequest;

    // перевіряємо чи масив requests вже існує
    // і можна пушити в нього, чи потрібно створити новий
    const new_requests = findUserData("requests")
      ? [...findUserData("requests"), final_data]
      : [final_data];

    // відправляємо дані форми в глобальний стейт
    changeUserData({ requests: new_requests });

    // закриваємо вікно форми
    return close();
  };

  // функція для закривання вікна форми
  const close = () => setModal(null);

  // якщо тип modal правильний, вертаємо вікно форми
  return modal?.type === ModalType.CREATE_REQUEST_FORM ? (
    <div className={s.bg} onClick={close}>
      <form
        onReset={close}
        className={s.wrap}
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Заповніть бланк для опрацювання проблеми</h2>
        <input
          required
          placeholder="Ім’я"
          name="name"
          type="text"
          className={s.input}
        />
        <input
          required
          placeholder="Тема"
          name="title"
          type="text"
          className={s.input}
        />
        <textarea
          required
          rows={3}
          maxLength={240}
          name="description"
          className={s.input}
          placeholder="Опис роботи"
        />
        <div>
          <p>Рівень терміновості</p>
          <p>{priority}/10</p>
        </div>

        {/* рендер крапочок приоритетності */}
        <div>
          {dots.map((dot, index) => {
            const is_active = dot <= priority ? s.active : "";
            return (
              <span
                className={s.dot + " " + is_active}
                onClick={() => setPriority(dot)}
                key={index}
              />
            );
          })}
        </div>
        <button type="submit" className={s.submit}>
          Оформити заявку
        </button>
        <button type="reset" className={s.cross} />
      </form>
    </div>
  ) : (
    <></>
  );
}
