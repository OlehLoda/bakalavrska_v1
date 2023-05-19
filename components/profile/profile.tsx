import s from "./profile.module.css";

export default function Profile() {
  return (
    <div className={s.bg}>
      <div className={s.content}>
        <h2>Profile</h2>
        <div>
          <p>name</p>
          <p>last name</p>
          <p>email</p>
        </div>
        <button>Edit profile</button>
        <button>Change email</button>
        <button>Change password</button>
        <div>
          <button>Delete account</button>
          <button>Log out</button>
        </div>
      </div>
    </div>
  );
}
