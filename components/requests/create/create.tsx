import s from "./create.module.css";
import PlusIcon from "../../../public/icons/plus";
import { ModalType } from "@/components/context/types";
import { useGlobalContext } from "@/components/context/context";

// компонента Create, повертає кнопку для виклику вікна створення заявки
export default function Create() {
  // витягаємо потрібні функції з глобального конексту
  const { setModal } = useGlobalContext();

  // функція для виклику вікна створення заявки
  const createRequestForm = () =>
    setModal({ type: ModalType.CREATE_REQUEST_FORM });

  return (
    <div className={s.create} onClick={createRequestForm}>
      <p>Оформити заявку!</p>
      <PlusIcon />
    </div>
  );
}
