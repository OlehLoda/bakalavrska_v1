"use client";
import { useGlobalContext } from "@/components/context/context";
import Empty from "@/components/global/empty/empty";
import Requests from "@/components/requests/requests";

export default function AllEventsPage() {
  const {
    state: { current_user_email },
  } = useGlobalContext();

  return current_user_email ? <Requests /> : <Empty />;
}
