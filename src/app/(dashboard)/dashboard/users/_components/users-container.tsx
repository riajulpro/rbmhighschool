"use client";

import { UserTable } from "@/components/tables/user-table";
import axiosInstance from "@/lib/axios";
import { type IUser } from "@/types/index";
import { useRouter } from "next/navigation";

export default function UsersPage({
  usersData: users,
}: {
  usersData: IUser[];
}) {
  const router = useRouter();

  const handleAdd = async (
    user: Omit<IUser, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/users`, user);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (id: string, updatedUser: Partial<IUser>) => {
    const res = await axiosInstance.put(`/api/users/${id}`, updatedUser);

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/users/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts and roles within the system
        </p>
      </div>

      <UserTable
        data={users}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
