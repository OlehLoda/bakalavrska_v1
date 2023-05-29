import moment from "moment";
import s from "./event.module.css";
import Guests from "./guests/guests";
import EditIcon from "@/public/icons/edit";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteIcon from "@/public/icons/delete";
import { IEvent } from "@/components/context/types";
import AddGuestModal from "./add-guest-modal/add-guest-modal";
import { useGlobalContext } from "@/components/context/context";
import EditEventModal from "./edit-event-modal/edit-event-modal";
import DeleteEventModal from "./delete-event-modal/delete-event-modal";
import { useRouter } from "next/router";

enum Modal {
  addGuests,
  editEvent,
  deleteEvent,
}

export default function Event() {
  const {
    state: { current_user_email },
    findUser,
    getEventById,
  } = useGlobalContext();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<IEvent | undefined>(undefined);
  const event_id = (params?.["event_id"] as string) || null;

  const [modal, setModal] = useState<Modal | null>(null);

  useEffect(() => {
    if (loading && event_id) {
      setLoading(false);
    } else {
      event_id && setEvent(getEventById(event_id));
    }
  }, [loading, event_id]);

  if (!event) return <div className="bg">Loading...</div>;

  const { name, location, time, guests, description, id, owner_id } = event;

  const date = moment(time).format("DD.MM.YYYY HH:mm");

  const is_owner = owner_id === findUser(current_user_email!)?.id;

  return (
    <div className="bg">
      <div className="form">
        {is_owner && (
          <EditIcon
            onClick={() => setModal(Modal.editEvent)}
            className={s.edit}
          />
        )}
        {is_owner && (
          <DeleteIcon
            onClick={() => setModal(Modal.deleteEvent)}
            className={s.delete}
          />
        )}
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
          event_id={id}
          guests={guests}
          is_owner={is_owner}
          setLoading={setLoading}
          toggleAddGuests={() => setModal(Modal.addGuests)}
        />
        {modal === Modal.editEvent && (
          <EditEventModal
            event={event}
            setLoading={setLoading}
            onClose={() => setModal(null)}
          />
        )}
        {modal === Modal.addGuests && (
          <AddGuestModal
            event_id={id}
            setLoading={setLoading}
            onClose={() => setModal(null)}
          />
        )}
        {modal === Modal.deleteEvent && (
          <DeleteEventModal
            event_id={id}
            setLoading={setLoading}
            onClose={() => setModal(null)}
          />
        )}
      </div>
    </div>
  );
}
