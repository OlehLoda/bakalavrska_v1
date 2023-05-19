"use client";
import Image from "next/image";
import s from "./user-card.module.css";
import AvatarIcon from "@/public/icons/avatar";
import ExclamationIcon from "@/public/icons/exclamation";
import { useGlobalContext } from "@/components/context/context";
import { ModalType } from "@/components/context/types";

export default function UserCard() {
  const {
    state: { current_user_email, modal },
    setModal,
    findUserData,
    changeUserData,
  } = useGlobalContext();
  if (!current_user_email) return <></>;

  const balance = findUserData("balance"),
    image = findUserData("image"),
    name = findUserData("name"),
    email = findUserData("email");

  const withdraw = () => {
    const newBalance = balance !== 0 ? balance - 50 : 0;
    return changeUserData({ balance: newBalance });
  };

  const deposit = () => {
    const newBalance = balance + 50;
    return changeUserData({ balance: newBalance });
  };

  const close = () => setModal(null);

  return modal?.type === ModalType.USER_CARD ? (
    <div className={s.bg + " " + s.weight} onClick={close}>
      <div className={s.userCard} onClick={(e) => e.stopPropagation()}>
        {image ? (
          <Image
            width={74}
            height={74}
            src={image}
            alt="Google avatar"
            className={s.avatar}
          />
        ) : (
          <AvatarIcon className={s.avatar} width={74} height={74} />
        )}
        <h3 className={s.name}>{name}</h3>
        <p className={s.email}>{email}</p>
        <div className={s.balance}>
          <p>Баланс</p>
          <p>{balance} UAH</p>
        </div>
        <div className={s.buttons}>
          <button onClick={withdraw}>Вивести</button>
          <button onClick={deposit}>Поповнити</button>
        </div>
        <div className={s.notifications}>
          <p>Немає активних сповіщень</p>
          <ExclamationIcon />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
