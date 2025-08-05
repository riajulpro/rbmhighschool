"use client";

import { StudentTable } from "@/components/tables/student-table";
import axiosInstance from "@/lib/axios";
import type { IStudent } from "@/types/index";
import { useRouter } from "next/navigation";

export default function StudentsPage({
  studentsData: students,
}: {
  studentsData: IStudent[];
}) {
  const router = useRouter();

  const handleAdd = async (
    student: Omit<IStudent, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/students`, student);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (id: string, updatedStudent: Partial<IStudent>) => {
    const res = await axiosInstance.put(`/api/students/${id}`, updatedStudent);

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/students/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Students Management</h1>
        <p className="text-muted-foreground">
          Manage student records and information
        </p>
      </div>

      <StudentTable
        data={students}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
