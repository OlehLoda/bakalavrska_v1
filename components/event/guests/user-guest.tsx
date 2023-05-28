import Image from "next/image";
import s from "./guests.module.css";
import AvatarIcon from "@/public/icons/avatar";
import { IUser } from "@/components/context/types";
import DeleteGuestIcon from "@/public/icons/delete-guest";
import { useGlobalContext } from "@/components/context/context";

interface Props {
  user: IUser;
  is_owner: boolean;
  onDelete: () => void;
}

export default function UserGuest({ user, is_owner, onDelete }: Props) {
  const {
    state: { current_user_email },
  } = useGlobalContext();
  const { name, email, image } = user;

  const is_me = email === current_user_email;

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
      {is_owner && !is_me && (
        <DeleteGuestIcon className={s.delete} onClick={onDelete} />
      )}
    </div>
  );
}
