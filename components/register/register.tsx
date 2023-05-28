import { v4 } from "uuid";
import { FormEvent } from "react";
import { IUser } from "../context/types";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/context";
import InputPass from "../global/input-pass/input-pass";
import Link from "next/link";

export default function Register() {
  const { findUser, registerUser } = useGlobalContext();

  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = Array.from(e.currentTarget.elements);

    const data: Record<string, string> = {};

    elements
      .filter((e) => (e as HTMLInputElement).name.length > 0)
      .forEach((el) => {
        const { name, value } = el as HTMLInputElement;
        data[name] = value;
      });

    const user_exist = findUser(data["email"]);

    const password_match = data["password"] === data["password_repeat"];

    const final_data: IUser = {
      id: v4(),
      image: "",
      name: data["name"],
      email: data["email"],
      password: data["password"],
      events: {
        my_events: [],
        invited_to: [],
      },
    };

    if (user_exist) {
      return alert("This user already has an account");
    } else if (!password_match) {
      return alert("Passwords don't match");
    } else {
      registerUser(final_data);
      return router.push("/login");
    }
  };

  return (
    <div className="bg">
      <form className="form" onSubmit={onSubmit}>
        <h2>Registration</h2>
        <div className="wrap">
          <input
            autoFocus
            required
            name="email"
            type="email"
            className="input"
            placeholder="Email"
          />
          <input
            required
            name="name"
            type="text"
            className="input"
            placeholder="Name"
          />
        </div>
        <div className="wrap">
          <InputPass required name="password" />
          <InputPass
            required
            name="password_repeat"
            placeholder="Repeat password"
          />
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
        <Link href={"/login"}>Already have an account?</Link>
      </form>
    </div>
  );
}
