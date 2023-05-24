"use client";
import { useGlobalContext } from "@/components/context/context";
import { IEvent, IUser } from "@/components/context/types";
import LogIn from "@/components/login/login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { v4 } from "uuid";

export default function LoginPage() {
  const {
    state: { current_user_email, all_events },
    findUser,
    registerUser,
    setCurrentUserEmail,
  } = useGlobalContext();

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (current_user_email) {
      return router.push("/");
    } else if (session) {
      const { name, email, image } = session.user || {};

      const user_exist = findUser(email as string);

      if (user_exist) {
        setCurrentUserEmail(user_exist.email);
        return router.push("/");
      } else {
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
        return router.push("/");
      }
    } else return;
  }, [current_user_email, session]);

  return <LogIn />;
}
