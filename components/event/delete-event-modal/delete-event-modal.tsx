import PlusIcon from "@/public/icons/plus";
import s from "./delete-event-modal.module.css";
import { Dispatch, SetStateAction } from "react";
import { useGlobalContext } from "@/components/context/context";
import ModalWrapper from "@/components/global/modal-wrapper/modal-wrapper";
import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
  event_id: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteGuestModal({
  onClose,
  event_id,
  setLoading,
}: Props) {
  const { deleteEvent } = useGlobalContext();
  const router = useRouter();

  const deleteEventFunc = () => {
    onClose();
    setLoading(true);
    deleteEvent(event_id);
    alert("Event was successfully deleted");
    return router.push("/all-events");
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onReset={onClose}
        onSubmit={deleteEventFunc}
        className={s.deleteEventModal}
      >
        <PlusIcon className={s.cross} onClick={onClose} />
        <h2>Are you sure you want to delete this event?</h2>
        <div>
          <button type="reset" className="submit">
            Cancel
          </button>
          <button autoFocus type="submit" className="reset">
            Delete
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
