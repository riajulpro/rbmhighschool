"use client";

import type { IAuthority, IVacation } from "@/types/index";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { VacationTable } from "@/components/tables/vacation-table";

export default function VacationPage({
  vacationsData: vacations,
}: {
  vacationsData: IVacation[];
}) {
  const router = useRouter();

  const handleAdd = async (
    authority: Omit<IVacation, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/vacations`, authority);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (
    id: string,
    updatedAuthority: Partial<IAuthority>
  ) => {
    const res = await axiosInstance.put(
      `/api/vacations/${id}`,
      updatedAuthority
    );

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    const res = await axiosInstance.delete(`/api/vacations/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">School vacations</h1>
        <p className="text-muted-foreground">
          Manage school administration and authority members
        </p>
      </div>

      <VacationTable
        data={vacations}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
