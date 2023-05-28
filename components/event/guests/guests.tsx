import { Dispatch, SetStateAction, useState } from "react";
import s from "./guests.module.css";
import UserGuest from "./user-guest";
import { useGlobalContext } from "@/components/context/context";
import DeleteGuestIcon from "@/public/icons/delete-guest";
import DeleteGuestModal from "../delete-guest-modal/delete-guest-modal";

interface Props {
  guests: string[];
  event_id: string;
  is_owner: boolean;
  toggleAddGuests: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Guests({
  guests,
  event_id,
  is_owner,
  setLoading,
  toggleAddGuests,
}: Props) {
  const { findUser } = useGlobalContext();

  const [deleteThisGuest, setDeleteThisGuest] = useState<string | null>(null);

  return (
    <div className={s.guests}>
      <h2>Event guests</h2>
      {guests.length > 0 &&
        guests.map((guest, index) => {
          const user = findUser(guest);
          return user ? (
            <UserGuest
              user={user}
              is_owner={is_owner}
              key={index}
              onDelete={() => setDeleteThisGuest(guest)}
            />
          ) : (
            <p className={s.guest} key={index}>
              {guest}
              {is_owner && (
                <DeleteGuestIcon
                  className={s.delete}
                  onClick={() => setDeleteThisGuest(guest)}
                />
              )}
            </p>
          );
        })}
      {is_owner && (
        <button className="submit" onClick={toggleAddGuests}>
          Invite guests
        </button>
      )}
      {deleteThisGuest && (
        <DeleteGuestModal
          event_id={event_id}
          guest={deleteThisGuest}
          onClose={() => setDeleteThisGuest(null)}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
