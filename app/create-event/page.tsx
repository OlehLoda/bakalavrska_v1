"use client";

import Empty from "@/components/global/empty/empty";
import { useGlobalContext } from "@/components/context/context";
import CreateEvent from "@/components/create-event/create-event";

export default function CreateEventPage() {
  const {
    state: { current_user_email },
  } = useGlobalContext();

  return current_user_email ? <CreateEvent /> : <Empty />;
}
