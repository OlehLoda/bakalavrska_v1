"use client";
import { useGlobalContext } from "@/components/context/context";
import Empty from "@/components/global/empty/empty";
import Profile from "@/components/profile/profile";

export default function CreateEventPage() {
  const {
    state: { current_user_email },
  } = useGlobalContext();

  return current_user_email ? <Profile /> : <Empty />;
}
