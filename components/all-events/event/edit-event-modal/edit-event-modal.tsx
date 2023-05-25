import PlusIcon from "@/public/icons/plus";
import s from "./edit-event-modal.module.css";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useGlobalContext } from "@/components/context/context";
import ModalWrapper from "@/components/global/modal-wrapper/modal-wrapper";
import { IEvent } from "@/components/context/types";

interface Props {
  onClose: () => void;
  event: IEvent;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function EditEventModal({ onClose, event, setLoading }: Props) {
  const { editEvent } = useGlobalContext();
  const { name, time, location, description, id: event_id } = event;
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const new_info: Partial<IEvent> = {
      id: event_id,
    };

    Array.from(e.currentTarget.elements)
      .filter(
        (el) =>
          (el as HTMLInputElement).name.length > 0 &&
          (el as HTMLInputElement).value.length > 0
      )
      .map((el) => {
        const { name, value } = el as HTMLInputElement;
        new_info[name] = value;
      });

    editEvent(new_info);

    alert("Event successfully edited");

    onClose();

    e.currentTarget.reset();

    return setLoading(true);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form className={s.editEventModal} onSubmit={onSubmit}>
        <PlusIcon className={s.cross} onClick={onClose} />
        <h2>Edit event</h2>
        <input
          name="name"
          type="text"
          defaultValue={name}
          className="input"
          placeholder="Event name"
        />
        <input
          defaultValue={time}
          name="time"
          type="datetime-local"
          max="2028-12-31T23:59"
          className="input"
          placeholder="Event date"
        />
        <input
          name="location"
          defaultValue={location}
          type="text"
          className="input"
          placeholder="Event address"
        />
        <textarea
          name="description"
          defaultValue={description}
          className="input"
          placeholder="Event address"
          rows={5}
        />
        <button type="submit">Submit</button>
      </form>
    </ModalWrapper>
  );
}
