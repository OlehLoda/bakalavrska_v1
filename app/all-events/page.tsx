"use client";
import AllEvents from "@/components/all-events/all-events";
import { useGlobalContext } from "@/components/context/context";
import Empty from "@/components/global/empty/empty";

export default function AllEventsPage() {
  const {
    state: { current_user_email },
  } = useGlobalContext();

  return current_user_email ? <AllEvents /> : <Empty />;
}
