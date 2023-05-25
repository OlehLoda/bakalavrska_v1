import s from "./guests.module.css";
import UserGuest from "./user-guest";
import { useGlobalContext } from "@/components/context/context";

interface Props {
  guests: string[];
  is_owner: boolean;
  toggleAddGuests: () => void;
}

export default function Guests({ guests, is_owner, toggleAddGuests }: Props) {
  const { findUser } = useGlobalContext();
  return (
    <div className={s.guests}>
      <h2>Event guests</h2>
      {guests.length > 0 &&
        guests.map((guest, index) => {
          const user = findUser(guest);
          return user ? (
            <UserGuest user={user} is_owner={is_owner} key={index} />
          ) : (
            <p className={s.guest} key={index}>
              {guest}
            </p>
          );
        })}
      {is_owner && (
        <button className="submit" onClick={toggleAddGuests}>
          Invite guests
        </button>
      )}
    </div>
  );
}
