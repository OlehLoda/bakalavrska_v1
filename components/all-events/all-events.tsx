import { useState } from "react";
import s from "./all-events.module.css";
import EventItem from "./event-item/event-item";
import { useGlobalContext } from "../context/context";
import { Category, IAllEvents } from "../context/types";

export default function AllEvents() {
  const { findUserData } = useGlobalContext();
  const [category, setCategory] = useState<Category>(Category.MY_EVENTS);

  const events: IAllEvents = findUserData("events");

  const events_by_category = events[category] || [];

  return (
    <div className="bg">
      <div className="form">
        <h1 className={s.h1}>AllEvents</h1>
        <div className={s.categories}>
          {Object.values(Category).map((name) => (
            <p
              key={name}
              className={name === category ? s.active : ""}
              onClick={() => setCategory(name)}
            >
              {name.replace(/_/gi, " ")}
            </p>
          ))}
        </div>
        {events_by_category.length > 0 ? (
          events_by_category.map((event) => {
            return <EventItem {...event} key={event.id} />;
          })
        ) : (
          <h2>You don't have any events in this category yet.</h2>
        )}
      </div>
    </div>
  );
}
