"use client";
import { useGlobalContext } from "@/components/context/context";
import CreateEvent from "@/components/create-event/create-event";
import Empty from "@/components/global/empty/empty";
import Profile from "@/components/global/profile/profile";

export default function CreateEventPage() {
  const {
    state: { current_user_email },
  } = useGlobalContext();

  return current_user_email ? <CreateEvent /> : <Empty />;
}
