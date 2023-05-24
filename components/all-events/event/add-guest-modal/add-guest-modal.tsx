import ModalWrapper from "@/components/global/modal-wrapper/modal-wrapper";
import s from "./add-guest-modal.module.css";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useGlobalContext } from "@/components/context/context";

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

    const guest_email = (
      e.currentTarget.elements.namedItem("guest_email") as HTMLInputElement
    ).value;

    addGuestToEvent({ guest_email, event_id });

    alert("Guest successfully added");

    onClose();

    e.currentTarget.reset();

    return setLoading(true);
  };
  return (
    <ModalWrapper onClose={onClose}>
      <form className={s.addGuestModal} onSubmit={onSubmit}>
        <h2>Add guest</h2>
        <input
          name="guest_email"
          type="email"
          className="input"
          placeholder="Enter guest email"
        />
        <button type="submit">Submit</button>
      </form>
    </ModalWrapper>
  );
}
