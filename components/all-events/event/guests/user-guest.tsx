import { IUser } from "@/components/context/types";
import s from "./guests.module.css";
import Image from "next/image";
import AvatarIcon from "@/public/icons/avatar";

export default function UserGuest({ name, email, image }: IUser) {
  return (
    <div className={`${s.guest} ${s.user}`}>
      {image ? (
        <Image
          className={s.avatar}
          src={image}
          alt="user avatar"
          width={70}
          height={70}
        />
      ) : (
        <AvatarIcon className={s.avatar} />
      )}
      <p className={s.name}>{name}</p>
      <p className={s.email}>{email}</p>
    </div>
  );
}
