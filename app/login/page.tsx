"use client";

import { v4 } from "uuid";
import { useEffect } from "react";
import LogIn from "@/components/login/login";
import { IUser } from "@/components/context/types";
import { signOut, useSession } from "next-auth/react";
import Loader from "@/components/global/loader/loader";
import { useGlobalContext } from "@/components/context/context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {
    state: { current_user_email },
    findUser,
    registerUser,
    setCurrentUserEmail,
  } = useGlobalContext();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    const { name, email, image } = session.user || {};

    const user_exist = findUser(email as string);

    if (user_exist) return setCurrentUserEmail(user_exist.email);

    const new_user: IUser = {
      id: v4(),
      email: email || "",
      password: "11111111",
      name: name || "",
      image: image || "",
      events: {
        my_events: [],
        invited_to: [],
      },
    };

    registerUser(new_user);
    setCurrentUserEmail(new_user.email);
  }, [session]);

  const logOut = () => {
    setCurrentUserEmail(null);
    signOut();
  };

  return !current_user_email ? (
    <LogIn />
  ) : (
    <div className="bg">
      <div className="form">
        <h2>Signed in as {findUser(current_user_email)?.name}</h2>
        <button onClick={logOut}>Sign out</button>
      </div>
    </div>
  );
}
