/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  session?: any;
}

const AuthSessionProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthSessionProvider;
