import AvatarIcon from "@/public/icons/avatar";
import s from "./profile.module.css";
import DropDown from "./drop-down/drop-down";
import { useGlobalContext } from "@/components/context/context";
import { FormEvent } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Profile() {
  const {
    state: { current_user_email },
    findUser,
    deleteUser,
    changeUserData,
    setCurrentUserEmail,
  } = useGlobalContext();

  if (!current_user_email) return <></>;
  const current_user = findUser(current_user_email);
  if (!current_user) return <></>;

  const { email, password, name, image } = current_user;

  const changeProfileInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = (
      e.currentTarget.elements.namedItem("name") as HTMLInputElement
    ).value;

    changeUserData({ name });

    alert("Name has been changed");

    return e.currentTarget.reset();
  };

  const changeEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;

    changeUserData({ email });
    setCurrentUserEmail(email);

    alert("Email has been changed");

    return e.currentTarget.reset();
  };

  const changePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const old_password = (
      e.currentTarget.elements.namedItem("old_password") as HTMLInputElement
    ).value;

    const new_password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;

    if (password !== old_password) return alert("Old password is wrong");

    changeUserData({ password: new_password });

    alert("Password has been changed");

    return e.currentTarget.reset();
  };

  const deleteAccount = () => {
    deleteUser(email);

    setCurrentUserEmail(null);
    signOut();
  };

  const logOut = () => {
    signOut();
    setCurrentUserEmail(null);
  };

  return (
    <div className={s.bg}>
      <div className={s.content}>
        <h2>Profile</h2>
        <div className={s.generalInfo}>
          {image ? (
            <Image
              src={image}
              alt="user avatar"
              width={64}
              height={64}
              className={s.avatar}
            />
          ) : (
            <AvatarIcon className={s.avatar} />
          )}
          <p className={s.name}>{name}</p>
          <p className={s.email}>{email}</p>
        </div>
        <DropDown parent={<button className={s.opener}>Edit profile</button>}>
          <form className={s.form} onSubmit={changeProfileInfo}>
            <h3>Here you can change your profile info</h3>
            <input
              required
              type="text"
              className="input"
              placeholder="New name"
              name="name"
            />
            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </DropDown>
        <DropDown parent={<button className={s.opener}>Change email</button>}>
          <form className={s.form} onSubmit={changeEmail}>
            <h3>Here you can change your email</h3>
            <input
              type="email"
              className="input"
              placeholder="New email"
              name="email"
            />
            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </DropDown>
        <DropDown
          parent={<button className={s.opener}>Change password</button>}
        >
          <form className={s.form} onSubmit={changePassword}>
            <h3>Here you can change your password</h3>
            <input
              required
              minLength={8}
              type="text"
              className="input"
              name="old_password"
              placeholder="Old password"
            />
            <input
              required
              minLength={8}
              type="text"
              className="input"
              name="password"
              placeholder="New password"
            />
            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </DropDown>
        <div className={s.buttonsWrap}>
          <button onClick={deleteAccount}>Delete account</button>
          <button onClick={logOut}>Log out</button>
        </div>
      </div>
    </div>
  );
}
