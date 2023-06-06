"use client";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const nextAuthUrl = process.env.NEXTAUTH_URL;
  const nextAuthUrl = process.env.NEXTAUTH_URL_VERCEL;

  return <SessionProvider baseUrl={nextAuthUrl}>{children}</SessionProvider>;
}
