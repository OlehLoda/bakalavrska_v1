import PlusIcon from "@/public/icons/plus";
import s from "./add-guest-modal.module.css";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useGlobalContext } from "@/components/context/context";
import ModalWrapper from "@/components/global/modal-wrapper/modal-wrapper";

interface Props {
  onClose: () => void;
  event_id: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function AddGuestModal({
  onClose,
  event_id,
  setLoading,
}: Props) {
  const { addGuestToEvent } = useGlobalContext();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const guest = (
      e.currentTarget.elements.namedItem("guest") as HTMLInputElement
    ).value;

    addGuestToEvent({ guest, event_id });

    alert("Guest successfully added");

    onClose();

    e.currentTarget.reset();

    return setLoading(true);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form className={s.addGuestModal} onSubmit={onSubmit}>
        <PlusIcon className={s.cross} onClick={onClose} />
        <h2>Add guest</h2>
        <input
          required
          name="guest"
          type="email"
          className="input"
          placeholder="Enter guest email"
        />
        <button type="submit">Submit</button>
      </form>
    </ModalWrapper>
  );
}
