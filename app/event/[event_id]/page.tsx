"use client";

import { useGlobalContext } from "@/components/context/context";
import Event from "@/components/event/event";
import Loader from "@/components/global/loader/loader";

export default function EventPage() {
  const {
    state: { loading },
  } = useGlobalContext();
  return (
    <Loader loading={loading}>
      <Event />
    </Loader>
  );
}
