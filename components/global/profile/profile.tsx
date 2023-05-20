import AvatarIcon from "@/public/icons/avatar";
import s from "./profile.module.css";
import DropDown from "./drop-down/drop-down";

export default function Profile() {
  return (
    <div className={s.bg}>
      <div className={s.content}>
        <h2>Profile</h2>
        <div className={s.generalInfo}>
          <AvatarIcon className={s.avatar} />
          <p className={s.name}>Oleh</p>
          <p className={s.lastname}>Loda</p>
          <p className={s.email}>oleglioda@gmail.com</p>
        </div>
        <DropDown parent={<button className={s.opener}>Edit profile</button>}>
          <form className={s.form}>
            <h3>Here you can change your profile info</h3>
            <input type="text" className="input" placeholder="New name" />
            <input type="text" className="input" placeholder="New last name" />
          </form>
        </DropDown>
        <DropDown parent={<button className={s.opener}>Change email</button>}>
          <form className={s.form}>
            <h3>Here you can change your email</h3>
            <input type="email" className="input" placeholder="New email" />
          </form>
        </DropDown>
        <DropDown
          parent={<button className={s.opener}>Change password</button>}
        >
          <form className={s.form}>
            <h3>Here you can change your password</h3>
            <input type="text" className="input" placeholder="Old password" />
            <input type="text" className="input" placeholder="New password" />
          </form>
        </DropDown>
        <div className={s.buttonsWrap}>
          <button>Delete account</button>
          <button>Log out</button>
        </div>
      </div>
    </div>
  );
}
