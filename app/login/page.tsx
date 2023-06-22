"use client";

import { v4 } from "uuid";
import { useEffect, useState } from "react";
import LogIn from "@/components/login/login";
import { IUser } from "@/components/context/types";
import { signOut, useSession } from "next-auth/react";
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
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(!!current_user_email);

    if (!!current_user_email) return router.push("./profile");
    if (!session) return setLoading(false);
    const { name, email, image } = session.user || {};

    const user_exist = findUser(email as string);

    if (user_exist) {
      router.push("./profile");
      return setCurrentUserEmail(user_exist.email);
    }

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
  }, [session, current_user_email]);

  return !loading ? (
    <LogIn />
  ) : (
    <div className="bg">
      <div className="form">
        <h2>Loading...</h2>
      </div>
    </div>
  );
}
