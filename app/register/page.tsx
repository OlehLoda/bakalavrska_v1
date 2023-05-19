"use client";

import { useGlobalContext } from "@/components/context/context";
import Register from "@/components/register/register";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const {
    state: { current_user_email },
  } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    if (current_user_email) router.push("/");
  }, [current_user_email]);

  return <Register />;
}
