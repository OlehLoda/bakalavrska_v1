import Image from "next/image";
import s from "./guests.module.css";
import AvatarIcon from "@/public/icons/avatar";
import { IUser } from "@/components/context/types";

interface Props {
  user: IUser;
  is_owner: boolean;
}

export default function UserGuest({ user, is_owner }: Props) {
  const { name, email, image } = user;
  return (
    <div className={`${s.guest} ${s.user}`}>
      {image ? (
        <Image
          width={70}
          src={image}
          height={70}
          alt="user avatar"
          className={s.avatar}
        />
      ) : (
        <AvatarIcon className={s.avatar} />
      )}
      <p className={s.name}>
        {name} {is_owner && <span>(Event owner)</span>}
      </p>
      <p className={s.email}>{email}</p>
    </div>
  );
}
