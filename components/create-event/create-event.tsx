import { v4 } from "uuid";
import { FormEvent } from "react";
import s from "./create-event.module.css";
import { IEvent } from "../context/types";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/context";

export default function CreateEvent() {
  const router = useRouter();
  const {
    state: { current_user_email },
    createEvent,
    findUserData,
  } = useGlobalContext();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const new_event_info: IEvent = {
      name: "",
      time: "",
      location: "",
      description: "",
      id: v4(),
      owner_id: findUserData("id"),
      guests: [current_user_email!],
    };

    (Array.from(e.currentTarget.elements) as HTMLInputElement[])
      .filter((el) => el.name.length > 0)
      .forEach(({ name, value }) => (new_event_info[name] = value));

    createEvent(new_event_info);

    if (
      confirm("Event successfully created\n\nRedirect to event page?") === true
    ) {
      return router.push(`/event/${new_event_info.id}`);
    } else return e.currentTarget.reset();
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
            name="time"
            type="datetime-local"
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
