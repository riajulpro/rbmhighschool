"use client";

import { ClassRoutineTable } from "@/components/tables/class-routine-table";
import axiosInstance from "@/lib/axios";
import type { IClassRoutine } from "@/types/index";
import { useRouter } from "next/navigation";

export default function ClassRoutinesPage({
  routineData: classRoutines,
}: {
  routineData: IClassRoutine[];
}) {
  const router = useRouter();

  const handleAdd = async (
    routine: Omit<IClassRoutine, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/routine`, routine);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (
    id: string,
    updatedRoutine: Partial<IClassRoutine>
  ) => {
    const res = await axiosInstance.put(`/api/routine/${id}`, updatedRoutine);

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/routine/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Class Routines</h1>
        <p className="text-muted-foreground">
          Manage daily class schedules for different classes and sections
        </p>
      </div>

      <ClassRoutineTable
        data={classRoutines}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
