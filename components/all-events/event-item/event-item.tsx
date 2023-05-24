import moment from "moment";
import s from "./event-item.module.css";
import { IEvent } from "@/components/context/types";

export default function EventItem(event: IEvent) {
  const { name, time, location, id } = event;
  const date = moment(time).format("DD.MM.YYYY HH:mm");

  return (
    <div className={s.event}>
      <a href={`/event/${id}`}>
        <h2 className={s.name}>{name}</h2>
      </a>
      <p className={s.date}>{date}</p>
      <a href={location} target="_blank" className={s.location}>
        Location
      </a>
    </div>
  );
}
