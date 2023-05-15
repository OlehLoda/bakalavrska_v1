import { FormEvent } from "react";
import s from "./verification.module.css";
import { useGlobalContext } from "../context/context";
import Image from "next/image";
import document_icon from "../../public/photos/document.png";
import { IVerification } from "../context/types";
import { useRouter } from "next/navigation";

// компонента Verification вертає форму заявки на верифікацію
export default function Verification() {
  // витягаємо потрібні дані і функції з глобального конексту
  const { findUserData, changeUserData } = useGlobalContext();

  // записуємо дані з хука useRouter в змінну router
  const router = useRouter();

  // функція onSubmit для керування даними форми
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // запобігаємо перезавантаженню сторінки
    e.preventDefault();

    // збираємо елементи форми
    const elements = Array.from(e.currentTarget.elements);

    // ініціалізуємо пустий об'єкт
    const data = {} as IVerification;

    // перебираємо елементи форми та заповнюємо об'єкт data
    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    // перевіряємо чи масив verifications вже існує
    // і можна пушити в нього, чи потрібно створити новий
    const verifications = findUserData("verifications")
      ? [...findUserData("verifications"), data]
      : [data];

    // відправляємо дані форми в глобальний стейт
    changeUserData({ verifications });

    // повідомляємо про успішність виконання
    alert("Ваша заявка збережена");

    // відпраляємо на головну сторінку
    return router.push("/");
  };

  return (
    <div className={s.bg}>
      <form className={s.form} onSubmit={onSubmit}>
        <h2>Пройти верифікацію</h2>
        <input
          required
          placeholder="Mail"
          name="email"
          type="email"
          className={s.input}
        />
        <input
          required
          placeholder="Посада/досвід"
          name="description"
          type="text"
          className={s.input}
        />
        <label className={s.upload}>
          <Image
            src={document_icon.src}
            alt="certificate"
            width={50}
            height={50}
          />
          Завантажити сертифікат
          <input type="file" name="certificate" />
        </label>
        <button type="submit" className={s.submit}>
          Оформити заявку
        </button>
        <a href="https://www.google.com/search?q=%D0%B2+%D0%BC%D0%B5%D0%BD%D0%B5+%D0%B2%D0%B8%D0%BD%D0%B8%D0%BA%D0%BB%D0%B8+%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%B8%2C+%D1%89%D0%BE+%D1%80%D0%BE%D0%B1%D0%B8%D1%82%D0%B8%3F&oq=%D0%B2+%D0%BC%D0%B5%D0%BD%D0%B5+%D0%B2%D0%B8%D0%BD%D0%B8%D0%BA%D0%BB%D0%B8+%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D0%B8%2C+%D1%89%D0%BE+%D1%80%D0%BE%D0%B1%D0%B8%D1%82%D0%B8%3F&aqs=chrome..69i57.12599j0j7&sourceid=chrome&ie=UTF-8">
          Виникли проблеми?
        </a>
      </form>
    </div>
  );
}
