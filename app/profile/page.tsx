"use client";
import Empty from "@/components/global/empty/empty";
import Profile from "@/components/global/profile/profile";
import { useGlobalContext } from "@/components/context/context";
import Loader from "@/components/global/loader/loader";

export default function ProfilePage() {
  const {
    state: { loading, current_user_email },
  } = useGlobalContext();

  return (
    <Loader loading={loading}>
      {current_user_email ? <Profile /> : <Empty />}
    </Loader>
  );
}
