"use client";

import { AuthorityTable } from "@/components/tables/authority-table";
import type { IAuthority } from "@/types/index";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function AuthoritiesPage({
  authoritiesData: authorities,
}: {
  authoritiesData: IAuthority[];
}) {
  const router = useRouter();

  const handleAdd = async (
    authority: Omit<IAuthority, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/authorities`, authority);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (
    id: string,
    updatedAuthority: Partial<IAuthority>
  ) => {
    const res = await axiosInstance.put(
      `/api/authorities/${id}`,
      updatedAuthority
    );

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    const res = await axiosInstance.delete(`/api/authorities/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">School Authorities</h1>
        <p className="text-muted-foreground">
          Manage school administration and authority members
        </p>
      </div>

      <AuthorityTable
        data={authorities}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
