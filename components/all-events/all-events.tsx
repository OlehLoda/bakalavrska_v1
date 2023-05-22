import moment from "moment";
import { useGlobalContext } from "../context/context";
import { IEvent } from "../context/types";
import s from "./all-events.module.css";

export default function AllEvents() {
  const { state, findUserData } = useGlobalContext();

  const events: IEvent[] = findUserData("events");

  return (
    <div className="bg">
      <div className="form">
        <h1 className={s.h1}>AllEvents</h1>
        {events.length > 0 ? (
          events.map(({ event_name, event_time, event_location, id }) => {
            const date = moment(event_time).format("DD.MM.YYYY HH:mm");
            return (
              <div key={id}>
                <h2>{event_name}</h2>
                <p>{date}</p>
                <p>{event_location}</p>
              </div>
            );
          })
        ) : (
          <h2>
            You don't have any events yet. You can create it by pressing "Create
            event" button in menu
          </h2>
        )}
      </div>
    </div>
  );
}
