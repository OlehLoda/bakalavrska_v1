import moment from "moment";
import s from "./event.module.css";
import Guests from "./guests/guests";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IEvent } from "@/components/context/types";
import AddGuestModal from "./add-guest-modal/add-guest-modal";
import { useGlobalContext } from "@/components/context/context";
import EditIcon from "@/public/icons/edit";
import EditEventModal from "./edit-event-modal/edit-event-modal";

export default function Event() {
  const {
    state: { current_user_email },
    findUser,
    getEventById,
  } = useGlobalContext();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<IEvent | null>(null);
  const event_id = (params?.["event_id"] as string) || null;
  const [addGuestsOpen, setAddGuestsOpen] = useState<boolean>(false);
  const [editEventOpen, setEditEventOpen] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    } else {
      event_id && setEvent(getEventById(event_id) || null);
    }
  }, [loading, event_id]);

  const toggleAddGuests = () => setAddGuestsOpen((prev) => !prev);
  const toggleEditEvent = () => setEditEventOpen((prev) => !prev);

  if (!event) return <div className="bg">Loading...</div>;

  const { name, location, time, guests, description, id, owner_id } = event;

  const date = moment(time).format("DD.MM.YYYY HH:mm");

  const is_owner = owner_id === findUser(current_user_email!)?.id;

  return (
    <div className="bg">
      <div className="form">
        {is_owner && <EditIcon onClick={toggleEditEvent} className={s.edit} />}
        <h1>{name}</h1>
        <label>
          Date:
          <p className={s.date}>{date}</p>
        </label>
        <label>
          Location:
          <p className={s.location}>{location}</p>
        </label>
        <label>
          Description:
          <p className={s.description}>{description}</p>
        </label>
        <Guests
          guests={guests}
          is_owner={is_owner}
          toggleAddGuests={toggleAddGuests}
        />
        {editEventOpen && (
          <EditEventModal
            event={event}
            setLoading={setLoading}
            onClose={toggleEditEvent}
          />
        )}
        {addGuestsOpen && (
          <AddGuestModal
            event_id={id}
            setLoading={setLoading}
            onClose={toggleAddGuests}
          />
        )}
      </div>
    </div>
  );
}
