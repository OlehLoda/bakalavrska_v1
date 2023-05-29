"use client";

import Empty from "@/components/global/empty/empty";
import AllEvents from "@/components/all-events/all-events";
import { useGlobalContext } from "@/components/context/context";

export default function AllEventsPage() {
  const {
    state: { current_user_email },
  } = useGlobalContext();

  return current_user_email ? <AllEvents /> : <Empty />;
}
