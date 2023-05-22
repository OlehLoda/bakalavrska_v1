import { FormEvent } from "react";
import s from "./create-event.module.css";
import { v4 } from "uuid";
import { IEvent } from "../context/types";
import { useGlobalContext } from "../context/context";

export default function CreateEvent() {
  const { state, findUserData, changeUserData } = useGlobalContext();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const new_event_info: IEvent = {
      event_name: "",
      event_time: new Date(),
      event_location: "",
      id: v4(),
    };

    Array.from(e.currentTarget.elements)
      .filter((el) => (el as HTMLInputElement).name.length > 0)
      .forEach((element) => {
        const el = element as HTMLInputElement;
        new_event_info[el.name] =
          el.name === "date" ? el.valueAsDate! : el.value;
      });

    const old_events: IEvent[] = findUserData("events");

    changeUserData({ data: { events: [...old_events, new_event_info] } });

    console.log(new_event_info);

    return alert("Event successfully created");
  };

  return (
    <div className="bg">
      <form className="form" onSubmit={onSubmit}>
        <h2>Create event</h2>
        <label className={s.label}>
          Enter event name
          <input
            className="input"
            required
            type="text"
            placeholder="Event name"
            name="event_name"
          />
        </label>
        <label className={s.label}>
          Enter event date and time
          <input
            className="input"
            required
            type="datetime-local"
            name="event_time"
            max="2028-12-31T23:59"
          />
        </label>
        <label className={s.label}>
          Enter event location
          <input
            className="input"
            required
            type="text"
            placeholder="Event location"
            name="event_location"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
