import { Dispatch, SetStateAction, useState } from "react";
import s from "./guests.module.css";
import UserGuest from "./user-guest";
import { useGlobalContext } from "@/components/context/context";
import DeleteGuestIcon from "@/public/icons/delete-guest";
import DeleteGuestModal from "../delete-guest-modal/delete-guest-modal";
import { IEvent } from "@/components/context/types";

interface Props {
  guests: string[];
  event: IEvent;
  is_owner: boolean;
  toggleAddGuests: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function Guests({
  guests,
  event,
  is_owner,
  setLoading,
  toggleAddGuests,
}: Props) {
  const {
    state: { current_user_email },
    findUser,
  } = useGlobalContext();

  const [deleteThisGuest, setDeleteThisGuest] = useState<string | null>(null);

  return (
    <div className={s.guests}>
      <h2>Event guests</h2>
      {guests.length > 0 &&
        guests.map((guest, index) => {
          const user = findUser(guest);
          const isOwner = event.owner_id === findUser(guest)?.id;
          return user ? (
            <UserGuest
              user={user}
              key={index}
              is_owner={isOwner}
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
          event_id={event.id}
          guest={deleteThisGuest}
          onClose={() => setDeleteThisGuest(null)}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
