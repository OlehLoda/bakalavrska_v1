import Image from "next/image";
import s from "./profile.module.css";
import { signOut } from "next-auth/react";
import { FormEvent, useState } from "react";
import DropDown from "../drop-down/drop-down";
import AvatarIcon from "@/public/icons/avatar";
import { useGlobalContext } from "@/components/context/context";

export default function Profile() {
  const {
    state: { current_user_email },
    findUser,
    deleteUser,
    changeUserData,
    setCurrentUserEmail,
  } = useGlobalContext();

  const [active, setActive] = useState<number | null>(null),
    toggleActive = (index: number) =>
      active === index ? setActive(null) : setActive(index);

  if (!current_user_email) return <></>;
  const current_user = findUser(current_user_email);
  if (!current_user) return <></>;
  const { email, password, name, image } = current_user;

  const deleteAccount = () => {
    deleteUser(email);
    logOut();
  };

  const logOut = () => {
    setCurrentUserEmail(null);
    signOut();
  };

  const changeProfileInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = (
      e.currentTarget.elements.namedItem("name") as HTMLInputElement
    ).value;

    changeUserData({ data: { name } });

    alert("Name has been changed");

    return e.currentTarget.reset();
  };

  const changeEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;

    changeUserData({ data: { email } });
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

    changeUserData({ data: { password: new_password } });

    alert("Password has been changed");

    return e.currentTarget.reset();
  };

  const functionals = [
    {
      name: "Edit profile",
      description: "Here you can change your profile info",
      onSubmit: changeProfileInfo,
      body: (
        <>
          <input
            required
            type="text"
            name="name"
            className="input"
            placeholder="New name"
          />
          <button type="submit" className="submit">
            Submit
          </button>
        </>
      ),
    },
    {
      name: "Change email",
      description: "Here you can change your email",
      onSubmit: changeEmail,
      body: (
        <>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="New email"
          />
          <button type="submit" className="submit">
            Submit
          </button>
        </>
      ),
    },
    {
      name: "Change password",
      description: "Here you can change your password",
      onSubmit: changePassword,
      body: (
        <>
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
            type="text"
            minLength={8}
            name="password"
            className="input"
            placeholder="New password"
          />
          <button type="submit" className="submit">
            Submit
          </button>
        </>
      ),
    },
  ];

  return (
    <div className={s.bg}>
      <div className={s.content}>
        <h2>Profile</h2>
        <div className={s.generalInfo}>
          {image ? (
            <Image
              width={64}
              height={64}
              src={image}
              alt="user avatar"
              className={s.avatar}
            />
          ) : (
            <AvatarIcon className={s.avatar} />
          )}
          <p className={s.name}>{name}</p>
          <p className={s.email}>{email}</p>
        </div>
        {functionals.map(({ name, description, onSubmit, body }, index) => (
          <DropDown
            key={index}
            active={index === active}
            setActive={() => toggleActive(index)}
            parent={<button className={s.opener}>{name}</button>}
          >
            <form className={s.form} onSubmit={onSubmit}>
              <h3>{description}</h3>
              {body}
            </form>
          </DropDown>
        ))}
        <div className={s.buttonsWrap}>
          <button onClick={deleteAccount}>Delete account</button>
          <button onClick={logOut}>Log out</button>
        </div>
      </div>
    </div>
  );
}
