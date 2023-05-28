import PlusIcon from "@/public/icons/plus";
import s from "./delete-guest-modal.module.css";
import { Dispatch, SetStateAction } from "react";
import { useGlobalContext } from "@/components/context/context";
import ModalWrapper from "@/components/global/modal-wrapper/modal-wrapper";

interface Props {
  onClose: () => void;
  event_id: string;
  guest: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteGuestModal({
  onClose,
  event_id,
  guest,
  setLoading,
}: Props) {
  const { deleteGuestFromEvent } = useGlobalContext();

  const deleteGuest = () => {
    deleteGuestFromEvent({ event_id, guest });
    onClose();
    setLoading(true);

    return alert("Guest was successfully deleted");
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className={s.deleteGuestModal}>
        <PlusIcon className={s.cross} onClick={onClose} />
        <h2>Are you sure you want to delete this guest?</h2>
        <div>
          <button className="submit" onClick={onClose}>
            Cancel
          </button>
          <button className="reset" onClick={deleteGuest}>
            Delete
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
