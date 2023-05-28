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
    deleteEvent(event_id);
    onClose();
    setLoading(true);

    alert("Event was successfully deleted");

    return router.push("/all-events");
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className={s.deleteEventModal}>
        <PlusIcon className={s.cross} onClick={onClose} />
        <h2>Are you sure you want to delete this event?</h2>
        <div>
          <button className="submit" onClick={onClose}>
            Cancel
          </button>
          <button className="reset" onClick={deleteEventFunc}>
            Delete
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
