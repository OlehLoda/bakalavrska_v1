import { FormEvent } from "react";
import s from "./create-event.module.css";
import { v4 } from "uuid";
import { IAllEvents, IEvent } from "../context/types";
import { useGlobalContext } from "../context/context";

export default function CreateEvent() {
  const { state, findUserData, changeUserData, createEvent } =
    useGlobalContext();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const new_event_info: IEvent = {
      name: "",
      time: new Date(),
      location: "",
      description: "",
      id: v4(),
      owner_id: findUserData("id"),
      guests: [],
    };

    Array.from(e.currentTarget.elements)
      .filter((el) => (el as HTMLInputElement).name.length > 0)
      .forEach((element) => {
        const el = element as HTMLInputElement;
        new_event_info[el.name] =
          el.name === "date" ? el.valueAsDate! : el.value;
      });

    createEvent(new_event_info);

    alert("Event successfully created");

    return e.currentTarget.reset();
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
            name="name"
          />
        </label>
        <label className={s.label}>
          Enter event date and time
          <input
            className="input"
            required
            type="datetime-local"
            name="time"
            max="2028-12-31T23:59"
          />
        </label>
        <label className={s.label}>
          Enter event address
          <input
            className="input"
            required
            type="text"
            placeholder="Event address"
            name="location"
          />
        </label>
        <label className={s.label}>
          Enter event description
          <textarea
            className="input"
            placeholder="Event description"
            name="description"
            rows={5}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
