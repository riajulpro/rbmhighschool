import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import UsersPage from "./_components/users-container";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
    };
  }
}

const page = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.accessToken;

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/get-all-users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { users } = await res.json();

  return (
    <div>
      <UsersPage usersData={users} />
    </div>
  );
};

export default page;
