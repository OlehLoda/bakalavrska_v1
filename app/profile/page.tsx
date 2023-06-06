"use client";
import Empty from "@/components/global/empty/empty";
import Profile from "@/components/global/profile/profile";
import { useGlobalContext } from "@/components/context/context";

export default function ProfilePage() {
  const {
    state: { current_user_email },
  } = useGlobalContext();

  return current_user_email ? <Profile /> : <Empty />;
}
