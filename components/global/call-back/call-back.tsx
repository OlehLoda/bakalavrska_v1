"use client";
import { FormEvent } from "react";
import s from "./call-back.module.css";
import { useGlobalContext } from "@/components/context/context";
import { ICallback, ModalType } from "@/components/context/types";

export default function CallBack() {
  // витягаємо потрібні дані і функції з глобального конексту
  const {
    state: { modal },
    setModal,
    findUserData,
    changeUserData,
  } = useGlobalContext();

  // функція onSubmit для обробки даних форми зворотнього зв'язку
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // запобігає перезавантаженню вікна
    e.preventDefault();

    // збираємо всі елементи форми
    const elements = Array.from(e.currentTarget.elements);

    // ініціалізуємо пустий об'єкт
    const data = {} as ICallback;

    // перебираємо всі елементи форми і записуємо їх дані в об'єкт data
    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    // перевіряємо, чи вже створений масив callbacks в нашого юзера,
    // якшо так, то допушуємо в нього, якщо ні створюємо новий
    const callbacks = findUserData("callbacks")
      ? [...findUserData("callbacks"), data]
      : [data];

    // передаємо змінений масив callbacks в стейт
    changeUserData({ callbacks });

    alert("Ваше звернення збережене");

    // закриваємо вікно зворотнього зв'язку
    return setModal(null);
  };

  // функція close для закриття вікна зворотнього зв'язку
  const close = () => setModal(null);

  // поветраємо вікно зворотнього зв'язку, якщо тип modal правильний
  return modal?.type === ModalType.CALL_BACK ? (
    <div className={s.bg + " " + s.weight} onClick={close}>
      <form
        onReset={close}
        className={s.wrap}
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Зворотній зв’язок</h2>
        <input
          required
          placeholder="Ім’я"
          name="name"
          type="text"
          className={s.input}
        />
        <input
          required
          placeholder="Пошта"
          name="email"
          type="email"
          className={s.input}
        />
        <textarea
          rows={3}
          required
          maxLength={240}
          name="description"
          className={s.input}
          placeholder="Опис проблеми"
        />
        <button type="submit" className={s.submit}>
          Надіслати
        </button>
        <button type="reset" className={s.cross} />
      </form>
    </div>
  ) : (
    <></>
  );
}
