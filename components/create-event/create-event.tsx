import s from "./create-event.module.css";

export default function CreateEvent() {
  return (
    <div className="bg">
      <form className="form">
        <h2>Create event</h2>
        <input type="text" placeholder="Event name" />
        <input type="date" placeholder="Event date" />
        <input type="text" placeholder="Event location" />
      </form>
    </div>
  );
}
